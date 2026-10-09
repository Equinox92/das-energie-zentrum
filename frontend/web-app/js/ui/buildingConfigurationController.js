// [19.3.2] BUILDING CONFIGURATION CONTROLLER

// =====================================================
// [19.6.1]
// BUILDING CONFIGURATION SERVICE IMPORTS
// =====================================================
//
// Imports both logical configuration synchronization
// and physical building configuration resolution.
// =====================================================

// =====================================================
// [19.11.1]
// BUILDING CONFIGURATION SERVICE IMPORTS
// =====================================================
//
// Imports logical configuration synchronization and
// physical building configuration resolution.
// =====================================================

import {
    resolveBuildingConfigurationApplicability,
    synchronizeBuildingConfiguration,
    resolvePhysicalBuildingConfiguration
} from "../services/buildingConfigurationService.js";


// =====================================================
// [19.11.2]
// THERMAL BOUNDARY SERVICE IMPORT
// =====================================================
//
// Imports the service responsible for interpreting the
// physical building configuration as a thermal boundary.
// =====================================================

import {
    synchronizeThermalBoundary
} from "../services/thermalBoundaryService.js";

// =====================================================
// [19.12.1]
// BUILDING CONFIGURATION STATE IMPORT
// =====================================================
//
// Imports centralized building configuration state so
// the thermal-boundary synchronization can be verified
// against the actual shared state.
// =====================================================

import {
    buildingConfigurationState
} from "../core/buildingConfigurationState.js";

// =====================================================
// [19.15.1]
// HEATED ENVELOPE GEOMETRY SERVICE IMPORT
// =====================================================
//
// Imports the service responsible for translating the
// resolved thermal boundary into the corresponding
// heated-envelope geometry definition.
// =====================================================

import {
    synchronizeHeatedEnvelopeGeometry
} from "../services/heatedEnvelopeGeometryService.js";

// =====================================================
// [19.19.1]
// HEATED ENVELOPE DIMENSIONS SERVICE IMPORT
// =====================================================
//
// Imports the service responsible for translating the
// resolved heated-envelope geometry into the corresponding
// heated-envelope dimensions model.
// =====================================================

import {
    synchronizeHeatedEnvelopeDimensions
} from "../services/heatedEnvelopeDimensionsService.js";

import {
    synchronizeEstimatedHeatedVolume
} from "../services/heatedVolumeEstimationService.js";


