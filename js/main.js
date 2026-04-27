document.addEventListener('DOMContentLoaded', () => {
    // Dynamically set current year in the footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
