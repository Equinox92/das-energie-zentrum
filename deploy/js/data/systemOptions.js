// [6.1.1]
// Defines enterprise engineering system catalog.
export const systemOptions = {

    // =====================================================
    // ROOF ENGINEERING SYSTEMS
    // =====================================================

    // [6.1.2]
    // Roof engineering systems.
    roof: [

        {
            id: "solar-pv-5kw",

            name:
                "Solar PV 5kW",

            category:
                "solar",

            score:
                20,

            energyClass:
                "A",

            installationDifficulty:
                "medium",

            compatibleWith: [
                "battery-storage",
                "heat-pump"
            ],

            visualizationType:
                "solar-array",

            thermalImpact:
                15,

            carbonReduction:
                22,

            estimatedSavings:
                18000,

            future3DModel:
                "solar_panel_array_5kw.glb"
        },

        {
            id: "roof-insulation-premium",

            name:
                "Premium Roof Insulation",

            category:
                "insulation",

            score:
                15,

            energyClass:
                "A+",

            installationDifficulty:
                "low",

            compatibleWith: [
                "solar",
                "heat-pump",
                "smart-climate"
            ],

            visualizationType:
                "thermal-layer",

            thermalImpact:
                35,

            carbonReduction:
                15,

            estimatedSavings:
                12000,

            future3DModel:
                "roof_insulation_system.glb"

                
        }

        
    ],

    // =====================================================
    // WALL ENGINEERING SYSTEMS
    // =====================================================

    // [6.1.3]
    // Wall engineering systems.
    walls: [

        {
            id: "thermal-wall-system",

            name:
                "Thermal Wall System",

            category:
                "insulation",

            score:
                30,

            energyClass:
                "A+",

            installationDifficulty:
                "medium",

            compatibleWith: [
                "underfloor-heating",
                "heat-pump"
            ],

            visualizationType:
                "thermal-shell",

            thermalImpact:
                40,

            carbonReduction:
                18,

            estimatedSavings:
                14000,

            future3DModel:
                "thermal_wall_system.glb"
        }
    ],

    // =====================================================
    // WINDOW ENGINEERING SYSTEMS
    // =====================================================

    // [6.1.4]
    // Window engineering systems.
    windows: [

        {
            id: "triple-glazed-window",

            name:
                "Triple Glazed Windows",

            category:
                "windows",

            score:
                25,

            energyClass:
                "A++",

            installationDifficulty:
                "medium",

            compatibleWith: [
                "thermal-wall-system"
            ],

            visualizationType:
                "glass-upgrade",

            thermalImpact:
                28,

            carbonReduction:
                12,

            estimatedSavings:
                9000,

            future3DModel:
                "triple_glazed_window.glb"
        }
    ]
};