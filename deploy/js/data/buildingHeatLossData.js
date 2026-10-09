// =====================================================
// [18.1.1]
// BUILDING HEAT-LOSS DATA
// =====================================================
//
// Defines the modeled heat-loss distribution used by
// the contextual building-analysis system.
//
// This module contains domain knowledge/data only.
//
// It does NOT:
// - manipulate the DOM
// - handle user interaction
// - calculate assessment scores
// - modify application state
// - render SVG/UI
// - install engineering systems
//
// The values represent modeled heat-loss opportunity
// shares and must NOT be interpreted as universal
// building-specific measurements.
//
// Future building-specific assessment data can replace
// or refine these baseline values.
// =====================================================


// =====================================================
// [18.1.2]
// HEAT-LOSS COMPONENT DEFINITIONS
// =====================================================
//
// The percentages represent the modeled distribution
// supplied for the Das Energie Zentrum building-analysis
// concept:
//
// Exterior walls      → 40%
// Windows / doors     → 25%
// Roof                → 15%
// Basement            → 10%
// Floor / ceiling     → 10%
//
// Total               → 100%
//
// The model intentionally remains independent from the
// current SVG implementation.
//
// The current SVG exposes only:
// - roof
// - walls
// - windows
//
// Basement and floor/ceiling are therefore represented
// in the domain model before becoming visual interaction
// zones.
// =====================================================

export const buildingHeatLossData = {

    // =================================================
    // [18.1.3]
    // EXTERIOR WALLS
    // =================================================

    walls: {

        id: "walls",

        name: "Exterior Walls",

        heatLossShare: 40,

        unit: "percent",

        priority: "very-high",

        description:
            "Exterior walls represent the largest modeled share of heat-loss opportunity in the building envelope.",

        renovationOpportunities: [

            "External wall insulation",

            "Internal wall insulation",

            "Thermal facade optimization"

        ]

    },


    // =================================================
    // [18.1.4]
    // WINDOWS AND DOORS
    // =================================================

    windows: {

        id: "windows",

        name: "Windows / Doors",

        heatLossShare: 25,

        unit: "percent",

        priority: "high",

        description:
            "Windows and doors represent a significant modeled share of heat-loss opportunity through glazing, frames and openings.",

        renovationOpportunities: [

            "High-performance glazing",

            "Triple-glazed windows",

            "Door and opening efficiency improvements"

        ]

    },


    // =================================================
    // [18.1.5]
    // ROOF
    // =================================================

    roof: {

        id: "roof",

        name: "Roof",

        heatLossShare: 15,

        unit: "percent",

        priority: "medium",

        description:
            "The roof represents a modeled heat-loss opportunity within the upper building envelope.",

        renovationOpportunities: [

            "Roof insulation",

            "Roof envelope optimization",

            "Solar energy integration"

        ]

    },


    // =================================================
    // [18.1.6]
    // BASEMENT
    // =================================================

    basement: {

        id: "basement",

        name: "Basement",

        heatLossShare: 10,

        unit: "percent",

        priority: "medium",

        description:
            "The basement represents a modeled heat-loss opportunity associated with the lower building envelope.",

        renovationOpportunities: [

            "Basement ceiling insulation",

            "Basement wall insulation",

            "Lower-envelope thermal optimization"

        ]

    },


    // =================================================
    // [18.1.7]
    // FLOOR / CEILING SLAB
    // =================================================

    floorCeiling: {

        id: "floor-ceiling",

        name: "Floor / Ceiling Slab",

        heatLossShare: 10,

        unit: "percent",

        priority: "medium",

        description:
            "Floor and ceiling slabs represent a modeled heat-loss opportunity associated with internal and lower/upper separating building elements.",

        renovationOpportunities: [

            "Floor insulation",

            "Ceiling insulation",

            "Thermal bridge mitigation"

        ]

    }

};


// =====================================================
// [18.1.8]
// TOTAL MODELED HEAT-LOSS SHARE
// =====================================================
//
// Provides the expected baseline total.
//
// This is a domain-data integrity value rather than an
// energy assessment score.
// =====================================================

export const totalModeledHeatLossShare = 100;