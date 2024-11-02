function typeText(element, text, delay = 200) {
    let index = 0;

    const type = () => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, delay);
        }
    };

    type();
}

// Initialize the typing animation
document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.getElementById('typing-animation');
    const textToType = 'justice'; // Text to animate
    typeText(typingElement, textToType);
}); 