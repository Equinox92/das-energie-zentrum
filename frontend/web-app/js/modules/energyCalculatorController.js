// [16.4.1]
// Imports centralized calculator state.
import {
    energyCalculatorState
} from "../core/energyCalculatorState.js";


// [16.4.2]
// Imports calculator validation system.
import {
    validateEnergyCalculator
} from "../validators/energyCalculatorValidator.js";


// [16.4.3]
// Imports centralized energy calculation engine.
import {
    calculateEnergyAssessment
} from "../modules/energyCalculatorEngine.js";


// [16.8.27]
// Imports centralized assessment result renderer.
import {
    renderEnergyAssessment
} from "./energyCalculatorRenderer.js";

// [16.9.8]
// Imports calculator assessment synchronization service.
import {
    storeEnergyAssessment
} from "../services/energyAssessmentStateService.js";

// [16.9.15]
// Imports dashboard synchronization layer.
import {
    updateEnergyDashboard
} from "../ui/dashboardSynchronizer.js";

import {
    synchronizeEstimatedHeatedVolume
} from "../services/heatedVolumeEstimationService.js";

// =====================================================
// [17.5.1]
// BUILDING CONTEXT SYNCHRONIZATION
// =====================================================
//
// Connects calculator building-type input with the
// centralized building context service.
//
// The calculator does not resolve building profiles
// directly. It delegates that responsibility to the
// service layer.
// =====================================================

import {
    synchronizeBuildingContext
} from "../services/buildingContextService.js";

// =====================================================
// [18.5.7]
// BUILDING PRESENTATION SYNCHRONIZATION
// =====================================================
//
// Connects the resolved building context with the
// contextual building presentation layer.
//
// Presentation resolution remains separate from
// calculator scoring and assessment logic.
// =====================================================

import {
    synchronizeBuildingPresentation
} from "../services/buildingPresentationService.js";


// =====================================================
// [16.4.4]
// ENERGY CALCULATOR CONTROLLER
// =====================================================

/**
 * Initializes the Energy Calculator interaction layer.
 *
 * Responsibilities:
 *
 * - Read form input
 * - Trigger validation
 * - Update centralized state
 * - Trigger calculation engine
 * - Forward result to renderer
 */
// =====================================================
// [17.6.1]
// ENERGY CALCULATOR CONTEXT-READY CALLBACK
// =====================================================
//
// Allows the application orchestration layer to respond
// after a valid building assessment has established the
// active building context.
//
// The calculator remains responsible for calculation.
// Application lifecycle remains the responsibility of main.js.
// =====================================================

export function initializeEnergyCalculator(
    onAssessmentReady = null
) {

    // [16.4.5]
    // Retrieve calculator form.
    const calculatorForm =
        document.getElementById(
            "energy-calculator-form"
        );


    // [16.4.6]
    // Safely exit if calculator is unavailable.
    if (!calculatorForm) {

        console.warn(
            "[16.4] Energy Calculator form not found."
        );

        return;
    }


    // [16.4.7]
    // Register calculator submission handler.
// [17.6.2]
// Registers the calculator submission handler while
// providing the application lifecycle callback.
calculatorForm.addEventListener(
    "submit",
    event => handleCalculatorSubmit(
        event,
        onAssessmentReady
    )
);

    // [16.8.29]
    // Confirm controller initialization.
    console.log(
        "[16.8] Energy Calculator controller initialized."
    );

}


// =====================================================
// [16.4.8]
// Handles calculator form submission.
// =====================================================

// =====================================================
// [17.6.3]
// CALCULATOR SUBMISSION LIFECYCLE
// =====================================================
//
// Receives the optional application callback so the
// application can react after a successful assessment.
// =====================================================

