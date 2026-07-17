// =====================================================
// [12.4.1]
// FEEDBACK MESSAGE COMPONENT
// =====================================================

// =====================================================
// [12.4.2]
// Displays error message.
// =====================================================

export function showErrorMessage(
    message
) {

    const feedbackElement =
        document.getElementById(
            "form-feedback"
        );

    if (
        !feedbackElement
    ) {

        return;
    }

    feedbackElement.className =
        "form-feedback error";

    feedbackElement.textContent =
        message;

        // =====================================================
// [12.4.7]
// Scrolls feedback into view.
// =====================================================

feedbackElement.scrollIntoView({

    behavior:
        "smooth",

    block:
        "center"
});
}

// =====================================================
// [12.4.3]
// Displays success message.
// =====================================================

export function showSuccessMessage(
    message
) {

    const feedbackElement =
        document.getElementById(
            "form-feedback"
        );

    if (
        !feedbackElement
    ) {

        return;
    }

    feedbackElement.className =
        "form-feedback success";

    feedbackElement.textContent =
        message;

        // =====================================================
// [12.4.7]
// Scrolls feedback into view.
// =====================================================

feedbackElement.scrollIntoView({

    behavior:
        "smooth",

    block:
        "center"
});
}

// =====================================================
// [12.4.4]
// Clears active message.
// =====================================================

export function clearFeedbackMessage() {

    const feedbackElement =
        document.getElementById(
            "form-feedback"
        );

    if (
        !feedbackElement
    ) {

        return;
    }

    feedbackElement.className =
        "form-feedback";

    feedbackElement.textContent =
        "";
}