/*---------------------- Global Interactions ----------------------*/
document.addEventListener('DOMContentLoaded', () => {
    // Reveal on scroll logic
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
});

/*---------------------- Products ----------------------*/
function goDetail() {
    window.location.href = 'product-details.html';
}

function changeMetal(btn, newSrc) {
    const card = btn.closest('.product-card');
    const mainImg = card.querySelector('.main-ring-img');
    const hoverImg = card.querySelector('.hover-img');
    const dots = btn.parentElement.querySelectorAll('.dot');

    // Update active state
    dots.forEach(d => d.classList.remove('active'));
    btn.classList.add('active');

    // Smooth swap
    if (mainImg && newSrc) {
        // If hovering, we need to temporarily show the main image
        if (hoverImg) {
            hoverImg.style.opacity = '0';
        }

        mainImg.style.opacity = '0';
        setTimeout(() => {
            mainImg.src = newSrc;
            mainImg.style.opacity = '1';

            // Re-fade the hover image back if mouse is still there? 
            // Better to stay on main image for a sec
            setTimeout(() => {
                if (hoverImg) hoverImg.style.opacity = ''; // CSS will handle it
            }, 600);
        }, 300);
    }
}


function wish(btn) {
    btn.classList.toggle('liked');
    const isLiked = btn.classList.contains('liked');

    // Impactful Haptic/Visual Feedback
    if (isLiked) {
        btn.style.transform = 'scale(1.3)';
        setTimeout(() => btn.style.transform = '', 200);
    }

    toast(isLiked ? '♥ Added to wishlist' : 'Removed from wishlist');

    const icon = btn.querySelector('svg');
    if (icon) {
        icon.setAttribute('fill', isLiked ? 'currentColor' : 'none');
    }
}

function toast(msg) {
    const toastEl = document.getElementById('toastEl');
    const toastMsg = document.getElementById('toastMsg');
    if (toastEl && toastMsg) {
        toastMsg.textContent = msg;
        const bsToast = new bootstrap.Toast(toastEl);
        bsToast.show();
    }
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }
});

/*---------------------- Product Details ----------------------*/
function setImg(thumb, src) {
    document.querySelectorAll('.thumb-wrap').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');

    const mainImg = document.getElementById('mainImg');
    if (mainImg) {
        mainImg.style.filter = 'blur(4px)';
        mainImg.style.opacity = '0.5';

        setTimeout(() => {
            mainImg.src = src;
            mainImg.style.filter = 'blur(0)';
            mainImg.style.opacity = '1';
        }, 250);
    }
}

function pickMetal(btn, label, price) {
    // Using on/off pattern from CSS
    btn.closest('.d-flex').querySelectorAll('.metal-swatch').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');

    const metalLbl = document.getElementById('metalLbl');
    if (metalLbl) metalLbl.textContent = label;
}

function pickCarat(btn, label) {
    btn.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const caratLbl = document.getElementById('caratLbl');
    if (caratLbl) caratLbl.textContent = label;
}

function pickShape(btn, label) {
    document.querySelectorAll('#shapeGrid .shape-box').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const shapeLbl = document.getElementById('shapeLbl');
    if (shapeLbl) shapeLbl.textContent = label;
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) nav.classList.add('nav-scrolled');
    else nav.classList.remove('nav-scrolled');
});

// Gallery Interactivity
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function () {
        document.getElementById('productMainImg').src = this.src;
    });
});

// 3D Ring CSS Viewer Toggle
function toggle3D() {
    const img = document.getElementById('productMainImg');
    const viewer = document.getElementById('ring3DViewer');
    const btn = document.getElementById('btn3d');
    const rotateBtn = document.getElementById('btnRotate');
    const zoomLens = document.getElementById('zoomLens');
    const is3DOpen = viewer && viewer.style.display !== 'none';

    if (!is3DOpen) {
        // Show 3D ring
        if (img) img.style.display = 'none';
        if (viewer) viewer.style.display = 'flex';
        if (zoomLens) zoomLens.style.display = 'none';
        if (btn) {
            btn.classList.add('active');
            btn.querySelector('span').textContent = 'Exit 3D';
        }
        if (rotateBtn) rotateBtn.style.display = 'flex';

        // Trigger Three.js Init/Resume
        window.dispatchEvent(new CustomEvent('initThreeViewer'));
    } else {
        // Back to image
        if (img) img.style.display = 'block';
        if (viewer) viewer.style.display = 'none';
        if (btn) {
            btn.classList.remove('active');
            btn.querySelector('span').textContent = 'View in 3D';
        }
        if (rotateBtn) {
            rotateBtn.style.display = 'none';
            rotateBtn.classList.remove('active');
        }
    }
}

