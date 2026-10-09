// =====================================================
// [17.2.1]
// CENTRALIZED BUILDING CONTEXT STATE
// =====================================================
//
// Stores the currently active building context.
//
// This module contains state only.
//
// It does NOT:
// - manipulate the DOM
// - handle user interaction
// - calculate energy scores
// - render UI
// - communicate with the backend
//
// Context resolution belongs to the building context
// service layer.
// =====================================================


// =====================================================
// [17.2.2]
// BUILDING CONTEXT STATE
// =====================================================
//
// The state starts without a selected building profile.
//
// A building context service will populate this state
// when the application determines the current building.
// =====================================================

export const buildingContextState = {

    buildingType: null,

    profile: null

};