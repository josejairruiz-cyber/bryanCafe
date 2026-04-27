document.addEventListener('DOMContentLoaded', () => {
    fetch('data/menu.xml')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
        .then(data => {
            renderMeals(data);
            renderBeverages(data);
        })
        .catch(err => {
            console.error('Error fetching menu XML: ', err);
        });

    function renderMeals(xml) {
        const mealsBody = document.getElementById('meals-body');
        const items = xml.querySelectorAll('Meals Item');

        items.forEach(item => {
            const name = item.querySelector('Name').textContent;
            const price = item.querySelector('Price').textContent;
            const description = item.querySelector('Description').textContent;

            const tr = document.createElement('tr');
            
            tr.innerHTML = `
                <td data-label="Item Name"><strong>${name}</strong></td>
                <td data-label="Description">${description}</td>
                <td data-label="Price" class="price">${price}</td>
            `;
            mealsBody.appendChild(tr);
        });
    }

    function renderBeverages(xml) {
        const beveragesBody = document.getElementById('beverages-body');
        const categories = xml.querySelectorAll('Beverages Category');

        categories.forEach(category => {
            const categoryName = category.getAttribute('name');
            const items = category.querySelectorAll('Item');

            items.forEach((item, index) => {
                const name = item.querySelector('Name').textContent;
                const price = item.querySelector('Price').textContent;
                const description = item.querySelector('Description').textContent;

                const tr = document.createElement('tr');
                
                // Only show category name on the first item of the category for better aesthetics
                const catDisplay = index === 0 ? `<strong>${categoryName}</strong>` : '';

                tr.innerHTML = `
                    <td data-label="Category">${catDisplay}</td>
                    <td data-label="Item Name"><strong>${name}</strong></td>
                    <td data-label="Description">${description}</td>
                    <td data-label="Price" class="price">${price}</td>
                `;
                beveragesBody.appendChild(tr);
            });
        });
    }
});
