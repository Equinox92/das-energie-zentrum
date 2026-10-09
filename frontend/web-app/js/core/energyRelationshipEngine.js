// =====================================================
// [4.3.1]
// CENTRALIZED RUNTIME STATE
// =====================================================

// [4.3.1]
// Imports centralized runtime state.
import {
    energyState
}
from "./energyState.js";


// =====================================================
// [5.8.6]
// ENVIRONMENT STATE
// =====================================================

// [5.8.6]
// Imports environmental simulation state.
import {
    environmentState
}
from "./environmentState.js";


// =====================================================
// [7.2.1]
// ENGINEERING RELATIONSHIP RULES
// =====================================================

// [7.2.1]
// Imports centralized engineering relationship rules.
import {
    relationshipRules
}
from "./relationshipRules.js";


// =====================================================
// [17.10.1]
// BUILDING CONTEXT STATE
// =====================================================

// [17.10.1]
// Imports the currently active building context.
import {
    buildingContextState
}
from "./buildingContextState.js";


// =====================================================
// [17.10.2]
// SYSTEM APPLICABILITY MAPPING
// =====================================================

// [17.10.2]
// Maps engineering system IDs to building capabilities.
const systemApplicabilityMap = {

    "solar-pv-5kw":
        "solar",

    "thermal-wall-system":
        "walls",

    "triple-glazed-window":
        "windows"

};


// =====================================================
// [17.11.1]
// BASELINE RECOMMENDATION APPLICABILITY MAPPING
// =====================================================

// [17.11.1]
// Maps recommendation targets to building capabilities.
const recommendationApplicabilityMap = {

    roof:
        "roof",

    walls:
        "walls",

    windows:
        "windows"

};


// =====================================================
// [17.10.3]
// SYSTEM APPLICABILITY RESOLVER
// =====================================================

// [17.10.3]
// Determines whether an engineering system is supported
// by the currently active building profile.
function isSystemApplicable(
    systemId
) {

    // [17.10.4]
    // Retrieves the active building profile.
    const buildingProfile =
        buildingContextState.profile;

    // [17.10.5]
    // Safely retrieves available systems.
    const availableSystems =
        buildingProfile?.systems ?? {};

    // [17.10.6]
    // Resolves the required capability.
    const applicabilityKey =
        systemApplicabilityMap[
            systemId
        ];

    // [17.10.7]
    // Unknown systems remain applicable.
    if (
        !applicabilityKey
    ) {

        return true;
    }

    // [17.10.8]
    // Returns building capability.
    return (
        availableSystems[
            applicabilityKey
        ] === true
    );
}


// =====================================================
// [17.11.2]
// BASELINE RECOMMENDATION APPLICABILITY RESOLVER
// =====================================================

// [17.11.2]
// Determines whether a baseline recommendation is
// supported by the active building profile.
function isRecommendationApplicable(
    recommendationTarget
) {

    // [17.11.3]
    // Retrieves active building profile.
    const buildingProfile =
        buildingContextState.profile;

    // [17.11.4]
    // Safely retrieves available systems.
    const availableSystems =
        buildingProfile?.systems ?? {};

    // [17.11.5]
    // Resolves recommendation capability.
    const applicabilityKey =
        recommendationApplicabilityMap[
            recommendationTarget
        ];

    // [17.11.6]
    // Unknown targets remain applicable.
    if (
        !applicabilityKey
    ) {

        return true;
    }

    // [17.11.7]
    // Returns building capability.
    return (
        availableSystems[
            applicabilityKey
        ] === true
    );
}


// =====================================================
// [17.10.9]
// RELATIONSHIP APPLICABILITY VALIDATOR
// =====================================================

// [17.10.9]
// Determines whether all systems used by a relationship
// are supported by the active building.
function isRelationshipApplicable(
    rule
) {

    // [17.10.10]
    // Rejects malformed rules.
    if (
        !rule ||
        !Array.isArray(
            rule.systems
        )
    ) {

        return false;
    }

    // [17.10.11]
    // Every required relationship system must be available.
    return rule.systems.every(
        systemId =>
            isSystemApplicable(
                systemId
            )
    );
}


// =====================================================
// [17.10.12]
// INSTALLED SYSTEM COLLECTION
// =====================================================

