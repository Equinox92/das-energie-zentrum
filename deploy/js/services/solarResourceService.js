// =====================================================
// [18.12.3.1]
// SOLAR RESOURCE CALCULATION SERVICE
// =====================================================
//
// Calculates estimated seasonal solar resource from:
//
// environment inputs
//          +
// centralized solar-resource domain data
//
// This service does NOT:
// - manipulate the DOM
// - handle UI events
// - modify environment state
// - calculate assessment scores
// - install PV systems
// - render visualizations
//
// Its responsibility is solar-resource calculation.
// =====================================================

import {
    solarResourceData
} from "../data/solarResourceData.js";


// =====================================================
// [18.12.3.2]
// CLAMPS A VALUE TO THE CONFIGURED GEOGRAPHIC RANGE.
// =====================================================

function clampGeographicPosition(
    position
) {

    return Math.min(
        Math.max(
            Number(position),
            0
        ),
        100
    );
}


// =====================================================
// [18.12.3.3]
// RESOLVES THE GEOGRAPHIC RESOURCE INDEX.
// =====================================================
//
// The model contains three reference points:
//
// Northern Germany
// Central Germany
// Southern Germany
//
// Positions between reference points are interpolated
// rather than handled through UI-specific conditions.
// =====================================================

function resolveGeographicResourceIndex(
    geographicPosition
) {

    const position =
        clampGeographicPosition(
            geographicPosition
        );

    const geographicData =
        solarResourceData
            .geographicResourceIndex;

    if (
        geographicData.length === 0
    ) {
        return 1;
    }

    if (
        position <=
        geographicData[0].position
    ) {
        return geographicData[0]
            .resourceIndex;
    }

    const lastIndex =
        geographicData.length - 1;

    if (
        position >=
        geographicData[lastIndex].position
    ) {
        return geographicData[lastIndex]
            .resourceIndex;
    }

    for (
        let index = 0;
        index < lastIndex;
        index++
    ) {

        const lowerPoint =
            geographicData[index];

        const upperPoint =
            geographicData[index + 1];

        if (
            position >=
            lowerPoint.position &&
            position <=
            upperPoint.position
        ) {

            const positionRange =
                upperPoint.position -
                lowerPoint.position;

            const resourceRange =
                upperPoint.resourceIndex -
                lowerPoint.resourceIndex;

            const positionRatio =
                (
                    position -
                    lowerPoint.position
                ) /
                positionRange;

            return (
                lowerPoint.resourceIndex +
                (
                    resourceRange *
                    positionRatio
                )
            );
        }
    }

    return 1;
}


// =====================================================
// [18.12.3.4]
// RESOLVES THE CURRENT SEASONAL RESOURCE FACTOR.
// =====================================================

function resolveSeasonalFactor(
    season
) {

    const seasonalFactors =
        solarResourceData
            .seasonalFactors;

    return (
        seasonalFactors[season] ??
        seasonalFactors.winter ??
        0
    );
}


// =====================================================
// [18.12.3.5]
// CALCULATES ESTIMATED SOLAR RESOURCE.
// =====================================================
//
// The current model uses:
//
// reference annual resource
// × geographic resource index
// × seasonal factor
//
// The result represents an estimated seasonal
// solar resource in kWh/m².
//
// This is a configurable engineering model and can
// later be calibrated against validated external data.
// =====================================================

export function calculateSolarResource(
    geographicPosition,
    season
) {

    const geographicResourceIndex =
        resolveGeographicResourceIndex(
            geographicPosition
        );

    const seasonalFactor =
        resolveSeasonalFactor(
            season
        );

    const annualReference =
        solarResourceData
            .referenceAnnualResourceKwhM2;

    const seasonalResource =
        annualReference *
        geographicResourceIndex *
        seasonalFactor;

    return {
        geographicPosition:
            clampGeographicPosition(
                geographicPosition
            ),

        geographicResourceIndex,

        season,

        seasonalFactor,

        annualReferenceKwhM2:
            annualReference,

        estimatedKwhM2:
            seasonalResource
    };
}