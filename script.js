 let toggle = document.getElementById('toggle');
 let labelToggle = document.getElementById('labelToggle');
 toggle.addEventListener('change', (event) =>{
     let checked = event.target.checked;
     document.body.classList.toggle('light-mode');
     if(checked){
         labelToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
         labelToggle.style.color = "#8B5CF6";
     }
     else{
         labelToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
         labelToggle.style.color = "white";
     }
})

document.addEventListener("DOMContentLoaded", () => {

    const carousels = document.querySelectorAll(".project-carousel");

    carousels.forEach(carousel => {

        const slides = carousel.querySelectorAll(".carousel-slide");
        const prev = carousel.querySelector(".carousel-prev");
        const next = carousel.querySelector(".carousel-next");
        const dotsContainer = carousel.querySelector(".carousel-dots");

        let currentIndex = 0;
        let dots = [];

        function showSlide(index) {
            currentIndex = (index + slides.length) % slides.length;

            slides.forEach((slide, i) => {
                slide.classList.toggle("active", i === currentIndex);
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle("active", i === currentIndex);
            });
        }

        slides.forEach((slide, index) => {
            const dot = document.createElement("button");

            dot.type = "button";
            dot.classList.add("carousel-dot");
            dot.setAttribute("aria-label", `Show image ${index + 1}`);

            dot.addEventListener("click", () => {
                showSlide(index);
            });

            dotsContainer.appendChild(dot);
        });

        dots = dotsContainer.querySelectorAll(".carousel-dot");

        if (slides.length <= 1) {
            prev.style.display = "none";
            next.style.display = "none";
            dotsContainer.style.display = "none";
            return;
        }

        prev.addEventListener("click", () => {
            showSlide(currentIndex - 1);
        });

        next.addEventListener("click", () => {
            showSlide(currentIndex + 1);
        });

        let touchStartX = 0;

        carousel.addEventListener("touchstart", (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carousel.addEventListener("touchend", (e) => {
            const difference =
                e.changedTouches[0].screenX - touchStartX;

            if (Math.abs(difference) > 50) {
                showSlide(currentIndex + (difference < 0 ? 1 : -1));
            }
        }, { passive: true });

        showSlide(0);
    });
});