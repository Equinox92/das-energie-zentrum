// =====================================================
// [6.2.1]
// CENTRALIZED ENGINEERING RELATIONSHIP ENGINE
// =====================================================

// [6.2.2]
// Imports centralized runtime state.
import {
    energyState
} from "./energyState.js";

// [6.2.3]
// Calculates advanced engineering relationship score.
export function calculateRelationshipBonus() {

    // [6.2.4]
    // Prevents invalid runtime access.
    if (
        !energyState.installedSystems
    ) {

        return 0;
    }

    // [6.2.5]
    // Retrieves installed engineering systems.
    const installedSystems =
        energyState.installedSystems;

    // [6.2.6]
    // Initializes scalable relationship score.
    let relationshipScore = 0;

    // =====================================================
    // HEAT RETENTION RELATIONSHIPS
    // =====================================================

    // [6.2.7]
    // Detects optimized thermal envelope.
    const optimizedEnvelope =

        installedSystems.roof &&
        installedSystems.walls &&
        installedSystems.windows;

    // [6.2.8]
    // Applies thermal envelope bonus.
    if (optimizedEnvelope) {

        relationshipScore += 25;
    }

    // =====================================================
    // SOLAR OPTIMIZATION RELATIONSHIPS
    // =====================================================

    // [6.2.9]
    // Detects premium solar configuration.
    const premiumSolarInstalled =

        installedSystems.roof?.id ===
        "solar-premium";

    // [6.2.10]
    // Applies premium solar bonus.
    if (premiumSolarInstalled) {

        relationshipScore += 15;
    }

    // =====================================================
    // THERMAL LOSS PENALTIES
    // =====================================================

    // [6.2.11]
    // Detects poor thermal protection state.
    const thermalLossDetected =

        installedSystems.roof &&
        !installedSystems.windows;

    // [6.2.12]
    // Applies thermal inefficiency penalty.
    if (thermalLossDetected) {

        relationshipScore -= 12;
    }

    // =====================================================
    // FUTURE HVAC RELATIONSHIPS
    // =====================================================

    // [6.2.13]
    // Reserved for future heat pump optimization.
    /*
    Example:

    Heat Pump
    +
    Underfloor Heating
    =
    Relationship bonus
    */

    // [6.2.14]
    // Outputs scalable relationship diagnostics.
    console.log(
        "Relationship Score:",
        relationshipScore
    );

    // [6.2.15]
    // Returns calculated relationship score.
    return relationshipScore;
}