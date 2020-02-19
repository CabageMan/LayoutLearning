'use strict';

document.getElementById('navbarMenuButton').addEventListener('click', function(event) {
    event.preventDefault();
    openMenu();
});

function openMenu() {
    let navBarMenu = document.getElementById('navbarMenu');
    navBarMenu.classList.toggle('navbar-menu-active');
}