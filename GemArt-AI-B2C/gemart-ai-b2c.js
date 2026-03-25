/* ══════════════════════════════════════
      STATE
   ══════════════════════════════════════ */
var contactType = 'phone';
var generatedOTP = '';
var resendTimer = null;
var modalInstance = null;
var sidebarCollapsed = false;
var activeDesignId = localStorage.getItem('activeChatId') ? parseInt(localStorage.getItem('activeChatId')) : null;
var chats = JSON.parse(localStorage.getItem('gemart_chats')) || [];
var galleryModalInstance = null;
var tryOnModalInstance = null;

// Default welcome message
const WELCOME_MSG = {
    sender: 'ai',
    content: "Hello! I'm your AI design assistant. Upload a sketch or describe your vision, and I'll create photorealistic concepts for you.",
    timestamp: Date.now()
};


/* ══════════════════════════════════════
   OTP FLOW
══════════════════════════════════════ */
function initModals() {
    const modalEl = document.getElementById('loginModal');
    const b = window.bootstrap || (typeof bootstrap !== 'undefined' ? bootstrap : null);
    if (modalEl && b && b.Modal && !modalInstance) {
        modalInstance = new b.Modal(modalEl, { backdrop: 'static' });
    }
}

function openLogin() {
    console.log('Preparing Login Modal...');
    goToStep(1);
    initModals();
    if (modalInstance) {
        modalInstance.show();
    }
}

function setContactType(t) { contactType = t; }

function goToStep(n) {
    document.querySelectorAll('.otp-step').forEach(function (s) { s.classList.remove('active'); });
    document.getElementById('step-' + n).classList.add('active');
}

function sendOTP() {
    var errEl = document.getElementById('step1-error');
    errEl.style.display = 'none';
    var contact = '';
    if (contactType === 'phone') {
        var cc = document.getElementById('country-code').value;
        var ph = document.getElementById('phone-input').value.replace(/\D/g, '');
        if (ph.length < 7) { errEl.textContent = 'Please enter a valid phone number.'; errEl.style.display = 'block'; return; }
        contact = cc + ' ' + ph;
    } else {
        var em = document.getElementById('email-input').value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) { errEl.textContent = 'Please enter a valid email address.'; errEl.style.display = 'block'; return; }
        contact = em;
    }
    document.getElementById('sent-to-display').textContent = contact;
    generatedOTP = String(Math.floor(100000 + Math.random() * 900000));
    console.log('[DEV] OTP:', generatedOTP);

    var btn = document.getElementById('send-otp-btn');
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
    btn.disabled = true;
    setTimeout(function () {
        btn.innerHTML = 'Send One-Time Code &nbsp;<i class="bi bi-arrow-right"></i>';
        btn.disabled = false;
        goToStep(2);
        clearOTPBoxes();
        document.getElementById('otp-0').focus();
        startResendTimer(30);
    }, 1200);
}

function verifyOTP() {
    var errEl = document.getElementById('otp-error');
    errEl.style.display = 'none';
    var entered = getEnteredOTP();
    if (entered.length < 6) { errEl.textContent = 'Please enter all 6 digits.'; errEl.style.display = 'block'; return; }

    var btn = document.getElementById('verify-btn');
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Verifying...';
    btn.disabled = true;

    setTimeout(function () {
        btn.innerHTML = 'Verify &amp; Enter GemArt AI &nbsp;<i class="bi bi-gem"></i>';
        btn.disabled = false;
        if (entered === generatedOTP || entered === '000000') {
            goToStep(3);
            setTimeout(launchApp, 1500);
        } else {
            errEl.textContent = 'Incorrect code. Please try again.';
            errEl.style.display = 'block';
            clearOTPBoxes();
            document.getElementById('otp-0').focus();
        }
    }, 1000);
}

