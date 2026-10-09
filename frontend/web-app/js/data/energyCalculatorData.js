// [16.2.1]
// Defines centralized energy calculator configuration data.

export const energyCalculatorData = {

    // =====================================================
// HOUSE TYPES
// =====================================================

// [16.2.2]
// Defines supported building types.
houseTypes: [

    {
        value: "detached",
        label: "Detached House"
    },

    {
        value: "semi-detached",
        label: "Semi-Detached House"
    },

    {
        value: "apartment",
        label: "Apartment"
    }

],

    // =====================================================
    // HEATING SYSTEM TYPES
    // =====================================================

    // [16.2.3]
    // Defines supported heating system categories.
    heatingTypes: [

        {
            value: "gas",
            label: "Natural Gas"
        },

        {
            value: "oil",
            label: "Heating Oil"
        },

        {
            value: "electric",
            label: "Electric Heating"
        },

        {
            value: "heat-pump",
            label: "Heat Pump"
        },

        {
            value: "district-heating",
            label: "District Heating"
        },

        {
            value: "wood-pellet",
            label: "Wood Pellet"
        },

        {
            value: "other",
            label: "Other"
        }

    ],

    // =====================================================
    // PROPERTY INPUT LIMITS
    // =====================================================

    // [16.2.4]
    // Defines acceptable house-size boundaries.
    houseSize: {

        min: 20,

        max: 2000

    },

    // [16.2.5]
    // Defines acceptable occupant boundaries.
    occupants: {

        min: 1,

        max: 20

    },

    // [16.2.6]
    // Defines acceptable annual energy consumption.
    annualConsumptionKwh: {

        min: 500,

        max: 200000

    },

    // [16.2.7]
    // Defines acceptable construction-year boundaries.
    yearBuilt: {

        min: 1800,

        max: new Date().getFullYear()

    }

};