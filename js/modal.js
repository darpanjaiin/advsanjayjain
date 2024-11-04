document.addEventListener('DOMContentLoaded', function() {
    const disclaimerModal = document.getElementById('disclaimer-modal');
    const acceptButton = document.getElementById('accept-disclaimer');
    const declineButton = document.getElementById('decline-disclaimer');

    // Show modal automatically when page loads
    disclaimerModal.style.display = 'block'; // Show the modal

    // Accept button functionality
    acceptButton.addEventListener('click', function() {
        setCookie('disclaimerAccepted', 'true', 30); // Set cookie for 30 days
        disclaimerModal.style.display = 'none'; // Hide the modal
    });

    // Decline button functionality
    declineButton.addEventListener('click', function() {
        window.location.href = 'decline.html'; // Redirect to the decline page
    });
});

// Cookie management functions
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
}

function getCookie(name) {
    return document.cookie.split('; ').reduce((r, c) => {
        const [key, val] = c.split('=');
        return key === name ? decodeURIComponent(val) : r;
    }, '');
} 