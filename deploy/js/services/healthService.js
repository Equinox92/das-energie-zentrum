// [3.4.1]
// Defines backend API base URL.
const API_BASE_URL = "https://localhost:7143";

// [3.4.2]
// Requests backend health endpoint data.
export async function checkApiHealth() {

    // [3.4.3]
    // Sends HTTP GET request to backend API.
    const response = await fetch(
        `${API_BASE_URL}/api/Health`
    );

    // [3.4.4]
    // Throws error for failed HTTP responses.
    if (!response.ok) {
        throw new Error(
            `API Error: ${response.status}`
        );
    }

    // [3.4.5]
    // Converts response into JSON object.
    return await response.json();
}