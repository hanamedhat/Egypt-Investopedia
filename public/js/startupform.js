function nextPage(step) {
    const currentPage = document.querySelector('.form-page:not([style*="display: none"])');
    currentPage.style.display = 'none';
    const nextPage = document.getElementById('page' + step);
    nextPage.style.display = 'block';
    updateProgress(step);
    if (step === 8) { // Assuming page8 is the review page
        reviewData();
    }
}

function prevPage(step) {
    const currentPage = document.querySelector('.form-page:not([style*="display: none"])');
    currentPage.style.display = 'none';
    const prevPage = document.getElementById('page' + step);
    prevPage.style.display = 'block';
    updateProgress(step);
}

function reviewData() {
    const form = document.getElementById('investmentForm');
    const review = document.getElementById('review');
    const formData = new FormData(form);
    let reviewHTML = '<h2>Review Your Data</h2><ul>';

    formData.forEach((value, key) => {
        if (key !== 'userid' && key !== 'startupId') {
            reviewHTML += `<li><strong>${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> ${value}</li>`;
        }
    });

    reviewHTML += '</ul>';
    review.innerHTML = reviewHTML;
}

function displaySummary() {
    const name = document.querySelector('input[name="companyName"]').value;
    const base = document.querySelector('input[name="location"]').value;
    const address = document.querySelector('input[name="website"]').value;
    const industry = document.querySelector('input[name="industry"]').value;
    const shortsummary = document.getElementById('shortsummary').value;
    const stage = document.querySelector('input[name="stage"]').value;
    const legal = document.querySelector('input[name="legalStructure"]').value;
    const objective = document.getElementById('Objective').value;
    const nprofit = document.querySelector('input[name="nonProfit"]').value;
    const amount = document.querySelector('input[name="theDeal"]').value;
    const profit = document.querySelector('input[name="target"]').value;
    const tprofit = document.querySelector('input[name="totalRaising"]').value;
    const role = document.querySelector('input[name="investorRole"]').value;
    const mprofit = document.querySelector('input[name="minInvestmentPp"]').value;

    const summary = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Where is your company based:</strong> ${base}</p>
        <p><strong>Website (optional) or address:</strong> ${address}</p>
        <p><strong>Industry:</strong> ${industry}</p>
        <p><strong>Short summary of the business:</strong> ${shortsummary}</p>
        <p><strong>Stage of the project:</strong> ${stage}</p>
        <p><strong>Legal structure:</strong> ${legal}</p>
        <p><strong>Objective / future:</strong> ${objective}</p>
        <p><strong>Net profit of last year:</strong> ${nprofit}</p>
        <p><strong>Investment Amount:</strong> ${amount}</p>
        <p><strong>Previous round amount raised:</strong> ${profit}</p>
        <p><strong>Total amount raising:</strong> ${tprofit}</p>
        <p><strong>Ideal investor role:</strong> ${role}</p>
        <p><strong>Minimum investment per investor:</strong> ${mprofit}</p>
    `;

    document.getElementById('review').innerHTML = summary;
}


function updateProgress(step) {
    const progressLine = document.querySelector('.progress-line');
    const steps = document.querySelectorAll('.progress-indicator .step');
    steps.forEach((stepElement, index) => {
        if (index < step) {
            stepElement.classList.add('active');
        } else {
            stepElement.classList.remove('active');
        }
    });
    const percentage = ((step - 1) / (steps.length - 1)) * 100;
    progressLine.style.width = percentage + '%';
}



// FAQ Collapsible Functionality
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
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

document.addEventListener('click', function(event) {
    if (!event.target.closest('.info-icon')) {
        const tooltips = document.querySelectorAll('.tooltip-text');
        tooltips.forEach(tooltip => {
            tooltip.classList.remove('show');
        });
    }
});

function updateFileName(inputId, spanId) {
    const input = document.getElementById(inputId);
    const span = document.getElementById(spanId);
    if (input.files && input.files.length > 0) {
        span.textContent = input.files[0].name;
    } else {
        span.textContent = '';
    }
}

function showPages(step) {
    // Hide all pages
    const allPages = document.querySelectorAll('.form-page');
    allPages.forEach(page => {
        page.style.display = 'none';
    });

    // Show the selected page
    const showPage = document.getElementById('page' + step);
    showPage.style.display = 'block';
    updateProgress(step);

    // If step is 8, call displaySummary
    if (step === 8) {
        displaySummary();
    }
}

function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
document.addEventListener('DOMContentLoaded', (event) => {
    let openPage = getQueryParam('openPage');
    if (openPage) {
        showPages(openPage);
    } else {
        showPages(1); // Default to page 1 if no parameter is provided
    }
});

// document.addEventListener('DOMContentLoaded', () => {
//     showPages(1); // Show the first page initially

//     // Add event listener to the submit button
//     const submitButton = document.getElementById('submit');
//     submitButton.addEventListener('click', (event) => {
//         event.preventDefault(); // Prevent the form from submitting immediately
//         alert('Form Submitted Successfully!');
//     });
// });
