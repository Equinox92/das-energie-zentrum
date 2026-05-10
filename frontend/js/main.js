// [3.3.1]
// Imports backend health-check service layer.
import { checkApiHealth } from "./services/healthService.js";

// [3.3.2]
// Imports interactive SVG house loader system.
import { loadInteractiveHouse } from "./ui/houseLoader.js";

// [3.3.3]
// Waits until full HTML document is loaded before running application logic.
document.addEventListener("DOMContentLoaded", async () => {

    // [3.3.4]
    // Loads scalable interactive SVG house component.
    await loadInteractiveHouse();

    // [3.3.5]
    // Retrieves API status display element.
    const apiStatusElement =
        document.getElementById("api-status");

    try {

        // [3.3.6]
        // Requests backend API health data.
        const response =
            await checkApiHealth();

        // [3.3.7]
        // Displays successful backend connection status.
        apiStatusElement.textContent =
            `Backend Connected: ${response.data.status}`;

    } catch (error) {

        // [3.3.8]
        // Displays graceful frontend failure message.
        apiStatusElement.textContent =
            "Backend connection failed.";

        // [3.3.9]
        // Outputs detailed debugging information safely.
        console.error(error);
    }
});