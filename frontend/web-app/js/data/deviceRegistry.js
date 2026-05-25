// [6.1.1]
// Defines centralized intelligent device registry.
export const deviceRegistry = {

    // =====================================================
    // SOLAR ENERGY SYSTEMS
    // =====================================================

    solarPanels: {

        id: "solarPanels",

        category: "renewable",

        name: "Solar PV System",

        zones: ["roof"],

        score: 35,

        energyProduction: true,

        compatibleWith: [
            "batteryStorage",
            "heatPump"
        ]
    },

    // =====================================================
    // THERMAL ENVELOPE SYSTEMS
    // =====================================================

    wallInsulation: {

        id: "wallInsulation",

        category: "thermal-envelope",

        name: "Wall Insulation",

        zones: ["walls"],

        score: 20,

        heatRetention: true,

        compatibleWith: [
            "heatPump",
            "underfloorHeating"
        ]
    },

    roofInsulation: {

        id: "roofInsulation",

        category: "thermal-envelope",

        name: "Roof Insulation",

        zones: ["roof"],

        score: 20,

        heatRetention: true,

        compatibleWith: [
            "heatPump"
        ]
    },

    efficientWindows: {

        id: "efficientWindows",

        category: "thermal-envelope",

        name: "Efficient Windows",

        zones: ["windows"],

        score: 15,

        heatRetention: true
    },

    // =====================================================
    // HVAC SYSTEMS
    // =====================================================

    heatPump: {

        id: "heatPump",

        category: "hvac",

        name: "Air Source Heat Pump",

        zones: [
            "roof",
            "walls"
        ],

        score: 45,

        heatingSystem: true,

        requires: [
            "wallInsulation",
            "roofInsulation"
        ]
    },

    underfloorHeating: {

        id: "underfloorHeating",

        category: "heating",

        name: "Underfloor Heating",

        zones: [
            "walls"
        ],

        score: 30,

        heatingDistribution: true,

        compatibleWith: [
            "heatPump"
        ]
    },

    wallHungBoiler: {

        id: "wallHungBoiler",

        category: "heating",

        name: "Wall Hung Boiler",

        zones: [
            "walls"
        ],

        score: 25,

        heatingSystem: true
    },

    // =====================================================
    // STORAGE SYSTEMS
    // =====================================================

    batteryStorage: {

        id: "batteryStorage",

        category: "storage",

        name: "Battery Storage",

        zones: [
            "roof"
        ],

        score: 28,

        storageSystem: true,

        requires: [
            "solarPanels"
        ]
    }
};