// [17.10.12]
// Collects all installed engineering system IDs.
function getInstalledSystemIds() {

    // [17.10.13]
    // Creates installed-system collection.
    const installedSystemIds = [];

    // [17.10.14]
    // Traverses runtime engineering zones.
    Object.values(
        energyState
    ).forEach(
        zone => {

            // [17.10.15]
            // Ignores invalid zones.
            if (
                !zone ||
                !Array.isArray(
                    zone.installedSystems
                )
            ) {

                return;
            }

            // [17.10.16]
            // Collects installed system IDs.
            zone.installedSystems.forEach(
                system => {

                    if (
                        system?.id
                    ) {

                        installedSystemIds.push(
                            system.id
                        );
                    }
                }
            );
        }
    );

    // [17.10.17]
    // Returns installed system IDs.
    return installedSystemIds;
}


// =====================================================
// [17.12.1]
// RELATIONSHIP SYSTEM INSTALLATION CHECK
// =====================================================

// [17.12.1]
// Determines whether every primary system in a
// relationship has been installed.
function areRelationshipSystemsInstalled(
    rule,
    installedSystemIds
) {

    // [17.12.2]
    // Rejects malformed relationship definitions.
    if (
        !rule ||
        !Array.isArray(
            rule.systems
        )
    ) {

        return false;
    }

    // [17.12.3]
    // Every primary system must be installed.
    return rule.systems.every(
        systemId =>
            installedSystemIds.includes(
                systemId
            )
    );
}


// =====================================================
// [17.12.4]
// RELATIONSHIP REQUIREMENT CHECK
// =====================================================

// [17.12.4]
// Determines whether every dependency required by
// a relationship has been installed.
function areRelationshipRequirementsSatisfied(
    rule,
    installedSystemIds
) {

    // [17.12.5]
    // Relationships without requirements are satisfied.
    if (
        !Array.isArray(
            rule?.requires
        ) ||
        rule.requires.length === 0
    ) {

        return true;
    }

    // [17.12.6]
    // Every required dependency must be installed.
    return rule.requires.every(
        requirement =>
            installedSystemIds.includes(
                requirement
            )
    );
}


// =====================================================
// [17.12.7]
// MISSING RELATIONSHIP REQUIREMENT CHECK
// =====================================================

// [17.12.7]
// Determines whether at least one required dependency
// is missing.
function hasMissingRelationshipRequirement(
    rule,
    installedSystemIds
) {

    // [17.12.8]
    // Relationships without requirements cannot have
    // missing requirements.
    if (
        !Array.isArray(
            rule?.requires
        ) ||
        rule.requires.length === 0
    ) {

        return false;
    }

    // [17.12.9]
    // Detects missing dependencies.
    return rule.requires.some(
        requirement =>
            !installedSystemIds.includes(
                requirement
            )
    );
}


// =====================================================
// ENGINEERING SCORE ENGINE
// =====================================================

