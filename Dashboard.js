async function loadBookings() {

    const response = await fetch(
        "http://localhost:5000/bookings"
    );

    const bookings = await response.json();

    let output = "";

    bookings.forEach(booking => {

        output += `
        <tr>
            <td>${booking.slotNumber}</td>
            <td>${booking.vehicleNumber}</td>
        </tr>
        `;
    });

    document.getElementById("bookingTable").innerHTML = output;
}

loadBookings();