const BASE_RETAILERS = [
    { id: 1, name: "Hamilton's Jewelry", platform: "Custom", image: "https://stargems.com/assets/img/Websites/HJ.webp", url: "https://hamiltonjewelersonline.com/" },
    { id: 2, name: "Rare Gem Studio", platform: "Custom", image: "https://stargems.com/assets/img/Websites/RGS.webp", url: "https://raregemstudio.com/" },
    { id: 3, name: "Barnards Fine Jewelry", platform: "Custom", image: "https://stargems.com/assets/img/Websites/BFJ.webp", url: "https://barnardsjewelry.com/" },
    { id: 4, name: "Baggett's Jewelry", platform: "Custom", image: "https://stargems.com/assets/img/Websites/BAG.webp", url: "https://www.baggettsjewelry.com/" },
    { id: 5, name: "Alabama Family Optometry", platform: "Custom", image: "https://stargems.com/assets/img/Websites/AFO.webp", url: "https://afoptometry.com/" },
    { id: 6, name: "Showcase Jewelers - Hays", platform: "Custom", image: "https://stargems.com/assets/img/Websites/HAYS.webp", url: "https://showcasehays.com/" },
    { id: 7, name: "Marks Jewelry Co.", platform: "Custom", image: "https://stargems.com/assets/img/Websites/MARKS.webp", url: "https://marksjewelryco.com/" },
    { id: 8, name: "Lovette Jewelers", platform: "Custom", image: "https://stargems.com/assets/img/Websites/LOVETTE.webp", url: "https://lovettejewelers.com/" },
    { id: 9, name: "KeepSakes Jewelry", platform: "Custom", image: "https://stargems.com/assets/img/Websites/KSJ.webp", url: "https://keepsakesjewelry.com/" },
    { id: 10, name: "Jewelers On Main", platform: "Custom", image: "https://stargems.com/assets/img/Websites/JOM.webp", url: "https://jewelersonmain.com/" },
    { id: 11, name: "Morande Jewelers", platform: "Custom", image: "https://stargems.com/assets/img/Websites/MORA.webp", url: "https://morandejewelers.com/" },
    { id: 12, name: "Fountain City Jewelers", platform: "Custom", image: "https://stargems.com/assets/img/Websites/FCJ.webp", url: "https://fountaincityjewelers.com/" },
    { id: 13, name: "Concierge Jewelry Repair", platform: "Custom", image: "https://stargems.com/assets/img/Websites/CONC.webp", url: "https://conciergejewelryrepair.com/" },
    { id: 14, name: "Zembar Jewelers", platform: "Custom", image: "https://stargems.com/assets/img/Websites/ZEMB.webp", url: "https://www.zembarjeweler.com/" },
    { id: 15, name: "Steves Custom Jewelers", platform: "Custom", image: "https://stargems.com/assets/img/Websites/SCJ.webp", url: "https://stevescustomjewelers.com/" },
    { id: 16, name: "TPM&F", platform: "Custom", image: "https://stargems.com/assets/img/Websites/TPM.webp", url: "https://spetpmf.com/" },
    { id: 17, name: "Stephens Fine Jewelry", platform: "Custom", image: "https://stargems.com/assets/img/Websites/SFJ.webp", url: "https://stephensfinejewelryoh.com/" },
    { id: 18, name: "Signature Diamonds", platform: "Custom", image: "https://stargems.com/assets/img/Websites/SDG.webp", url: "https://signaturediamondsknoxville.com/" },
    { id: 19, name: "Showcase Jewelers - Salina", platform: "Custom", image: "https://stargems.com/assets/img/Websites/SALINA.webp", url: "https://showcasejewelers.net/" },
    { id: 20, name: "Quality Jewelers", platform: "Custom", image: "https://stargems.com/assets/img/Websites/QJ.webp", url: "https://qualityjewelers.com/" },
    { id: 21, name: "Marshall's Jewelers", platform: "Custom", image: "https://stargems.com/assets/img/Websites/MAJ.webp", url: "https://www.marshallsjewelersonline.com/" },
    { id: 22, name: "Dylan Rings", platform: "Custom", image: "https://stargems.com/assets/img/Websites/DR.webp", url: "https://www.dylanrings.com/" },
    { id: 23, name: "Talles Diamonds and Gold", platform: "Custom", image: "https://stargems.com/assets/img/Websites/TDG.webp", url: "https://tallesdiamonds.com/" },
    { id: 24, name: "Jefferson Estate Jewelers", platform: "Custom", image: "https://stargems.com/assets/img/Websites/JEFF.webp", url: "https://jeffersonestatejewelers.com/" },
    { id: 25, name: "Henry's Jewelers", platform: "Custom", image: "https://stargems.com/assets/img/Websites/HENRYS.webp", url: "https://www.henrys-jewelers.com/" },
    { id: 26, name: "Ellington Jewelers, Inc", platform: "Custom", image: "https://stargems.com/assets/img/Websites/EJ.webp", url: "https://ellingtonjewelers.com/" },
    { id: 27, name: "Lowery Jewelers", platform: "Custom", image: "https://stargems.com/assets/img/Websites/LJ.webp", url: "https://loweryjewelers.com/" },
    { id: 28, name: "Hinz Jewelers", platform: "Custom", image: "https://stargems.com/assets/img/Websites/HINZ.webp", url: "https://hinzjewelers.com/" },
    { id: 29, name: "Gregory Jewelers", platform: "Custom", image: "https://stargems.com/assets/img/Websites/GJM.webp", url: "https://gregoryjewelersofmorganton.com/" },
    { id: 30, name: "Gemco International", platform: "Custom", image: "https://stargems.com/assets/img/Websites/GEMCO.webp", url: "https://gemcodiamond.com/" },
    { id: 31, name: "Gayle's Jewelers", platform: "Custom", image: "https://stargems.com/assets/img/Websites/GJ.webp", url: "https://www.gaylesjewelers.com/" },
    { id: 32, name: "Fancy That Jewelry in Stockbridge, GA", platform: "Custom", image: "https://stargems.com/assets/img/Websites/FT.webp", url: "http://afancythatjewelry.com/" },
    { id: 33, name: "Ed White Jewelers", platform: "Custom", image: "https://stargems.com/assets/img/Websites/EWJ.webp", url: "http://edwhitejewelers.com/" },
    { id: 34, name: "Jewelmasters", platform: "Shopify", image: "https://stargems.com/assets/img/Websites/Jewel-Masters.webp", url: "http://jewelmastersonline.com/" },
    { id: 35, name: "M & M Jewelers", platform: "Custom", image: "https://stargems.com/assets/img/Websites/MMJ.webp", url: "http://mmjewelersbirmingham.com/" },
    { id: 36, name: "A. T. Thomas Jewelers", platform: "Custom", image: "https://stargems.com/assets/img/Websites/ATT.webp", url: "http://atthomasjewelers.com/" },
    { id: 37, name: "Bowman Jewelers", platform: "Custom", image: "https://stargems.com/assets/img/Websites/BJJ.webp", url: "http://bowmanjewelers.com/" },
    { id: 38, name: "Diamond Depot", platform: "Custom", image: "https://stargems.com/assets/img/Websites/DDA.webp", url: "http://oxforddiamonddepot.com/" },
    { id: 39, name: "Pearson's Jewelers", platform: "Custom", image: "https://stargems.com/assets/img/Websites/PEAR.webp", url: "http://pearsonsjewelersca.com/" },
    { id: 40, name: "Kent island Jewelry LLC", platform: "Custom", image: "https://stargems.com/assets/img/Websites/KENT.webp", url: "http://kentislandjewelry.com/" },
    { id: 41, name: "DeAngelis Jewelers", platform: "Custom", image: "https://stargems.com/assets/img/Websites/DEAN.webp", url: "http://deangelisjewelers.com/" },
    { id: 42, name: "Midtown Jewelers", platform: "Custom", image: "https://stargems.com/assets/img/Websites/MIDT.webp", url: "http://midtownjewelersinc.com/" },
    { id: 43, name: "TJ's Fine Jewelry", platform: "Custom", image: "https://stargems.com/assets/img/Websites/TJSFJ.webp", url: "http://tjsfinejewelry.com/" },
    { id: 44, name: "Pettit Jewelers", platform: "NOP", image: "https://stargems.com/assets/img/Websites/Pettit-Jewelers.webp", url: "http://pettitjewelers.com/" },
    { id: 45, name: "Avalon Park Jewelers", platform: "NOP", image: "https://stargems.com/assets/img/Websites/Avalon-Park-Jewelers.webp", url: "http://avalonparkjewelers.com/" },
    { id: 46, name: "King Diamonds", platform: "NOP", image: "https://stargems.com/assets/img/Websites/King-Diamonds.webp", url: "http://kingdiamondsonline.com/" },
    { id: 47, name: "Lisy Custom Jewelers", platform: "NOP", image: "https://stargems.com/assets/img/Websites/LISY.webp", url: "https://lisyjewelers.com/" },
    { id: 48, name: "Smoky Mountain Coin and Jewelry", platform: "NOP", image: "https://stargems.com/assets/img/Websites/Smoky-Mountains-Coin-and-Jewelry.webp", url: "http://smokymountaincoinandjewelry.com/" },
    { id: 49, name: "Bryant Gem", platform: "Shopify", image: "https://stargems.com/assets/img/Websites/Bryants-Gems.webp", url: "http://bryantgems.com/" },
    { id: 50, name: "Stokes Jewelry", platform: "Shopify", image: "https://stargems.com/assets/img/Websites/Stokes-Jewelry.webp", url: "http://stokesjewelry.com/" },
    { id: 51, name: "Helmut The Jeweler", platform: "Custom", image: "https://stargems.com/assets/img/Websites/HELMUT.webp", url: "http://helmutjewelry.com/" },
    { id: 52, name: "West Essex Jewelers", platform: "Shopify", image: "https://stargems.com/assets/img/Websites/WEST.webp", url: "https://westessexjewelers.net/" },
    { id: 53, name: "Alabama Wholesale Diamonds", platform: "Shopify", image: "https://stargems.com/assets/img/Websites/Alabama-wholesale-Diamonds.webp", url: "http://alabamawholesalediamonds.com/" },
    { id: 54, name: "Precious Fine Jewelers", platform: "Shopify", image: "https://stargems.com/assets/img/Websites/PRECIOUS.webp", url: "http://preciousfinejewelers.com/" },
    { id: 55, name: "SHR Precious Metals, Inc.", platform: "Custom", image: "https://stargems.com/assets/img/Websites/SHR.webp", url: "http://www.shrefining.com/" },
    { id: 56, name: "Bergey Jewelry", platform: "Custom", image: "https://stargems.com/assets/img/Websites/Bergey.webp", url: "http://www.bergeyjewelry.com/" },
    { id: 57, name: "Julie's Jewels & Gifts", platform: "Shopify", image: "https://stargems.com/assets/img/Websites/Julies-Jewels-and-Gifts-SC.webp", url: "http://juliesjewelsandgifts.com/" },
    { id: 58, name: "Alexander’s of Atlanta", platform: "Custom", image: "https://stargems.com/assets/img/Websites/AOA.webp", url: "http://alexandersofatlanta.com/" },
    { id: 59, name: "Albrecht Jewelry", platform: "Shopify", image: "https://stargems.com/assets/img/Websites/Albrecht-Jewelry.webp", url: "http://www.albrechtjewelry.com/" },
    { id: 60, name: "ASBA USA", platform: "Custom", image: "https://stargems.com/assets/img/Websites/ASBA.webp", url: "http://www.asbausa.com/" },
    { id: 61, name: "Brummitt Jewelry Design Studio", platform: "Shopify", image: "https://stargems.com/assets/img/Websites/Brummitt-Jewelry-Studio.webp", url: "http://www.brummittjewelrystudio.com/" },
    { id: 62, name: "Brilliant Gem Buttons", platform: "Shopify", image: "https://stargems.com/assets/img/Websites/BGB.webp", url: "https://brilliantgembuttons.com/" },
    { id: 63, name: "Dublin Village Jewelers", platform: "Shopify", image: "https://stargems.com/assets/img/Websites/Dublin-Village-Jewelers.webp", url: "http://www.dublinvillagejewelers.com/" },
    { id: 64, name: "Eduardo Accostupa Jewelry Designer", platform: "Wordpress", image: "https://stargems.com/assets/img/Websites/EDUA.webp", url: "http://www.eduardoaccostupa.com/" },
    { id: 65, name: "Coats Jewelers", platform: "Shopify", image: "https://stargems.com/assets/img/Websites/Coats-Jewelers.webp", url: "http://coatsjewelers.com/" },
    { id: 66, name: "Humphreys & Sons", platform: "Shopify", image: "https://stargems.com/assets/img/Websites/HUMP.webp", url: "https://humphreysandson.com/" },
    { id: 67, name: "Clayton Jewelers", platform: "Shopify", image: "https://stargems.com/assets/img/Websites/Clayton-jewelers.webp", url: "http://claytonjewelers.net/" },
    { id: 68, name: "Famulare Jewelers", platform: "Others", image: "https://stargems.com/assets/img/Websites/Famulare-Jewelers.webp", url: "http://www.famularejewelers.com/" },
    { id: 69, name: "J. David Jewelry", platform: "Shopify", image: "https://stargems.com/assets/img/Websites/J-DAVID-JEWELRY.webp", url: "http://jdavidjewelry.com/" },
    { id: 70, name: "Stevens Creations LLC", platform: "Custom", image: "https://stargems.com/assets/img/Websites/stevenscreationsllc.webp", url: "http://stevencreationsllc.com/" },
    { id: 71, name: "Treasures Old & New", platform: "Custom", image: "https://stargems.com/assets/img/Websites/TON.webp", url: "http://treasureson.com/" },
    { id: 72, name: "Baraka Gems", platform: "Shopify", image: "https://stargems.com/assets/img/Websites/Baraka-Gems.webp", url: "http://barakagems.com/" },
    { id: 73, name: "Wright's Jewelry", platform: "Shopify", image: "https://stargems.com/assets/img/Websites/Wrights-Jewelry.webp", url: "http://www.wrightsjewelrystore.com/" },
    { id: 74, name: "Skyline Gems", platform: "Shopify", image: "https://stargems.com/assets/img/Websites/Skyline-G.webp", url: "http://skylinegems.com/" },
    { id: 75, name: "Brillante Jeweler", platform: "Shopify", image: "https://stargems.com/assets/img/Websites/Brillante-and-Co.webp", url: "http://www.brillantejeweler.com/" },
    { id: 76, name: "Wendels Jewelers", platform: "Custom", image: "https://stargems.com/assets/img/Websites/wendelsjewelers.webp", url: "http://wendelsjewelers.com/" },
    { id: 77, name: "The Jewelry Guy", platform: "Shopify", image: "https://stargems.com/assets/img/Websites/TJG.webp", url: "https://thejewelryguy.com/" },
    { id: 78, name: "Gwens Fine Jewelers", platform: "Shopify", image: "https://stargems.com/assets/img/Websites/Gwens-Fine-Jewelers.webp", url: "http://www.gwensfinejewelers.com/" },
    { id: 79, name: "Jewelry Savers", platform: "Wordpress", image: "https://stargems.com/assets/img/Websites/ewelry-Savers-Inc_1.webp", url: "http://www.jewelrysavers.com/" },
    { id: 80, name: "Infinger's Jewelry", platform: "Shopify", image: "https://stargems.com/assets/img/Websites/Infingers-Jewelry.webp", url: "https://www.infingers.com/" },
    { id: 81, name: "Leo Hamel Fine Jewelers", platform: "Wordpress", image: "https://stargems.com/assets/img/Websites/Leo-Hamel-Fine-Jewelers.webp", url: "https://www.leohamel.com/" },
    { id: 82, name: "Richardson Jewelers Marquette", platform: "Shopify", image: "https://stargems.com/assets/img/Websites/Richardson-Jewelers-MQT.webp", url: "https://richardsonjewelersmqt.com/" },
    { id: 83, name: "K. Zander Jewelry", platform: "Shopify", image: "https://stargems.com/assets/img/Websites/K-Zander-Jewelry.webp", url: "https://kzanderjewelry.com/" },
    { id: 84, name: "Sparkles Jewelry", platform: "Shopify", image: "https://stargems.com/assets/img/Websites/Sparkles-Jewelry.webp", url: "http://www.sparklesjewelrymi.com/" },
    { id: 85, name: "David Porter Jewelry", platform: "Custom", image: "https://stargems.com/assets/img/Websites/DPJ.webp", url: "https://www.davidporterjewelry.com/" },
    { id: 86, name: "Hustedt Jewelers", platform: "Shopify", image: "https://stargems.com/assets/img/Websites/Hustedt-Jewelers.webp", url: "http://hustedtjewelers.com/" },
    { id: 87, name: "Cooper Fine Jewelers", platform: "Shopify", image: "https://stargems.com/assets/img/Websites/COOP.webp", url: "http://cooperfinejewelers.com/" },
    { id: 88, name: "Carolina Diamond Buyer", platform: "Wordpress", image: "https://stargems.com/assets/img/Websites/Carolina-Diamond-Buyer.webp", url: "https://carolinadiamondbuyer.com/" },
    { id: 89, name: "You Design We Create", platform: "Shopify", image: "https://stargems.com/assets/img/Websites/AJs-jewelry.webp", url: "http://youdesignwecreate.com/" },
    { id: 90, name: "W.P. Shelton Jewelers", platform: "Shopify", image: "https://stargems.com/assets/img/Websites/WP-Shelton-Jewelers.webp", url: "http://www.wpsheltonjewelers.com/" },
    { id: 91, name: "Borthwick Jewelry", platform: "Custom", image: "https://stargems.com/assets/img/Websites/BJC.webp", url: "http://http//borthwickjewelry.com" },
    { id: 92, name: "Wolf Jewelry and Watches", platform: "Wordpress", image: "https://stargems.com/assets/img/Websites/Wolf-Jewelry.webp", url: "http://thewolfjewelry.com/" },
    { id: 93, name: "Rocky’s Diamond Gallery", platform: "Custom", image: "https://stargems.com/assets/img/Websites/ROCK.webp", url: "http://www.rockysdiamonds.com/" },
    { id: 94, name: "Mansi Jewelry", platform: "Shopify", image: "https://stargems.com/assets/img/Websites/Mansi-Jewelry.webp", url: "http://mansijewelry.com/" },
    { id: 95, name: "Dale Robertson Jewelry", platform: "Custom", image: "https://stargems.com/assets/img/Websites/DALE.webp", url: "https://dalerobertsonjewelry.com/" }
];

