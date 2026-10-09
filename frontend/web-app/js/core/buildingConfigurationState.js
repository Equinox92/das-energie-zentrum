// =====================================================
// [19.1.1]
// CENTRAL BUILDING CONFIGURATION STATE
// =====================================================
//
// Stores user-selected building configuration data.
//
// This state represents the physical configuration
// relevant to engineering and visualization decisions.
//
// It does NOT:
// - calculate energy scores
// - calculate heat loss
// - render the 3D building
// - manipulate the DOM
//
// Those responsibilities remain in their respective
// services and presentation layers.
// =====================================================

export const buildingConfigurationState = {

    // =================================================
    // [19.1.2]
    // BUILDING TYPE
    // =================================================

    buildingType:
        null,

    // =================================================
    // [19.1.3]
    // ATTIC CONFIGURATION
    // =================================================
    //
    // Supported values:
    //
    // null
    // "none"
    // "unheated"
    // "heated"
    //
    // The value describes the modeled attic condition.
    // =================================================

    // =================================================
    // [19.7.1]
    // ATTIC CONFIGURATION
    // =================================================
    //
    // Supported values:
    //
    // null
    // "none"
    // "unheated"
    // "heated"
    //
    // The value describes the modeled attic condition.
    // =================================================

    atticConfiguration:
        null,


    // =================================================
    // [19.7.2]
    // PHYSICAL BUILDING CONFIGURATION
    // =================================================
    //
    // Stores the resolved physical building model.
    //
    // This is produced by the building configuration
    // service after the logical selections have been
    // validated.
    //
    // The object will contain:
    //
    // - buildingType
    // - atticConfiguration
    // - buildingEnvelopeConfiguration
    //
    // It does NOT perform calculations itself.
    // =================================================

    // =================================================
    // [19.9.1]
    // PHYSICAL BUILDING CONFIGURATION
    // =================================================
    //
    // Stores the resolved physical building model.
    //
    // This describes the physical arrangement of the
    // building and does not perform thermal calculations.
    // =================================================

    physicalConfiguration:
        null,


    // =================================================
    // [19.9.2]
    // THERMAL BOUNDARY CONFIGURATION
    // =================================================
    //
    // Stores the interpreted thermal boundary of the
    // heated building envelope.
    //
    // This value will be produced by a dedicated thermal
    // boundary service.
    //
    // It does NOT:
    // - calculate heat loss
    // - calculate energy demand
    // - calculate heated volume
    // - calculate fuel consumption
    // - calculate renovation scores
    //
    // It only represents where the current heated
    // envelope boundary is located.
    // =================================================

thermalBoundary:
    null,


// =================================================
// [19.14.8]
// HEATED ENVELOPE GEOMETRY
// =================================================
//
// Stores the resolved geometric definition of the
// currently heated building envelope.
//
// This does NOT contain physical dimensions yet.
//
// Dimensions and heated-volume calculations will be
// introduced through later dedicated layers.
// =================================================

// =================================================
// [19.14.8]
// HEATED ENVELOPE GEOMETRY
// =================================================
//
// Stores the resolved geometric definition of the
// currently heated building envelope.
//
// This does NOT contain physical dimensions yet.
//
// Dimensions and heated-volume calculations will be
// introduced through later dedicated layers.
// =================================================

heatedEnvelopeGeometry:
    null,


// =================================================
// [19.16.1]
// HEATED ENVELOPE DIMENSIONS
// =================================================
//
// Stores the physical dimension model associated
// with the resolved heated building envelope.
//
// This state does NOT yet contain measured physical
// dimensions.
//
// The dimensions remain unresolved until a dedicated
// engineering methodology provides them.
//
// This property does NOT:
// - calculate volume
// - calculate heat loss
// - calculate energy demand
// - calculate fuel consumption
// - calculate renovation scores
// - manipulate the DOM
//
// A dedicated geometry/dimensions service interprets
// this model.
// =================================================

heatedEnvelopeDimensions:
    null,


// =================================================
// [19.22.1]
// ESTIMATED HEATED VOLUME
// =================================================
//
// Stores the latest estimated heated building volume.
//
// This is a derived engineering value produced by
// the dedicated heated-volume estimation service.
//
// It is stored here so other engineering/reporting
// layers can access the current estimate.
//
// This property does NOT:
// - calculate the volume itself
// - calculate heat loss
// - calculate energy demand
// - calculate fuel consumption
// - calculate renovation scores
// - manipulate the DOM
//
// Calculation remains the responsibility of the
// heated-volume estimation service.
// =================================================

estimatedHeatedVolumeM3:
    null
};