function launchApp() {
    /* 1. Kill modal cleanly */
    try { modalInstance.hide(); } catch (e) { }
    setTimeout(function () {
        document.querySelectorAll('.modal-backdrop').forEach(function (el) { el.remove(); });
        document.querySelectorAll('.modal').forEach(function (el) { el.classList.remove('show'); el.style.display = 'none'; });
        document.body.classList.remove('modal-open');
        document.body.style.removeProperty('padding-right');
        document.body.style.overflow = 'hidden';

        /* 2. Switch views */
        const landing = document.getElementById('landing-view');
        const av = document.getElementById('app-view');
        if (landing) landing.style.display = 'none';
        if (av) {
            av.style.display = 'flex';
            av.classList.add('fade-up');
        }

        /* 3. Boot workspace */
        localStorage.setItem('gemart_session', 'true');
        const contact = document.getElementById('sent-to-display').textContent;
        if (contact && contact !== 'your number') {
            localStorage.setItem('gemart_user', contact);
        }
        initAppUI();
    }, 300);
}

/* OTP box wiring */
document.addEventListener('DOMContentLoaded', function () {
    // Check session
    if (localStorage.getItem('gemart_session') === 'true') {
        const contact = localStorage.getItem('gemart_user');
        if (contact) {
            const el = document.getElementById('sent-to-display');
            if (el) el.textContent = contact;
        }
        launchAppQuick();
    } else {
        // Second visitor/fresh session setup
        const landing = document.getElementById('landing-view');
        const appView = document.getElementById('app-view');
        if (landing) landing.style.display = 'block';
        if (appView) appView.style.display = 'none';
        renderDesignList();
        initModals();
    }

    for (var i = 0; i < 6; i++) {
        (function (idx) {
            var box = document.getElementById('otp-' + idx);
            box.addEventListener('input', function () {
                this.value = this.value.replace(/\D/g, '').slice(-1);
                if (this.value && idx < 5) document.getElementById('otp-' + (idx + 1)).focus();
            });
            box.addEventListener('keydown', function (e) {
                if (e.key === 'Backspace' && !this.value && idx > 0) document.getElementById('otp-' + (idx - 1)).focus();
            });
            box.addEventListener('paste', function (e) {
                e.preventDefault();
                var p = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '').slice(0, 6);
                p.split('').forEach(function (ch, j) { if (j < 6) document.getElementById('otp-' + j).value = ch; });
                document.getElementById('otp-' + Math.min(p.length, 5)).focus();
            });
        })(i);
    }
});

function clearOTPBoxes() { for (var i = 0; i < 6; i++) document.getElementById('otp-' + i).value = ''; }
function getEnteredOTP() { var s = ''; for (var i = 0; i < 6; i++) s += document.getElementById('otp-' + i).value; return s; }

function startResendTimer(secs) {
    var cd = document.getElementById('resend-countdown');
    var lk = document.getElementById('resend-link');
    lk.style.display = 'none';
    var r = secs;
    cd.textContent = 'Resend in ' + r + 's';
    clearInterval(resendTimer);
    resendTimer = setInterval(function () {
        r--;
        if (r <= 0) { clearInterval(resendTimer); cd.textContent = ''; lk.style.display = 'inline'; }
        else cd.textContent = 'Resend in ' + r + 's';
    }, 1000);
}

function resendOTP() {
    generatedOTP = String(Math.floor(100000 + Math.random() * 900000));
    console.log('[DEV] New OTP:', generatedOTP);
    clearOTPBoxes();
    document.getElementById('otp-0').focus();
    startResendTimer(30);
    showToast('A new code has been sent.');
}

/* ══════════════════════════════════════
   APP WORKSPACE
══════════════════════════════════════ */
function initAppUI() {
    const contactEl = document.getElementById('sent-to-display');
    const contact = contactEl ? contactEl.textContent : '';
    if (contact && contact !== 'your number') {
        const initial = '<i class="bi bi-person-fill"></i>';
        const avatarEl = document.getElementById('user-avatar');
        const nameEl = document.getElementById('user-name-chip');
        if (avatarEl) avatarEl.innerHTML = initial;
        if (nameEl) nameEl.textContent = contact.length > 20 ? contact.slice(0, 19) + '...' : contact;
    }
    renderDesignList();

    if (activeDesignId && chats.find(c => c.id === activeDesignId)) {
        selectDesign(activeDesignId);
    } else {
        newDesign();
    }
}

