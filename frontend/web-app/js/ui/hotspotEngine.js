import {
    hotspotData
}
from "../data/hotspotData.js";

import {
    updateServicePanel
}
from "./servicePanel.js";

// =====================================================
// [15.2.1]
// Imports the centralized device detection system.
// =====================================================

import {
    getDeviceProfile
} from "../utils/deviceDetector.js";

export function initializeHotspots() {

    // =====================================================
    // [15.1.1]
    // Retrieves the hotspot rendering canvas.
    // =====================================================

    const imageCanvas =
        document.getElementById(
            "energy-house-canvas"
        );


    // =====================================================
    // [15.1.2]
    // Stops initialization when this page does not
    // contain the hotspot canvas.
    // =====================================================

    if (!imageCanvas) {

        console.info(
            "[HotspotEngine] No hotspot canvas found. " +
            "Initialization skipped."
        );

        return;
    }


    // =====================================================
    // [15.1.3]
    // Confirms that the hotspot engine has a valid
    // rendering target.
    // =====================================================

    console.log(
        "HOTSPOTS RUNNING"
    );


    // =====================================================
    // [15.1.4]
    // Retrieves the parent hotspot container.
    // =====================================================

    const container =
        document.getElementById(
            "energy-house-container"
        );


    // =====================================================
    // [15.1.5]
    // Stops initialization if the parent container
    // is unavailable.
    // =====================================================

    if (!container) {

        console.info(
            "[HotspotEngine] Hotspot container not found. " +
            "Initialization skipped."
        );

        return;
    }

    // =====================================================
// [15.2.1]
// Retrieves the centralized interaction profile.
// =====================================================

const deviceProfile =
    getDeviceProfile();


// =====================================================
// [15.2.2]
// Logs the interaction profile for diagnostics.
// =====================================================

console.log(
    "[HotspotEngine] Device profile:",
    deviceProfile
);

// =====================================================
// [15.2.1]
// Determines whether the current device should receive
// pointer-based hover interaction.
// =====================================================

const hoverEnabled =
    deviceProfile.hover;


// =====================================================
// [15.2.2]
// Determines whether the current device primarily uses
// touch interaction.
// =====================================================

const touchEnabled =
    deviceProfile.touch;


// =====================================================
// [15.2.3]
// Determines whether the current viewport is mobile.
// =====================================================

const mobileEnabled =
    deviceProfile.mobile;


// =====================================================
// [15.2.4]
// Determines whether the current viewport is tablet-sized.
// =====================================================

const tabletEnabled =
    deviceProfile.tablet;

    // =====================================================
// [15.3.1]
// Logs the resolved interaction capabilities.
// =====================================================

console.log(
    "[HotspotEngine] Interaction capabilities:",
    {
        hoverEnabled,
        touchEnabled,
        mobileEnabled,
        tabletEnabled
    }
);

    console.log(
        "Canvas:",
        imageCanvas
    );

    // =====================================================
// [9.6.6]
// Retrieves tooltip container safely.
// =====================================================

const tooltip =
    document.getElementById(
        "hotspot-tooltip"
    );

    hotspotData.forEach(
        hotspot => {

            // =====================================================
// [9.7.17]
// Updates information panel on click.
// =====================================================

            const element =
                document.createElement(
                    "div"
                );

            element.classList.add(
                "hotspot"
            );

            // =====================================================
// [15.9.1]
// Makes the hotspot keyboard focusable.
// =====================================================

element.setAttribute(
    "tabindex",
    "0"
);


// =====================================================
// [15.9.2]
// Identifies the hotspot as an interactive control.
// =====================================================

element.setAttribute(
    "role",
    "button"
);


// =====================================================
// [15.9.3]
// Provides an accessible name for screen readers.
// =====================================================

element.setAttribute(
    "aria-label",
    hotspot.title
);

          element.style.transition =

    "transform 0.25s ease, box-shadow 0.25s ease";  

            console.log(
    "Hotspot element created",
    element
);

element.addEventListener(
    "click",
    () => {

        updateServicePanel(
            hotspot
        );
    }
);

// =====================================================
// [15.10.1]
// Allows keyboard users to activate the hotspot using
// Enter or Space.
// =====================================================

element.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();

            updateServicePanel(
                hotspot
            );
        }
    }
);

// =====================================================
// [15.6.1]
// Registers touch feedback only on devices identified
// as touch-capable.
// =====================================================

if (touchEnabled) {

    element.addEventListener(
        "touchstart",
        () => {

            console.log(
                "[HotspotEngine] Touch Start:",
                hotspot.title
            );

            element.style.transform =
                "scale(1.18)";

            element.style.boxShadow =
                "0 0 18px rgba(0,79,113,.45)";
        },
        {
            passive: true
        }
    );


    // =====================================================
    // [15.6.2]
    // Restores the hotspot after the touch interaction.
    // =====================================================

    element.addEventListener(
        "touchend",
        () => {

            console.log(
                "[HotspotEngine] Touch End:",
                hotspot.title
            );

            element.style.transform =
                "scale(1)";

            element.style.boxShadow =
                "";
        }
    );
}

                        console.log(
                "Creating hotspot:",
                hotspot.title
            );



// =====================================================
// [9.6.7]
// Displays custom tooltip.
// =====================================================

// =====================================================
// [15.4.1]
// Registers hover interaction only when the device
// explicitly supports hover.
// =====================================================

if (hoverEnabled) {

    element.addEventListener(
        "mouseenter",
        () => {

            if (!tooltip) {

                return;
            }

            console.log(
                "Tooltip Showing:",
                hotspot.title
            );

            element.style.transform =
                "scale(1.18)";

            element.style.boxShadow =
                "0 0 18px rgba(0,79,113,.45)";
        }
    );


    // =====================================================
    // [15.4.2]
    // Restores the hotspot appearance when the pointer
    // leaves the interaction zone.
    // =====================================================

    element.addEventListener(
        "mouseleave",
        () => {

            if (!tooltip) {

                return;
            }

            element.style.transform =
                "scale(1)";

            element.style.boxShadow =
                "";

            console.log(
                "Tooltip Hidden:",
                hotspot.title
            );

            console.log(
                "Mouse Leave Triggered"
            );
        }
    );
}

// =====================================================
// [9.6.8]
// Updates tooltip position dynamically.
// =====================================================


            element.style.top =
                hotspot.top;

            element.style.left =
                hotspot.left;


imageCanvas.appendChild(
    element
);

console.log(
    "Hotspot appended:",
    hotspot.title,
    element.style.left,
    element.style.top
);

console.log(
    "Hotspot appended"
);
        }
    );
}