document.addEventListener("DOMContentLoaded", () => {
    const starsContainer = document.createElement("div");
    starsContainer.classList.add("stars-container");
    document.body.appendChild(starsContainer);

    const numberOfStars = 100; // Adjust the number of stars as needed

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement("div");
        star.classList.add("star");
        const size = Math.random() * 3 + 1; // Random size between 1 and 4
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${Math.random() * 100}vh`; // Random vertical position
        star.style.left = `${Math.random() * 100}vw`; // Random horizontal position
        starsContainer.appendChild(star);
    }
}); 