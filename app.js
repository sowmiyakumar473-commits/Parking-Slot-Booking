const userName =
    localStorage.getItem("userName");

if (userName) {

    document.getElementById("welcome").innerText =
        "Welcome " + userName;

    document.getElementById("userName").value =
        userName;
}
async function loadSlots() {

    const response =
        await fetch("http://localhost:5000/bookings");

    const bookings =
        await response.json();

    const bookedSlots =
        bookings.map(b => Number(b.slotNumber));

    const slotGrid =
        document.getElementById("slotGrid");

    slotGrid.innerHTML = "";

    for(let i=1;i<=20;i++){

        const div =
            document.createElement("div");

        div.classList.add("slot");

        if(bookedSlots.includes(i)){

            div.classList.add("booked");
            div.innerText = `Slot ${i}`;

        }else{

            div.classList.add("available");
            div.innerText = `Slot ${i}`;
        }

        slotGrid.appendChild(div);
    }
}

loadSlots();
// Book Slot

async function bookSlot() {

    const bookingData = {

        userName:
            document.getElementById("userName").value,

        slotNumber:
            Number(document.getElementById("slotNumber").value),

        vehicleNumber:
            document.getElementById("vehicleNumber").value
    };

    const response = await fetch(
        "http://localhost:5000/book",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookingData)
        }
    );

    const result =
        await response.json();

    alert(result.message);

    if (result.booking) {

        document.getElementById("qrCode").innerHTML =
            `
            <h3>Booking QR Code</h3>
            <img src="${result.booking.qrCode}">
            `;
            
setTimeout(() => {
    window.location.href = "index.html";
}, 5000);


    }
}
