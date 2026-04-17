/**
 * STAR GEMS REDESIGN - Core Functionality
 * This file handles all interactive elements for the catalog and product details pages.
 * Organized by features for readability.
 */

/* ==========================================================================
   1. GLOBAL UI INTERACTIONS (Navbar, Animations, Notifications)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Reveal elements as they scroll into view
    setupScrollAnimations();

    // Auto-initialize product details if we are on that page
    initProductDetails();
});

/**
 * Adds 'active' class to elements with '.reveal-on-scroll' when they enter viewport
 */
function setupScrollAnimations() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
}

/**
 * Navbar background effect on scroll
 */
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (nav) {
        window.scrollY > 50 ? nav.classList.add('nav-scrolled') : nav.classList.remove('nav-scrolled');
    }
});

/**
 * Generic Toast notification for user feedback (e.g., Wishlist)
 */
function showToast(message) {
    const toastEl = document.getElementById('toastEl');
    const toastMsg = document.getElementById('toastMsg');
    if (toastEl && toastMsg) {
        toastMsg.textContent = message;
        const bsToast = new bootstrap.Toast(toastEl);
        bsToast.show();
    }
}


/* ==========================================================================
   2. PRODUCT CATALOG LOGIC (Collection Page)
   ========================================================================== */

/**
 * Changes the metal color for a product card in the grid
 * Also updates the hover image to match the selected metal.
 */
function changeMetal(btn, newSrc) {
    const card = btn.closest('.product-card');
    const mainImg = card.querySelector('.main-ring-img');
    const hoverImg = card.querySelector('.hover-img');
    const dots = btn.parentElement.querySelectorAll('.dot');

    // Update the active state of the dots
    dots.forEach(d => d.classList.remove('active'));
    btn.classList.add('active');

    if (mainImg && newSrc) {
        mainImg.src = newSrc;
        mainImg.style.opacity = ''; // Ensure CSS can handle hover/transition

        // If it's a standard asset, guess the hover image path (-V1)
        if (hoverImg && newSrc.includes('assets/img/32321')) {
            hoverImg.src = newSrc.replace('.webp', '-V1.webp');
        }

        if (hoverImg) hoverImg.style.opacity = '';
    }
}

/**
 * Handle Wishlist toggle with a small bounce animation
 */
function wish(btn) {
    btn.classList.toggle('liked');
    const isLiked = btn.classList.contains('liked');

    if (isLiked) {
        btn.style.transform = 'scale(1.3)';
        setTimeout(() => btn.style.transform = '', 200);
    }

    showToast(isLiked ? '♥ Added to wishlist' : 'Removed from wishlist');

    const icon = btn.querySelector('svg');
    if (icon) icon.setAttribute('fill', isLiked ? 'currentColor' : 'none');
}

function goDetail() {
    window.location.href = 'product-details.html';
}


/* ==========================================================================
   3. PRODUCT DETAIL PAGE LOGIC (Options & Gallery)
   ========================================================================== */

// Store user selections
let currentStoneShape = 'Round';
let currentStoneMetal = '14k Rose Gold';
let currentSKU = '32321'; // Default starting SKU

/**
 * Initialize SKU - prioritizes hardcoded window.PRODUCT_SKU (for separate HTML files)
 * then falls back to URL query parameters.
 */
function initSKU() {
    // 1. Check if hardcoded in the HTML file
    if (window.PRODUCT_SKU) {
        currentSKU = window.PRODUCT_SKU;
    }
    // 2. Otherwise check for ?sku= in the URL
    else {
        const params = new URLSearchParams(window.location.search);
        const sku = params.get('sku');
        if (sku) currentSKU = sku;
    }
}

/**
 * Main function to update all images on the detail page based on current selection.
 */
