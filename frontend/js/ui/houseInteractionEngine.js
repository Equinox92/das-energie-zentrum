// [3.9.1]
// Imports centralized house interaction data.
import { houseZones } from "../data/houseZones.js";

// [3.9.2]
// Imports centralized application state.
import { energyState } from "../core/energyState.js";

// [3.9.3]
// Imports scalable relationship engine.
import {
    calculateEnergyScore,
    generateRecommendations
} from "../core/energyRelationshipEngine.js";

// [3.9.4]
// Imports SVG visualization renderer.
import {
    renderInstalledSystems
} from "./visualSystemRenderer.js";

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

                // [3.9.17]
                // Activates roof upgrade system.
                if (zoneKey === "roof") {

                    energyState.systems
                        .roofInsulation = true;
                }

                // [3.9.18]
                // Activates wall insulation system.
                if (zoneKey === "walls") {

                    energyState.systems
                        .wallInsulation = true;
                }

                // [3.9.19]
                // Activates efficient window system.
                if (zoneKey === "windows") {

                    energyState.systems
                        .efficientWindows = true;
                }

                // [3.9.20]
                // Calculates dynamic efficiency score.
                const score =
                    calculateEnergyScore();

                // [3.9.21]
                // Generates recommendation output.
                const recommendations =
                    generateRecommendations();

                // [3.9.22]
                // Updates dashboard score dynamically.
                document.getElementById(
                    "energy-score"
                ).textContent =
                    `Efficiency Score: ${score}`;

                // [3.9.23]
                // Updates recommendation output dynamically.
                document.getElementById(
                    "recommendation-list"
                ).innerHTML =
                    recommendations
                        .map(item =>
                            `<p>• ${item}</p>`
                        )
                        .join("");

                // [3.9.24]
                // Synchronizes SVG visualization state.
                renderInstalledSystems();

                // [3.9.25]
                // Outputs scalable debugging trace.
                console.log(
                    "Updated Energy State:",
                    energyState
                );
            }
        );
    });
}