const RETAILERS_DATA = BASE_RETAILERS;

/* ================= PRICING DATA ================= */
const PRICING_DATA = [
    {
        id: "01",
        url: "https://stargems.com/order-form.aspx?Pg=OrderDetails&Plan=Starter",
        title: "Starter",
        subtitle: "Website care and ongoing SEO to keep your store visible and running smoothly",
        price: "$275",
        priceLabel: "/ Month",
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

/* ================= STATE & CONFIG ================= */
const PLATFORM_OPTIONS = ["All", "Custom", "Shopify", "Wordpress", "NOP", "Others"];

let state = {
    activePlatform: "All",
    search: "",
    visibleItems: 12
};

/* ================= 3. UTILITIES ================= */
function safeFeatherReplace() {
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

function normalizeData() {
    RETAILERS_DATA.forEach(item => {
        if (!item.platform) item.platform = "Others";
    });
}

/* ================= 4. RENDER FUNCTIONS ================= */

document.addEventListener('DOMContentLoaded', () => {
    console.log("App Initializing...");
    normalizeData();
    renderFilters();
    renderShowcase(false);
    renderPricing();
    setupEventListeners();
    safeFeatherReplace();

    // Re-render masonry on resize (debounced slightly)
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            renderShowcase(true); // Treat as "load more" aka append/re-render without skeleton clearing
        }, 100);
    });
});