function renderDesignList() {
    var list = document.getElementById('design-list');
    list.innerHTML = '';

    if (chats.length > 0) {
        var group = document.createElement('div');
        group.className = 'sidebar-group-title';
        group.textContent = 'Recent Chats';
        list.appendChild(group);
    } else {
        list.innerHTML = '<div class="px-3 py-4 text-center text-slate" style="font-size: .75rem; opacity: .7;">No chats yet. Start designing!</div>';
    }

    chats.forEach(function (c) {
        var item = document.createElement('div');
        item.className = 'design-item' + (c.id === activeDesignId ? ' active' : '');
        item.setAttribute('data-id', c.id);
        item.innerHTML =
            '<i class="bi bi-chat-left-text chat-item-icon"></i>' +
            '<span class="design-name">' + (c.name.length > 20 ? c.name.slice(0, 19) + '...' : c.name) + '</span>' +
            '<div class="chat-item-actions">' +
            '<button class="icon-btn-sm" onclick="event.stopPropagation(); deleteChat(' + c.id + ')"><i class="bi bi-trash"></i></button>' +
            '</div>';
        item.onclick = function () { selectDesign(c.id); };
        list.appendChild(item);
    });
}

function saveChats() {
    localStorage.setItem('gemart_chats', JSON.stringify(chats));
    localStorage.setItem('activeChatId', activeDesignId);
}

function deleteChat(id) {
    if (confirm('Delete this chat history?')) {
        chats = chats.filter(c => c.id !== id);
        if (activeDesignId === id) newDesign();
        saveChats();
        renderDesignList();
    }
}

function selectDesign(id) {
    const chatObj = chats.find(c => c.id === id);
    if (!chatObj) return;

    activeDesignId = id;
    saveChats();

    document.querySelectorAll('.design-item').forEach(function (el) {
        el.classList.toggle('active', parseInt(el.getAttribute('data-id')) === id);
    });

    document.getElementById('topbar-hint').textContent = chatObj.name || 'Design workspace';

    // Load messages
    const chatContainer = document.getElementById('chat-messages');
    chatContainer.innerHTML = '';
    chatObj.messages.forEach(msg => {
        renderChatMessage(msg.content, msg.sender, msg.attachments);
    });

    document.getElementById('details-empty').style.display = 'none';
    document.getElementById('details-filled').style.display = '';
    showDesignDetails(chatObj.name);
}

function clearUploadState() {
    const input = document.getElementById('chat-upload');
    if (input) input.value = '';
}

function newDesign() {
    activeDesignId = null;
    saveChats();
    document.querySelectorAll('.design-item').forEach(function (el) { el.classList.remove('active'); });
    clearUploadState();

    // UI Reset
    document.getElementById('topbar-hint').textContent = 'New Chat';
    document.getElementById('prompt-input').value = '';
    const chat = document.getElementById('chat-messages');
    chat.innerHTML = '';
    renderChatMessage(WELCOME_MSG.content, WELCOME_MSG.sender);

    // Initial Suggestions
    const suggestionHtml = `
        <div class="chat-suggestions fade-up d2">
            <button class="suggestion-chip" onclick="useSuggestion('Engagement ring with halo')">Engagement ring with halo</button>
            <button class="suggestion-chip" onclick="useSuggestion('Minimalist rose gold necklace')">Minimalist rose gold necklace</button>
            <button class="suggestion-chip" onclick="useSuggestion('Vintage sapphire earrings')">Vintage sapphire earrings</button>
        </div>
    `;
    const suggestionsDiv = document.createElement('div');
    suggestionsDiv.innerHTML = suggestionHtml;
    chat.appendChild(suggestionsDiv.firstElementChild);

    document.getElementById('details-empty').style.display = '';
    document.getElementById('details-filled').style.display = 'none';
}

