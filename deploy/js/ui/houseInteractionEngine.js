// [3.9.1]
// Imports centralized house interaction data.
import { houseZones } from "../data/houseZones.js";

// [3.9.2]
// Imports centralized application state.
import { energyState } from "../core/energyState.js";


// [3.9.4]
// Imports SVG visualization renderer.
import {
    renderInstalledSystems
} from "./visualSystemRenderer.js";


//after system selection panel
import { openSystemSelectionPanel } from "./systemSelectionPanel.js";

// [6.4.13]
// Imports persistence synchronization layer.
import {
    saveEngineeringState
} from "../services/persistenceService.js";

// [3.9.5]
// Initializes scalable SVG interaction engine.
export function initializeHouseInteractions() {

    // [3.9.6]
    // Retrieves all interactive SVG zones.
    const interactiveZones =
        document.querySelectorAll(
            ".interactive-zone"
        );

    // [3.9.7]
    // Retrieves tooltip container.
    const tooltip =
        document.getElementById(
            "house-tooltip"
        );

    // [3.9.8]
    // Iterates through all interactive zones.
    interactiveZones.forEach(zone => {

        // [3.9.9]
        // Retrieves scalable zone identifier.
        const zoneKey =
            zone.dataset.zone;

        // [3.9.10]
        // Retrieves scalable zone metadata.
        const zoneData =
            houseZones[zoneKey];

        // ================================
        // HOVER INTERACTION
        // ================================

        // [3.9.11]
        // Activates hover interaction behavior.
        zone.addEventListener(
            "mouseenter",
            () => {

                // [3.9.12]
                // Updates tooltip dynamically.
                tooltip.innerHTML = `
                    <h3>${zoneData.title}</h3>
                    <p>${zoneData.description}</p>
                `;

                // [3.9.13]
                // Applies hover highlight styling.
                zone.style.opacity = "0.8";

                // =====================================================
// ENGINEERING PREVIEW VISUALIZATION
// =====================================================

// [5.5.1]
// Applies contextual engineering preview states.
applyEngineeringPreview(
    zoneKey
);
            }

            
        );

        // [3.9.14]
        // Removes hover styling on mouse leave.
        zone.addEventListener(
            "mouseleave",
            () => {

                // [3.9.15]
                // Restores original opacity.
                zone.style.opacity = "1";

                // [5.5.7]
// Clears contextual engineering previews safely.
renderInstalledSystems();

// [6.4.14]
// Persists updated engineering state.
saveEngineeringState(
    energyState
);
            }
        );

        // ================================
        // CLICK INTERACTION
        // ================================

        // [3.9.16]
        // Activates scalable click interaction system.
        zone.addEventListener(
            "click",
            () => {

                openSystemSelectionPanel(
                     zoneKey
                );

            

                // [3.9.25]
                // Outputs scalable debugging trace.
                console.log(
                    "Updated Energy State:",
                    energyState
                );

                const wrapper =
    document.querySelector(
        ".interactive-house-wrapper"
    );

if (wrapper) {

    wrapper.classList.add(
        "active"
    );

const configurationPanel =
    document.getElementById(
        "configuration-panel"
    );

if (configurationPanel) {

    configurationPanel.classList.add(
        "active"
    );
}
}
            }
        );
    });
}

// [5.5.2]
// Creates contextual engineering preview visualization.
function applyEngineeringPreview(
    zoneKey
) {

    // [5.5.3]
    // Retrieves all SVG interaction zones.
    const roofZone =
        document.querySelector(
            '[data-zone="roof"]'
        );

    const wallZone =
        document.querySelector(
            '[data-zone="walls"]'
        );

    const windowZone =
        document.querySelector(
            '[data-zone="windows"]'
        );

    // =====================================================
    // ROOF PREVIEW INTELLIGENCE
    // =====================================================

    // [5.5.4]
    // Highlights related building envelope systems.
    if (zoneKey === "roof") {

        [
            wallZone,
            windowZone
        ].forEach(zone => {

            if (!zone) return;

            zone.style.filter =
                "drop-shadow(0 0 8px rgba(0,180,255,0.55))";
        });
    }

    // =====================================================
    // WALL PREVIEW INTELLIGENCE
    // =====================================================

    // [5.5.5]
    // Highlights thermal relationship systems.
    if (zoneKey === "walls") {

        [
            roofZone,
            windowZone
        ].forEach(zone => {

            if (!zone) return;

            zone.style.filter =
                "drop-shadow(0 0 8px rgba(0,255,180,0.45))";
        });
    }

    // =====================================================
    // WINDOW PREVIEW INTELLIGENCE
    // =====================================================

    // [5.5.6]
    // Highlights envelope optimization systems.
    if (zoneKey === "windows") {

        [
            roofZone,
            wallZone
        ].forEach(zone => {

            if (!zone) return;

            zone.style.filter =
                "drop-shadow(0 0 8px rgba(255,255,255,0.55))";
        });
    }
}