document.addEventListener('DOMContentLoaded', function() {
    const vision = document.getElementById('vision');
    const mission = document.getElementById('mission');
    const value = document.getElementById('values');
    
    const elements = {
        vision,
        mission,
        values
    };

    function showElement(elementToShow) {
        for (const key in elements) {
            if (elements.hasOwnProperty(key)) {
                if (key === elementToShow) {
                    elements[key].classList.add('show');
                    elements[key].classList.remove('hide');
                } else {
                    elements[key].classList.remove('show');
                    elements[key].classList.add('hide');
                }
            }
        }
    }

    document.querySelector('.vision-first-circle').addEventListener('mouseover', function() {
        showElement('vision');
    });

    document.querySelector('.vision-second-circle').addEventListener('mouseover', function() {
        showElement('mission');
    });

    document.querySelector('.vision-third-circle').addEventListener('mouseover', function() {
        showElement('values');
    });
});
