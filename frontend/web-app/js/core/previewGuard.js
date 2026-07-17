console.log("Preview Guard Loaded");

// =====================================================
// [1.1.1]
// Prevents unauthorized access to preview pages.
// =====================================================

const isAuthenticated =
    sessionStorage.getItem(
        "previewAuthenticated"
    );

// =====================================================
// [1.1.2]
// Redirects unauthorized visitors.
// =====================================================

if (!isAuthenticated) {

    window.location.href =
        "login.php";

}