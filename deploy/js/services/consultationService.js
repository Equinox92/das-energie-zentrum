/* =====================================================
   [12.1.6]
   CONSULTATION SERVICE

   Service Layer

===================================================== */

/* =====================================================
   [12.1.7]
   Simulates submission.

   Future:

   - API integration
   - CRM integration
   - Email routing
===================================================== */

export function submitConsultation(
    formData
) {

    console.log(
        "Consultation Submitted:",
        formData
    );

    alert(
        "Consultation request submitted successfully."
    );
}