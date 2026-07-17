// =====================================================
// [12.9.1]
// CONSULTATION SUMMARY COMPONENT
// =====================================================

import {
    generateReferenceNumber
}
from "../utils/referenceGenerator.js";


// =====================================================
// [12.11.5]
// Renders consultation summary.
// =====================================================

export function renderConsultationSummary(
    consultationData
) {

    const summaryElement =
        document.getElementById(
            "consultation-summary"
        );

    if (!summaryElement) {

        return;
    }

    // =====================================================
    // [12.11.6]
    // Generates temporary reference.
    // =====================================================

    const referenceNumber =
        `DEZ-${Date.now()}`;

    // =====================================================
    // [12.11.7]
    // Builds summary HTML.
    // =====================================================

    summaryElement.innerHTML = `

        <h3>

            Consultation Request Received

        </h3>

        <p>

            <strong>Reference:</strong>

            ${referenceNumber}

        </p>

        <p>

            <strong>Name:</strong>

            ${consultationData.fullName}

        </p>

        <p>

            <strong>Email:</strong>

            ${consultationData.email}

        </p>

        <p>

            <strong>Category:</strong>

            ${consultationData.consultationCategory}

        </p>

        <p>

            <strong>Project Scale:</strong>

            ${consultationData.projectScale}

        </p>

        <p>

            <strong>Date:</strong>

            ${consultationData.consultationDate}

        </p>
    `;

    // =====================================================
    // [12.11.8]
    // Reveals summary card.
    // =====================================================

   summaryElement.style.display =
    "block";

requestAnimationFrame(() => {

    summaryElement.classList.add(
        "active"
    );

    summaryElement.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });

});
}