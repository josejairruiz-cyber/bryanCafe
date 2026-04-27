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
            const description = item.querySelector('Description') ? item.querySelector('Description').textContent : '';
            const image = item.querySelector('Image') ? item.querySelector('Image').textContent : '';

            const tr = document.createElement('tr');
            
            tr.innerHTML = `
                <td data-label="Image"><img src="Images/${image}" alt="${name}" style="max-width: 100px; height: auto; border-radius: 8px;"></td>
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
                
                // Handle sizes or single price
                let priceDisplay = '';
                const sizes = item.querySelectorAll('Size');
                if (sizes.length > 0) {
                    sizes.forEach(size => {
                        const sizeName = size.querySelector('Name').textContent;
                        const sizePrice = size.querySelector('Price').textContent;
                        priceDisplay += `<div>${sizeName}: ${sizePrice}</div>`;
                    });
                } else {
                    const priceNode = item.querySelector('Price');
                    if (priceNode) {
                        priceDisplay = priceNode.textContent;
                    }
                }

                const description = item.querySelector('Description') ? item.querySelector('Description').textContent : '';
                const image = item.querySelector('Image') ? item.querySelector('Image').textContent : '';

                const tr = document.createElement('tr');
                
                // Only show category name on the first item of the category for better aesthetics
                const catDisplay = index === 0 ? `<strong>${categoryName}</strong>` : '';

                tr.innerHTML = `
                    <td data-label="Image"><img src="Images/${image}" alt="${name}" style="max-width: 100px; height: auto; border-radius: 8px;"></td>
                    <td data-label="Category">${catDisplay}</td>
                    <td data-label="Item Name"><strong>${name}</strong></td>
                    <td data-label="Description">${description}</td>
                    <td data-label="Price" class="price">${priceDisplay}</td>
                `;
                beveragesBody.appendChild(tr);
            });
        });
    }
});
