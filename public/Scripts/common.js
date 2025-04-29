(function () {
    function logLoadTime() {
        const [navigationEntry] = performance.getEntriesByType('navigation');
        if (navigationEntry) {
            const loadTime = navigationEntry.loadEventEnd - navigationEntry.startTime;

            const footer = document.querySelector('footer');
            if (footer) {
                const statDiv = document.createElement('div');
                statDiv.textContent = `Время загрузки страницы: ${loadTime.toFixed(2)} мс`;
                footer.appendChild(statDiv);
            }
        }
    }
    window.addEventListener('load', () => setTimeout(logLoadTime, 0));
})();

