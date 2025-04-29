document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("booking-form");
    const confirmationTable = document.getElementById("confirmation-table");

    const loadMovies = () => {
        const movieSelect = document.getElementById("movie");
        const movies = [
            { id: 1, name: "Фильм 1" },
            { id: 2, name: "Фильм 2" },
            { id: 3, name: "Фильм 3" }
        ];
        movies.forEach(movie => {
            const option = document.createElement("option");
            option.value = movie.id;
            option.textContent = movie.name;
            movieSelect.appendChild(option);
        });
    };

    const renderTable = (bookings) => {
        while (confirmationTable.rows.length > 1) {
            confirmationTable.deleteRow(1);
        }

        if (!Array.isArray(bookings)) {
            console.error("Данные bookings не являются массивом:", bookings);
            return;
        }

        bookings.forEach(booking => {
            const row = document.createElement("tr");

            const nameCell = document.createElement("td");
            nameCell.textContent = booking.name;
            row.appendChild(nameCell);

            const movieCell = document.createElement("td");
            movieCell.textContent = booking.movie;
            row.appendChild(movieCell);

            const datetimeCell = document.createElement("td");
            datetimeCell.textContent = booking.datetime;
            row.appendChild(datetimeCell);

            const ticketsCell = document.createElement("td");
            ticketsCell.textContent = booking.tickets;
            row.appendChild(ticketsCell);

            confirmationTable.appendChild(row);
        });
    };

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        let bookings = JSON.parse(localStorage.getItem("bookingData")) || [];
        if (!Array.isArray(bookings)) {
            bookings = [];
        }
        bookings.push(data);
        localStorage.setItem("bookingData", JSON.stringify(bookings));

        renderTable(bookings);
    });

    let savedData = JSON.parse(localStorage.getItem("bookingData")) || [];
    if (!Array.isArray(savedData)) {
        savedData = [];
    }
    renderTable(savedData);

    loadMovies();
});
