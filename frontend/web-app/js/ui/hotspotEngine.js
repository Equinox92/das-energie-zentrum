import {
    hotspotData
}
from "../data/hotspotData.js";

import {
    updateServicePanel
}
from "./servicePanel.js";

export function initializeHotspots() {



console.log(
    "HOTSPOTS RUNNING"
);

    const container =
        document.getElementById(
            "energy-house-container"
        );

    if (!container) {

        return;
    }

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

element.addEventListener(
    "click",
    () => {

        updateServicePanel(
            hotspot
        );
    }
);

                        console.log(
                "Creating hotspot:",
                hotspot.title
            );



            // =====================================================
// [9.6.7]
// Displays custom tooltip.
// =====================================================

element.addEventListener(
    "mouseenter",
    event => {

        if (!tooltip) {

            return;
        }

        console.log(
    "Tooltip Showing:",
    hotspot.title
);

        tooltip.style.display =
            "block";

        tooltip.innerHTML =
            `
            <h4>
                ${hotspot.title}
            </h4>

            <p>
                ${hotspot.description}
            </p>
            `;

    
tooltip.style.left =
    `${event.clientX + 15}px`;

tooltip.style.top =
    `${event.clientY + 15}px`;
    }
);

// =====================================================
// [9.6.8]
// Updates tooltip position dynamically.
// =====================================================

element.addEventListener(
    "mousemove",
    event => {

        if (!tooltip) {

            return;
        }

tooltip.style.left =
    `${event.clientX + 15}px`;

tooltip.style.top =
    `${event.clientY + 15}px`;
    }
);

// =====================================================
// [9.6.9]
// Hides tooltip safely.
// =====================================================

element.addEventListener(
    "mouseleave",
    () => {

        if (!tooltip) {

            return;
        }

                tooltip.style.display =
            "none";

        console.log(
    "Tooltip Hidden:",
    hotspot.title
);

console.log(
    "Mouse Leave Triggered"
);
    }
);

            element.style.top =
                hotspot.top;

            element.style.left =
                hotspot.left;


            container.appendChild(
                element
            );
        }
    );
}