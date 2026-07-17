// =====================================================
// [12.10.1]
// CONSULTATION REFERENCE GENERATOR
// =====================================================

export function generateReferenceNumber() {

    // =====================================================
    // [12.10.2]
    // Creates random numeric identifier.
    // =====================================================

    const randomNumber =

        Math.floor(
            1000 +
            Math.random() * 9000
        );

    // =====================================================
    // [12.10.3]
    // Returns professional reference.
    // =====================================================

    return `DEZ-2026-${randomNumber}`;
}