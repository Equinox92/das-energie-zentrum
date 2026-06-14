// =====================================================
// [12.2.11]
// Consultation validator.
// =====================================================

import {
    validateConsultationForm
}
from "../validators/consultationValidator.js";

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
    () => {

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

            showSuccessMessage(
                "Consultation request validated successfully."
            );

            setTimeout(
    () => {

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

            form.reset();

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

        1000
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