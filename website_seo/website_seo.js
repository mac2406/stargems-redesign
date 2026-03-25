/* ================= PRICING DATA ================= */
const PRICING_DATA = [
    {
        id: "01",
        url: "https://stargems.com/order-form.aspx?Pg=OrderDetails&Plan=Starter",
        title: "Starter",
        subtitle: "Website care and ongoing SEO to keep your store visible and running smoothly",
        price: "$275",
        priceLabel: "<br>/ Month",
        mainFeatures: ["Ongoing Website Maintenance", "Secure & Fast-Loading Pages", "Targeted SEO Optimization", "Store & Product Management", "Monthly Performance Reporting"],
        details: [
            { cat: "Website Management", items: ["Website design and development", "Ongoing maintenance & updates", "Secure website with SSL", "Mobile-friendly and fast-loading pages", "Easy updates for banners, content, and images"] },
            { cat: "SEO & Visibility", items: ["Website built and maintained as per SEO best practices", "Keyword research and targeting (up to 20 keywords)", "Monthly optimization of up to 10 website pages", "Sitemap creation and search engine indexing", "Local directory submissions", "Google Analytics and Search performance reporting"] },
            { cat: "Store & Content", items: ["Product and content management support", "Ability to manage products, images, pricing, and inventory", "Featured products, sale items, and related products setup", "Reviews and ratings enabled"] },
            { cat: "Compliance & Standards", items: ["ADA compliance included", "Secure browsing and data protection"] },
            { cat: "Reporting", items: ["Monthly SEO and website performance report"] }
        ]
    },
    {
        id: "02",
        url: "https://stargems.com/order-form.aspx?Pg=OrderDetails&Plan=Essential",
        title: "Essential",
        subtitle: "Paid Marketing with Google & Meta Ads",
        price: "$150",
        priceLabel: "Starting / Month",
        mainFeatures: ["Paid Advertising Strategy & Setup", "Google & Meta Campaign Management", "Conversion Tracking Setup", "Monthly Performance Reporting", "Dedicated Account Manager"],
        details: [
            { cat: "Strategy & Setup", items: ["Paid advertising strategy aligned with your business goals", "Google Ads and Meta Ads account setup and configuration", "Keyword and audience research", "Competitor and budget review"] },
            { cat: "Campaign Management", items: ["Search and social ad campaign setup", "Ad copy creation", "Location and geo-targeting setup", "Budget and bid management"] },
            { cat: "Conversion & Tracking", items: ["Conversion tracking setup (calls, forms, inquiries)", "Landing page and funnel review for better results"] },
            { cat: "Optimization & Reporting", items: ["Ongoing campaign monitoring and optimization", "Monthly performance report covering spend, leads, and conversions", "Google Analytics setup and review"] },
            { cat: "Support", items: ["Dedicated account manager"] },
            { cat: "Ad Spend & Management Fees", items: ["Ad spend is paid directly by the client to Google and Meta", "Ad management fee is billed monthly to us, based on total monthly ad spend", { label: "Management fee structure:", subList: ["Ad spend up to $500: $150/mo", "Ad spend $501 – $1000: $225/mo", "Ad spend $1001 – $1500: $300/mo", "Ad spend above $1500: 20% of monthly ad spend"] }] }
        ]
    },
    {
        id: "03",
        url: "https://stargems.com/order-form.aspx?Pg=OrderDetails&Plan=Growth",
        title: "Growth",
        subtitle: "SEO, website management, and paid ads working together to drive consistent leads",
        price: "$450",
        priceLabel: "Starting / Month",
        mainFeatures: ["Full SEO & Website Maintenance", "Google & Meta Ads Management", "Advanced Keyword Targeting", "Conversion & Funnel Optimization", "Dedicated Account Manager"],
        details: [
            { cat: "Website Management & SEO", items: ["Ongoing website maintenance and updates", "Secure, mobile-friendly, and fast-loading website", "Website managed as per SEO best practices", "Keyword research and targeting (up to 20 keywords)", "Monthly optimization of up to 10 website pages", "Sitemap creation and search engine indexing", "Local directory submissions", "Monthly SEO and website performance reporting"] },
            { cat: "Paid Marketing (Google & Meta Ads)", items: ["Paid advertising strategy aligned with business goals", "Google Ads and Meta Ads setup and ongoing management", "Keyword and audience research", "Search and social ad campaign setup", "Ad copy creation and ongoing optimization", "Geo-targeting and budget management", "Conversion tracking (calls, forms, inquiries)", "Monthly ad performance reporting"] },
            { cat: "Analytics & Optimization", items: ["Google Analytics setup and review", "Conversion and funnel review for improvement opportunities"] },
            { cat: "Support", items: ["Dedicated account manager", "Ongoing optimization and performance reviews"] },
            { cat: "Ad Spend & Management Fees", items: ["Ad spend is paid directly by the client to Google and Meta", "Ad management fees are billed monthly based on ad spend", { label: "Management fee structure:", subList: ["Ad spend up to $500: $150/mo", "Ad spend $501 – $1000: $225/mo", "Ad spend $1001 – $1500: $300/mo", "Ad spend above $1500: 20% of monthly ad spend"] }] }
        ]
    },
    {
        id: "04",
        url: "https://stargems.com/order-form.aspx?Pg=OrderDetails&Plan=Scale",
        title: "Scale",
        subtitle: "Complete digital marketing management including SEO, paid ads, and social media.",
        price: "$675",
        priceLabel: "Starting / Month",
        mainFeatures: ["Everything in Growth Plan", "Social Media Strategy & Management", "Monthly Content Creation & Posting", "Ad-Ready Creatives & Brand Alignment", "Cross-Channel Performance Optimization"],
        details: [
            { cat: "Social Media Management", items: ["Social media strategy aligned with your brand and promotions", "Management of Facebook and Instagram business accounts", "Monthly content calendar planning", "Creation and posting of branded content", "Product, promotion, and seasonal post support"] },
            { cat: "Creative & Brand Consistency", items: ["Consistent brand voice across social platforms", "Ad-ready creatives coordinated with paid campaigns", "Visual and messaging alignment with website and promotions"] },
            { cat: "Reporting & Optimization", items: ["Monthly social media performance report", "Engagement and growth insights", "Content performance review and recommendations"] },
            { cat: "Support & Oversight", items: ["Dedicated account manager", "Ongoing performance reviews and optimization across channels"] },
            { cat: "Ad Spend & Management Fees", items: ["Ad spend is paid directly by the client to Google and Meta", "Ad management fees are billed monthly based on ad spend", { label: "Management fee structure:", subList: ["Ad spend up to $500: $150/mo", "Ad spend $501 – $1000: $225/mo", "Ad spend $1001 – $1500: $300/mo", "Ad spend above $1500: 20% of monthly ad spend"] }] }
        ]
    }
];

