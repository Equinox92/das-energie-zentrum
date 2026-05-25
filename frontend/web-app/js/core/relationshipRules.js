// [5.1.1]
// Defines scalable engineering relationship intelligence.
export const relationshipRules = [

    // =====================================================
    // POSITIVE RELATIONSHIPS
    // =====================================================

    // [5.1.2]
    // Roof insulation improves heat pump efficiency.
    {
        systems: [
            "roofInsulation",
            "heatPump"
        ],

        type: "positive",

        scoreImpact: 15,

        message:
            "Roof insulation enhances heat pump efficiency."
    },

    // [5.1.3]
    // Efficient windows improve thermal retention.
    {
        systems: [
            "efficientWindows",
            "wallInsulation"
        ],

        type: "positive",

        scoreImpact: 10,

        message:
            "Efficient windows and insulated walls reduce heat loss."
    },

    // [5.1.4]
    // Solar combined with battery storage increases energy independence.
    {
        systems: [
            "solarPanels",
            "batteryStorage"
        ],

        type: "positive",

        scoreImpact: 20,

        message:
            "Solar panels combined with battery storage improve energy independence."
    },

    // =====================================================
    // NEGATIVE RELATIONSHIPS
    // =====================================================

    // [5.1.5]
    // Heat pumps underperform in inefficient buildings.
    {
        systems: [
            "heatPump"
        ],

        requires: [
            "roofInsulation",
            "wallInsulation"
        ],

        type: "negative",

        scoreImpact: -10,

        message:
            "Heat pump efficiency may be reduced due to insufficient insulation."
    }
];