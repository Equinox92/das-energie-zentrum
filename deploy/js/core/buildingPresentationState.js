// =====================================================
// [18.4.1]
// CENTRALIZED BUILDING PRESENTATION STATE
// =====================================================
//
// Stores the currently resolved building presentation.
//
// This module contains state only.
//
// It does NOT:
// - resolve building profiles
// - calculate heat-loss values
// - calculate energy scores
// - manipulate the DOM
// - render SVG
// - handle user interaction
// - install engineering systems
//
// Presentation resolution belongs to the
// buildingPresentationResolver service.
// =====================================================


// =====================================================
// [18.4.2]
// BUILDING PRESENTATION STATE
// =====================================================
//
// The state begins without a resolved presentation.
//
// A presentation service will populate this state
// after the active building context has been resolved.
// =====================================================

export const buildingPresentationState = {

    presentation: null

};