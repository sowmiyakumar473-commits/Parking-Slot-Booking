const express = require("express");
const cors = require("cors");
const QRCode = require("qrcode");

require("./db");

const Booking = require("./models/Booking");
const User = require("./models/User");
const Review = require("./models/Review");

const app = express();

app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("Parking Slot Booking Backend Running");
});

// ================= BOOK SLOT =================

app.post("/book", async (req, res) => {

    const booking = req.body;

    const alreadyBooked = await Booking.findOne({
        slotNumber: booking.slotNumber
    });

    if (alreadyBooked) {
        return res.json({
            message: "Slot Already Booked"
        });
    }

    const qrText = `
User: ${booking.userName}
Slot: ${booking.slotNumber}
Vehicle: ${booking.vehicleNumber}
`;

    const qrCode = await QRCode.toDataURL(qrText);

    const amount = 50;

    const savedBooking = await Booking.create({
        ...booking,
        amount,
        qrCode
    });

    res.json({
        message: "Booking Successful",
        booking: savedBooking
    });
});

// ================= GET BOOKINGS =================

app.get("/bookings", async (req, res) => {

    const bookings = await Booking.find();

    res.json(bookings);
});

// ================= REVENUE =================

app.get("/revenue", async (req, res) => {

    const bookings = await Booking.find();

    let totalRevenue = 0;

    bookings.forEach((booking) => {
        totalRevenue += booking.amount || 0;
    });

    res.json({
        totalRevenue
    });
});

// ================= SIGNUP =================

app.post("/signup", async (req, res) => {

    const existingUser = await User.findOne({
        email: req.body.email
    });

    if (existingUser) {
        return res.json({
            message: "Email Already Registered"
        });
    }

    await User.create(req.body);

    res.json({
        message: "Registration Successful"
    });
});

// ================= LOGIN =================

app.post("/login", async (req, res) => {

    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });

    if (!user) {
        return res.json({
            message: "Invalid Email or Password"
        });
    }

    res.json({
        message: "Login Successful",
        user: user
    });
});

// ================= ADMIN STATS =================

app.get("/admin-stats", async (req, res) => {

    const totalUsers =
        await User.countDocuments();

    const totalBookings =
        await Booking.countDocuments();

    const totalSlots = 20;

    const availableSlots =
        totalSlots - totalBookings;

    const occupancyRate =
        (totalBookings / totalSlots) * 100;

    res.json({
        totalUsers,
        totalBookings,
        availableSlots,
        occupancyRate
    });
});

// ================= CLEAR BOOKINGS =================

app.get("/clear-bookings", async (req, res) => {

    await Booking.deleteMany({});

    res.send("All bookings deleted");
});

// ================= ADD REVIEW =================

app.post("/review", async (req, res) => {

    await Review.create(req.body);

    res.json({
        message: "Review Submitted Successfully"
    });
});

// ================= GET REVIEWS =================

app.get("/reviews", async (req, res) => {

    const reviews = await Review.find();

    res.json(reviews);
});

// ================= SERVER =================

app.delete("/cancel-booking/:slotNumber", async (req, res) => {

    await Booking.deleteOne({
        slotNumber: Number(req.params.slotNumber)
    });

    res.json({
        message: "Booking Cancelled Successfully"
    });
});


app.listen(5000, () => {
    console.log("Server running on port 5000");
});