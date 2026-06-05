// =====================================================
// [9.7.9]
// Updates dynamic service information panel.
// =====================================================

export function updateServicePanel(
    hotspot
) {

    // =====================================================
    // [9.7.10]
    // Retrieves panel elements safely.
    // =====================================================

    const titleElement =
        document.getElementById(
            "service-panel-title"
        );

    const descriptionElement =
        document.getElementById(
            "service-panel-description"
        );

    const listElement =
        document.getElementById(
            "service-panel-list"
        );

    // =====================================================
    // [9.7.11]
    // Prevents invalid UI updates.
    // =====================================================

    if (
        !titleElement ||
        !descriptionElement ||
        !listElement
    ) {

        return;
    }

    // =====================================================
    // [9.7.12]
    // Updates title safely.
    // =====================================================

    titleElement.textContent =
        hotspot.title;

    // =====================================================
    // [9.7.13]
    // Updates description safely.
    // =====================================================

    descriptionElement.textContent =
        hotspot.description;

    // =====================================================
    // [9.7.14]
    // Clears previous services.
    // =====================================================

    listElement.innerHTML = "";

    // =====================================================
    // [9.7.15]
    // Renders available services.
    // =====================================================

// =====================================================
// [9.9.1]
// Renders professional service cards.
// =====================================================

hotspot.services.forEach(
    service => {

        // =====================================================
        // [9.9.2]
        // Creates service card container.
        // =====================================================

        const card =
            document.createElement(
                "li"
            );

        card.classList.add(
            "service-card-item"
        );

        // =====================================================
        // [9.9.3]
        // Creates service title.
        // =====================================================

        const title =
            document.createElement(
                "h4"
            );

        title.textContent =
            service;

        // =====================================================
        // [9.9.4]
        // Creates service summary.
        // =====================================================

        const summary =
            document.createElement(
                "p"
            );

        summary.textContent =
            "Professional consultation available.";

        // =====================================================
        // [9.9.5]
        // Builds service card.
        // =====================================================

        card.appendChild(
            title
        );

        card.appendChild(
            summary
        );

        // =====================================================
        // [9.9.6]
        // Adds card to panel.
        // =====================================================

        listElement.appendChild(
            card
        );
    }
);
}