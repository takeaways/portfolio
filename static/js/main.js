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
    //Navbar toggle button for screen
    const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
    navbarToggleBtn.addEventListener('click', () => {
        navbarMenu.classList.toggle('open')
    })

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
    });

    //Projects
    const workBtnContainer = document.querySelector('.work__categories');
    const projectContainer = document.querySelector('.work__projects');
    const projects = document.querySelectorAll('.project');
    workBtnContainer.addEventListener('click', (e) => {
        const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
        if (filter == null) {
            return;
        }

        const active = document.querySelector('.category__btn.selected');
        if (active) {
            active.classList.remove('selected');
            e.target.classList.add('selected');
        }
        projectContainer.classList.add('anim-out');

        setTimeout(() => {
            projects.forEach(p => {
                if (filter === "*" || filter === p.dataset.type) {
                    p.classList.remove('invisible');
                } else {
                    p.classList.add('invisible')
                }
            });
            projectContainer.classList.remove('anim-out');
        }, 300)
    })
















    // __Inner Function__
    function _scrollIntoView(selector) {
        const scrollTo = document.querySelector(selector);
        scrollTo.scrollIntoView({ behavior: 'smooth' });
    }


})();
