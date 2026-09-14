javascript
// ================================
// SELECT ELEMENTS
// ================================

const galleryItems = document.querySelectorAll(".gallery-item");
const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");


// ================================
// VARIABLES
// ================================

let visibleItems = [];
let currentIndex = 0;


// ================================
// UPDATE VISIBLE ITEMS
// ================================

function updateVisibleItems() {
    visibleItems = Array.from(galleryItems).filter(item => {
        return item.style.display !== "none";
    });
}


// ================================
// FILTER GALLERY
// ================================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active class
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Add active class
        button.classList.add("active");

        const filter = button.getAttribute("data-filter");

        galleryItems.forEach(item => {

            const category = item.getAttribute("data-category");

            if (filter === "all" || category === filter) {

                item.style.display = "block";

                // Small animation
                item.style.animation = "none";

                setTimeout(() => {
                    item.style.animation = "fadeIn 0.5s ease";
                }, 10);

            } else {

                item.style.display = "none";

            }

        });

        updateVisibleItems();
    });

});


// ================================
// OPEN LIGHTBOX
// ================================

galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        updateVisibleItems();

        currentIndex = visibleItems.indexOf(item);

        openLightbox();

    });

});


// ================================
// OPEN LIGHTBOX FUNCTION
// ================================

function openLightbox() {

    if (visibleItems.length === 0) {
        return;
    }

    const item = visibleItems[currentIndex];

    const image = item.querySelector("img");
    const title = item.querySelector("h3");

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    if (title) {
        lightboxTitle.textContent = title.textContent;
    }

    lightbox.classList.add("active");

    // Stop page scrolling
    document.body.style.overflow = "hidden";
}


// ================================
// CLOSE LIGHTBOX
// ================================

function closeLightbox() {

    lightbox.classList.remove("active");

    // Enable page scrolling
    document.body.style.overflow = "auto";
}

closeBtn.addEventListener("click", closeLightbox);


// ================================
// NEXT IMAGE
// ================================

function showNext() {

    if (visibleItems.length === 0) {
        return;
    }

    currentIndex++;

    // Go back to first image
    if (currentIndex >= visibleItems.length) {
        currentIndex = 0;
    }

    openLightbox();
}

nextBtn.addEventListener("click", showNext);


// ================================
// PREVIOUS IMAGE
// ================================

function showPrevious() {

    if (visibleItems.length === 0) {
        return;
    }

    currentIndex--;

    // Go to last image
    if (currentIndex < 0) {
        currentIndex = visibleItems.length - 1;
    }

    openLightbox();
}

prevBtn.addEventListener("click", showPrevious);


// ================================
// CLOSE WHEN CLICKING OUTSIDE IMAGE
// ================================

lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {
        closeLightbox();
    }

});


// ================================
// KEYBOARD NAVIGATION
// ================================

document.addEventListener("keydown", (e) => {

    // Only work when lightbox is open
    if (!lightbox.classList.contains("active")) {
        return;
    }

    // Right arrow
    if (e.key === "ArrowRight") {
        showNext();
    }

    // Left arrow
    if (e.key === "ArrowLeft") {
        showPrevious();
    }

    // Escape
    if (e.key === "Escape") {
        closeLightbox();
    }

});


// ================================
// IMAGE FADE ANIMATION
// ================================

const style = document.createElement("style");

style.innerHTML = 
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.95);
        }

        to {
            opacity: 1;
            transform: scale(1);
        }
    };

document.head.appendChild(style);


// ================================
// INITIALIZE
// ================================

updateVisibleItems();
