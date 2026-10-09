// =====================================================
// [7.1.1]
// CENTRALIZED ENGINEERING RELATIONSHIP RULES
// =====================================================
//
// This module contains the centralized engineering
// relationship definitions used by:
//
// - Energy scoring
// - Recommendation generation
// - Building-context applicability
//
// IMPORTANT:
//
// Relationship rules describe relationships between
// installed systems.
//
// Positive relationships:
//      Required systems installed
//      ↓
//      Apply benefit
//
// Negative relationships:
//      Trigger systems installed
//      +
//      Required supporting system missing
//      ↓
//      Apply penalty / recommendation
// =====================================================


// =====================================================
// [7.1.2]
// ENGINEERING RELATIONSHIP COLLECTION
// =====================================================

export const relationshipRules = [

    // =====================================================
    // SOLAR + INSULATION SYNERGY
    // =====================================================

    // [7.1.3]
    // Detects beneficial interaction between solar
    // generation and thermal wall insulation.
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
    // Detects optimized thermal-envelope configuration
    // when both wall insulation and efficient glazing
    // are installed.
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
    // WALL INSULATION WITHOUT EFFICIENT WINDOWS
    // =====================================================

    // [7.1.5]
    // Detects a partially optimized thermal envelope.
    //
    // The wall system is the trigger.
    //
    // The efficient window system is the required
    // supporting system.
    //
    // Therefore this relationship becomes active ONLY
    // when:
    //
    // thermal-wall-system
    //      = installed
    //
    // AND
    //
    // triple-glazed-window
    //      = NOT installed
    //
    // This prevents the recommendation from appearing
    // when efficient windows are already installed.
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
            "Consider upgrading to energy efficient windows to complement the existing wall insulation."
    }

];