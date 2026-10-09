// =====================================================
// [3.7.1]
// Loads the interactive SVG house component dynamically.
// =====================================================

export async function loadInteractiveHouse() {

    // =================================================
    // [3.7.2]
    // Request the SVG house component from the server.
    //
    // fetch() returns a Response object rather than
    // the actual HTML content.
    // =================================================

    const response = await fetch(
        "./components/interactive-house.html"
    );


    // =================================================
    // [3.7.3]
    // Verify that the HTTP request succeeded.
    //
    // A failed HTTP response does not automatically
    // cause fetch() to throw an exception.
    //
    // Example:
    // 404 → fetch() can still resolve successfully.
    //
    // response.ok prevents us from injecting an
    // invalid or missing component into the page.
    // =================================================

    if (!response.ok) {

        throw new Error(
            `Failed to load interactive house: ${response.status}`
        );

    }


    // =================================================
    // [3.7.4]
    // Convert the HTTP response body into HTML text.
    // =================================================

    const componentHtml =
        await response.text();


    // =================================================
    // [3.7.5]
    // Locate the dedicated component container.
    //
    // The loader should only be responsible for the
    // house component and should not search for or
    // manipulate unrelated application elements.
    // =================================================

    const container =
        document.getElementById(
            "interactive-house-container"
        );


    // =================================================
    // [3.7.6]
    // Validate that the required container exists.
    //
    // Without this check, container.innerHTML would
    // produce a confusing null-reference error.
    // =================================================

    if (!container) {

        throw new Error(
            "Interactive house container was not found."
        );

    }


    // =================================================
    // [3.7.7]
    // Inject the loaded SVG component into the page.
    //
    // At this point the SVG becomes part of the DOM.
    // This is important because the interaction engine
    // must NOT attempt to bind events before this step.
    // =================================================

    container.innerHTML =
        componentHtml;


    // =================================================
    // [3.7.8]
    // Retrieve the SVG root element that was just loaded.
    //
    // Returning the element creates a clean contract:
    //
    // Loader:
    // "I load the house and return it."
    //
    // Interaction Engine:
    // "I receive the house and make it interactive."
    // =================================================

    const house =
        container.querySelector(
            "#interactive-house"
        );


    // =================================================
    // [3.7.9]
    // Validate that the SVG was actually present inside
    // the loaded component.
    // =================================================

    if (!house) {

        throw new Error(
            "Interactive house SVG was not found."
        );

    }


    // =================================================
    // [3.7.10]
    // Return the loaded SVG element to the caller.
    // =================================================

    return house;

}