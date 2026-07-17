// =====================================================
// [9.6.5]
// LANDING PAGE HOTSPOT CONFIGURATION
// =====================================================

// [9.6.6]
// Defines all interactive landing page hotspots.
//
// Purpose:
//
// - Provides hotspot positioning.
// - Provides tooltip titles.
// - Provides tooltip descriptions.
// - Supports future information panels.
// - Supports future service pages.
// - Supports future 3D migration.
//
// Architecture:
//
// Landing Page
//      ↓
// Hotspot Data
//      ↓
// Tooltip Engine
//      ↓
// Information Panel
//      ↓
// Service Conversion Funnel
//
// Future Expansion:
//
// servicePage
// icon
// image
// video
// consultationCategory
//
// can all be added without changing
// the hotspot engine itself.
// =====================================================

// =====================================================
// [9.7.16]
// Imports service information panel controller.
// =====================================================

export const hotspotData = [

    // =====================================================
    // [9.6.7]
    // Roof Systems Hotspot
    // =====================================================

    {

        id:
            "roof",

        title:
            "Roof Systems",

        description:
            "Energy audits, roof insulation assessments and thermal optimization solutions.",
        
        services:
            [
                "Energy Audit",
                "Roof Insulation Assessment",
                "Thermal Optimization"
            ],
            
        top:
            "18%",

        left:
            "50%"
    },

    // =====================================================
    // [9.6.8]
    // Solar Systems Hotspot
    // =====================================================

    {

        id:
            "solar",

        title:
            "Solar Energy",

        description:
            "Photovoltaic systems, battery storage integration and renewable energy consulting.",

                services:
                 [
        "Solar PV Design",
        "Battery Storage",
        "Energy Yield Analysis"
    ],

        top:
            "25%",

        left:
            "65%"
    },

    // =====================================================
    // [9.6.9]
    // Window Efficiency Hotspot
    // =====================================================

    {

        id:
            "windows",

        title:
            "High Performance Windows",

        description:
            "Window performance assessments, glazing upgrades and heat-loss reduction strategies.",

services: 
[
    "Window Performance Assessment",
    "Glazing Upgrade Analysis",
    "Heat Loss Reduction Planning"
],
        top:
            "45%",

        left:
            "72%"
    },

    // =====================================================
    // [9.6.10]
    // Wall Insulation Hotspot
    // =====================================================

    {

        id:
            "walls",

        title:
            "Wall Insulation",

        description:
            "Thermal envelope optimization, insulation analysis and building efficiency improvements.",
        
        services: [
            "Thermal Envelope Optimization",
            "Insulation Analysis",
            "Building Efficiency Improvements"
        ],

        top:
            "52%",

        left:
            "30%"
    },

    // =====================================================
    // [9.6.11]
    // Building Services Hotspot
    // =====================================================

    {

        id:
            "services",

        title:
            "Building Services",

        description:
            "Heating, ventilation, energy planning and integrated building performance consulting.",

            services: 
            [
    "Heating System Analysis",
    "Ventilation Optimization",
    "Energy Planning",
    "Integrated Building Performance"
],

        top:
            "70%",

        left:
            "50%"
    }
];