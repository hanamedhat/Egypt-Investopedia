// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const acceptButtons = document.querySelectorAll('.accept');
    const rejectButtons = document.querySelectorAll('.reject');

    acceptButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Offer accepted!');
            // Additional logic to handle the acceptance of the offer
        });
    });

    rejectButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Offer rejected!');
            // Additional logic to handle the rejection of the offer
        });
    });
});

function showTooltip(event) {
    const tooltip = event.currentTarget.querySelector('.tooltip-text');
    const allTooltips = document.querySelectorAll('.tooltip-text');
    
    allTooltips.forEach(tip => {
        if (tip !== tooltip) {
            tip.classList.remove('show');
        }
    });

    tooltip.classList.toggle('show');
}
