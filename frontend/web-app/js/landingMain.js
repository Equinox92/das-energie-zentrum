import {
    initializeHotspots
}
from "./ui/hotspotEngine.js";

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeHotspots();

        console.log(
            "Landing page initialized."
        );
    }
);

