document.addEventListener('DOMContentLoaded', function() {
    const disclaimerLink = document.getElementById('disclaimer-link');
    const disclaimerModal = document.getElementById('disclaimer-modal');
    const closeModal = document.querySelector('.close-modal');

    disclaimerLink.addEventListener('click', function(e) {
        e.preventDefault();
        disclaimerModal.style.position = 'fixed';
        disclaimerModal.style.top = '50%';
        disclaimerModal.style.left = '50%';
        disclaimerModal.style.transform = 'translate(-50%, -50%)';
        disclaimerModal.style.zIndex = '9999';
        disclaimerModal.style.display = 'block';
    });

    closeModal.addEventListener('click', function() {
        disclaimerModal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target === disclaimerModal) {
            disclaimerModal.style.display = 'none';
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && disclaimerModal.style.display === 'block') {
            disclaimerModal.style.display = 'none';
        }
    });
}); 