function handleCalculatorSubmit(
    event,
    onAssessmentReady
) {

    // [16.4.9]
    // Prevent browser page reload.
    event.preventDefault();


    // [16.4.10]
    // Retrieve submitted calculator form.
    const form =
        event.currentTarget;


    // =====================================================
    // [16.4.11]
    // Extract calculator input values.
    // =====================================================

    const input = {

        houseType:
    form.elements.houseType.value,

        houseSizeM2:
            Number(
                form.elements.houseSizeM2.value
            ),

        occupants:
            Number(
                form.elements.occupants.value
            ),

        heatingType:
            form.elements.heatingType.value,

        annualConsumptionKwh:
            Number(
                form.elements.annualConsumptionKwh.value
            ),

        yearBuilt:
            Number(
                form.elements.yearBuilt.value
            )

    };


    // =====================================================
    // [16.8.30]
    // DEBUG — Captured calculator input.
    // =====================================================

    console.log(
        "[16.8] Calculator input:",
        input
    );


    // =====================================================
    // [16.4.12]
    // Validate calculator input.
    // =====================================================

    const validation =
        validateEnergyCalculator(
            input
        );


    // =====================================================
    // [16.8.31]
    // DEBUG — Validation result.
    // =====================================================

    console.log(
        "[16.8] Validation result:",
        validation
    );


    // =====================================================
    // [16.4.13]
    // Stop processing when validation fails.
    // =====================================================

    if (!validation.valid) {

        console.log(
            "[16.8] Validation failed."
        );

        displayValidationErrors(
            validation.errors
        );

        return;
    }


    // =====================================================
    // [16.4.14]
    // Synchronize validated input with centralized state.
    // =====================================================

    energyCalculatorState.houseType =
    input.houseType;

    energyCalculatorState.houseSizeM2 =
        input.houseSizeM2;

    energyCalculatorState.occupants =
        input.occupants;

    energyCalculatorState.heatingType =
        input.heatingType;

    energyCalculatorState.annualConsumptionKwh =
        input.annualConsumptionKwh;

    energyCalculatorState.yearBuilt =
        input.yearBuilt;

// =====================================================
// [17.5.2]
// SYNCHRONIZE BUILDING CONTEXT
// =====================================================
//
// The validated house type becomes the active building
// context for the application.
//
// Building profile resolution remains the responsibility
// of buildingContextService.js.
// =====================================================

const buildingContext =
    synchronizeBuildingContext(
        input.houseType
    );

// =====================================================
// [18.6.1]
// SYNCHRONIZE BUILDING PRESENTATION
// =====================================================
//
// The active building profile has now been resolved.
//
// The presentation service converts that context into
// a presentation contract containing:
//
// - contextual heat-loss opportunities
// - currently supported SVG zones
// - future presentation zones
//
// No SVG rendering occurs here.
// =====================================================

const buildingPresentation =
    synchronizeBuildingPresentation();


// =====================================================
// [18.6.2]
// BUILDING PRESENTATION DIAGNOSTICS
// =====================================================
//
// Outputs the resolved presentation for controlled
// development verification.
// =====================================================

console.log(
    "[18.6] Building presentation synchronized:",
    buildingPresentation
);
// =====================================================
// [17.5.3]
// BUILDING CONTEXT DIAGNOSTICS
// =====================================================
//
// Confirms that the calculator successfully connected
// to the centralized building context service.
// =====================================================

console.log(
    "[17.5] Building context synchronized:",
    buildingContext
);

    // =====================================================
    // [16.8.32]
    // DEBUG — State successfully synchronized.
    // =====================================================

console.log(
    "[16.8] Calculator state synchronized:",
    energyCalculatorState
);


// =====================================================
// [19.44.3F]
// SYNCHRONIZE HEATED VOLUME AFTER CALCULATOR STATE
// =====================================================
//
// The calculator state is now authoritative and contains
// the validated house-size value.
//
// Heated-volume estimation therefore runs after the
// calculator state has been synchronized.
//
// Dependency flow:
//
// Calculator State
//       ↓
// Heated Volume Estimation
//       ↓
// Building Configuration State
//       ↓
// Reporting
//
// This does NOT modify the AS-IS energy score.
// =====================================================

const heatedVolumeResult =
    synchronizeEstimatedHeatedVolume();

console.log(
    "[19.44.3F] Heated volume synchronized after calculator state:",
    heatedVolumeResult
);


// =====================================================
// [16.4.15]
// Execute centralized energy assessment engine.
// =====================================================

const assessment =
    calculateEnergyAssessment();

        // [16.9.9]
// Synchronizes calculator assessment with
// centralized energy intelligence state.
storeEnergyAssessment(
    assessment
);

// =====================================================
// [16.9.13]
// Synchronize dashboard with latest calculator assessment.
// =====================================================

updateEnergyDashboard();


    // =====================================================
    // [16.8.33]
    // DEBUG — Assessment returned.
    // =====================================================

    console.log(
        "[16.8] Assessment returned:",
        assessment
    );


    // =====================================================
    // [16.4.16]
    // Forward assessment to presentation layer.
    // =====================================================

    displayAssessmentResult(
        assessment
    );


    // =====================================================
    // [16.8.34]
    // DEBUG — Renderer invocation completed.
    // =====================================================

    console.log(
        "[16.8] Assessment forwarded to renderer."
    );

    // =====================================================
// [17.6.4]
// NOTIFY APPLICATION OF ASSESSMENT COMPLETION
// =====================================================
//
// At this point:
//
// - Calculator input is valid.
// - Calculator state is synchronized.
// - Building context is synchronized.
// - AS-IS assessment has been calculated.
// - Assessment state has been stored.
// - Dashboard has been updated.
// - Assessment result has been rendered.
//
// The application orchestration layer may now begin
// contextual building presentation.
// =====================================================

if (
    typeof onAssessmentReady === "function"
) {

    onAssessmentReady(
        assessment,
        buildingContext
    );

}

}


// =====================================================
// [16.8.28]
// Displays successful assessment results.
// =====================================================

function displayAssessmentResult(
    assessment
) {

    console.log(
        "[16.8] Sending assessment to renderer:",
        assessment
    );


    renderEnergyAssessment(
        assessment
    );

}


// =====================================================
// [16.4.18]
// Displays calculator validation errors.
// =====================================================

function displayValidationErrors(
    errors
) {

    // [16.4.19]
    // Retrieve validation error container.
    const errorContainer =
        document.getElementById(
            "energy-calculator-errors"
        );


    // [16.4.20]
    // Safely handle missing error container.
    if (!errorContainer) {

        console.warn(
            "[16.8] Energy Calculator error container not found.",
            errors
        );

        return;
    }


    // [16.4.21]
    // Clear previous validation messages.
    errorContainer.innerHTML = "";


    // =====================================================
    // [16.4.22]
    // Convert validation errors into presentation elements.
    // =====================================================

    Object.values(
        errors
    ).forEach(
        error => {

            const errorElement =
                document.createElement(
                    "p"
                );

            errorElement.textContent =
                error;

            errorContainer.appendChild(
                errorElement
            );

        }
    );


    // [16.4.23]
    // Make validation messages visible.
    errorContainer.hidden = false;


    // =====================================================
    // [16.8.35]
    // DEBUG — Validation errors rendered.
    // =====================================================

    console.log(
        "[16.8] Validation errors rendered:",
        errors
    );

}