'use strict';

document.getElementById('navbarMenuButton').addEventListener('click', function(event) {
    event.preventDefault();
    openMenu();
});

function openMenu() {
    let navBarMenu = document.getElementById('navbarMenu');
    let menuButtonImage = document.getElementById('menuButtonImage')
    
    navBarMenu.classList.toggle('navbar-menu-shown');
    menuButtonImage.src = navBarMenu.classList.contains('navbar-menu-shown') ? '/assets/images/icons/CrossIcon.svg' : '/assets/images/icons/MenuIcon.svg';
}