/* ================= UTILITIES ================= */
function safeFeatherReplace() {
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

/* ================= RENDER LOGIC ================= */
function renderPricing() {
    const grid = document.getElementById('pricing-grid');
    if (!grid) return;

    grid.innerHTML = PRICING_DATA.map(plan => {
        const mainFeaturesHtml = plan.mainFeatures.map(feat =>
            `<li><i data-feather="check" class="feature-icon" style="width:16px; height:16px; margin-right:8px;"></i> ${feat}</li>`
        ).join('');

        const detailsHtml = plan.details.map(section => {
            const listItems = section.items.map(item => {
                if (typeof item === 'string') {
                    return `<li class="standard-item">${item}</li>`;
                } else {
                    return `
                        <li class="nested-container">
                            <strong>${item.label}</strong>
                            <ul class="sub-list" style="margin-left: 10px; padding-left:10px;">
                                ${item.subList.map(sub => `<li>${sub}</li>`).join('')}
                            </ul>
                        </li>
                    `;
                }
            }).join('');

            return `
                <div class="detail-block">
                    <h4>${section.cat}</h4>
                    <ul>${listItems}</ul>
                </div>
            `;
        }).join('');

        let prefixHtml = '';
        let suffixLabel = plan.priceLabel;
        if (plan.priceLabel.includes("Starting")) {
            prefixHtml = `<span class="period" style="margin-right: 6px;">Starting</span>`;
            suffixLabel = plan.priceLabel.replace("Starting", "").trim();
        }

        const isRecommended = plan.id === '03';
        const cardClass = isRecommended ? 'pricing-card-blue' : 'pricing-card-white';
        const btnClass = isRecommended ? 'btn-white' : 'btn-blue';
        const badgeHtml = isRecommended ?
            `<div class="recommended-tab">
                <i data-feather="star" style="width:14px; height:14px; margin-right:5px; fill:white;"></i> Recommended
            </div>` : '';

        return `
            <div class="col-lg-3 col-md-6 col-12">
                <div class="pricing-card ${cardClass} h-100" id="plan-${plan.id}">
                    ${badgeHtml}
                    <div class="card-content-wrapper">
                        <div class="card-header-new">
                            <h3>${plan.title}</h3>
                            <p>${plan.subtitle}</p>
                        </div>
                        <div class="price-display-new">
                            ${prefixHtml}
                            <span class="val">${plan.price}</span>
                            <span class="period"> ${suffixLabel}</span>
                        </div>
                        <ul class="main-feature-list-new">
                            ${mainFeaturesHtml}
                        </ul>
                        
                        <div class="spacer" style="flex-grow:1;"></div>

                        <button class="toggle-btn-new" type="button" onclick="toggleDetails('details-${plan.id}', this)">
                            See all features <i data-feather="plus" style="width:14px;"></i>
                        </button>
                        <div class="collapsible-section" id="details-${plan.id}">
                            ${detailsHtml}
                        </div>
                        <a href="${plan.url}" target="_self" class="initiate-btn" style="text-decoration:none; display:flex; justify-content:center; align-items:center;">
                    Sign Up <i data-feather="arrow-right" style="width:16px; margin-left:8px;"></i>
                </a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    safeFeatherReplace();
}

window.toggleDetails = function (elementId, btn) {
    const content = document.getElementById(elementId);
    if (content) {
        const isOpen = content.classList.contains('open');
        if (isOpen) {
            content.classList.remove('open');
            btn.innerHTML = `See all features <i data-feather="plus" style="width:14px;"></i>`;
        } else {
            content.classList.add('open');
            btn.innerHTML = `Hide Features <i data-feather="minus" style="width:14px;"></i>`;
        }
        safeFeatherReplace();
    }
};

/* ================= FAQ ================= */
function setupAnimations() {
    // 1. FAQ Toggles
    const faqs = document.querySelectorAll('.faq-question');
    faqs.forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            item.classList.toggle('open');
        });
    });

    // 2. Hero Scroll Trigger
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY > 50; // Trigger after 50px
        const title = document.querySelector('.hero-title-wrapper');
        const bodyContent = document.querySelector('.hero-body-wrapper');
        const icons = document.querySelectorAll('.floating-icon');
        const heroVisual = document.querySelector('.hero-visual');

        if (scrolled) {
            if (title) title.classList.add('visible');
            if (bodyContent) bodyContent.classList.add('visible');
            if (heroVisual) heroVisual.classList.add('active'); // Float down to normal position

            // 3. Upgrade Section Graph Animation
            const upgradeSection = document.querySelector('.upgrade-section');
            if (upgradeSection) {
                const rect = upgradeSection.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                // Trigger when section comes into view
                if (rect.top <= windowHeight * 0.75) {
                    upgradeSection.classList.add('active');
                }
            }



            icons.forEach((icon, index) => {
                // Add staggered delay for visible effect if desired, or just all at once
                setTimeout(() => icon.classList.add('visible'), index * 100);
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {

    renderPricing();
    setupAnimations();
    safeFeatherReplace();

    // Initialize OwlCarousel
    // Initialize or Destroy OwlCarousel based on screen size
    var owl = $('.owl-carousel');
    var owlOptions = {
        loop: true,
        margin: 20,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
                stagePadding: 50
            }
        }
    };

    function initCarousel() {
        if ($(window).width() < 768) {
            if (!owl.hasClass('owl-loaded')) {
                owl.addClass('owl-carousel');
                owl.owlCarousel(owlOptions);
            }
        } else {
            if (owl.hasClass('owl-loaded')) {
                owl.trigger('destroy.owl.carousel');
                owl.removeClass('owl-loaded');
                owl.find('.owl-stage-outer').children().unwrap();
                owl.removeData('owl.carousel');
            }
        }
    }

    // Initialize on load
    initCarousel();

    // Check on resize
    $(window).resize(function () {
        initCarousel();
    });
});

/* ================= TERMS MODAL LOGIC ================= */
window.openTermsModal = function (e) {
    if (e) e.preventDefault();
    const modal = document.getElementById('terms-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
};

window.closeTermsModal = function (e) {
    if (e) e.preventDefault();
    const modal = document.getElementById('terms-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = ''; // Restore scrolling
    }
};
