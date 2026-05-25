// [4.3.1]
// Imports centralized runtime state.
import { energyState } from "./energyState.js";

// [5.8.6]
// Imports environmental simulation state.
import { environmentState }
from "./environmentState.js";

// [5.2.1]
// Imports centralized engineering relationship rules.
import {
    relationshipRules
} from "./relationshipRules.js";

// [4.3.2]
// Calculates overall building efficiency score.
// [5.2.2]
// Calculates intelligent building efficiency score.
export function calculateEnergyScore() {

    // [5.2.3]
    // Initializes scalable score accumulator.
    let score = 0;

    // =====================================================
    // BASE SYSTEM SCORING
    // =====================================================

    // [5.2.4]
    // Applies roof scoring.
    if (
        energyState.roof?.installed
    ) {

        score += 25;
    }

    // [5.2.5]
    // Applies wall scoring.
    if (
        energyState.walls?.installed
    ) {

        score += 25;
    }

    // [5.2.6]
    // Applies window scoring.
    if (
        energyState.windows?.installed
    ) {

        score += 25;
    }

    // =====================================================
    // RELATIONSHIP INTELLIGENCE
    // =====================================================

    // [5.2.7]
    // Evaluates engineering relationship rules.
    relationshipRules.forEach(rule => {

        // [5.2.8]
        // Validates required systems.
        const systemsInstalled =
            rule.systems.every(system => {

                return Object.values(
                    energyState
                ).some(state => {

                    return (
                        state?.installed &&
                        state?.selectedSystem === system
                    );
                });
            });

        // [5.2.9]
        // Applies positive relationship scoring.
        if (
            systemsInstalled &&
            rule.type === "positive"
        ) {

            score += rule.scoreImpact;
        }

        // [5.2.10]
        // Validates missing dependencies.
        if (
            systemsInstalled &&
            rule.requires
        ) {

            const missingRequirement =
                rule.requires.some(requirement => {

                    return !Object.values(
                        energyState
                    ).some(state => {

                        return (
                            state?.installed &&
                            state?.selectedSystem === requirement
                        );
                    });
                });

            // [5.2.11]
            // Applies dependency penalty.
            if (missingRequirement) {

                score += rule.scoreImpact;
            }
        }
    });

    // [5.2.12]
    // Prevents negative scores.
    if (score < 0) {

        score = 0;
    }

    // =====================================================
// ENVIRONMENTAL SIMULATION INTELLIGENCE
// =====================================================

// [5.8.7]
// Applies winter thermal penalties.
if (
    environmentState.season ===
    "winter"
) {

    // [5.8.8]
    // Penalizes missing wall insulation.
    if (
        !energyState.walls?.installed
    ) {

        score -= 10;
    }

    // [5.8.9]
    // Penalizes inefficient windows.
    if (
        !energyState.windows?.installed
    ) {

        score -= 10;
    }
}

// [5.8.10]
// Prevents negative score output.
if (score < 0) {

    score = 0;
}

    // [5.2.13]
    // Returns intelligent building score.
    return score;
}
// [4.3.8]
// Generates dynamic business recommendations.
// [5.2.14]
// Generates intelligent engineering recommendations.
export function generateRecommendations() {

    // [5.2.15]
    // Stores dynamic recommendation collection.
    const recommendations = [];

    // =====================================================
    // BASE RECOMMENDATIONS
    // =====================================================

    // [5.2.16]
    // Validates roof system presence.
    if (
        !energyState.roof?.installed
    ) {

        recommendations.push(
            "Consider installing roof upgrades."
        );
    }

    // [5.2.17]
    // Validates wall insulation presence.
    if (
        !energyState.walls?.installed
    ) {

        recommendations.push(
            "Wall insulation improvements recommended."
        );
    }

    // [5.2.18]
    // Validates efficient windows presence.
    if (
        !energyState.windows?.installed
    ) {

        recommendations.push(
            "Upgrade to energy efficient windows."
        );
    }

    // =====================================================
    // RELATIONSHIP INTELLIGENCE
    // =====================================================

    // [5.2.19]
    // Evaluates engineering relationships dynamically.
    relationshipRules.forEach(rule => {

        const systemsInstalled =
            rule.systems.every(system => {

                return Object.values(
                    energyState
                ).some(state => {

                    return (
                        state?.installed &&
                        state?.selectedSystem === system
                    );
                });
            });

        // [5.2.20]
        // Applies positive engineering insights.
        if (
            systemsInstalled &&
            rule.type === "positive"
        ) {

            recommendations.push(
                rule.message
            );
        }

        // [5.2.21]
        // Applies missing dependency warnings.
        if (
            systemsInstalled &&
            rule.requires
        ) {

            const missingRequirement =
                rule.requires.some(requirement => {

                    return !Object.values(
                        energyState
                    ).some(state => {

                        return (
                            state?.installed &&
                            state?.selectedSystem === requirement
                        );
                    });
                });

            if (missingRequirement) {

                recommendations.push(
                    rule.message
                );
            }
        }
    });

    // [5.2.22]
    // Returns intelligent recommendations.
    return recommendations;
}