// Render the Custom Dropdown Filter
function renderFilters() {
    const platformContainer = document.getElementById('platform-filters');
    if (!platformContainer) return;

    const current = state.activePlatform;

    // Create the custom structure
    // We need: A Trigger (Display current selection) + A Dropdown Menu (List of options)
    const dropdownHtml = `
        <div class="custom-dropdown" id="filter-dropdown">
            <div class="dropdown-trigger" onclick="toggleDropdown()">
                <span>${current}</span>
                <i data-feather="chevron-down" class="dropdown-icon"></i>
            </div>
            <div class="dropdown-options">
                ${PLATFORM_OPTIONS.map(p => `
                    <div class="dropdown-option ${p === current ? 'selected' : ''}" onclick="selectCustomOption('${p}')">
                        ${p}
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    platformContainer.innerHTML = dropdownHtml;
    safeFeatherReplace();
}

// Custom Dropdown Logic
window.toggleDropdown = function () {
    const dropdown = document.getElementById('filter-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('open');
    }
};

window.selectCustomOption = function (value) {
    setPlatform(value);
    // The renderFilters is called inside setPlatform, which re-renders the dropdown, closing it automatically.
};

// Close dropdown when clicking outside
document.addEventListener('click', function (event) {
    const dropdown = document.getElementById('filter-dropdown');
    if (dropdown && dropdown.classList.contains('open')) {
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove('open');
        }
    }
});

