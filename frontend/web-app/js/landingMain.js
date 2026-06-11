import {
    initializeHotspots
}
from "./ui/hotspotEngine.js";

//10.6.5 - Added navbar initialization to landing page script.

import {
    initializeNavbar
}
from "./ui/navbarController.js";

import {
    initializeConsultationForm
}
from "./ui/consultationFormController.js";

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeHotspots();
//10.6.5 - Initializes navbar on landing page.
        initializeNavbar();

        //12.1.2 - Initializes consultation form on landing page.
        initializeConsultationForm();
        console.log(
            "Landing page initialized."
        );
    }
);

