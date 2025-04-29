(function () {
    document.addEventListener('DOMContentLoaded', function () {
        const currentPath = document.location.href;
        const menuLinks = document.querySelectorAll('.menu li a');

        menuLinks.forEach(link => {
            if (link.href === currentPath){
                link.classList.add('active');
            }
        });
    });
})();
