// glass_drawer.js - Implementing swipe gesture detection for touch devices

// Define the user variable (ensure it is always defined)
const user = {}; // Replace this with actual user data

// Function to detect swipe gestures
let startY = 0;
let currentY = 0;

function handleTouchStart(event) {
    startY = event.touches[0].clientY;
}

function handleTouchMove(event) {
    currentY = event.touches[0].clientY;
}

function handleTouchEnd() {
    const deltaY = currentY - startY;
    if (user) { // Ensure user is defined
        if (deltaY < -50) {
            expandDrawer(); // Swipe up to expand
        } else if (deltaY > 50) {
            collapseDrawer(); // Swipe down to collapse
        }
    }
}

function expandDrawer() {
    // Logic to expand the drawer (Mode Chat)
    console.log('Expanding the glass drawer to show chat mode.');
    requestAnimationFrame(() => {
        // Animate expansion
    });
}

function collapseDrawer() {
    // Logic to collapse the drawer (Mode Video)
    console.log('Collapsing the glass drawer to show video mode.');
    requestAnimationFrame(() => {
        // Animate collapse
    });
}

// Adding event listeners for touch events
document.addEventListener('touchstart', handleTouchStart);
document.addEventListener('touchmove', handleTouchMove);
document.addEventListener('touchend', handleTouchEnd);