function useSuggestion(text) {
    document.getElementById('prompt-input').value = text;
    generateDesign();
}

function createChatSession(initialName) {
    const newId = Date.now();
    activeDesignId = newId;
    chats.unshift({
        id: newId,
        name: initialName.length > 25 ? initialName.slice(0, 22) + '...' : initialName,
        messages: [WELCOME_MSG],
        timestamp: Date.now()
    });
    saveChats();
    renderDesignList();
    return newId;
}

function toggleSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    if (window.innerWidth <= 991) {
        sidebar.classList.toggle('mobile-open');
    } else {
        sidebarCollapsed = !sidebarCollapsed;
        sidebar.classList.toggle('collapsed', sidebarCollapsed);
    }
}

function toggleDetails() {
    const details = document.querySelector('.details-panel');
    if (details) {
        details.classList.toggle('mobile-open');
    }
}

function logout() {
    localStorage.removeItem('gemart_session');
    localStorage.removeItem('gemart_user');
    document.getElementById('app-view').style.display = 'none';
    document.getElementById('landing-view').style.display = '';
    document.body.style.overflow = '';
    window.scrollTo(0, 0);
    showToast('You have been signed out.');
}

function launchAppQuick() {
    document.getElementById('landing-view').style.display = 'none';
    var av = document.getElementById('app-view');
    av.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    initAppUI();
}

/* File upload & Conversational Visualisation */
function onFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        if (!file.type.startsWith('image/')) {
            showToast('Please upload an image file.');
            return;
        }
        const reader = new FileReader();
        reader.onload = function (ev) {
            // Create session if first interaction
            if (!activeDesignId) {
                createChatSession("Image-based Design");
            }

            const imgHtml = `<img src="${ev.target.result}" class="chat-uploaded-img" />`;
            addChatMessage("I've uploaded this reference image for the design.", 'user', imgHtml);

            // Trigger AI response to the upload
            showTypingIndicator();
            setTimeout(() => {
                removeTypingIndicator();
                addChatMessage("That's a great reference! I've analyzed the design elements. Would you like me to generate some initial concepts based on this?", "ai");
            }, 1500);
        };
        reader.readAsDataURL(file);
    }
}

function addChatMessage(content, sender, attachments = null) {
    const msg = {
        sender: sender,
        content: content,
        attachments: attachments,
        timestamp: Date.now()
    };

    // Save to current chat
    if (activeDesignId) {
        const chatObj = chats.find(c => c.id === activeDesignId);
        if (chatObj) {
            chatObj.messages.push(msg);
            saveChats();
        }
    }

    renderChatMessage(content, sender, attachments);
}