// [5.2.2]
// Calculates intelligent building efficiency score.
export function calculateEnergyScore() {

    // [5.2.3]
    // Initializes score accumulator.
    let score = 0;


    // =====================================================
    // INSTALLED SYSTEM SCORING
    // =====================================================

    // [5.2.4]
    // Processes all engineering zones.
    Object.values(
        energyState
    ).forEach(
        zone => {

            // [5.2.5]
            // Ignores invalid zones.
            if (
                !zone ||
                !Array.isArray(
                    zone.installedSystems
                )
            ) {

                return;
            }

            // [5.2.6]
            // Processes installed systems.
            zone.installedSystems.forEach(
                system => {

                    // [5.2.7]
                    // Adds system score.
                    score +=
                        system.score || 0;
                }
            );
        }
    );


    // =====================================================
    // ENVIRONMENTAL SIMULATION
    // =====================================================

    // [5.8.7]
    // Applies winter penalties.
    if (
        environmentState.season ===
        "winter"
    ) {

        // [5.8.8]
        // Retrieves wall systems.
        const wallSystems =
            energyState.walls
                ?.installedSystems || [];

        // [5.8.9]
        // Retrieves window systems.
        const windowSystems =
            energyState.windows
                ?.installedSystems || [];

        // [5.8.10]
        // Penalizes missing wall insulation.
        if (
            wallSystems.length === 0
        ) {

            score -= 10;
        }

        // [5.8.11]
        // Penalizes missing window upgrades.
        if (
            windowSystems.length === 0
        ) {

            score -= 10;
        }
    }


    // =====================================================
    // RELATIONSHIP INTELLIGENCE
    // =====================================================

    // [7.2.2]
    // Collects installed systems.
    const installedSystemIds =
        getInstalledSystemIds();


    // [17.10.18]
    // Retrieves active building profile.
    const buildingProfile =
        buildingContextState.profile;


    // [17.10.19]
    // Logs relationship context.
    console.log(
        "[17.10] Relationship applicability context:",
        {
            buildingType:
                buildingContextState.buildingType,

            availableSystems:
                buildingProfile?.systems ?? {}
        }
    );


    // =====================================================
    // RELATIONSHIP RULE PROCESSING
    // =====================================================

    // [7.2.6]
    // Processes relationship rules.
    relationshipRules.forEach(
        rule => {

            // [17.10.20]
            // Skips relationships unsupported by
            // the active building.
            if (
                !isRelationshipApplicable(
                    rule
                )
            ) {

                return;
            }


            // [17.12.10]
            // Determines whether primary systems exist.
            const systemsInstalled =
                areRelationshipSystemsInstalled(
                    rule,
                    installedSystemIds
                );


            // =================================================
            // POSITIVE RELATIONSHIP
            // =================================================

            // [17.12.11]
            // Applies positive relationship bonuses.
            if (
                rule.type === "positive" &&
                systemsInstalled
            ) {

                score +=
                    rule.scoreImpact;

                return;
            }


            // =================================================
            // NEGATIVE RELATIONSHIP
            // =================================================

            // [17.12.12]
            // Negative relationships only apply when the
            // primary systems exist AND a required dependency
            // is missing.
            if (
                rule.type === "negative" &&
                systemsInstalled &&
                hasMissingRelationshipRequirement(
                    rule,
                    installedSystemIds
                )
            ) {

                score +=
                    rule.scoreImpact;
            }
        }
    );


    // =====================================================
    // SCORE NORMALIZATION
    // =====================================================

    // [5.2.8]
    // Prevents negative scores.
    score =
        Math.max(
            score,
            0
        );

    // [5.2.9]
    // Prevents scores above 100.
    score =
        Math.min(
            score,
            100
        );


    // [5.2.10]
    // Returns finalized score.
    return score;
}


// =====================================================
// ENGINEERING RECOMMENDATION ENGINE
// =====================================================

