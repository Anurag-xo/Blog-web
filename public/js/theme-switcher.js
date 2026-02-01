const themeSwitcher = document.getElementById('theme-toggle');
const body = document.body;
const moonIcon = '<i class="fas fa-moon"></i>';
const sunIcon = '<i class="fas fa-sun"></i>';

const setTheme = (theme) => {
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        themeSwitcher.innerHTML = sunIcon;
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        themeSwitcher.innerHTML = moonIcon;
        localStorage.setItem('theme', 'light');
    }
};

themeSwitcher.addEventListener('click', () => {
    const isDarkMode = body.classList.contains('dark-mode');
    setTheme(isDarkMode ? 'light' : 'dark');
});

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
});
