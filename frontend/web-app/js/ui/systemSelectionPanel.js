// [4.2.1]
// Imports configurable system catalog.
import { systemOptions } from "../data/systemOptions.js";


// [4.2.2]
// Imports centralized energy state.
import { energyState } from "../core/energyState.js";

// [6.9.1]
// Imports scalable engineering installation engine.
import {
    installSystem,
    removeSystem
} from "../core/systemInstallationEngine.js";

// Imports live dashboard synchronization. [4.2.18]
import {
    updateEnergyDashboard
} from "./dashboardSynchronizer.js";

// [7.2.11]
// Imports engineering visualization renderer.
import {
    renderInstalledSystems
}
from "./visualSystemRenderer.js";
// [4.2.3]
// Creates scalable floating system selection panel.
export function openSystemSelectionPanel(
    zoneKey
) {

    // [4.2.4]
    // Removes previous floating panel safely.
    const existingPanel =
        document.getElementById(
            "system-selection-panel"
        );

    if (existingPanel) {

        existingPanel.remove();
    }

   // [4.2.5]
// Retrieves embedded configuration container.
const configurationOptions =
    document.getElementById(
        "configuration-options"
    );

// [4.2.6]
// Prevents rendering if container is unavailable.
if (!configurationOptions) {

    console.warn(
        "Configuration container missing."
    );

    return;
}

// [4.2.7]
// Retrieves zone-specific systems.
const options =
    systemOptions[zoneKey];

// [4.2.8]
// Renders embedded contextual configuration UI.
configurationOptions.innerHTML = `

    <h3>
        Configure ${zoneKey}
    </h3>

    <select "system-selector">

        ${options.map(option => `

            <option value="${option.id}">
                ${option.name}
            </option>

        `).join("")}

    </select>

    <div class="configuration-actions">

        <button "apply-system-button">
            Apply System
        </button>

        <button "remove-system-button">
            Remove System
        </button>

    </div>
`;

    // [4.2.11]
    // Handles scalable installation logic.
// [6.9.2]
// Handles scalable engineering installation logic.
document.getElementById(
    "apply-system-button"
).addEventListener(
    "click",
    () => {

        // [6.9.3]
        // Retrieves selected system identifier.
        const selectedSystemId =
            document.getElementById(
                "system-selector"
            ).value;
            

        // [6.9.4]
        // Retrieves full engineering system definition.
        const selectedSystem =
            options.find(
                option =>
                    option.id ===
                    selectedSystemId
            );

        // [6.9.5]
        // Prevents invalid engineering installs.
        if (!selectedSystem) {

            console.warn(
                "Invalid engineering system."
            );

            return;
        }

        // [6.9.6]
        // Installs engineering system safely.
        installSystem(
            zoneKey,
            selectedSystem
        );

        // [6.9.7]
        // Synchronizes dashboard intelligence.
        updateEnergyDashboard();
    }
);

    // [4.2.15]
    // Handles scalable removal logic.
// [6.9.8]
// Handles scalable engineering removal logic.
document.getElementById(
    "remove-system-button"
).addEventListener(
    "click",
    () => {

        // [6.9.9]
        // Retrieves selected engineering system.
        const selectedSystemId =
            document.getElementById(
                "system-selector"
            ).value;

        // [6.9.10]
        // Removes engineering system safely.
        removeSystem(
            zoneKey,
            selectedSystemId
        );

        // [6.9.11]
        // Synchronizes dashboard intelligence.
        updateEnergyDashboard();

         // [10.2.6]
        // Synchronizes SVG engineering visualization.
        renderInstalledSystems();
    }
);
}