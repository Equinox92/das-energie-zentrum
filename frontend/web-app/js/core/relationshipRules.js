// =====================================================
// [7.1.1]
// CENTRALIZED ENGINEERING RELATIONSHIP RULES
// =====================================================

// [7.1.2]
// Defines scalable engineering relationship intelligence.
export const relationshipRules = [

    // =====================================================
    // SOLAR + INSULATION SYNERGY
    // =====================================================

    // [7.1.3]
    // Detects optimized solar thermal envelope.
    {
        systems: [
            "solar-pv-5kw",
            "thermal-wall-system"
        ],

        type:
            "positive",

        scoreImpact:
            15,

        message:
            "Solar and thermal insulation systems create strong energy synergy."
    },

    // =====================================================
    // WINDOW + WALL OPTIMIZATION
    // =====================================================

    // [7.1.4]
    // Detects optimized building envelope.
    {
        systems: [
            "thermal-wall-system",
            "triple-glazed-window"
        ],

        type:
            "positive",

        scoreImpact:
            20,

        message:
            "Thermal wall insulation and efficient glazing reduce heat loss significantly."
    },

    // =====================================================
    // MISSING WINDOW PENALTY
    // =====================================================

    // [7.1.5]
    // Detects thermal imbalance configuration.
    {
        systems: [
            "thermal-wall-system"
        ],

        requires: [
            "triple-glazed-window"
        ],

        type:
            "negative",

        scoreImpact:
            -10,

        message:
            "Thermal insulation without efficient windows may reduce optimization efficiency."
    }
];