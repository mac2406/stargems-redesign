// Video Data Configuration
const VIDEO_DB = {
    baseItems: [
        // GemArt AI
        {
            id: '1',
            category: 'GemArt',
            title: 'How to Create a Jewelry Design From a Prompt in GemArt AI',
            desc: 'GemArt AI',
            summary: 'Turn a simple text idea into a complete jewelry design. Generate and refine concepts in minutes.',
            duration: '',
            thumbnail: '',
            videoSrc: 'TUT1_Prompt.webm'
        },
        {
            id: '2',
            category: 'GemArt',
            title: 'How to Upload and Transform Jewelry Designs in GemArt AI',
            desc: 'GemArt AI',
            summary: 'Upload a photo, sketch, or CAD file and create new design variations instantly.',
            duration: '',
            thumbnail: '',
            videoSrc: 'TUT2_Upload.webm'
        },
        {
            id: '3',
            category: 'GemArt',
            title: 'How to Price Jewelry Designs in GemArt AI',
            desc: 'GemArt AI',
            summary: 'Learn how pricing is calculated using metals, stones, and design specs.',
            duration: '',
            thumbnail: '',
            videoSrc: 'TUT3_Pricing.webm'
        },
        {
            id: '4',
            category: 'GemArt',
            title: 'How to Create Jewelry Renders in GemArt AI',
            desc: 'GemArt AI',
            summary: 'Generate photorealistic renders for presentations, websites, and social media.',
            duration: '',
            thumbnail: '',
            videoSrc: 'TUT4_Renders.webm'
        },
        {
            id: '5',
            category: 'GemArt',
            title: 'How to Adjust Markups and Pricing in GemArt AI',
            desc: 'GemArt AI',
            summary: 'Update pricing with markups and margins to keep quotes accurate and consistent.',
            duration: '',
            thumbnail: '',
            videoSrc: 'TUT5_Markup.webm'
        },
        {
            id: '6',
            category: 'GemArt',
            title: 'How to Customize 25,000+ CAD Designs in GemArt AI',
            desc: 'GemArt AI',
            summary: 'Edit and refine designs from Star Gems\' CAD library to create new variations quickly.',
            duration: '',
            thumbnail: '',
            videoSrc: 'TUT6_CADS.webm'
        },
        {
            id: '7',
            category: 'GemArt',
            title: 'How to Use the Gallery in GemArt AI',
            desc: 'GemArt AI',
            summary: 'View, organize, and manage your designs and generated assets in one place.',
            duration: '',
            thumbnail: '',
            videoSrc: 'TUT7_Gallery.webm'
        },

        // TextMeChat
        {
            id: '8',
            category: 'TextMeChat',
            title: 'Messaging Basics',
            desc: 'TextMeChat',
            summary: `In this quick tutorial, we'll cover how to send messages using built-in tools that help you connect with customers faster and smarter.<br><br>
                You'll learn how to:<br>
                • Use message templates for quick, consistent replies<br>
                • Change the staff name so messages show who they're coming from<br>
                • Attach reviews, Facebook events, and appointment links directly to your texts`,
            duration: '0:56',
            thumbnail: 'https://dummyimage.com/600x400/000/fff.jpg',
            videoSrc: 'assets/TMC videos/1. TMC Messaging Basic Voiceover.mp4'
        },
        {
            id: '9',
            category: 'TextMeChat',
            title: 'Broadcast Settings',
            desc: 'TextMeChat',
            summary: `In this tutorial, we'll show you how to create and send broadcast messages to contact groups you've made, helping you communicate with multiple customers at once — without missing a beat.<br><br>
                You'll learn how to:<br>
                • Set up broadcast events for mass messaging<br>
                • Select contact groups you want to message<br>
                • Personalize messages for better engagement<br>
                • Schedule or send broadcasts instantly`,
            duration: '1:24',
            thumbnail: 'https://dummyimage.com/600x400/000/fff.jpg',
            videoSrc: 'assets/TMC videos/2. TMC Broadcast Basic Voiceover.mp4'
        },
        {
            id: '10',
            category: 'TextMeChat',
            title: 'Customer View',
            desc: 'TextMeChat',
            summary: `This tutorial shows retailers how their TextMeChat messages look from the customer's perspective. Make sure every message is professional, clear, and includes all the important links.<br><br>
                You'll learn how to:<br>
                • View messages exactly as your customers see them<br>
                • Confirm review links, catalog links, and appointment links are working properly<br>
                • Ensure your messages are polished and engaging before sending`,
            duration: '1:21',
            thumbnail: 'https://dummyimage.com/600x400/000/fff.jpg',
            videoSrc: 'assets/TMC videos/3. TMC Visual_1.mp4'
        },
        {
            id: '11',
            category: 'TextMeChat',
            title: 'Inbox Management',
            desc: 'TextMeChat',
            summary: `This tutorial walks you through the tools that help you organize, search, and filter messages so you can respond quickly and never miss important interactions.<br><br>
                You'll learn how to:<br>
                • Search conversations using date ranges and keywords<br>
                • Navigate other conversation groups in the Conversation Hub<br>
                • Apply conversation filters to find exactly what you need`,
            duration: '1:11',
            thumbnail: 'https://dummyimage.com/600x400/000/fff.jpg',
            videoSrc: 'assets/TMC videos/4. TMC Inbox Management.mp4'
        },
        {
            id: '12',
            category: 'TextMeChat',
            title: 'Catalog Creation',
            desc: 'TextMeChat',
            summary: `This tutorial teaches retailers how to create product catalogs from items they've uploaded, send them via TextMeChat, and see exactly what customers experience when they click the link.<br><br>
                You'll learn how to:<br>
                • Build a product catalog from uploaded items<br>
                • Send catalogs directly to customers through TextMeChat<br>
                • View how the catalog appears to customers for a seamless shopping experience`,
            duration: '1:14',
            thumbnail: 'https://dummyimage.com/600x400/000/fff.jpg',
            videoSrc: 'assets/TMC videos/5. TMC Catalog Voiceover.mp4'
        },
        {
            id: '13',
            category: 'TextMeChat',
            title: 'Sending Coupons',
            desc: 'TextMeChat',
            summary: `In this tutorial, we show retailers how to create digital coupons in TextMeChat, send them to customers, and let them redeem the offers directly through your product catalogs.<br><br>
                You'll learn how to:<br>
                • Create unique digital coupons for your products or services<br>
                • Send coupons easily to individual customers or groups<br>
                • Redeem coupons directly through catalogs for a seamless customer experience`,
            duration: '1:13',
            thumbnail: 'https://dummyimage.com/600x400/000/fff.jpg',
            videoSrc: 'assets/TMC videos/6. TMC Coupons Voiceover.mp4'
        },
        {
            id: '14',
            category: 'TextMeChat',
            title: 'Contact Groups',
            desc: 'TextMeChat',
            summary: `This tutorial shows retailers how to create contact groups in TextMeChat and send messages to everyone in the group at once — perfect for promotions, updates, or announcements.<br><br>
                You'll learn how to:<br>
                • Create and manage contact groups for better organization<br>
                • Send messages to all members of a group in just a few clicks<br>
                • Ensure your messages reach the right audience quickly and efficiently`,
            duration: '1:09',
            thumbnail: 'https://dummyimage.com/600x400/000/fff.jpg',
            videoSrc: 'assets/TMC videos/7. TMC Contact Groups Voiceover.mp4'
        },
        {
            id: '15',
            category: 'TextMeChat',
            title: 'PayByText Invoices',
            desc: 'TextMeChat',
            summary: `This tutorial shows retailers how to create invoices in TextMeChat and send them directly to customers for a seamless, professional payment experience.<br><br>
                You'll learn how to:<br>
                • Create invoices with all the necessary details for your products or services<br>
                • Send invoices directly to customers via TextMeChat<br>
                • Ensure customers receive a clear, professional invoice that's easy to review and pay`,
            duration: '1:01',
            thumbnail: 'https://dummyimage.com/600x400/000/fff.jpg',
            videoSrc: 'assets/TMC videos/8. TMC PBT Voiceover.mp4'
        },
        {
            id: '16',
            category: 'TextMeChat',
            title: 'Message Logs',
            desc: 'TextMeChat',
            summary: `This tutorial shows retailers how to access their message logs in TextMeChat to see exactly when messages were sent and confirm they were delivered correctly.<br><br>
                You'll learn how to:<br>
                • View message history for all your conversations<br>
                • Check delivery status to ensure messages reached the intended recipients<br>
                • Troubleshoot issues and keep your customer communications accurate and reliable`,
            duration: '0:50',
            thumbnail: 'https://dummyimage.com/600x400/000/fff.jpg',
            videoSrc: 'assets/TMC videos/9. TMC Message Logs.mp4'
        },

        // Custom
        {
            id: '17',
            category: 'Custom',
            title: 'Introduction to Catalog Feature',
            desc: 'Custom',
            summary: 'This video demonstrates how to manage CAD designs in a catalog. The user first uses the modal window to add a selected design into a catalog. Then, on the manage-items page, they review and update the catalog contents.',
            duration: '00:26',
            thumbnail: 'https://stargems.com/HelpVideos/helpImages/catalog.webp',
            videoSrc: 'https://www.youtube.com/embed/M_CtdBVucEU?autoplay=1'
        },
        {
            id: '18',
            category: 'Custom',
            title: 'Instantly Price Our 20,000+ Free CADs',
            desc: 'Custom',
            summary: 'This video demonstrates how to remove CAD designs from a catalog. The user opens the catalog, locates the design, and selects the remove option. The CAD grid updates, showing that the design has been successfully removed from the catalog.',
            duration: '00:34',
            thumbnail: 'https://stargems.com/HelpVideos/helpImages/instant%20price.webp',
            videoSrc: 'https://www.youtube.com/embed/oObNLHYQgok?autoplay=1'
        },
        {
            id: '19',
            category: 'Custom',
            title: 'Sorting Through Our 20,000+ Free CADs',
            desc: 'Custom',
            summary: 'This video demonstrates sorting in the CAD library. Users can filter designs by selecting a category such as Band, Bracelet, or Earring. The grid updates to display only the CAD designs matching the chosen category.',
            duration: '00:25',
            thumbnail: 'https://stargems.com/HelpVideos/helpImages/sorting.webp',
            videoSrc: 'https://www.youtube.com/embed/ABcFYcQyM4U?autoplay=1'
        }
    ]
};

