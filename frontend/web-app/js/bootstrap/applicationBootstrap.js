// =====================================================
// [12.6.15]
// APPLICATION BOOTSTRAP
// =====================================================
// =====================================================
// [12.6.15.1]
// Imports UI initialization.
// =====================================================

import {

    initializeApplicationUI

}

from "../core/applicationBootstrap.js";

// =====================================================
// [12.6.15.2]
// Starts the application.
// =====================================================

export async function initializeApplication() {

    await initializeApplicationUI();

}