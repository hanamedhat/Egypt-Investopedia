document.getElementById('menu-toggle').addEventListener('click', function() {
    const linksContainer = document.querySelector('.links-container');
    const logoContainer = document.querySelector('.logo-container');
    linksContainer.classList.toggle('show');
    logoContainer.classList.toggle('active');
});
