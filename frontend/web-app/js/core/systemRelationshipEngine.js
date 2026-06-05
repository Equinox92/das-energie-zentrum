// =====================================================
// [11.1.1]
// ENGINEERING RELATIONSHIP INTELLIGENCE ENGINE
// =====================================================

// [11.1.2]
// Imports centralized runtime engineering state.
import {
    energyState
}
from "./energyState.js";

// =====================================================
// RELATIONSHIP EVALUATION ENGINE
// =====================================================

// [11.1.3]
// Calculates dynamic engineering relationship bonuses.
export function calculateRelationshipBonus() {

    // [11.1.4]
    // Initializes scalable relationship accumulator.
    let relationshipBonus = 0;

    // =====================================================
    // ROOF ENGINEERING SYSTEMS
    // =====================================================

    // [11.1.5]
    // Retrieves installed roof systems safely.
    const roofSystems =
        energyState.roof
            ?.installedSystems || [];

    // [11.1.6]
    // Retrieves installed wall systems safely.
    const wallSystems =
        energyState.walls
            ?.installedSystems || [];

    // [11.1.7]
    // Retrieves installed window systems safely.
    const windowSystems =
        energyState.windows
            ?.installedSystems || [];

    // =====================================================
    // SOLAR + INSULATION BONUS
    // =====================================================

    // [11.1.8]
    // Detects installed solar systems.
    const hasSolar =
        roofSystems.some(
            system =>
                system.category ===
                "solar"
        );

    // [11.1.9]
    // Detects installed thermal systems.
    const hasInsulation =
        wallSystems.some(
            system =>
                system.category ===
                "insulation"
        );

    // [11.1.10]
    // Applies integrated energy optimization bonus.
    if (
        hasSolar &&
        hasInsulation
    ) {

        relationshipBonus += 15;
    }

    // =====================================================
    // WINDOW + INSULATION BONUS
    // =====================================================

    // [11.1.11]
    // Detects efficient window systems.
    const hasEfficientWindows =
        windowSystems.some(
            system =>
                system.category ===
                "windows"
        );

    // [11.1.12]
    // Applies thermal envelope optimization bonus.
    if (
        hasEfficientWindows &&
        hasInsulation
    ) {

        relationshipBonus += 10;
    }

    // =====================================================
    // RETURNS FINAL RELATIONSHIP BONUS
    // =====================================================

    // [11.1.13]
    // Returns scalable relationship score.
    return relationshipBonus;
}