// [5.2.14]
// Generates intelligent engineering recommendations.
export function generateRecommendations() {

    // [5.2.15]
    // Creates recommendation collection.
    const recommendations = [];


    // =====================================================
    // BUILDING CONTEXT
    // =====================================================

    // [17.11.8]
    // Retrieves active building profile.
    const buildingProfile =
        buildingContextState.profile;


    // [17.11.9]
    // Logs recommendation applicability.
    console.log(
        "[17.11] Baseline recommendation applicability:",
        {

            buildingType:
                buildingContextState.buildingType,

            roof:
                isRecommendationApplicable(
                    "roof"
                ),

            walls:
                isRecommendationApplicable(
                    "walls"
                ),

            windows:
                isRecommendationApplicable(
                    "windows"
                )

        }
    );


    // =====================================================
    // INSTALLED SYSTEM COLLECTION
    // =====================================================

    // [5.2.16]
    // Retrieves installed roof systems.
    const roofSystems =
        energyState.roof
            ?.installedSystems || [];


    // [5.2.17]
    // Retrieves installed wall systems.
    const wallSystems =
        energyState.walls
            ?.installedSystems || [];


    // [5.2.18]
    // Retrieves installed window systems.
    const windowSystems =
        energyState.windows
            ?.installedSystems || [];


    // [17.11.10]
    // Logs recommendation inputs.
    console.log(
        "[17.11] Roof systems:",
        roofSystems
    );

    console.log(
        "[17.11] Wall systems:",
        wallSystems
    );

    console.log(
        "[17.11] Window systems:",
        windowSystems
    );


    // =====================================================
    // BASELINE UNDERCONFIGURATION
    // =====================================================

    // [5.2.19]
    // Generates foundational recommendation only when
    // all supported baseline systems are absent.
    const roofApplicable =
        isRecommendationApplicable(
            "roof"
        );

    const wallsApplicable =
        isRecommendationApplicable(
            "walls"
        );

    const windowsApplicable =
        isRecommendationApplicable(
            "windows"
        );


    // [17.11.11]
    // Detects whether every applicable baseline system
    // is currently unconfigured.
    const baselineUnderconfigured =

        (
            !roofApplicable ||
            roofSystems.length === 0
        ) &&

        (
            !wallsApplicable ||
            wallSystems.length === 0
        ) &&

        (
            !windowsApplicable ||
            windowSystems.length === 0
        );


    // [17.11.12]
    // Adds foundational recommendation when required.
    if (
        baselineUnderconfigured &&
        (
            roofApplicable ||
            wallsApplicable ||
            windowsApplicable
        )
    ) {

        recommendations.push(
            "Building requires foundational energy optimization."
        );
    }


    // =====================================================
    // INDIVIDUAL BASELINE RECOMMENDATIONS
    // =====================================================

    // [7.2.11]
    // Recommends roof upgrades when applicable.
    if (
        roofApplicable &&
        roofSystems.length === 0
    ) {

        recommendations.push(
            "Consider installing roof upgrades."
        );
    }


    // [7.2.12]
    // Recommends wall insulation when applicable.
    if (
        wallsApplicable &&
        wallSystems.length === 0
    ) {

        recommendations.push(
            "Wall insulation improvements recommended."
        );
    }


    // [7.2.13]
    // Recommends efficient windows when applicable.
    if (
        windowsApplicable &&
        windowSystems.length === 0
    ) {

        recommendations.push(
            "Upgrade to energy efficient windows."
        );
    }


    // =====================================================
    // RELATIONSHIP INTELLIGENCE
    // =====================================================

    // [17.11.13]
    // Collects installed systems.
    const installedSystemIds =
        getInstalledSystemIds();


    // [17.11.14]
    // Logs recommendation context.
    console.log(
        "[17.11] Recommendation applicability context:",
        {

            buildingType:
                buildingContextState.buildingType,

            availableSystems:
                buildingProfile?.systems ?? {}

        }
    );


    // =====================================================
    // RELATIONSHIP RECOMMENDATION PROCESSING
    // =====================================================

    // [7.2.16]
    // Processes every relationship rule.
    relationshipRules.forEach(
        rule => {

            // [17.11.15]
            // Skips unsupported relationships.
            if (
                !isRelationshipApplicable(
                    rule
                )
            ) {

                return;
            }


            // [17.12.13]
            // Determines whether primary systems exist.
            const systemsInstalled =
                areRelationshipSystemsInstalled(
                    rule,
                    installedSystemIds
                );


            // =================================================
            // POSITIVE RELATIONSHIP RECOMMENDATION
            // =================================================

            // [17.12.14]
            // Positive rules are recommended when all
            // primary systems are installed.
            if (
                rule.type === "positive" &&
                systemsInstalled
            ) {

                recommendations.push(
                    rule.message
                );

                return;
            }


            // =================================================
            // NEGATIVE RELATIONSHIP RECOMMENDATION
            // =================================================

            // [17.12.15]
            // Negative rules are recommended ONLY when
            // primary systems are installed AND a dependency
            // is missing.
            if (
                rule.type === "negative" &&
                systemsInstalled &&
                hasMissingRelationshipRequirement(
                    rule,
                    installedSystemIds
                )
            ) {

                recommendations.push(
                    rule.message
                );
            }
        }
    );


    // =====================================================
    // REMOVE DUPLICATE RECOMMENDATIONS
    // =====================================================

    // [17.12.16]
    // Removes duplicate messages while preserving order.
    const uniqueRecommendations =
        [
            ...new Set(
                recommendations
            )
        ];


    // =====================================================
    // FINAL OUTPUT
    // =====================================================

    // [17.11.16]
    // Logs finalized recommendations.
    console.log(
        "[17.11] Final Recommendations:",
        uniqueRecommendations
    );


    // [5.2.20]
    // Returns finalized recommendation collection.
    return uniqueRecommendations;
}