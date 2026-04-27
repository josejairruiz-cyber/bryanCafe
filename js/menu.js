document.addEventListener('DOMContentLoaded', () => {
    fetch('data/menu.xml?v=' + new Date().getTime())
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

        items.forEach((item, index) => {
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

            // Add subcategory title row
            const titleTr = document.createElement('tr');
            titleTr.innerHTML = `<td colspan="4" style="background-color: var(--secondary-color); color: var(--light-text); font-size: 1.2rem; font-weight: bold; text-align: center;">${categoryName}</td>`;
            beveragesBody.appendChild(titleTr);

            items.forEach((item) => {
                const name = item.querySelector('Name').textContent;
                
                // Handle sizes or single price
                let priceDisplay = '';
                const sizes = item.querySelectorAll('Size');
                if (sizes.length > 0) {
                    sizes.forEach((size, i) => {
                        const sizeName = size.querySelector('Name').textContent;
                        const sizePrice = size.querySelector('Price').textContent;
                        const borderStyle = i < sizes.length - 1 ? 'border-bottom: 1px solid #ddd; padding-bottom: 8px; margin-bottom: 8px;' : '';
                        priceDisplay += `<div style="${borderStyle}"><strong>${sizeName}:</strong><br>${sizePrice}</div>`;
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

                tr.innerHTML = `
                    <td data-label="Image"><img src="Images/${image}" alt="${name}" style="max-width: 100px; height: auto; border-radius: 8px;"></td>
                    <td data-label="Item Name"><strong>${name}</strong></td>
                    <td data-label="Description">${description}</td>
                    <td data-label="Price" class="price">${priceDisplay}</td>
                `;
                beveragesBody.appendChild(tr);
            });
        });
    }
});
