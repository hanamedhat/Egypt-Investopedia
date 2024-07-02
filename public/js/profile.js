document.addEventListener('DOMContentLoaded', function() {
    const tasks = document.querySelectorAll('.tasks ul li');
    const progressFill = document.querySelector('.progress-fill');
    let completedTasks = 0;

    tasks.forEach(task => {
        if (task.classList.contains('complete')) {
            completedTasks++;
        }

        task.addEventListener('click', function() {
            task.classList.toggle('complete');
            task.classList.toggle('incomplete');
            updateProgress();
        });
    });

    function updateProgress() {
        completedTasks = document.querySelectorAll('.tasks ul li.complete').length;
        const progressPercentage = (completedTasks / tasks.length) * 100;
        progressFill.style.width = progressPercentage + '%';
    }

    updateProgress();
});
