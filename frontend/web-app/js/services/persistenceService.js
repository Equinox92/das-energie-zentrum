// [6.4.1]
// Defines centralized persistence storage key.
const STORAGE_KEY =
    "dez-engineering-state";

// [6.4.2]
// Saves runtime engineering state safely.
export function saveEngineeringState(
    energyState
) {

    // [6.4.3]
    // Converts runtime state into JSON safely.
    const serializedState =
        JSON.stringify(
            energyState
        );

    // [6.4.4]
    // Persists state into browser storage.
    localStorage.setItem(
        STORAGE_KEY,
        serializedState
    );

    // [6.4.5]
    // Outputs persistence diagnostics.
    console.log(
        "Engineering state saved."
    );
}

// [6.4.6]
// Loads persisted engineering state safely.
export function loadEngineeringState() {

    // [6.4.7]
    // Retrieves serialized runtime state.
    const storedState =
        localStorage.getItem(
            STORAGE_KEY
        );

    // [6.4.8]
    // Prevents invalid restoration states.
    if (!storedState) {

        console.log(
            "No persisted state found."
        );

        return null;
    }

    // [6.4.9]
    // Restores runtime state safely.
    return JSON.parse(
        storedState
    );
}

// [6.4.10]
// Clears persisted engineering state.
export function clearEngineeringState() {

    // [6.4.11]
    // Removes persisted storage safely.
    localStorage.removeItem(
        STORAGE_KEY
    );

    // [6.4.12]
    // Outputs reset diagnostics.
    console.log(
        "Engineering state cleared."
    );
}