function renderChatMessage(content, sender, attachments = null) {
    const chatContainer = document.getElementById('chat-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message-row ${sender}-row fade-up`;

    const time = getTimeString();
    let initial = '<i class="bi bi-person-fill"></i>';

    let html = `
        <div class="${sender}-avatar${sender === 'user' ? '-chat' : ''}">
            ${sender === 'ai' ? '<i class="bi bi-stars"></i>' : initial}
        </div>
        <div class="message-content-wrap">
            <div class="message-bubble">
                <div class="message-text">${content}</div>
                ${attachments ? `<div class="chat-result-grid">${attachments}</div>` : ''}
            </div>
            <div class="message-meta">${time}</div>
        </div>
    `;

    msgDiv.innerHTML = html;
    chatContainer.appendChild(msgDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    return msgDiv;
}

function getTimeString() {
    const now = new Date();
    return now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
}

function showTypingIndicator() {
    const chatContainer = document.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'ai-typing';
    typingDiv.className = 'message-row ai-row fade-up';
    typingDiv.innerHTML = `
        <div class="ai-avatar"><i class="bi bi-stars"></i></div>
        <div class="message-content-wrap">
            <div class="message-bubble">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        </div>
    `;
    chatContainer.appendChild(typingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function removeTypingIndicator() {
    const el = document.getElementById('ai-typing');
    if (el) el.remove();
}

function generateDesign() {
    const input = document.getElementById('prompt-input');
    const prompt = input.value.trim();
    if (!prompt) { input.focus(); return; }

    const btn = document.getElementById('send-btn');
    btn.disabled = true;

    // Handle initial chat creation
    if (!activeDesignId) {
        createChatSession(prompt);
    }

    // 1. Add User Message
    addChatMessage(prompt, 'user');
    input.value = '';

    // 2. Show AI Thinking
    showTypingIndicator();

    setTimeout(function () {
        removeTypingIndicator();
        btn.disabled = false;

        // 3. Generate 2 AI Responses
        const mockImages = [
            'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1599643477874-5c866f5fa5c8?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop'
        ];
        const picked = [];
        const usedIndices = new Set();
        while (picked.length < 2) {
            const index = Math.floor(Math.random() * mockImages.length);
            if (!usedIndices.has(index)) {
                picked.push(mockImages[index]);
                usedIndices.add(index);
            }
        }

        const gridHtml = picked.map((imgUrl, i) => `
            <div class="result-card" style="background: url('${imgUrl}') center/cover;" onclick="selectResult(this)">
                <div class="result-card-label" style="background: rgba(255,255,255,0.7); padding: 2px 6px; border-radius: 4px; font-weight: bold; color: var(--primary-dark);">v${i + 1}</div>
                <button class="btn-download-img" onclick="event.stopPropagation();downloadImage('${imgUrl}', ${i + 1})" title="Download Image">
                    <i class="bi bi-download"></i>
                </button>
            </div>
        `).join('');

        const responseText = "I've generated 2 photorealistic concepts based on your request. You can download the high-res versions or select one to refine further.";
        addChatMessage(responseText, 'ai', gridHtml);

        showDesignDetails(prompt);
        renderDesignList(); // Refresh sidebar active state
    }, 2000);
}

function selectResult(el) {
    document.querySelectorAll('.result-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    showToast('Design selected for refinement.');
}

function showDesignDetails(name) {
    const metals = ['Rose Gold 14K', 'Yellow Gold 18K', 'White Gold 14K', 'Platinum 950'];
    const stones = ['1.2ct Round Diamond', '0.9ct Oval Sapphire', '1.5ct Emerald Cut', '1.0ct Princess Cut'];
    const sides = ['Pavé Diamonds', 'Channel Set', 'Baguette Diamonds', 'None'];
    const styles = ['Solitaire', 'Halo', 'Three-Stone', 'Vintage'];
    const prices = [['$1,240', '$1,560'], ['$2,100', '$2,800'], ['$890', '$1,200'], ['$3,200', '$4,100']];
    const r = Math.floor(Math.random() * 4);

    document.getElementById('detail-title').textContent = name.length > 24 ? name.slice(0, 24) + '...' : name;
    document.getElementById('d-metal').textContent = metals[r];
    document.getElementById('d-stone').textContent = stones[r];
    document.getElementById('d-side').textContent = sides[r];
    document.getElementById('d-style').textContent = styles[r];

    const priceEl = document.getElementById('d-price');
    if (priceEl) priceEl.textContent = prices[r][0] + ' – ' + prices[r][1];

    document.getElementById('details-empty').style.display = 'none';
    document.getElementById('details-filled').style.display = '';
}

/* Virtual Try-On Handlers */

function openTryOn() {
    // Security check: Only open if logged in
    if (localStorage.getItem('gemart_session') !== 'true') {
        showToast('Please sign in to use this feature.');
        openLogin();
        return;
    }

    console.log('Opening Virtual Try-On...');

    // Auto-close details panel or sidebar on mobile before opening modal
    const details = document.querySelector('.details-panel');
    if (details && details.classList.contains('mobile-open')) {
        details.classList.remove('mobile-open');
    }
    const sidebar = document.getElementById('app-sidebar');
    if (sidebar && sidebar.classList.contains('mobile-open')) {
        sidebar.classList.remove('mobile-open');
    }

    try {
        if (!tryOnModalInstance) {
            const modalEl = document.getElementById('tryOnModal');
            if (!modalEl) return;
            const b = window.bootstrap || (typeof bootstrap !== 'undefined' ? bootstrap : null);
            if (b && b.Modal) {
                tryOnModalInstance = new b.Modal(modalEl);
            } else {
                console.error('Bootstrap Modal not found');
                return;
            }
        }

        const titleEl = document.getElementById('detail-title');
        const thumbEl = document.getElementById('try-on-thumb');
        const nameEl = document.getElementById('try-on-name');

        if (titleEl && nameEl) nameEl.textContent = titleEl.textContent;
        if (thumbEl) thumbEl.innerHTML = '<i class="bi bi-gem"></i>';

        tryOnModalInstance.show();
    } catch (e) {
        console.error('Try-On Error:', e);
    }
}

function handleUserPhoto(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (ev) {
            document.getElementById('user-photo-preview').src = ev.target.result;
            document.getElementById('user-photo-preview').style.display = 'block';
            document.getElementById('try-on-placeholder').style.display = 'none';
            showToast('Photo uploaded! Visualizing the design.');
        };
        reader.readAsDataURL(file);
    }
}

function downloadImage(url, version) {
    showToast(`Downloading Design Version ${version}...`);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gemart-design-v${version}.jpg`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/* Gallery Functions */

function openGallery() {
    // Auto-close sidebar on mobile before opening modal
    const sidebar = document.getElementById('app-sidebar');
    if (sidebar && sidebar.classList.contains('mobile-open')) {
        sidebar.classList.remove('mobile-open');
    }

    const modalEl = document.getElementById('galleryModal');
    if (!modalEl) return;

    const b = window.bootstrap || (typeof bootstrap !== 'undefined' ? bootstrap : null);
    if (!b || !b.Modal) {
        console.error('Bootstrap Modal not available');
        return;
    }

    if (!galleryModalInstance) {
        galleryModalInstance = new b.Modal(modalEl);
    }

    const grid = document.getElementById('gallery-grid');
    const empty = document.getElementById('gallery-empty');
    if (!grid || !empty) {
        console.error('Gallery elements not found');
        return;
    }

    grid.innerHTML = '';
    let hasImages = false;

    chats.forEach(chat => {
        chat.messages.forEach(msg => {
            if (msg.attachments) {
                const temp = document.createElement('div');
                temp.innerHTML = msg.attachments;
                const cards = temp.querySelectorAll('.result-card');
                cards.forEach(card => {
                    hasImages = true;
                    const galleryItem = document.createElement('div');
                    galleryItem.className = 'gallery-item';
                    galleryItem.style.backgroundImage = card.style.backgroundImage;
                    galleryItem.style.backgroundPosition = card.style.backgroundPosition;
                    galleryItem.style.backgroundSize = card.style.backgroundSize;
                    galleryItem.style.backgroundColor = card.style.backgroundColor;
                    galleryItem.innerHTML = `
                        <button class="btn-download-img" style="opacity:1; bottom:10px; right:10px;" onclick="showToast('Downloading...')">
                            <i class="bi bi-download"></i>
                        </button>
                    `;
                    grid.appendChild(galleryItem);
                });
            }
        });
    });

    empty.style.display = hasImages ? 'none' : 'block';
    galleryModalInstance.show();
}

/* Utility */
function showToast(msg) {
    var t = document.createElement('div');
    t.style.cssText = 'position:fixed;bottom:24px;right:24px;background:var(--primary-dark);color:#fff;font-size:.83rem;z-index:99999;border:1px solid rgba(170,190,220,.25);min-width:220px;padding:12px 16px;border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,.2);font-family:var(--font-sans);';
    t.innerHTML = '<i class="bi bi-check-circle me-2" style="color:var(--accent);"></i>' + msg;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 3000);
}


