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
}