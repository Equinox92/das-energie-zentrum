// [3.10.1]
// Defines centralized mutable application energy state.
// This architecture enables scalable future simulations.
export const energyState = {

    // [3.10.2]
    // Tracks installed building systems.
    systems: {

        roofInsulation: false,

        wallInsulation: false,

        efficientWindows: false,

        heatPump: false,

        solarPanels: false,

        wallBox: false
    },

    // [3.10.3]
    // Tracks current calculated energy score.
    efficiencyScore: 0
};