function updateProductGallery() {
    const mainImg = document.getElementById('productMainImg');
    const ring3dImg = document.getElementById('ring3d');
    if (!mainImg) return;

    let shape = currentStoneShape.toLowerCase();
    if (shape === 'marquee') shape = 'marquise'; // Typo correction

    // Determine Metal Code: W=White, Y=Yellow, R=Rose
    let mCode = 'R';
    if (currentStoneMetal.toLowerCase().includes('white')) mCode = 'W';
    else if (currentStoneMetal.toLowerCase().includes('yellow')) mCode = 'Y';

    // Build the folder path (Standard Nested Structure: SKU -> Shape -> File)
    const folderPath = `assets/img/${currentSKU}/${shape}/${currentSKU}-${shape}-${mCode}`;

    // 1. Update Hero Image
    mainImg.src = folderPath + '.webp';
    if (ring3dImg) ring3dImg.src = mainImg.src;

    // 2. Update Gallery Thumbnails with automatic JPG fallback
    const setAsset = (id, base) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.src = base + ".webp";
        el.onerror = function () { // Fallback if .webp doesn't exist
            if (this.src.endsWith(".webp")) this.src = base + ".jpg";
            else this.onerror = null;
        };
    };

    setAsset('detailImg1', folderPath + "-V1");
    setAsset('detailImg2', folderPath + "-V2");
    setAsset('detailImg3', folderPath + "-V3");
    setAsset('detailImg4', folderPath + "-V4");

    // 3. Update Lifestyle Model Images
    // --- SMART MODEL MAPPING ---
    // Lifestyle images vary in metal tags across different SKUs and shapes.
    // This table ensures we always pick the correct available assets.
    const modelMappings = {
        '32321': {
            'cushion': 'Y',
            'pear': 'Y',
            'emerald': 'W',
            'marquise': 'W'
        },
        '21923': {
            'round': 'Y',
            'radiant': 'W',
            'emerald': 'W',
            'marquise': 'Y'
        },
        '26082': {
            'round': 'W',
            'cushion': 'Y',
            'pear': 'Y',
            'marquise': 'W'
        }
    };

    // Get the mapping for the current SKU or use an empty object
    const skuMap = modelMappings[currentSKU] || {};
    // Get the metal code for this shape, default to 'R' if not in map
    const modelMetalCode = skuMap[shape] || 'R';

    // Marquise images use a different suffix (-M-1 vs -M1)
    const m1Suffix = (shape === 'marquise') ? '-M-1' : '-M1';

    // Model images are stored within the shape subfolder
    const modelBase = `assets/img/${currentSKU}/${shape}/${currentSKU}-${shape}-${modelMetalCode}`;

    setAsset('detailImg5', modelBase + "-M");
    setAsset('detailImg6', modelBase + m1Suffix);
}

/**
 * Selection handlers for Shape, Metal, Carat, Weight
 */
function pickShape(btn, label) {
    document.querySelectorAll('#shapeGrid .shape-box').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentStoneShape = label;
    const labelEl = document.getElementById('shapeLbl');
    if (labelEl) labelEl.textContent = label;
    updateProductGallery();
}

function pickMetal(btn, label) {
    // Sync both the 'Swatch' and 'Circle' UI styles
    const allSwatches = document.querySelectorAll('.metal-swatch');
    const allCircles = document.querySelectorAll('.metal-circle');

    allSwatches.forEach(s => s.classList.remove('on'));
    allCircles.forEach(c => c.classList.remove('active'));

    if (btn.classList.contains('metal-swatch')) btn.classList.add('on');
    else btn.classList.add('active');

    // Sync the "other" UI component (if circle clicked, find swatch and vice-versa)
    const normalized = label.toLowerCase();
    const findIndex = normalized.includes('white') ? 0 : (normalized.includes('yellow') ? 1 : 2);
    allSwatches[findIndex]?.classList.add('on');
    allCircles[findIndex]?.classList.add('active');

    currentStoneMetal = label;
    const labelEl = document.getElementById('metalLbl');
    if (labelEl) labelEl.textContent = label;
    updateProductGallery();
}