export function initializeBuildingConfiguration() {

    // [19.3.3] Locate the building-type selector.
    const buildingTypeSelector =
        document.getElementById(
            "house-type"
        );

    // [19.3.4] Locate the attic configuration selector.
    const atticConfigurationSelector =
        document.getElementById(
            "attic-configuration-selector"
        );


    // [19.3.5] Stop safely if the required controls do not exist.
    if (
        !buildingTypeSelector ||
        !atticConfigurationSelector
    ) {
        console.warn(
            "[19.3] Building configuration controls not found."
        );

        return;
    }


    // [19.3.6] Refresh the available configuration options.
    function refreshConfigurationOptions() {

        const buildingType =
            buildingTypeSelector.value;

        const applicability =
            resolveBuildingConfigurationApplicability(
                buildingType
            );


        // [19.3.7] Preserve the current selection when possible.
        const currentSelection =
            atticConfigurationSelector.value;


        // [19.3.8] Remove existing options.
        atticConfigurationSelector.innerHTML =
            "";


        // [19.3.9] Create options from the applicability model.
        applicability.atticConfigurations.forEach(
            (configurationId) => {

                const option =
                    document.createElement(
                        "option"
                    );

                option.value =
                    configurationId;

                option.textContent =
                    configurationId === "none"
                        ? "No Attic"
                        : configurationId === "unheated"
                            ? "Unheated Attic"
                            : "Heated Attic";

                atticConfigurationSelector.appendChild(
                    option
                );
            }
        );


        // [19.3.10] Restore the previous selection if still valid.
        if (
            applicability.atticConfigurations.includes(
                currentSelection
            )
        ) {

            atticConfigurationSelector.value =
                currentSelection;

        } else {

            // [19.3.11] Fall back to the first valid configuration.
            atticConfigurationSelector.value =
                applicability.atticConfigurations[0];
        }


        // [19.3.12] Synchronize the domain state.
       // =====================================================
// [19.6.2]
// SYNCHRONIZE LOGICAL CONFIGURATION
// =====================================================
//
// Synchronizes the selected building configuration into
// the centralized configuration state.
// =====================================================

synchronizeBuildingConfiguration(
    buildingType,
    atticConfigurationSelector.value
);


// =====================================================
// [19.6.3]
// RESOLVE PHYSICAL BUILDING CONFIGURATION
// =====================================================
//
// Converts the logical configuration into the physical
// building configuration model.
//
// Thermal interpretation is intentionally deferred.
// =====================================================

const physicalBuildingConfiguration =
    resolvePhysicalBuildingConfiguration(
        buildingType,
        atticConfigurationSelector.value
    );

    // =====================================================
// [19.11.3]
// SYNCHRONIZE THERMAL BOUNDARY
// =====================================================
//
// Interprets the resolved physical building configuration
// and stores the resulting thermal boundary in centralized
// building configuration state.
// =====================================================

const thermalBoundary =
    synchronizeThermalBoundary();

// =====================================================
// [19.15.2]
// SYNCHRONIZE HEATED ENVELOPE GEOMETRY
// =====================================================
//
// Resolves the heated-envelope geometry from the
// already-synchronized thermal boundary.
// =====================================================

const heatedEnvelopeGeometry =
    synchronizeHeatedEnvelopeGeometry();

// =====================================================
// [19.19.2]
// SYNCHRONIZE HEATED ENVELOPE DIMENSIONS
// =====================================================
//
// Resolves the heated-envelope dimensions model from
// the already-synchronized heated-envelope geometry.
//
// Physical dimensions remain unresolved at this stage.
// No volume calculation is performed.
// =====================================================

const heatedEnvelopeDimensions =
    synchronizeHeatedEnvelopeDimensions();

    // =====================================================
// [19.34B.1]
// SYNCHRONIZE ESTIMATED HEATED VOLUME
// =====================================================
//
// Recalculates the approximate heated volume after
// the building configuration has been resolved.
//
// Lifecycle:
//
// Configuration
//      ↓
// Thermal Boundary
//      ↓
// Heated Envelope Geometry
//      ↓
// Heated Envelope Dimensions
//      ↓
// Estimated Heated Volume
//
// This does NOT modify:
// - AS-IS score
// - renovation score
// - dashboard score
// =====================================================

const heatedVolumeResult =
    synchronizeEstimatedHeatedVolume();

console.log(
    "[19.34B] Estimated heated volume:",
    heatedVolumeResult
);


// =====================================================
// [19.6.4]
// CONFIGURATION DIAGNOSTICS
// =====================================================

// =====================================================
// [19.11.4]
// CONFIGURATION DIAGNOSTICS
// =====================================================

console.log(
    "[19.6] Physical building configuration:",
    physicalBuildingConfiguration
);

console.log(
    "[19.11] Thermal boundary:",
    thermalBoundary
);

console.log(
    "[19.12] Stored thermal boundary state:",
    buildingConfigurationState.thermalBoundary
);

console.log(
    "[19.15] Heated envelope geometry:",
    heatedEnvelopeGeometry
);

console.log(
    "[19.15] Stored heated envelope geometry state:",
    buildingConfigurationState.heatedEnvelopeGeometry
);

// =====================================================
// [19.19.3]
// HEATED ENVELOPE DIMENSIONS DIAGNOSTICS
// =====================================================
//
// Outputs the resolved dimensions model and confirms
// that it has been stored in centralized state.
// =====================================================

console.log(
    "[19.19] Heated envelope dimensions:",
    heatedEnvelopeDimensions
);

console.log(
    "[19.19] Stored heated envelope dimensions state:",
    buildingConfigurationState.heatedEnvelopeDimensions
);

}

    // [19.3.13] Refresh when the building type changes.
    buildingTypeSelector.addEventListener(
        "change",
        refreshConfigurationOptions
    );


    // [19.3.14] Synchronize when the attic configuration changes.
// =====================================================
// [19.6.5]
// SYNCHRONIZE PHYSICAL CONFIGURATION ON ATTIC CHANGE
// =====================================================

atticConfigurationSelector.addEventListener(
    "change",
    () => {

        // [19.6.6]
        // Synchronize the logical configuration state.
        synchronizeBuildingConfiguration(
            buildingTypeSelector.value,
            atticConfigurationSelector.value
        );


        // [19.6.7]
        // Resolve the physical building configuration.
        const physicalBuildingConfiguration =
            resolvePhysicalBuildingConfiguration(
                buildingTypeSelector.value,
                atticConfigurationSelector.value
            );

// =====================================================
// [19.11.5]
// SYNCHRONIZE THERMAL BOUNDARY ON ATTIC CHANGE
// =====================================================
//
// Re-evaluates the thermal boundary whenever the attic
// configuration changes.
// =====================================================

const thermalBoundary =
    synchronizeThermalBoundary();

// =====================================================
// [19.15.3]
// SYNCHRONIZE HEATED ENVELOPE GEOMETRY ON CHANGE
// =====================================================
//
// Re-evaluates the heated-envelope geometry whenever
// the attic configuration changes.
// =====================================================

const heatedEnvelopeGeometry =
    synchronizeHeatedEnvelopeGeometry();

// =====================================================
// [19.19.4]
// SYNCHRONIZE HEATED ENVELOPE DIMENSIONS ON CHANGE
// =====================================================
//
// Re-evaluates the heated-envelope dimensions whenever
// the attic configuration changes.
//
// No physical dimensions or volume are calculated yet.
// =====================================================

const heatedEnvelopeDimensions =
    synchronizeHeatedEnvelopeDimensions();


        // [19.6.8]
        // Output the physical configuration for verification.
// =====================================================
// [19.11.6]
// CONFIGURATION DIAGNOSTICS
// =====================================================

console.log(
    "[19.6] Physical building configuration:",
    physicalBuildingConfiguration
);

console.log(
    "[19.11] Thermal boundary:",
    thermalBoundary
);

console.log(
    "[19.15] Heated envelope geometry:",
    heatedEnvelopeGeometry
);

console.log(
    "[19.15] Stored heated envelope geometry state:",
    buildingConfigurationState.heatedEnvelopeGeometry
);

// =====================================================
// [19.19.5]
// HEATED ENVELOPE DIMENSIONS CHANGE DIAGNOSTICS
// =====================================================
//
// Confirms that the dimensions model is synchronized
// whenever the heated-envelope geometry changes.
// =====================================================

console.log(
    "[19.19] Heated envelope dimensions:",
    heatedEnvelopeDimensions
);

console.log(
    "[19.19] Stored heated envelope dimensions state:",
    buildingConfigurationState.heatedEnvelopeDimensions
);


        // [19.6.9]
        // Preserve the existing configuration-change diagnostic.
        console.log(
            "[19.3] Attic configuration changed:",
            atticConfigurationSelector.value
        );
    }
);


    // [19.3.15] Perform the initial synchronization.
    refreshConfigurationOptions();
}