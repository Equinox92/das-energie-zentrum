// [5.8.1]
// Defines centralized environmental simulation state.
export const environmentState = {

    // [5.8.2]
    // Defines current simulated outdoor temperature.
    outdoorTemperature: 5,

    // [5.8.3]
    // Defines simulated solar intensity percentage.
    solarIntensity: 70,

// =====================================================
// [18.12.1]
// DEFINES SIMULATED NORTH-SOUTH SOLAR POSITION.
// =====================================================
//
// Represents the building's simulated geographic
// position along the north-to-south solar-resource
// gradient of Germany.
//
// 0   = Northern Germany
// 50  = Central Germany
// 100 = Southern Germany
//
// This value represents geographic position only.
// Solar resource in kWh/m² is derived separately.
// =====================================================
solarGeographicPosition: 50,

    // [5.8.4]
    // Defines active season simulation state.
    season: "winter",

    // [5.8.5]
    // Defines simulated energy demand level.
    demandLevel: "high"
};