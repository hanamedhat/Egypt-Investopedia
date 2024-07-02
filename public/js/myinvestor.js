// // scripts.js
// document.addEventListener('DOMContentLoaded', () => {
//     const investors = [
//         {
//             name: 'John Doe',
//             amount: '$50,000',
//             contact: 'john.doe@example.com',
//             notes: 'Looking forward to a successful partnership.'
//         },
//         {
//             name: 'Jane Smith',
//             amount: '$75,000',
//             contact: 'jane.smith@example.com',
//             notes: 'Excited to see where this collaboration will take us.'
//         }
//     ];

//     const investorsContainer = document.querySelector('.investors');

//     investors.forEach(investor => {
//         const investorDiv = document.createElement('div');
//         investorDiv.classList.add('investor');
//         investorDiv.innerHTML = `
//             <h2>Investor Name: ${investor.name}</h2>
//             <p><strong>Investment Amount:</strong> ${investor.amount}</p>
//             <p><strong>Contact Details:</strong> ${investor.contact}</p>
//             <p><strong>Notes:</strong> ${investor.notes}</p>
//         `;
//         investorsContainer.appendChild(investorDiv);
//     });
// });
