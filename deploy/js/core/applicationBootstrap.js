// =====================================================
// [12.6.14.1]
// APPLICATION BOOTSTRAP
// =====================================================

// =====================================================
// [12.6.14.2]
// Imports SVG loading system.
// =====================================================

import {

    loadInteractiveHouse

}

from "../ui/houseLoader.js";

// =====================================================
// [12.6.14.3]
// Imports interaction controller.
// =====================================================

import {

    initializeHouseInteractions

}

from "../ui/houseInteractionEngine.js";

// =====================================================
// [12.6.14.4]
// Imports hotspot controller.
// =====================================================

import {

    initializeHotspots

}

from "../ui/hotspotEngine.js";

// =====================================================
// [12.6.14.5]
// Imports environmental controller.
// =====================================================

import {

    initializeEnvironmentControls

}

from "../ui/environmentController.js";

// =====================================================
// [12.6.14.6]
// Initializes core application UI.
// =====================================================

export async function initializeApplicationUI() {

    await loadInteractiveHouse();

    initializeHouseInteractions();

    initializeHotspots();

    initializeEnvironmentControls();

}