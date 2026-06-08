import {
    initializeHotspots
}
from "./ui/hotspotEngine.js";

//10.6.5 - Added navbar initialization to landing page script.

import {
    initializeNavbar
}
from "./ui/navbarController.js";

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeHotspots();
//10.6.5 - Initializes navbar on landing page.
        initializeNavbar();

        console.log(
            "Landing page initialized."
        );
    }
);

