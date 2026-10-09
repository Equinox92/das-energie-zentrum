// =====================================================
// [14.1.1]
// Determines whether the current device supports hover.
// =====================================================

export function supportsHover() {

    return window.matchMedia("(hover: hover)").matches;

}

// =====================================================
// [14.1.2]
// Determines whether the current device primarily uses touch.
// =====================================================

export function isTouchDevice() {

    return window.matchMedia("(hover: none)").matches;

}

// =====================================================
// [14.1.3]
// Determines whether the viewport is mobile sized.
// =====================================================

export function isMobileViewport() {

    return window.innerWidth <= 768;

}

// =====================================================
// [14.1.4]
// Determines whether the viewport is tablet sized.
// =====================================================

export function isTabletViewport() {

    return window.innerWidth > 768 &&
           window.innerWidth <= 1024;

}

// =====================================================
// [14.1.5]
// Returns a readable device profile.
// =====================================================

export function getDeviceProfile() {

    return {

        hover: supportsHover(),

        touch: isTouchDevice(),

        mobile: isMobileViewport(),

        tablet: isTabletViewport()

    };

}