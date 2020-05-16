'use strict';
(() => {

    //Make navbar transparent when it is on the top
    const navbar = document.querySelector('#navbar');
    const navbarHeight = navbar.getBoundingClientRect().height;
    document.addEventListener('scroll', () => {
        if (window.scrollY > navbarHeight) {
            navbar.classList.add('navbar--dark');
        } else {
            navbar.classList.remove('navbar--dark');
        }
    });


    //Handle scrolling when tapping on the navbar menu
    const navbarMenu = document.querySelector('.navbar__menu');
    navbarMenu.addEventListener('click', (e) => {
        const target = e.target;
        const link = target.dataset.link;
        if (link == null) {
            return
        }
        _scrollIntoView(link)
    });

    // Handle clicl on "contact me" button on home
    const contactBtn = document.querySelector('.home__contact');
    contactBtn.addEventListener('click', () => {
        _scrollIntoView("#contact")
    });

    // Make home slowly fade to transparent as the window scrolls down
    const home = document.querySelector(".home__container");
    const homeHeight = home.getBoundingClientRect().height
    document.addEventListener('scroll', () => {
        const op = 1 - window.scrollY / homeHeight;
        home.style.opacity = op;
    });

    // Show "arrow up" button when scrolling down
    const arrowUp = document.querySelector('.arrow-up');
    document.addEventListener('scroll', () => {
        if (window.scrollY > homeHeight / 2) {
            arrowUp.classList.add('visible')
        } else {
            arrowUp.classList.remove('visible')
        }
    });
    arrowUp.addEventListener('click', () => {
        _scrollIntoView("#home")
    })















    // __Inner Function__
    function _scrollIntoView(selector) {
        const scrollTo = document.querySelector(selector);
        scrollTo.scrollIntoView({ behavior: 'smooth' });
    }


})();
