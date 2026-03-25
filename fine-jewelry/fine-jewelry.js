document.querySelectorAll('.filter-group').forEach(group => {
    group.addEventListener('click', e => {
        const option = e.target.closest('.filter-option');
        if (!option) return;

        group.querySelectorAll('.filter-option').forEach(o => o.classList.remove('active'));
        option.classList.add('active');

        const label = group.querySelector('.filter-value');
        if (label) label.textContent = option.dataset.value;
    });
});

// FAQ Accordion Logic
document.querySelectorAll('.faq-card').forEach(card => {
    card.addEventListener('click', () => {
        // Toggle active class on clicked card
        const isActive = card.classList.contains('active');

        // Optional: Close others (accordion behavior)
        // document.querySelectorAll('.faq-card').forEach(c => c.classList.remove('active'));

        // Toggle current
        if (isActive) {
            card.classList.remove('active');
        } else {
            card.classList.add('active');
        }
    });
});

// Filter Option Click (using jQuery for delegation)
// Note: The existing filter logic above uses pure JS for direct listeners.
// This new block uses jQuery for delegated event handling.
$(document).on('click', '.filter-option', function () {
    // This block is added as per instruction.
    // If this is meant to replace the existing filter logic, further changes would be needed.
    // For now, it co-exists.
    const group = $(this).closest('.filter-group');
    group.find('.filter-option').removeClass('active');
    $(this).addClass('active');
    const label = group.find('.filter-value');
    if (label.length) label.text($(this).data('value'));
});

// Toggle Wishlist Heart (using jQuery for delegation and stopPropagation)
$(document).on('click', '.btn-wishlist', function (e) {
    e.preventDefault();
    e.stopPropagation(); // Prevent card click from triggering
    $(this).toggleClass('active');
});

// Product Card Click -> Product Details (using jQuery for delegation)
$(document).on('click', '.product-card', function (e) {
    // Ensure we didn't click the wishlist button (handled by stopPropagation above, but good to be safe)
    if (!$(e.target).closest('.btn-wishlist').length) {
        window.location.href = 'product-details.html';
    }
});
// Product Configurator Selection Logic
$(document).on('click', '.config-icon-selection, .config-color-selection, .config-band-selection', function () {
    const $this = $(this);
    const $container = $this.closest('.config-option');
    const value = $this.attr('title');

    // Remove active class from siblings and add to clicked
    $container.find('.config-icon-selection, .config-color-selection, .config-band-selection').removeClass('active');
    $this.addClass('active');

    // Update the label text
    $container.find('.form-label .fw-bold').text(value);
});

// Ring Size Selection Logic
$(document).on('click', '.config-option button.btn-outline-secondary', function () {
    const $this = $(this);
    const $container = $this.closest('.config-option');
    const value = $this.text();

    // Remove active class from other buttons in this container
    $container.find('button.btn-outline-secondary').removeClass('active');
    $this.addClass('active');

    // Update the label text
    // The label is expected to be in a .form-label element within the same .config-option container, inside .fw-bold
    $container.find('.form-label .fw-bold').text(value);
});


// Toggle Wishlist Heart Detail Page
$(document).on('click', '.btn-wishlist-detail', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
});
// Search Functionality
const searchInput = document.querySelector('.search-bar input');
if (searchInput) {
    searchInput.addEventListener('input', function (e) {
        const searchTerm = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.product-card');

        cards.forEach(card => {
            const title = card.querySelector('.product-title')?.textContent.toLowerCase() || '';
            const price = card.querySelector('.product-price')?.textContent.toLowerCase() || '';
            const parentCol = card.parentElement;

            if (title.includes(searchTerm) || price.includes(searchTerm)) {
                parentCol.style.display = '';
            } else {
                parentCol.style.display = 'none';
            }
        });
    });
}

// Reviews Carousel
// Reviews Carousel
$(document).ready(function () {
    var owl = $('.reviews-carousel');
    var owlInit = false;

    function checkWidth() {
        var windowWidth = $(window).width();

        if (windowWidth < 992) {
            if (!owlInit) {
                owl.addClass('owl-carousel owl-theme');
                owl.owlCarousel({
                    loop: true,
                    margin: 20,
                    nav: false,
                    dots: true,
                    responsive: {
                        0: { items: 1 },
                        600: { items: 2 }
                    }
                });
                owlInit = true;
            }
        } else {
            if (owlInit) {
                owl.trigger('destroy.owl.carousel');
                owl.removeClass('owl-carousel owl-theme');
                owlInit = false;
            }
        }
    }

    // Check on load and resize
    checkWidth();
    $(window).resize(checkWidth);
});
