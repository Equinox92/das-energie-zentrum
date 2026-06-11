/* =====================================================
   [12.1.4]
   CONSULTATION VALIDATOR

   Validation Layer

===================================================== */

/* =====================================================
   [12.1.5]
   Validates consultation form.
===================================================== */

export function validateConsultationForm(
    formData
) {

    if (
        !formData.fullName.trim()
    ) {

        return {

            isValid:
                false,

            message:
                "Full name is required."
        };
    }

    if (
        !formData.email.trim()
    ) {

        return {

            isValid:
                false,

            message:
                "Email is required."
        };
    }

    if (
        !formData.message.trim()
    ) {

        return {

            isValid:
                false,

            message:
                "Message is required."
        };
    }

    return {

        isValid:
            true,

        message:
            ""
    };
}