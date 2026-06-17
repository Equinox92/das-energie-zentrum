// =====================================================
// [12.2.11]
// Consultation validator.
// =====================================================

import {
    validateConsultationForm
}
from "../validators/consultationValidator.js";

// =====================================================
// [12.7.1]
// Consultation API import.
// =====================================================

import {
    submitConsultation
}
from "../api/consultationApi.js";

// =====================================================
// [12.4.5]
// Feedback message component.
// =====================================================

import {
    showErrorMessage,
    showSuccessMessage,
    clearFeedbackMessage
}
from "./feedbackMessage.js";

// =====================================================
// [12.1.3]
// CONSULTATION FORM CONTROLLER
// =====================================================

// =====================================================
// [12.1.4]
// Initializes consultation form behavior.
// =====================================================

export function initializeConsultationForm() {

    // =====================================================
    // [12.1.5]
    // Retrieves form safely.
    // =====================================================

    const form =
        document.querySelector(
            ".consultation-form"
        );

        // =====================================================
// [12.5.1]
// Retrieves submit button safely.
// =====================================================

const submitButton =
    form.querySelector(
        "button[type='submit']"
    );

    // =====================================================
// [12.9.1]
// Tracks active submission state.
// =====================================================

let isSubmitting =
    false;

    if (!form) {

        console.warn(
            "Consultation form not found."
        );

        return;
    }

    // =====================================================
    // [12.1.6]
    // Handles form submission.
    // =====================================================

    form.addEventListener(
        "submit",
        event => {

            // =====================================================
            // [12.1.7]
            // Prevents page refresh.
            // =====================================================

            event.preventDefault();

            // =====================================================
// [12.9.2]
// Prevents duplicate submissions.
// =====================================================

if (
    isSubmitting
) {

    return;
}

// =====================================================
// [12.9.3]
// Locks form submission.
// =====================================================

isSubmitting =
    true;

            // =====================================================
// [12.5.2]
// Activates loading state.
// =====================================================

submitButton.disabled =
    true;

submitButton.textContent =
    "Sending Request...";

    // =====================================================
// [12.5.6]
// Simulates future backend processing.
// =====================================================

setTimeout(
   async () => {

                    const validationResult =
                validateConsultationForm(
                    consultationData
                );

            // =====================================================
            // [12.2.13]
            // Prevents invalid submissions.
            // =====================================================

            if (
                !validationResult.isValid
            ) {

showErrorMessage(
    Object.values(
        validationResult.errors
    )[0]
);

// =====================================================
// [12.9.4]
// Unlocks form submission.
// =====================================================

isSubmitting =
    false;

// =====================================================
// [12.5.3]
// Restores button after validation failure.
// =====================================================

submitButton.disabled =
    false;

submitButton.textContent =
    "Request Consultation";

return;
            }

            // =====================================================
            // [12.3.7]
            // Displays success message.
            // =====================================================
// =====================================================
// [12.7.2]
// Sends consultation through API layer.
// =====================================================

console.log(
    "Submitting consultation via API layer..."
);

// =====================================================
// [12.8.5]
// Handles API communication safely.
// =====================================================

try {

    const response =

        await submitConsultation(
            consultationData
        );

    // =====================================================
    // [12.8.6]
    // Validates API response.
    // =====================================================

    if (
        !response.ok
    ) {

        throw new Error(
            "Consultation submission failed."
        );
    }

}
catch (error) {

    // =====================================================
    // [12.8.7]
    // Displays friendly error message.
    // =====================================================

    console.error(
        "API Error:",
        error
    );

    showErrorMessage(
        "Unable to submit consultation. Please try again."
    );

    setTimeout(
    () => {

        clearFeedbackMessage();

    },
    5000
);

// =====================================================
// [12.9.5]
// Unlocks failed submission.
// =====================================================

isSubmitting =
    false;

    // =====================================================
    // [12.8.8]
    // Restores submit button.
    // =====================================================

    submitButton.disabled =
        false;

    submitButton.textContent =
        "Request Consultation";

    // =====================================================
    // [12.8.9]
    // Scrolls user to feedback.
    // =====================================================

    document
        .getElementById(
            "form-feedback"
        )
        ?.scrollIntoView({
            behavior:
                "smooth",
            block:
                "center"
        });

    return;
}

// =====================================================
// [12.7.3]
// Temporary success message.
// =====================================================

showSuccessMessage(
    "Consultation request validated successfully."
);

form.reset();

// =====================================================
// [12.9.6]
// Unlocks successful submission.
// =====================================================

isSubmitting =
    false;


setTimeout(
    async () => {
        document
            .getElementById(
                "form-feedback"
            )
            ?.scrollIntoView({
                behavior:
                    "smooth",
                block:
                    "center"
            });

    },
    300
);

            // =====================================================
            // [12.2.15]
            // Resets form.
            // =====================================================

           //form.reset();

            // =====================================================
// [12.5.4]
// Restores button after successful submission.
// =====================================================

submitButton.disabled =
    false;

submitButton.textContent =
    "Request Consultation";

            // =====================================================
            // [12.3.8]
            // Clears success message.
            // =====================================================

            setTimeout(
                () => {

                    clearFeedbackMessage();

                },
                5000
            );

        },

        5000
    );

            // =====================================================
            // [12.1.8]
            // Collects form values.
            // =====================================================

            const consultationData = {

                fullName:
                    document.getElementById(
                        "full-name"
                    )?.value.trim(),

                email:
                    document.getElementById(
                        "email"
                    )?.value.trim(),

                propertyType:
                    document.getElementById(
                        "property-type"
                    )?.value,

                projectType:
                    document.getElementById(
                        "project-type"
                    )?.value.trim(),

                consultationCategory:
                    document.getElementById(
                        "consultation-category"
                    )?.value,

                projectScale:
                    document.getElementById(
                        "project-scale"
                    )?.value,

                consultationDate:
                    document.getElementById(
                        "consultation-date"
                    )?.value,

                message:
                    document.getElementById(
                        "message"
                    )?.value.trim()
            };

            // =====================================================
            // [12.1.9]
            // Temporary frontend logging.
            // =====================================================

            console.log(
                "Consultation Submitted:",
                consultationData
            );

            // =====================================================
            // [12.2.12]
            // Validates consultation data.
            // =====================================================


        }
    );
}