function pickWeight(btn, price, label) {
    btn.parentElement.querySelectorAll('.sidestone-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const priceEl = document.getElementById('productPrice');
    if (priceEl) priceEl.textContent = price;

    const labelEl = document.getElementById('sidestoneWeightLbl');
    if (labelEl) labelEl.textContent = label;
}

function pickCarat(btn, label) {
    btn.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const labelEl = document.getElementById('caratLbl');
    if (labelEl) labelEl.textContent = label;
}

/**
 * Swap clicked thumbnail with the main Hero image
 */
function setupGallerySwapping() {
    document.querySelectorAll('.gallery-story-item img').forEach(img => {
        if (img.id === 'productMainImg' || img.id === 'ring3d') return;
        img.addEventListener('click', function () {
            const mainImg = document.getElementById('productMainImg');
            if (!mainImg) return;
            const clickedSrc = this.src;
            const mainSrc = mainImg.src;

            mainImg.style.opacity = '0.5';
            setTimeout(() => {
                mainImg.src = clickedSrc;
                this.src = mainSrc;
                mainImg.style.opacity = '1';
                // Sync 3D viewer if present
                const ring3d = document.getElementById('ring3d');
                if (ring3d) ring3d.src = clickedSrc;
            }, 150);
        });
    });
}

/**
 * Run standard initiations for the detail page
 */
function initProductDetails() {
    initSKU();
    setupGallerySwapping();

    // Auto-select starting shape
    const activeShape = document.querySelector('#shapeGrid .shape-box.active');
    if (activeShape) {
        const text = activeShape.querySelector('span')?.textContent || 'Round';
        pickShape(activeShape, text);
    }
}


/* ==========================================================================
   4. 3D VIEWER & INTERACTIVITY (iJewel3D Mockup)
   ========================================================================== */

function toggle3D() {
    const img = document.getElementById('productMainImg');
    const viewer = document.getElementById('ring3DViewer');
    const btn = document.getElementById('btn3d');

    const isShowing = viewer && viewer.style.display !== 'none';

    if (!isShowing) {
        if (img) img.style.display = 'none';
        if (viewer) viewer.style.display = 'block';
        if (btn) btn.querySelector('span').textContent = 'Exit 3D';
    } else {
        if (img) img.style.display = 'block';
        if (viewer) viewer.style.display = 'none';
        if (btn) btn.querySelector('span').textContent = '3D View';
    }
}

// Drag logic for the CSS-based 3D ring mockup
(function setupRingDrag() {
    let ringDragging = false, lastX = 0, lastY = 0, rotY = 0, rotX = 8;

    const onStart = (e) => {
        const scene = document.getElementById('ringImgScene');
        if (scene && scene.contains(e.target)) {
            ringDragging = true;
            lastX = e.clientX || e.touches[0].clientX;
            lastY = e.clientY || e.touches[0].clientY;
        }
    };

    const onMove = (e) => {
        if (!ringDragging) return;
        const ring = document.getElementById('ring3d');
        const x = e.clientX || e.touches?.[0]?.clientX;
        const y = e.clientY || e.touches?.[0]?.clientY;

        rotY += (x - lastX) * 0.5;
        rotX -= (y - lastY) * 0.3;
        rotX = Math.max(-25, Math.min(35, rotX));

        lastX = x; lastY = y;
        if (ring) ring.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg)`;
    };

    document.addEventListener('mousedown', onStart);
    document.addEventListener('touchstart', onStart, { passive: true });
    document.addEventListener('mousemove', onMove);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('mouseup', () => ringDragging = false);
    document.addEventListener('touchend', () => ringDragging = false);
})();


/* ==========================================================================
   5. IMAGE MAGNIFICATION (Zoom Lens)
   ========================================================================== */

function moveLens(e) {
    const lens = document.getElementById('zoomLens');
    const img = document.getElementById('productMainImg');
    const result = document.getElementById('zoomResult');
    const container = document.getElementById('mainImageContainer');

    if (!lens || !img || !result || !container) return;

    // Disable zoom if 3D viewer is active
    const viewer = document.getElementById('ring3DViewer');
    if (viewer && viewer.style.display === 'block') return;

    lens.style.display = 'block';
    result.style.display = 'block';

    const rect = container.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    // Bounds checking
    const lw = lens.offsetWidth, lh = lens.offsetHeight;
    x = Math.max(lw / 2, Math.min(x, container.offsetWidth - lw / 2));
    y = Math.max(lh / 2, Math.min(y, container.offsetHeight - lh / 2));

    lens.style.left = (x - lw / 2) + 'px';
    lens.style.top = (y - lh / 2) + 'px';

    // Zoom math
    const cx = result.offsetWidth / lw;
    const cy = result.offsetHeight / lh;
    result.style.backgroundImage = `url('${img.src}')`;
    result.style.backgroundSize = (img.width * cx) + 'px ' + (img.height * cy) + 'px';
    result.style.backgroundPosition = `-${(x - lw / 2) * cx}px -${(y - lh / 2) * cy}px`;
}

function hideLens() {
    const lens = document.getElementById('zoomLens');
    const result = document.getElementById('zoomResult');
    if (lens) lens.style.display = 'none';
    if (result) result.style.display = 'none';
}


/* ==========================================================================
   6. VIRTUAL TRY-ON MODULE
   ========================================================================== */

let tryRotation = 0, tryScale = 1;

function startVirtualTry() {
    const jewelry = document.getElementById('jewelryDraggable');
    const mainImg = document.getElementById('productMainImg');
    const tryImg = document.getElementById('jewelryImgForTry');

    if (mainImg) tryImg.src = mainImg.src;
    if (jewelry) {
        jewelry.style.display = 'block';
        jewelry.style.left = '50%';
        jewelry.style.top = '50%';
    }
}

function handleHandUpload(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('userPhotoContainer').innerHTML = `<img src="${e.target.result}">`;
            document.getElementById('startTryBtn').style.display = 'inline-block';
        };
        reader.readAsDataURL(input.files[0]);
    }
}

/**
 * Draggable implementation for the virtual ring
 */
(function setupDraggable() {
    const box = document.getElementById('jewelryDraggable');
    if (!box) return;
    let isDragging = false, startX, startY, initX, initY;

    const begin = (e) => {
        isDragging = true;
        startX = e.clientX || e.touches[0].clientX;
        startY = e.clientY || e.touches[0].clientY;
        initX = box.offsetLeft;
        initY = box.offsetTop;
    };

    const move = (e) => {
        if (!isDragging) return;
        const x = e.clientX || e.touches?.[0]?.clientX;
        const y = e.clientY || e.touches?.[0]?.clientY;
        box.style.left = (initX + (x - startX)) + 'px';
        box.style.top = (initY + (y - startY)) + 'px';
        box.style.transform = `translate(0, 0) scale(${tryScale}) rotate(${tryRotation}deg)`;
    };

    box.addEventListener('mousedown', begin);
    box.addEventListener('touchstart', begin);
    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move);
    window.addEventListener('mouseup', () => isDragging = false);
    window.addEventListener('touchend', () => isDragging = false);

    // Controls
    document.querySelector('.zoom-in').onclick = () => { tryScale += 0.1; box.style.transform = `scale(${tryScale}) rotate(${tryRotation}deg)`; };
    document.querySelector('.zoom-out').onclick = () => { tryScale -= 0.1; box.style.transform = `scale(${tryScale}) rotate(${tryRotation}deg)`; };
    document.querySelector('.rotate-left').onclick = () => { tryRotation -= 15; box.style.transform = `scale(${tryScale}) rotate(${tryRotation}deg)`; };
    document.querySelector('.rotate-right').onclick = () => { tryRotation += 15; box.style.transform = `scale(${tryScale}) rotate(${tryRotation}deg)`; };
})();


/* ==========================================================================
   7. CAROUSEL SYSTEM (Component)
   ========================================================================== */

const Carousel = (() => {
    const updateCarousel = (slide) => {
        if (!slide) return;
        document.querySelectorAll(".carousel__slide").forEach(s => s.classList.remove("active"));
        slide.classList.add("active");

        const main = document.getElementById("productMainImg");
        const slideImg = slide.querySelector("img");
        if (main && slideImg) main.src = slideImg.src;

        document.querySelector(".carousel__slider").scrollTo({
            left: slide.offsetLeft - 100,
            behavior: "smooth"
        });
    };

    return {
        init: () => {
            const slider = document.querySelector(".carousel__slider");
            if (!slider) return;
            slider.addEventListener("click", (e) => {
                const slide = e.target.closest(".carousel__slide");
                if (slide) updateCarousel(slide);
            });
            updateCarousel(slider.firstElementChild);
        }
    };
})();

Carousel.init();
