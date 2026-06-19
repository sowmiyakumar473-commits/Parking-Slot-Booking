async function submitReview() {

    try {

        const userName =
            document.getElementById("userName").value;

        const rating =
            document.getElementById("rating").value;

        const comment =
            document.getElementById("comment").value;

        if (
            userName.trim() === "" ||
            comment.trim() === ""
        ) {
            alert("Please fill all fields");
            return;
        }

        const reviewData = {
            userName,
            rating,
            comment
        };

        const response = await fetch(
            "http://localhost:5000/review",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reviewData)
            }
        );

        const result = await response.json();

        alert("⭐ Thank you for your feedback!");

        window.location.href = "index.html";

    } catch (error) {

        console.error(error);

        alert("Server connection error");
    }
}
