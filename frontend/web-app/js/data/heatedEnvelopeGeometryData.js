// =====================================================
// [19.13.1]
// HEATED ENVELOPE GEOMETRY DATA
// =====================================================
//
// Defines the geometric regions that may belong to the
// currently heated building envelope.
//
// This file contains domain data only.
//
// It does NOT:
// - calculate heated volume
// - calculate energy demand
// - calculate heat loss
// - interpret building configuration
// - resolve thermal boundaries
// - manipulate the DOM
//
// The geometry definitions will later be interpreted
// by a dedicated heated-envelope geometry service.
//
// This creates a clean separation between:
//
// Physical Configuration
//        ↓
// Thermal Boundary
//        ↓
// Heated Envelope Geometry
//        ↓
// Heated Volume
// =====================================================


// =====================================================
// [19.13.2]
// HEATED ENVELOPE GEOMETRY TYPES
// =====================================================
//
// These identifiers describe the geometric region that
// forms the currently heated envelope.
//
// The actual dimensions are intentionally NOT defined
// here yet.
//
// Dimensions must come from a future building geometry
// model rather than being invented in this layer.
// =====================================================

export const heatedEnvelopeGeometryTypes = {

    roofBounded:
        "roof-bounded",

    ceilingSlabBounded:
        "ceiling-slab-bounded"

};


// =====================================================
// [19.13.3]
// HEATED ENVELOPE GEOMETRY DEFINITIONS
// =====================================================
//
// Each geometry definition describes the relationship
// between the thermal boundary and the heated envelope.
//
// No physical dimensions are assumed at this stage.
// =====================================================

export const heatedEnvelopeGeometryDefinitions = {

    "roof-bounded": {

        id:
            "roof-bounded",

        name:
            "Roof-Bounded Heated Envelope",

        upperBoundary:
            "roof",

        geometryStatus:
            "requires-dimensions"

    },


    "ceiling-slab-bounded": {

        id:
            "ceiling-slab-bounded",

        name:
            "Ceiling-Slab-Bounded Heated Envelope",

        upperBoundary:
            "ceiling-slab",

        geometryStatus:
            "requires-dimensions"

    }

};


// =====================================================
// [19.13.4]
// DEFAULT HEATED ENVELOPE GEOMETRY
// =====================================================
//
// Represents an unresolved heated-envelope geometry.
//
// This is used when no valid thermal boundary exists.
// =====================================================

export const defaultHeatedEnvelopeGeometry = {

    id:
        "unknown",

    name:
        "Unknown Heated Envelope",

    upperBoundary:
        null,

    geometryStatus:
        "unresolved"

};