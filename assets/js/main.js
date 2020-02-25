'use strict';

window.addEventListener('scroll', () => {
    document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
});

document.getElementById('navbarMenuButton').addEventListener('click', function(event) {
    event.preventDefault();
    openMenu();
});

document.getElementById('toTheTopButton').addEventListener('click', function(event) {
    event.preventDefault();
    scrollToTheTop();
});

function openMenu() {
    const body = document.body;
    let navBarMenu = document.getElementById('navbarMenu');
    let menuButtonImage = document.getElementById('menuButtonImage')
    
    navBarMenu.classList.toggle('navbar-menu-shown');

    if (navBarMenu.classList.contains('navbar-menu-shown')) {
        const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
        body.style.position = 'fixed';
        body.style.top = `-${scrollY}`;

        menuButtonImage.src = '/assets/images/icons/CrossIcon.svg';
    } else {
        const scrollY = body.style.top;
        body.style.position = '';
        body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);

        menuButtonImage.src = '/assets/images/icons/MenuIcon.svg';
    }
}

function scrollToTheTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}