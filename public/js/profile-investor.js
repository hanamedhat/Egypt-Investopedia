document.addEventListener('DOMContentLoaded', () => {
    // Assuming you have the investor's data in a JSON object
    const investorData = {
        wantedAmount: "100000",
        industries: "Technology, Finance",
        riskTolerance: "Medium",
        profBackground: "15 years in software development",
        areaOfExpertise: "Full-stack development",
        roiExpectations: "15-20%",
        ROI: "Variable ROI",
        investmentHorizon: "3-5 years",
        involvementLevel: "Advisory",
        additionalValue: "Industry connections, strategic advice",
        comments: "Looking forward to exciting opportunities",
        investmentType: "Equity",
        preference: "Belief in long-term growth potential"
    };

    // Fill the profile sections with data
    document.getElementById('wantedAmount').textContent = investorData.wantedAmount;
    document.getElementById('industries').textContent = investorData.industries;
    document.getElementById('riskTolerance').textContent = investorData.riskTolerance;
    document.getElementById('profBackground').textContent = investorData.profBackground;
    document.getElementById('areaOfExpertise').textContent = investorData.areaOfExpertise;
    document.getElementById('roiExpectations').textContent = investorData.roiExpectations;
    document.getElementById('ROI').textContent = investorData.ROI;
    document.getElementById('investmentHorizon').textContent = investorData.investmentHorizon;
    document.getElementById('involvementLevel').textContent = investorData.involvementLevel;
    document.getElementById('additionalValue').textContent = investorData.additionalValue;
    document.getElementById('comments').textContent = investorData.comments;
    document.getElementById('investmentType').textContent = investorData.investmentType;
    document.getElementById('preference').textContent = investorData.preference;

    // Assuming you have the projects data in a JSON array
    const projects = [
        {
            name: "Tech Startup 1",
            image: "tech_startup1_image_url",
            investmentAmount: "50000",
            percentage: "5",
            id: "startup1"
        },
        {
            name: "Finance Startup 2",
            image: "finance_startup2_image_url",
            investmentAmount: "25000",
            percentage: "10",
            id: "startup2"
        }
    ];

    const projectsContainer = document.querySelector('.investor-projects');

    projects.forEach(project => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src="${project.image}" class="card-img-top" alt="Project Image">
            <div class="card-body">
                <h5 class="card-title">${project.name}</h5>
                <p class="card-text"><strong>Investment Amount:</strong> $${project.investmentAmount}</p>
                <p class="card-text"><strong>Investment Percentage:</strong> ${project.percentage}%</p>
                <button class="btn btn-primary" onclick="viewStartup('${project.id}')">View Startup</button>
            </div>
        `;

        projectsContainer.appendChild(card);
    });
});

// Function to handle "View Startup" button click
function viewStartup(startupId) {
    // Logic to display startup details
    alert('Viewing details for startup ID: ' + startupId);
}
