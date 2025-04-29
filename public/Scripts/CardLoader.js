const foodContainer = document.getElementById('food-container');
const preloader = document.getElementById('preloader');
const errorMessage = document.getElementById('error-message');

async function fetchFoodData() {
    try {
        preloader.style.display = 'block';
        errorMessage.style.display = 'none';

        const randomId = Math.random();
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=6&id_gte=${randomId}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const foodItems = await response.json();

        preloader.style.display = 'none';

        foodItems.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
            <img src="${item.thumbnailUrl}" alt="${item.title}">
            <div class="card-title">${item.title}</div>
            <div class="card-price">$${(Math.random() * 20 + 5).toFixed(2)}</div>
          `;
            foodContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        preloader.style.display = 'none';
        errorMessage.style.display = 'block';
    }
}

window.onload = fetchFoodData;