async function loadDashboard() {

    // Admin Stats
    const statsResponse =
        await fetch("http://localhost:5000/admin-stats");

    const stats =
        await statsResponse.json();

    document.getElementById("users").innerText =
        stats.totalUsers;

    document.getElementById("bookings").innerText =
        stats.totalBookings;

    document.getElementById("available").innerText =
        stats.availableSlots;

    document.getElementById("occupancy").innerText =
        stats.occupancyRate.toFixed(2) + "%";

    // Revenue
    const revenueResponse =
        await fetch("http://localhost:5000/revenue");

    const revenue =
        await revenueResponse.json();

    document.getElementById("revenue").innerText =
        "₹" + revenue.totalRevenue;

    // Bookings Table
    const bookingsResponse =
        await fetch("http://localhost:5000/bookings");

    const bookings =
        await bookingsResponse.json();

    const bookingTable =
        document.getElementById("bookingTable");

    bookingTable.innerHTML = "";

    bookings.forEach(booking => {

        bookingTable.innerHTML += `
            <tr>
                <td>${booking.userName || "N/A"}</td>
                <td>${booking.slotNumber}</td>
                <td>${booking.vehicleNumber}</td>
                <td>${new Date(booking.bookingTime)
                    .toLocaleString()}</td>
            </tr>
        `;
    });

    // Reviews Table
    const reviewsResponse =
        await fetch("http://localhost:5000/reviews");

    const reviews =
        await reviewsResponse.json();

    const reviewTable =
        document.getElementById("reviewTable");

    reviewTable.innerHTML = "";

    reviews.forEach(review => {

        reviewTable.innerHTML += `
            <tr>
                <td>${review.userName}</td>
                <td>${review.rating} ⭐</td>
                <td>${review.comment}</td>
            </tr>
        `;
    });
}

loadDashboard();