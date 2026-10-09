// =====================================================
// [10.6.8]
// MOBILE NAVIGATION CONTROLLER
// =====================================================

export function initializeNavbar() {

    const menuButton =
        document.getElementById(
            "mobile-menu-button"
        );

    const navbarLinks =
        document.querySelector(
            ".navbar-links"
        );

        const navbar =
    document.querySelector(
        ".floating-navbar"
    );

    /* =====================================================
   [14.6.3]
   NAVBAR SHRINK ON SCROLL
===================================================== */

function updateNavbarState() {

    if (!navbar) {

        return;

    }

    navbar.classList.toggle(

        "scrolled",

        window.scrollY > 40

    );

}

window.addEventListener(

    "scroll",

    updateNavbarState,

    {

        passive: true

    }

);

updateNavbarState();

/* =====================================================
   [14.6.4]
   ACTIVE NAVIGATION OBSERVER
===================================================== */

const navigationLinks =
    navbarLinks.querySelectorAll("a");

const observedSections =
    document.querySelectorAll("section[id]");

const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {

                    return;

                }

                navigationLinks.forEach(link => {

                    const active =

                        link.getAttribute("href") ===
                        `#${entry.target.id}`;

                    link.classList.toggle(
                        "active",
                        active
                    );

                });

            });

        },

{
    root: null,

    rootMargin:
        "-100px 0px -55% 0px",

    threshold:
        0
}

    );

observedSections.forEach(section => {

    observer.observe(section);

});

    if (
        !menuButton ||
        !navbarLinks
    ) {

        return;
    }

    menuButton.addEventListener(
        "click",
        () => {

            navbarLinks.classList.toggle(
                "active"
            );
        }
    );
    
/*******************************************************
 [14.5.4]
 NAVBAR SCROLL EFFECT
********************************************************/



/*******************************************************
 [14.5.5]
 SMOOTH SCROLL
********************************************************/

const sections =
    document.querySelectorAll(
        "section[id]"
    );

navbarLinks
    .querySelectorAll("a")
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const href =
                    link.getAttribute("href");

                if (
                    !href ||
                    !href.startsWith("#")
                ) {

                    return;

                }

                event.preventDefault();

                const target =
                    document.querySelector(href);

                if (!target) {

                    return;

                }

                target.scrollIntoView({

                    behavior:
                        "smooth",

                    block:
                        "start"

                });

                navbarLinks.classList.remove(
    "active"
);

            }
        );

    });

/*******************************************************
 [14.5.6]
 ACTIVE LINK TRACKING
********************************************************/

/* =====================================================
   [14.6.1]
   ACTIVE NAVIGATION TRACKER
===================================================== */

    }

