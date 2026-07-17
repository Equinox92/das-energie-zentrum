// [3.7.1]
// Loads interactive SVG house component dynamically.
export async function loadInteractiveHouse() {

    // [3.7.2]
    // Requests SVG component markup file.
    const response = await fetch(
        "./components/interactive-house.html"
    );

    // [3.7.3]
    // Converts component response into HTML text.
    const componentHtml = await response.text();

    // [3.7.4]
    // Retrieves component container element.
    const container = document.getElementById(
        "interactive-house-container"
    );

    // [3.7.5]
    // Injects component into application UI.
    container.innerHTML = componentHtml;
}