document.addEventListener('DOMContentLoaded', () => {
    
    // Handle form submission
    const form = document.getElementById('contactForm');
    const notification = document.getElementById('notification');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload
            
            // Show notification
            notification.style.display = 'block';
            
            // Hide notification after 5 seconds
            setTimeout(() => {
                notification.style.display = 'none';
            }, 5000);
            
            // Reset the form fields
            form.reset();
        });
    }

    // Fetch and render branches data
    fetch('data/branches.xml')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
        .then(data => {
            renderBranches(data);
        })
        .catch(err => {
            console.error('Error fetching branches XML: ', err);
        });

    function renderBranches(xml) {
        const container = document.getElementById('branches-container');
        const branches = xml.querySelectorAll('Branch');

        branches.forEach(branch => {
            const name = branch.querySelector('Name').textContent;
            const address = branch.querySelector('Address').textContent;
            const contact = branch.querySelector('Contact').textContent;
            const hours = branch.querySelector('Hours').textContent;
            const mapLink = branch.querySelector('MapLink').textContent;

            const card = document.createElement('div');
            card.className = 'branch-card';
            
            card.innerHTML = `
                <h3>${name}</h3>
                <p><strong>Address:</strong> ${address}</p>
                <p><strong>Contact:</strong> ${contact}</p>
                <p><strong>Hours:</strong> ${hours}</p>
                <a href="${mapLink}" target="_blank" class="maps-link">View on Google Maps</a>
            `;
            
            container.appendChild(card);
        });
    }
});