function toggleRotate() {
    const btn = document.getElementById('btnRotate');
    if (!btn) return;
    const isActive = btn.classList.contains('active');
    
    if (!isActive) {
        btn.classList.add('active');
        window.dispatchEvent(new CustomEvent('toggleThreeRotate', { detail: { active: true } }));
    } else {
        btn.classList.remove('active');
        window.dispatchEvent(new CustomEvent('toggleThreeRotate', { detail: { active: false } }));
    }
}

// Drag-to-rotate the ring image in 3D
(function setupRingDrag() {
    let ringDragging = false, lastX = 0, lastY = 0, rotY = 0, rotX = 8;

    function getScene() { return document.getElementById('ringImgScene'); }
    function getRing()  { return document.getElementById('ring3d'); }

    function onStart(clientX, clientY) {
        const scene = getScene();
        if (!scene) return;
        ringDragging = true;
        lastX = clientX;
        lastY = clientY;
    }

    function onMove(clientX, clientY) {
        if (!ringDragging) return;
        const ring = getRing();
        if (!ring) return;
        rotY += (clientX - lastX) * 0.5;
        rotX -= (clientY - lastY) * 0.3;
        // Clamp vertical tilt to a natural range
        rotX = Math.max(-25, Math.min(35, rotX));
        lastX = clientX;
        lastY = clientY;
        ring.style.animation = 'none';
        ring.classList.remove('spinning');
        ring.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg)`;
        const btn = document.getElementById('btnRotate');
        if (btn) btn.classList.remove('active');
    }

    function onEnd() { ringDragging = false; }

    // Mouse
    document.addEventListener('mousedown', function (e) {
        const scene = getScene();
        if (scene && scene.contains(e.target)) { onStart(e.clientX, e.clientY); e.preventDefault(); }
    });
    document.addEventListener('mousemove', function (e) { onMove(e.clientX, e.clientY); });
    document.addEventListener('mouseup',   onEnd);

    // Touch
    document.addEventListener('touchstart', function (e) {
        const scene = getScene();
        if (scene && scene.contains(e.target)) { onStart(e.touches[0].clientX, e.touches[0].clientY); }
    }, { passive: true });
    document.addEventListener('touchmove', function (e) {
        if (ringDragging) { onMove(e.touches[0].clientX, e.touches[0].clientY); e.preventDefault(); }
    }, { passive: false });
    document.addEventListener('touchend', onEnd);
})();


// Image Zoom Logic
function moveLens(e) {
    const lens = document.getElementById('zoomLens');
    const img = document.getElementById('productMainImg');
    const result = document.getElementById('zoomResult');
    const container = document.getElementById('mainImageContainer');

    if (!lens || !img || !result || !container) return;

    // Only zoom if the 3D viewer is hidden
    const viewer = document.getElementById('ring3DViewer');
    if (viewer && viewer.style.display && viewer.style.display !== 'none') return;

    // Show them first so they have dimensions
    lens.style.display = 'block';
    result.style.display = 'block';

    const rect = container.getBoundingClientRect();
    
    // Calculate cursor position relative to container
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    // We know these from CSS but let's read them to be safe
    const lw = lens.offsetWidth || 160;
    const lh = lens.offsetHeight || 160;
    const cw = container.offsetWidth || 500;
    const ch = container.offsetHeight || 500;

    // Keep lens inside bounds
    const hw = lw / 2;
    const hh = lh / 2;
    
    if (x < hw) x = hw;
    if (x > cw - hw) x = cw - hw;
    if (y < hh) y = hh;
    if (y > ch - hh) y = ch - hh;

    lens.style.left = (x - hw) + 'px';
    lens.style.top  = (y - hh) + 'px';

    // Calculate magnification ratios
    const nw = img.naturalWidth  || img.width || 1200;
    const nh = img.naturalHeight || img.height || 1200;
    
    // Result is 530x530 (from CSS)
    const rw = result.offsetWidth || 530;
    const rh = result.offsetHeight || 530;
    
    const cx = rw / lw;
    const cy = rh / lh;

    // Apply Background
    result.style.backgroundImage = `url('${img.src}')`;
    result.style.backgroundSize  = (nw * cx) + 'px ' + (nh * cy) + 'px';
    
    // Background Position
    const posX = ((x - hw) / cw) * (nw * cx);
    const posY = ((y - hh) / ch) * (nh * cy);
    
    result.style.backgroundPosition = `-${posX}px -${posY}px`;
}

function hideLens() {
    const lens = document.getElementById('zoomLens');
    const result = document.getElementById('zoomResult');
    if (lens) lens.style.display = 'none';
    if (result) result.style.display = 'none';
}

// Virtual Try On Logic
let currentScale = 1;
let currentRotation = 0;
let isDragging = false;
let startX, startY, initialLeft, initialTop;

function handleHandUpload(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const container = document.getElementById('userPhotoContainer');
            container.innerHTML = `<img src="${e.target.result}" alt="User Hand">`;
            document.getElementById('startTryBtn').style.display = 'inline-block';

            // Reset jewelry position and state when new photo is uploaded
            const jewelry = document.getElementById('jewelryDraggable');
            jewelry.style.display = 'none';
            currentScale = 1;
            currentRotation = 0;
            updateJewelryTransform();
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function startVirtualTry() {
    const jewelry = document.getElementById('jewelryDraggable');
    const mainImg = document.getElementById('productMainImg') || document.querySelector('.gallery-grid-main img');
    const tryImg = document.getElementById('jewelryImgForTry');

    // Sync current product image to try-on module
    if (mainImg) tryImg.src = mainImg.src;

    jewelry.style.display = 'block';
    jewelry.style.left = '50%';
    jewelry.style.top = '50%';
    jewelry.style.transform = 'translate(-50%, -50%)';

    // Re-apply translations after setting block
    setTimeout(() => {
        initialLeft = jewelry.offsetLeft;
        initialTop = jewelry.offsetTop;
    }, 10);
}

// Draggable Functionality
const draggable = document.getElementById('jewelryDraggable');

draggable.addEventListener('mousedown', startDrag);
window.addEventListener('mousemove', drag);
window.addEventListener('mouseup', endDrag);

// Touch support
draggable.addEventListener('touchstart', (e) => startDrag(e.touches[0]));
window.addEventListener('touchmove', (e) => drag(e.touches[0]));
window.addEventListener('touchend', endDrag);

function startDrag(e) {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    initialLeft = draggable.offsetLeft;
    initialTop = draggable.offsetTop;
    draggable.style.transition = 'none';
}

function drag(e) {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    draggable.style.left = (initialLeft + dx) + 'px';
    draggable.style.top = (initialTop + dy) + 'px';
    draggable.style.transform = `translate(0, 0) scale(${currentScale}) rotate(${currentRotation}deg)`;
}

function endDrag() {
    isDragging = false;
}

// Controls
document.querySelector('.zoom-in').onclick = () => { currentScale += 0.1; updateJewelryTransform(); };
document.querySelector('.zoom-out').onclick = () => { if (currentScale > 0.2) currentScale -= 0.1; updateJewelryTransform(); };
document.querySelector('.rotate-left').onclick = () => { currentRotation -= 15; updateJewelryTransform(); };
document.querySelector('.rotate-right').onclick = () => { currentRotation += 15; updateJewelryTransform(); };

function updateJewelryTransform() {
    // If dragging, we don't want the -50% -50% translate
    if (draggable.style.left.includes('px') && draggable.style.left !== '50%') {
        draggable.style.transform = `scale(${currentScale}) rotate(${currentRotation}deg)`;
    } else {
        draggable.style.transform = `translate(-50%, -50%) scale(${currentScale}) rotate(${currentRotation}deg)`;
    }
}
