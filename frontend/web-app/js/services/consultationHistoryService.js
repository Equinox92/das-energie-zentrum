// =====================================================
// [12.10.1]
// CONSULTATION HISTORY SERVICE
// =====================================================

// =====================================================
// [12.10.2]
// Storage key.
// =====================================================

const STORAGE_KEY =
    "dez_consultation_history";

// =====================================================
// [12.10.3]
// Saves consultation record.
// =====================================================

export function saveConsultationRecord(
    consultationData
) {

    // =====================================================
    // [12.10.4]
    // Retrieves existing history.
    // =====================================================

    const history =

        JSON.parse(
            localStorage.getItem(
                STORAGE_KEY
            )
        ) || [];

    // =====================================================
    // [12.10.5]
    // Creates consultation record.
    // =====================================================

    const record = {

        ...consultationData,

        submittedAt:
            new Date()
                .toISOString()
    };

    // =====================================================
    // [12.10.6]
    // Adds newest record.
    // =====================================================

    history.unshift(
        record
    );

    // =====================================================
    // [12.10.7]
    // Saves history.
    // =====================================================

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(
            history
        )
    );

    // =====================================================
    // [12.10.8]
    // Outputs audit log.
    // =====================================================

    console.log(

        "Consultation Saved:",

        record
    );
}

// =====================================================
// [12.11.1]
// Retrieves consultation history.
// =====================================================

export function getConsultationHistory() {

    // =====================================================
    // [12.11.2]
    // Reads stored consultation history.
    // =====================================================

    return (

        JSON.parse(

            localStorage.getItem(
                STORAGE_KEY
            )

        )

        ||

        []

    );
}

// =====================================================
// [12.11.3]
// Retrieves latest consultation.
// =====================================================

export function getLatestConsultation() {

    // =====================================================
    // [12.11.4]
    // Retrieves all history safely.
// =====================================================

    const history =

        getConsultationHistory();

    // =====================================================
    // [12.11.5]
    // Returns newest consultation.
// =====================================================

    return history[0] || null;
}

// =====================================================
// [12.11.6]
// Counts consultation requests.
// =====================================================

export function getConsultationCount() {

    // =====================================================
    // [12.11.7]
    // Returns stored record count.
// =====================================================

    return getConsultationHistory() .length;

}
