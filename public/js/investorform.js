function nextPage(pageNumber) {
    document.querySelectorAll('.form-page').forEach(page => page.style.display = 'none');
    document.getElementById('page' + pageNumber).style.display = 'block';
    updateProgress(pageNumber);
    if (pageNumber === 6) {
        displaySummary();
    }
}

function prevPage(pageNumber) {
    document.querySelectorAll('.form-page').forEach(page => page.style.display = 'none');
    document.getElementById('page' + pageNumber).style.display = 'block';
    updateProgress(pageNumber);
}

function displaySummary() {
    const money = document.getElementById('money').value;
    const industrySelect = document.getElementById('industry');
    const risk = document.getElementById('risk').value;
    const background = document.getElementById('background').value;
    const area = document.getElementById('area').value;
    const ROI = document.getElementById('ROI').value;
    const fixed = document.getElementById('fixed').value;
    const horizon = document.getElementById('horizon').value;
    const invol = document.getElementById('invol').value;
    const value = document.getElementById('value').value;
    const comment = document.getElementById('comment').value;
    const type = document.querySelector('input[name="type"]:checked').value;
    const preferenceReason = document.getElementById('preferenceReason').value;

    const selectedIndustries = Array.from(industrySelect.selectedOptions).map(option => option.text);

    const summary = `
        <p><strong>1- Investment amount:</strong> ${money}</p>
        <p><strong>2- Industry:</strong>  ${selectedIndustries.join(', ')}</p>
        <p><strong>3- Risk tolerance:</strong> ${risk}</p>
        <p><strong>4- Professional background:</strong> ${background}</p>
        <p><strong>5- Area of expertise:</strong> ${area}</p>
        <p><strong>6- ROI expectations:</strong> ${ROI}</p>
        <p><strong>7- Fixed or variable ROI:</strong> ${fixed}</p>
        <p><strong>8- Investment horizon:</strong> ${horizon}</p>
        <p><strong>9- Level of involvement:</strong> ${invol}</p>
        <p><strong>10- Additional value:</strong> ${value}</p>
        <p><strong>11- Any additional comments:</strong> ${comment}</p>
        <p><strong>12- Type of investment:</strong> ${type}</p>
        <p><strong>Preference reason:</strong> ${preferenceReason}</p>
    `;
    document.getElementById('summary').innerHTML = summary;
}


function updateProgress(step) {
    const progressLine = document.querySelector('.progress-line');
    const steps = document.querySelectorAll('.progress-indicator .step');
    steps.forEach((stepElement, index) => {
        if (index < step - 1) {
            stepElement.classList.add('active');
        } else {
            stepElement.classList.remove('active');
        }
    });
    const percentage = ((step - 1) / (steps.length - 1)) * 100;
    progressLine.style.width = percentage + '%';
}


// document.getElementById('investmentForm').addEventListener('submit', function(e) {
//     e.preventDefault();
//     alert('Form submitted successfully!');
// });

// FAQ Collapsible Functionality
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    });
});

// Show Information Text
// function showInfo(infoId) {
//     const infoText = document.getElementById(infoId);
//     infoText.style.display = infoText.style.display === 'block' ? 'none' : 'block';
// }

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

$(document).ready(function() {
    $('#industry').select2();
});