// Render Grid (FIXED: Unlocks height strictly after rendering)
function renderShowcase(isLoadMore = false) {
    const grid = document.getElementById('showcase-grid');
    const emptyState = document.getElementById('empty-state');
    const seeMoreContainer = document.getElementById('see-more-container');

    if (!grid) return;

    // 1. Only show skeletons if we are NOT appending (i.e. changing filters)
    if (!isLoadMore) {
        // LOCK HEIGHT to prevent scroll jumping
        if (grid.offsetHeight > 0) {
            grid.style.minHeight = `${grid.offsetHeight}px`;
        }

        const skeletonHTML = Array(10).fill('<div class="skeleton-card"></div>').join('');
        grid.innerHTML = skeletonHTML;

        if (emptyState) emptyState.classList.add('hidden');
        if (seeMoreContainer) seeMoreContainer.classList.add('hidden');
    }

    // 2. DEFINE THE RENDER LOGIC
    const executeRender = () => {
        try {
            console.log("Starting executeRender...");
            const filtered = RETAILERS_DATA.filter(item => {
                const platform = item.platform ? item.platform.toLowerCase() : '';
                const active = state.activePlatform ? state.activePlatform.toLowerCase() : '';
                const name = item.name ? item.name.toLowerCase() : '';
                const search = state.search ? state.search.toLowerCase() : '';

                return (state.activePlatform === "All" || platform === active) && name.includes(search);
            });

            // Sort by ID descending for ALL tabs
            filtered.sort((a, b) => b.id - a.id);

            if (filtered.length === 0) {
                grid.innerHTML = '';
                if (emptyState) emptyState.classList.remove('hidden');
                if (seeMoreContainer) seeMoreContainer.classList.add('hidden');
            } else {
                if (emptyState) emptyState.classList.add('hidden');

                const itemsToShow = filtered.slice(0, state.visibleItems);

                // DEBUG: Force visible confirmation

                // --- JS MASONRY LOGIC ---
                // 1. Determine columns based on width
                let numCols = 4;
                if (window.innerWidth <= 600) numCols = 2; // Mobile: 2 Columns
                else if (window.innerWidth <= 900) numCols = 2;
                else if (window.innerWidth <= 1200) numCols = 3;

                // 2. Create buckets
                const cols = Array.from({ length: numCols }, () => []);

                // 3. Distribute (Pinterest Horizontal Order: 1->0, 2->1, 3->2, 4->3, 5->0 ...)
                itemsToShow.forEach((item, index) => {
                    const colIndex = index % numCols;
                    cols[colIndex].push(item);
                });

                // 4. Render Columns
                // We render distinct columns, each containing its stack of cards.
                grid.innerHTML = cols.map(colItems => `
                    <div class="masonry-col">
                        ${colItems.map(item => `
                            <div class="browser-card" data-id="${item.id}" data-name="${item.name}" data-platform="${item.platform}">
                                <img src="${item.image}?v=2" alt="${item.name}" referrerpolicy="no-referrer">
                                <div class="card-overlay">
                                    <div class="card-info">
                                        <h3>${item.name}</h3>
                                        <p>${item.platform}</p>
                                    </div>
                                    <a href="${item.url}" target="_blank" class="hover-visit-btn">
                                        Visit Website <i data-feather="external-link" style="width:16px;"></i>
                                    </a>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `).join('');

                if (seeMoreContainer) {
                    if (state.visibleItems < filtered.length) {
                        seeMoreContainer.classList.remove('hidden');
                    } else {
                        seeMoreContainer.classList.add('hidden');
                    }
                }
            }
        } catch (error) {
            console.error("Error rendering showcase:", error);
            grid.innerHTML = `<p style="text-align:center; padding: 20px; color: red;">Error loading retailers: ${error.message}</p>`;
        }

        // --- Unlock height AFTER content is inserted ---
        if (grid.children.length > 0) {
            grid.style.minHeight = '0';
        }
        safeFeatherReplace();
    };

    // 3. EXECUTE
    // Use timeout to allow DOM to settle, but keep it short
    if (isLoadMore) {
        executeRender();
    } else {
        setTimeout(executeRender, 200);
    }
}

// Render Pricing
function renderPricing() {
    const grid = document.getElementById('pricing-grid');
    if (!grid) return;

    grid.innerHTML = PRICING_DATA.map(plan => {
        const mainFeaturesHtml = plan.mainFeatures.map(feat =>
            `<li><i data-feather="check" style="width:16px; height:16px; color:#2671AC; margin-right:8px;"></i> ${feat}</li>`
        ).join('');

        const detailsHtml = plan.details.map(section => {
            const listItems = section.items.map(item => {
                if (typeof item === 'string') {
                    return `<li class="standard-item">• ${item}</li>`;
                } else {
                    return `
                        <li class="nested-container">
                            <strong>${item.label}</strong>
                            <ul class="sub-list" style="margin-left: 10px; padding-left:10px; border-left:2px solid #E6E6E6;">
                                ${item.subList.map(sub => `<li>- ${sub}</li>`).join('')}
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

        return `
            <div class="pricing-card ${plan.id === '03' ? 'recommended-border' : ''}" id="plan-${plan.id}">
                ${plan.id === '03' ? '<div class="recommended-badge">Recommended</div>' : ''}
                <div class="card-header">
                    <h3>${plan.title}</h3>
                    <p>${plan.subtitle}</p>
                </div>
                <div class="price-display">
                    ${prefixHtml}
                    <span class="val">${plan.price}</span>
                    <span class="period" style="margin-left: 6px;"> ${suffixLabel}</span>
                </div>
                <ul class="main-feature-list">
                    ${mainFeaturesHtml}
                </ul>
                <button class="toggle-btn" onclick="toggleDetails('details-${plan.id}', this)" type="button">
                    See all features <i data-feather="plus" style="width:14px;"></i>
                </button>
                <div class="collapsible-section" id="details-${plan.id}">
                    ${detailsHtml}
                </div>
                <a href="${plan.url}" target="_self" class="initiate-btn" style="text-decoration:none; display:flex; justify-content:center; align-items:center;">
                    Sign Up <i data-feather="arrow-right" style="width:16px; margin-left:8px;"></i>
                </a>
            </div>
        `;
    }).join('');
    safeFeatherReplace();
}

/* ================= 5. CLICK HANDLERS ================= */

window.setPlatform = function (platformName) {
    state.activePlatform = platformName;
    state.visibleItems = 12;
    renderFilters();

    // Fix: Scroll back to top of grid if user is scrolled down, to prevent "jumping" to footer
    const filterContainer = document.getElementById('platform-filters');
    if (filterContainer) {
        // Calculate position: element top + scrollY - padding (approx 100px for header/breathing room)
        const targetPosition = filterContainer.getBoundingClientRect().top + window.scrollY - 100;

        // Only scroll up if we are currently deeper down the page
        if (window.scrollY > targetPosition) {
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    renderShowcase(false);
};

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

/* ================= 6. LISTENERS ================= */
function setupEventListeners() {
    const searchWrapper = document.querySelector('.search-wrapper');
    const searchInput = document.getElementById('search-input');

    if (searchWrapper && searchInput) {
        // Toggle active state on click (mainly for mobile/tablet)
        searchWrapper.addEventListener('click', (e) => {
            // Only toggle if we are in the "button" mode (detected via stylesheet or just check widnow width)
            // Or simpler: just toggle if the click is NOT on the input itself (to avoid closing when typing)
            if (window.innerWidth <= 1024 && e.target !== searchInput) {
                searchWrapper.classList.toggle('active');
                if (searchWrapper.classList.contains('active')) {
                    searchInput.focus();
                }
            }
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024) {
                if (!searchWrapper.contains(e.target)) {
                    searchWrapper.classList.remove('active');
                }
            }
        });

        searchInput.addEventListener('input', (e) => {
            state.search = e.target.value;
            state.visibleItems = 12;
            renderShowcase(false);
        });
    }

    const seeMoreBtn = document.getElementById('see-more-btn');
    if (seeMoreBtn) {
        seeMoreBtn.addEventListener('click', () => {
            state.visibleItems += 12;
            renderShowcase(true);
        });
    }

    const quoteBtn = document.getElementById('get-quote-btn');
    if (quoteBtn) {
        quoteBtn.addEventListener('click', () => {
            const pricingGrid = document.getElementById('pricing-grid');
            if (pricingGrid) {
                const headerOffset = 20;
                const elementPosition = pricingGrid.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        });
    }
}

/* ================= 7. MODAL LOGIC ================= */
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