const GENERATED_ITEMS = VIDEO_DB.baseItems;

document.addEventListener('DOMContentLoaded', () => {
    const videoModal = new bootstrap.Modal(document.getElementById('videoModal'));
    const videoFrame = document.getElementById('videoFrame');
    const modalTitle = document.getElementById('videoModalLabel');
    const gridContainer = document.getElementById('video-grid'); // Container for cards

    const ITEMS_PER_PAGE = 9;
    let currentPage = 1;
    let currentCategory = 'all';
    let currentSearch = ''; // Add search state (Main Grid)

    // Sidebar State
    let currentDetailId = null;
    let currentSidebarSearch = '';

    // 1. Render Grid
    // 1. Render Grid with Skeleton Loading
    function renderGrid(filterCategory = 'all', page = 1) {
        // Show Skeletons
        renderSkeletons();

        // Simulate network delay for UX
        setTimeout(() => {
            executeRender(filterCategory, page, currentSearch);
        }, 300); // Reduced delay for snappier feel
    }

    function renderSkeletons() {
        gridContainer.innerHTML = '';
        const skeletonCount = ITEMS_PER_PAGE;

        for (let i = 0; i < skeletonCount; i++) {
            const col = document.createElement('div');
            col.className = 'col-12 col-md-6 col-lg-4';
            col.innerHTML = `
                <div class="skeleton-card">
                    
                    <div class="skeleton-visual-box">
                         <div class="skeleton-image skeleton-shimmer"></div>
                    </div>
                    
                    <div class="skeleton-details">
                         <div class="skeleton-title skeleton-shimmer"></div>
                         <div class="skeleton-text skeleton-shimmer"></div>
                         <div class="skeleton-text short skeleton-shimmer"></div>
                         
                         <div class="skeleton-footer">
                            <div class="skeleton-tag skeleton-shimmer"></div>
                            <div class="skeleton-tag skeleton-shimmer"></div>
                         </div>
                    </div>
                </div>
            `;
            gridContainer.appendChild(col);
        }
    }

    function executeRender(filterCategory, page, searchTerm = '') {
        currentCategory = filterCategory;
        currentPage = page;
        currentSearch = searchTerm.toLowerCase().trim();

        // Filter items first
        let filteredItems = GENERATED_ITEMS.filter(item => {
            // Category Filter
            const matchesCategory = filterCategory === 'all' ||
                (item.category && item.category.toLowerCase().includes(filterCategory));

            // Search Filter
            const searchSource = `${item.title} ${item.desc} ${item.summary} ${item.category}`.toLowerCase();
            const matchesSearch = !currentSearch || searchSource.includes(currentSearch);

            return matchesCategory && matchesSearch;
        });

        // Pagination Logic
        const totalItems = filteredItems.length;
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

        // Ensure current page is valid
        if (currentPage > totalPages) currentPage = totalPages || 1;
        if (currentPage < 1) currentPage = 1;

        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const itemsToDisplay = filteredItems.slice(startIndex, endIndex);

        gridContainer.innerHTML = ''; // Clear skeletons

        // Handle Empty State / Coming Soon
        if (itemsToDisplay.length === 0) {
            gridContainer.innerHTML = `
                <div class="col-12 text-center py-5">
                    <div class="coming-soon-container">
                        <i data-feather="clock" class="coming-soon-icon mb-3" style="width: 48px; height: 48px; color: #6487AF;"></i>
                        <h3 class="coming-soon-title mb-2">Coming Soon</h3>
                        <p class="coming-soon-text text-muted">
                            Tutorials for <span class="fw-bold text-primary">${filterCategory === 'gemart' ? 'GemArt' :
                    filterCategory === 'textmechat' ? 'TextMeChat' :
                        filterCategory === 'starmatch' ? 'StarMatch' :
                            filterCategory === 'custom' ? 'Custom' : 'this category'
                }</span> are on the way.
                        </p>
                    </div>
                </div>
            `;
            feather.replace();
            renderPagination(0, 1, 2);
            return;
        }

        itemsToDisplay.forEach(item => {
            const col = document.createElement('div');
            col.className = 'col-12 col-md-6 col-lg-4 animate-card'; // Add animation class
            col.setAttribute('data-category', item.category); // Keep for reference

            // Determine tag and display category
            const primaryTag = item.category === 'TextMeChat' ? 'text me chat' : 'gemart ai';
            const displayCategory = item.category === 'TextMeChat' ? 'TextMeChat' : 'GemArt AI';

            col.innerHTML = `
                <div class="video-card" onclick="openVideo('${item.videoSrc}', '${item.title}')" style="cursor: pointer;">
                    <!-- Visual Container (Top part in List View) -->
                    <div class="card-visual-box">
                        <div class="visual-header">
                            <h4 class="visual-subtitle">${displayCategory}</h4>
                            <h3 class="visual-title">STARGEMS SUITE</h3>
                        </div>
                        <div class="visual-image">
                            ${item.thumbnail ?
                    `<img src="${item.thumbnail}" alt="${item.title}" loading="lazy">` :
                    `<div class="placeholder-thumbnail">
                                    <div class="placeholder-inner">
                                        <h4 class="placeholder-title">${item.title}</h4>
                                    </div>
                                 </div>`
                }
                        </div>
                        <div class="visual-meta mt-3 d-flex justify-content-between align-items-center w-100 px-2">
                            <div class="duration-text" style="font-weight: 600; color: #556b82;">
                                Duration: ${item.duration}
                            </div>
                            <a href="javascript:void(0)" onclick="openVideo('${item.videoSrc}', '${item.title}')" class="watch-link">
                                <i data-feather="play-circle" style="width: 20px; height: 20px;"></i> Watch Demo
                            </a>
                        </div>
                    </div>

                    <!-- Content Details (Bottom part in List View) -->
                    <div class="card-details-box">
                        <div class="details-main">
                            <h3 class="card-title">${item.title}</h3>
                            <p class="card-desc">${displayCategory}</p>
                            ${item.summary ? `<p class="video-summary text-muted mt-2" style="font-size: 0.95rem; line-height: 1.5;">${item.summary}</p>` : ''}
                        </div>
                        <div class="details-meta">
                            <div class="meta-tags">
                                <span class="badge rounded-pill bg-secondary">${primaryTag}</span>
                                <span class="badge rounded-pill bg-secondary">analytics</span>
                                <span class="badge rounded-pill bg-secondary">business</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            gridContainer.appendChild(col);
        });

        // Initialize Icons
        feather.replace();

        // Render Pagination Controls
        renderPagination(totalPages, currentPage);
    }

    function renderPagination(totalPages) {
        const paginationContainer = document.getElementById('pagination');
        if (!paginationContainer) return;

        paginationContainer.innerHTML = '';

        if (totalPages <= 1) return; // Hide pagination if 1 or 0 pages

        // Previous Button
        const prevLi = document.createElement('li');
        prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
        prevLi.innerHTML = `<a class="page-link" href="javascript:void(0)" onclick="changePage(${currentPage - 1})"><i data-feather="chevron-left"></i></a>`;
        paginationContainer.appendChild(prevLi);

        // Page Numbers
        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement('li');
            li.className = `page-item ${currentPage === i ? 'active' : ''}`;
            li.innerHTML = `<a class="page-link" href="javascript:void(0)" onclick="changePage(${i})">${i}</a>`;
            paginationContainer.appendChild(li);
        }

        // Next Button
        const nextLi = document.createElement('li');
        nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
        nextLi.innerHTML = `<a class="page-link" href="javascript:void(0)" onclick="changePage(${currentPage + 1})"><i data-feather="chevron-right"></i></a>`;
        paginationContainer.appendChild(nextLi);

        feather.replace();
    }

    window.changePage = (page) => {
        renderGrid(currentCategory, page);
        // Scroll to Filter Bar
        const filterBar = document.querySelector('.filter-bar');
        if (filterBar) {
            filterBar.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Initial Render
    renderGrid();

    // 2. Function to open video
    window.openVideo = (src, title) => {
        videoFrame.src = src;
        modalTitle.textContent = title || 'Video Tutorial';
        videoModal.show();
    };

    // Clear video when modal closes to stop playback
    document.getElementById('videoModal').addEventListener('hidden.bs.modal', () => {
        videoFrame.src = '';
    });

    // 3. Filter Logic
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add to clicked
            btn.classList.add('active');

            const category = btn.textContent.trim().toLowerCase();
            // Map button text to category codes if needed, for now using direct mapping or 'all'
            let filterVal = category;

            // Simple mapping based on text content
            if (category === 'all') filterVal = 'all';
            else if (category.includes('gemart')) filterVal = 'gemart';
            else if (category.includes('starmatch')) filterVal = 'starmatch';
            else if (category.includes('textmechat')) filterVal = 'textmechat';
            else if (category.includes('custom')) filterVal = 'custom';

            renderGrid(filterVal);
        });
    });

    // 3.5 Search Logic
    const searchInput = document.querySelector('.filter-bar .search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value;
            renderGrid(currentCategory, 1); // Reset to page 1 on search
        });
    }

    // 4. View Toggle Logic with Persistence
    const btnGridView = document.getElementById('btn-grid-view');
    const btnListView = document.getElementById('btn-list-view');

    // Load saved preference
    const savedView = localStorage.getItem('videoViewMode');
    if (savedView === 'list') {
        gridContainer.classList.add('list-view');
        btnListView.classList.add('active');
        btnGridView.classList.remove('active');
    }

    if (btnGridView && btnListView) {
        btnGridView.addEventListener('click', () => {
            gridContainer.classList.remove('list-view');
            btnGridView.classList.add('active');
            btnListView.classList.remove('active');
            localStorage.setItem('videoViewMode', 'grid');
        });

        btnListView.addEventListener('click', () => {
            gridContainer.classList.add('list-view');
            btnListView.classList.add('active');
            btnGridView.classList.remove('active');
            localStorage.setItem('videoViewMode', 'list');
        });
    }
    // 5. Video Detail View Logic
    const detailView = document.getElementById('video-detail-view');
    const mainContentGrid = document.getElementById('main-content-grid'); // Ensure this ID exists in HTML
    const heroPlayBtn = document.getElementById('hero-play-btn');
    const backToVideosBtn = document.getElementById('back-to-videos');

    // Elements to populate
    const detailFrame = document.getElementById('detail-video-frame');
    const detailTitle = document.getElementById('detail-title');
    const detailDesc = document.getElementById('detail-desc');
    const detailTags = document.getElementById('detail-tags');
    const sidebarAccordion = document.getElementById('sidebarAccordion');

    if (heroPlayBtn) {
        heroPlayBtn.addEventListener('click', () => {
            const heroVideoId = '2';
            const item = GENERATED_ITEMS.find(i => i.id === heroVideoId);

            if (item) {
                openDetailView(item);
            }
        });
    }

    if (backToVideosBtn) {
        backToVideosBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeDetailView();
        });
    }

    function openDetailView(videoData) {
        // Show View
        detailView.classList.remove('d-none');
        document.body.style.overflow = 'hidden'; // Prevent scrolling background

        // Populate Main Video
        updateDetailContent(videoData);

        // Render Sidebar
        currentDetailId = videoData.id;
        renderSidebar();
    }

    function closeDetailView() {
        detailView.classList.add('d-none');
        document.body.style.overflow = '';
        detailFrame.src = ''; // Stop video
    }

    function updateDetailContent(data) {
        detailFrame.src = data.videoSrc;
        detailTitle.textContent = data.title;
        // Use summary for the long description, fallback to desc or default
        // The data already contains <br> tags for formatting, so we don't need to replace newlines.
        detailDesc.innerHTML = data.summary || data.desc || 'No description available.';

        // Tags
        detailTags.innerHTML = '';
        const tags = data.tags || (data.category ? [data.category] : []);
        tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'badge rounded-pill';
            span.textContent = tag;
            detailTags.appendChild(span);
        });
    }

    function renderSidebar() {
        const activeId = currentDetailId;
        const searchTerm = currentSidebarSearch.toLowerCase().trim();

        // 1. Filter Items
        let itemsToRender = GENERATED_ITEMS;
        if (searchTerm) {
            itemsToRender = GENERATED_ITEMS.filter(item => item.title.toLowerCase().includes(searchTerm));
        }

        // 2. Group items by Category
        const grouped = {};
        itemsToRender.forEach(item => {
            const cat = item.category || 'Other';
            if (!grouped[cat]) grouped[cat] = [];
            grouped[cat].push(item);
        });

        // Add placeholders only if we are NOT searching (to avoid cluttering search results)
        if (!searchTerm) {
            if (!grouped['StarMatch AI']) grouped['StarMatch AI'] = [];
            if (!grouped['Custom Process']) grouped['Custom Process'] = [];
        }

        let accordionHTML = '';
        let index = 0;

        for (const [category, items] of Object.entries(grouped)) {
            const collapseId = `collapse${index}`;
            const headerId = `heading${index}`;
            // Expand if search is active (to show results) OR if it contains active ID OR default (GemArt)
            const isExpanded = searchTerm ? true : (activeId ? items.some(i => i.id === activeId) : category === 'GemArt');

            accordionHTML += `
                <div class="accordion-item">
                    <h2 class="accordion-header" id="${headerId}">
                        <button class="accordion-button ${isExpanded ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="${isExpanded}" aria-controls="${collapseId}">
                            ${category}
                        </button>
                    </h2>
                    <div id="${collapseId}" class="accordion-collapse collapse ${isExpanded ? 'show' : ''}" aria-labelledby="${headerId}" data-bs-parent="#sidebarAccordion">
                        <div class="accordion-body">
                            ${items.length > 0 ? items.map(item => `
                                <div class="sidebar-video-item ${item.id === activeId ? 'active' : ''}" onclick="window.playSidebarVideo('${item.id}')">
                                    <span class="text-truncate me-2">${item.title}</span>
                                    <span class="sidebar-video-time">${item.duration || '3:30'}</span>
                                </div>
                            `).join('') : '<div class="p-3 text-muted small">No videos found</div>'}
                        </div>
                    </div>
                </div>
            `;
            index++;
        }

        if (itemsToRender.length === 0) {
            accordionHTML = '<div class="p-4 text-center text-muted">No matching videos found.</div>';
        }

        sidebarAccordion.innerHTML = accordionHTML;
    }

    // Export function to update view from sidebar click
    window.playSidebarVideo = (id) => {
        const item = GENERATED_ITEMS.find(i => i.id === id);
        if (item) {
            updateDetailContent(item);
            currentDetailId = id;
            renderSidebar();

            // Scroll to video top on mobile
            if (window.innerWidth < 992) {
                const viewer = document.getElementById('detail-video-frame');
                if (viewer) viewer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    };

    // Sidebar Search Listener
    const sidebarSearchInput = document.getElementById('sidebar-search-input');
    if (sidebarSearchInput) {
        sidebarSearchInput.addEventListener('input', (e) => {
            currentSidebarSearch = e.target.value;
            renderSidebar();
        });
    }
});


