document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("booking-form");
    const confirmationTable = document.getElementById("confirmation-table");
    const emailInput = document.getElementById("email");
    const nameInput = document.getElementById("name");
    const movieSelect = document.getElementById("movie");

    const loadMovies = async () => {
        const movieSelect = document.getElementById("movie");

        try {
            const response = await fetch("http://localhost:4000/films/json");
            if (!response.ok) throw new Error("Не удалось загрузить фильмы");

            const movies = await response.json();

            movies.forEach(movie => {
                const option = document.createElement("option");
                option.value = movie.id;
                option.textContent = movie.name;
                movieSelect.appendChild(option);
            });
        } catch (error) {
            console.error("Ошибка при загрузке фильмов:", error);
            alert("Не удалось загрузить список фильмов.");
        }
    };

    // Автозаполнение имени по email
    emailInput.addEventListener("blur", async () => {
        const email = emailInput.value.trim();
        if (!email) return;

        try {
            const response = await fetch(`http://localhost:4000/user/json?email=${email}`);
            if (!response.ok) throw new Error('Не удалось найти пользователя');

            const user = await response.json();
            nameInput.value = user ? user.username : "Не найдено";
        } catch (error) {
            console.error("Ошибка при поиске пользователя:", error);
            nameInput.value = "Не найдено";
        }
    });

    // Отображение таблицы подтверждения
    const renderTable = (bookings) => {
        while (confirmationTable.rows.length > 1) {
            confirmationTable.deleteRow(1);
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

            confirmationTable.appendChild(row);
        });
    };

    // Обработка отправки формы
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = nameInput.value;
        const email = emailInput.value;
        const movieText = movieSelect.options[movieSelect.selectedIndex].text;
        const movieId = parseInt(movieSelect.value, 10);
        const datetime = document.getElementById("datetime").value;

        try {
            const response = await fetch(`http://localhost:4000/user/json?email=${email}`);
            if (!response.ok) throw new Error('Пользователь не найден');

            const user = await response.json();

            // Отправляем POST-запрос на сервер для создания билета
            const ticketResponse = await fetch("http://localhost:4000/ticket", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    filmId: movieId,
                    userId: user.id,
                    price: 500  // Пример: фиксированная цена
                })
            });

            if (!ticketResponse.ok) {
                throw new Error("Ошибка при создании билета");
            }

            const ticket = await ticketResponse.json();

            const booking = {
                name,
                email,
                movie: movieText,
                datetime,
                userId: user.id,
                ticketId: ticket.id
            };

            let bookings = JSON.parse(localStorage.getItem("bookingData")) || [];
            bookings.push(booking);
            localStorage.setItem("bookingData", JSON.stringify(bookings));

            renderTable(bookings);
        } catch (error) {
            console.error("Ошибка при отправке заказа:", error);
            alert("Не удалось найти пользователя или создать заказ.");
        }
    });

    // Инициализация
    const savedData = JSON.parse(localStorage.getItem("bookingData")) || [];
    renderTable(savedData);
    loadMovies();
});
