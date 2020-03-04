'use strict';

window.addEventListener('scroll', () => {
    document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
});

window.addEventListener('click', (event) => {
    if (!(event.target.id == 'navbarMenuButton' || event.target.id == 'menuButtonImage' || event.target.id == 'navbarMenu')) {
        let navBarMenu = document.getElementById('navbarMenu');
        if (navBarMenu.classList.contains('navbar-menu-shown')) {
            toggleMenu();
        }
    }
});

document.getElementById('showModalBtn').addEventListener('click', (event) => {
    event.preventDefault();
    toggleModalVisibility();
});

document.getElementById('joinUsButton').addEventListener('click', (event) => {
    event.preventDefault();
    toggleModalVisibility();
});

document.getElementById('modalCloseButton').addEventListener('click', (event) => {
    event.preventDefault();
    toggleModalVisibility();
});

document.getElementById('navbarMenuButton').addEventListener('click', (event) => {
    event.preventDefault();
    toggleMenu();
});

document.getElementById('toTheTopButton').addEventListener('click', (event) => {
    event.preventDefault();
    scrollToTheTop();
});

function toggleMenu() {
    let navBarMenu = document.getElementById('navbarMenu');
    let menuButtonImage = document.getElementById('menuButtonImage')

    if (navBarMenu.classList.contains('navbar-menu-shown')) {
        navBarMenu.classList.remove('navbar-menu-shown');
        menuButtonImage.src = '/assets/images/icons/MenuIcon.svg';
    } else {
        navBarMenu.classList.add('navbar-menu-shown');
        menuButtonImage.src = '/assets/images/icons/CrossIcon.svg';
    }
}

function toggleModalVisibility() {
    const body = document.body;
    let modalView = document.getElementById('modalWindow');
    if (modalView.classList.contains('modal-shown')) {
        const scrollY = body.style.top;
        body.style.position = '';
        body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
        modalView.classList.remove('modal-shown');
    } else {
        const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
        modalView.classList.add('modal-shown');
        body.style.position = 'fixed';
        body.style.top = `-${scrollY}`;
    }
}

function scrollToTheTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}