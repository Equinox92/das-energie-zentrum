// [16.4.1]
// Imports centralized energy calculator configuration data.
import {
    energyCalculatorData
} from "../data/energyCalculatorData.js";


// =====================================================
// VALIDATION RESULT FACTORY
// =====================================================

// [16.4.2]
// Creates a standardized validation result.
function createValidationResult() {

    return {

        valid: true,

        errors: {}

    };

}

// =====================================================
// HOUSE TYPE VALIDATION
// =====================================================

// [16.4.3]
// Validates the selected building type.
function validateHouseType(
    value,
    result
) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        result.valid = false;

        result.errors.houseType =
            "House type is required.";

        return;
    }

    const supportedHouseType =
        energyCalculatorData.houseTypes
            .some(
                houseType =>
                    houseType.value === value
            );

    if (
        !supportedHouseType
    ) {

        result.valid = false;

        result.errors.houseType =
            "Selected house type is not supported.";

    }

}

// =====================================================
// HOUSE SIZE VALIDATION
// =====================================================

// [16.4.4]
// Validates assessed property floor area.
function validateHouseSize(
    value,
    result
) {

    const limits =
        energyCalculatorData.houseSize;

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        result.valid = false;

        result.errors.houseSizeM2 =
            "House size is required.";

        return;
    }

    const numericValue =
        Number(value);

    if (
        !Number.isFinite(numericValue)
    ) {

        result.valid = false;

        result.errors.houseSizeM2 =
            "House size must be a valid number.";

        return;
    }

    if (
        numericValue < limits.min ||
        numericValue > limits.max
    ) {

        result.valid = false;

        result.errors.houseSizeM2 =
            `House size must be between ${limits.min} and ${limits.max} m².`;

    }

}


// =====================================================
// OCCUPANT VALIDATION
// =====================================================

// [16.4.5]
// Validates number of occupants.
function validateOccupants(
    value,
    result
) {

    const limits =
        energyCalculatorData.occupants;

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        result.valid = false;

        result.errors.occupants =
            "Number of occupants is required.";

        return;
    }

    const numericValue =
        Number(value);

    if (
        !Number.isInteger(numericValue)
    ) {

        result.valid = false;

        result.errors.occupants =
            "Number of occupants must be a whole number.";

        return;
    }

    if (
        numericValue < limits.min ||
        numericValue > limits.max
    ) {

        result.valid = false;

        result.errors.occupants =
            `Number of occupants must be between ${limits.min} and ${limits.max}.`;

    }

}


// =====================================================
// HEATING TYPE VALIDATION
// =====================================================

// [16.4.6]
// Validates the selected heating system.
function validateHeatingType(
    value,
    result
) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        result.valid = false;

        result.errors.heatingType =
            "Heating type is required.";

        return;
    }

    const supportedHeatingType =
        energyCalculatorData.heatingTypes
            .some(
                heatingType =>
                    heatingType.value === value
            );

    if (
        !supportedHeatingType
    ) {

        result.valid = false;

        result.errors.heatingType =
            "Selected heating type is not supported.";

    }

}


// =====================================================
// ANNUAL CONSUMPTION VALIDATION
// =====================================================

// [16.4.7]
// Validates annual energy consumption.
function validateAnnualConsumption(
    value,
    result
) {

    const limits =
        energyCalculatorData.annualConsumptionKwh;

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        result.valid = false;

        result.errors.annualConsumptionKwh =
            "Annual energy consumption is required.";

        return;
    }

    const numericValue =
        Number(value);

    if (
        !Number.isFinite(numericValue)
    ) {

        result.valid = false;

        result.errors.annualConsumptionKwh =
            "Annual energy consumption must be a valid number.";

        return;
    }

    if (
        numericValue < limits.min ||
        numericValue > limits.max
    ) {

        result.valid = false;

        result.errors.annualConsumptionKwh =
            `Annual energy consumption must be between ${limits.min} and ${limits.max} kWh/year.`;

    }

}


// =====================================================
// CONSTRUCTION YEAR VALIDATION
// =====================================================

// [16.4.8]
// Validates property construction year.
function validateYearBuilt(
    value,
    result
) {

    const limits =
        energyCalculatorData.yearBuilt;

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        result.valid = false;

        result.errors.yearBuilt =
            "Construction year is required.";

        return;
    }

    const numericValue =
        Number(value);

    if (
        !Number.isInteger(numericValue)
    ) {

        result.valid = false;

        result.errors.yearBuilt =
            "Construction year must be a whole year.";

        return;
    }

    if (
        numericValue < limits.min ||
        numericValue > limits.max
    ) {

        result.valid = false;

        result.errors.yearBuilt =
            `Construction year must be between ${limits.min} and ${limits.max}.`;

    }

}


// =====================================================
// COMPLETE CALCULATOR VALIDATION
// =====================================================

// [16.4.9]
// Validates the complete energy calculator state.
export function validateEnergyCalculator(
    state
) {

    const result =
        createValidationResult();

    if (
        !state ||
        typeof state !== "object"
    ) {

        return {

            valid: false,

            errors: {

                general:
                    "Energy calculator state is invalid."

            }

        };

    }

    validateHouseType(
    state.houseType,
    result
);

    validateHouseSize(
        state.houseSizeM2,
        result
    );

    validateOccupants(
        state.occupants,
        result
    );

    validateHeatingType(
        state.heatingType,
        result
    );

    validateAnnualConsumption(
        state.annualConsumptionKwh,
        result
    );

    validateYearBuilt(
        state.yearBuilt,
        result
    );

    return result;

}


// =====================================================
// SINGLE FIELD VALIDATION
// =====================================================

// [16.4.10]
// Validates an individual calculator field.
export function validateEnergyCalculatorField(
    field,
    value
) {

    const temporaryState = {

        houseType: null,

        houseSizeM2: null,

        occupants: null,

        heatingType: null,

        annualConsumptionKwh: null,

        yearBuilt: null

    };

    temporaryState[field] =
        value;

    const result =
        validateEnergyCalculator(
            temporaryState
        );

    return {

        valid:
            !result.errors[field],

        error:
            result.errors[field] || null

    };

}