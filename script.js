// ========================================
// SELECT ELEMENTS
// ========================================

const galleryItems =
    document.querySelectorAll(".gallery-item");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxTitle =
    document.getElementById("lightboxTitle");

const imageCounter =
    document.getElementById("imageCounter");

const closeBtn =
    document.getElementById("closeBtn");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");


// ========================================
// VARIABLES
// ========================================

let visibleItems = Array.from(galleryItems);

let currentIndex = 0;


// ========================================
// GET VISIBLE IMAGES
// ========================================

function updateVisibleItems() {

    visibleItems = Array.from(galleryItems).filter(
        item => item.style.display !== "none"
    );

}


// ========================================
// OPEN LIGHTBOX
// ========================================

function openLightbox(index) {

    updateVisibleItems();

    if (visibleItems.length === 0) {
        return;
    }


    currentIndex = index;


    const currentItem =
        visibleItems[currentIndex];


    const image =
        currentItem.querySelector("img");


    const title =
        currentItem.querySelector("h3");


    lightboxImage.src = image.src;

    lightboxImage.alt = image.alt;


    if (title) {
        lightboxTitle.textContent =
            title.textContent;
    }


    imageCounter.textContent =
        `${currentIndex + 1} / ${visibleItems.length}`;


    lightbox.classList.add("active");


    document.body.style.overflow = "hidden";
}


// ========================================
// CLOSE LIGHTBOX
// ========================================

function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "auto";
}


// ========================================
// GALLERY IMAGE CLICK
// ========================================

galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        updateVisibleItems();


        const index =
            visibleItems.indexOf(item);


        openLightbox(index);

    });

});


// ========================================
// NEXT IMAGE
// ========================================

function nextImage() {

    updateVisibleItems();


    if (visibleItems.length === 0) {
        return;
    }


    currentIndex++;


    if (currentIndex >= visibleItems.length) {

        currentIndex = 0;

    }


    openLightbox(currentIndex);
}


nextBtn.addEventListener("click", (event) => {

    event.stopPropagation();

    nextImage();

});


// ========================================
// PREVIOUS IMAGE
// ========================================

function previousImage() {

    updateVisibleItems();


    if (visibleItems.length === 0) {
        return;
    }


    currentIndex--;


    if (currentIndex < 0) {

        currentIndex =
            visibleItems.length - 1;

    }


    openLightbox(currentIndex);
}


prevBtn.addEventListener("click", (event) => {

    event.stopPropagation();

    previousImage();

});


// ========================================
// CLOSE BUTTON
// ========================================

closeBtn.addEventListener("click", (event) => {

    event.stopPropagation();

    closeLightbox();

});


// ========================================
// CLICK OUTSIDE IMAGE
// ========================================

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


// ========================================
// CATEGORY FILTER
// ========================================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {


        // Remove active from all buttons

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        // Add active to clicked button

        button.classList.add("active");


        const filter =
            button.getAttribute("data-filter");


        // Show / hide images

        galleryItems.forEach(item => {

            const category =
                item.getAttribute("data-category");


            if (
                filter === "all" ||
                category === filter
            ) {

                item.style.display = "block";

            } else {

                item.style.display = "none";

            }

        });


        updateVisibleItems();

    });

});


// ========================================
// KEYBOARD CONTROLS
// ========================================

document.addEventListener("keydown", event => {

    if (
        !lightbox.classList.contains("active")
    ) {
        return;
    }


    // Right arrow

    if (event.key === "ArrowRight") {

        nextImage();

    }


    // Left arrow

    if (event.key === "ArrowLeft") {

        previousImage();

    }


    // Escape

    if (event.key === "Escape") {

        closeLightbox();

    }

});


// ========================================
// INITIALIZE
// ========================================

updateVisibleItems();
