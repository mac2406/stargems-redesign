// Rate Management Logic - Stargems UI with Live API & Fallback Data
const API_BASE = 'http://72.167.225.160:5000';

function setStoneCategory(category, element) {
    document.getElementById('stoneCategory').value = category;
    
    // Update active UI state
    document.querySelectorAll('.stone-cat-btn').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');
    
    // Trigger subcategory update
    updateStoneSubcategories();
}


const STONE_CONFIG = {
    natural: {
        stones: ["Asscher_natural_diamond", "Baguette_natural_diamond", "Cushion_natural_diamond", "Emerald_natural_diamond", "Marquise_natural_diamond", "Oval_natural_diamond", "Pear_natural_diamond", "Princess_natural_diamond", "radiant_natural_diamond", "round_natural_diamond", "Trillion_natural_diamond"],
        sheets: ["VS", "SI"],
        readUrl: `${API_BASE}/readNaturalPrices`,
        updateUrl: `${API_BASE}/updateNaturalPrices`
    },
    lg: {
        stones: ["Asscher_LG_diamond", "Baguette_LG_diamond", "Cushion_LG_diamond", "Emerald_LG_diamond", "Halfmoon_LG_diamond", "Marquise_LG_diamond", "Oval_LG_diamond", "Pear_LG_diamond", "Princess_LG_diamond", "radiant_LG_diamond", "Round_LG_diamond", "Trapezoid_LG_diamond", "Trillion_LG_diamond"],
        sheets: ["LG1", "LEFVS", "LG3"],
        readUrl: `${API_BASE}/readLGPrices`,
        updateUrl: `${API_BASE}/updateLGPrices`
    },
    color: {
        stones: ['Amethyst', 'Blue_Topaz', 'Citrine', 'Emerald', 'Garnet', 'Lab_Color', 'Ruby', 'Sapphire', 'Topaz'],
        sheets: ["AA","AAA"],
        readUrl: `${API_BASE}/readColorStonePrices`,
        updateUrl: `${API_BASE}/updateColorStonePrices`
    }
};

// Provided data as fallback/defaults
const DEFAULT_DATA = {
    cadLabour: [
        {"Metal_wt_low_limit": 0, "Metal_wt_high_limit": 5, "CAD_labour": 35}, 
        {"Metal_wt_low_limit": 5, "Metal_wt_high_limit": 10, "CAD_labour": 45}, 
        {"Metal_wt_low_limit": 10, "Metal_wt_high_limit": 1000, "CAD_labour": 55}
    ],
    enamelLabour: [
        {"Metal_wt_low_limit": 0, "Metal_wt_high_limit": 5, "engraving_labour": 35}, 
        {"Metal_wt_low_limit": 5, "Metal_wt_high_limit": 1000, "engraving_labour": 45}
    ],
    engravingLabour: [
        {"Metal_wt_low_limit": 0, "Metal_wt_high_limit": 5, "engraving_labour": 35}, 
        {"Metal_wt_low_limit": 5, "Metal_wt_high_limit": 1000, "engraving_labour": 45}
    ],
    marginList: [
        {"Prices for": "duty model", "Stone_Present": null, "multiplier": 1.17}, 
        {"Prices for": "[1-500]", "Stone_Present": 1.0, "multiplier": 1.6}, 
        {"Prices for": "[501-1000]", "Stone_Present": 1.0, "multiplier": 1.55}, 
        {"Prices for": "[1001-1500]", "Stone_Present": 1.0, "multiplier": 1.55}, 
        {"Prices for": "[1501-2500]", "Stone_Present": 1.0, "multiplier": 1.55}, 
        {"Prices for": "[2501-100000]", "Stone_Present": 1.0, "multiplier": 1.55}, 
        {"Prices for": "[1-100000]", "Stone_Present": 0.0, "multiplier": 1.52}
    ],
    metalRates: {
        gold: 5161,
        silver: 28.5,
        platinum: 980.0
    },
    stonePrices: [
        {"carat_start_range": 0.0, "carat_end_range": 0.008, "rate": 515}, 
        {"carat_start_range": 0.008, "carat_end_range": 0.022, "rate": 475}, 
        {"carat_start_range": 0.022, "carat_end_range": 0.07, "rate": 525}, 
        {"carat_start_range": 0.07, "carat_end_range": 0.135, "rate": 665}
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    // Initial fetch
    fetchAllData();
    updateStoneSubcategories();

    // UI Elements
    const fetchBtn = document.getElementById('fetchRatesBtn');
    if (fetchBtn) fetchBtn.addEventListener('click', fetchAllData);
});

async function fetchAllData() {
    const lastSyncedTime = document.getElementById('lastSyncedTime');
    const fetchBtn = document.getElementById('fetchRatesBtn');
    
    if (fetchBtn) {
        fetchBtn.disabled = true;
        fetchBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Syncing...';
    }

    try {
        await Promise.all([
            fetchMetalRates(),
            fetchCadLabour(),
            fetchEnamelLabour(),
            fetchEngravingLabour(),
            fetchMarginList()
        ]);

        const now = new Date();
        lastSyncedTime.textContent = now.toLocaleTimeString();
        showToast('System rates synced with live server!');
    } catch (error) {
        console.warn('API Sync failed or timed out. Using local fallback data.', error);
        loadFallbackData();
        showToast('Connected using local configuration (API unresponsive)', 'warning');
    } finally {
        if (fetchBtn) {
            fetchBtn.disabled = false;
            fetchBtn.innerHTML = '<i class="fa-solid fa-rotate me-2"></i> Sync Latest';
        }
    }
}

// Helper for timeout
async function fetchWithTimeout(resource, options = {}) {
    const { timeout = 5000 } = options;
    
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    
    const response = await fetch(resource, {
        ...options,
        signal: controller.signal
    });
    clearTimeout(id);
    return response;
}

function loadFallbackData() {
    renderMetalRates(DEFAULT_DATA.metalRates);
    renderCadTable(DEFAULT_DATA.cadLabour);
    renderEnamelTable(DEFAULT_DATA.enamelLabour);
    renderEngravingTable(DEFAULT_DATA.engravingLabour);
    renderMarginTable(DEFAULT_DATA.marginList);
    
    const now = new Date();
    document.getElementById('lastSyncedTime').textContent = now.toLocaleTimeString() + ' (Local)';
}

// --- METAL RATES ---
async function fetchMetalRates() {
    const res = await fetchWithTimeout(`${API_BASE}/readRates`);
    const data = await res.json();
    renderMetalRates(data);
}

function renderMetalRates(data) {
    if (!data) return;
    if (data.gold) document.getElementById('goldRateDisplay').textContent = `$${data.gold.toLocaleString()}`;
    if (data.silver) document.getElementById('silverRateDisplay').textContent = `$${data.silver.toLocaleString()}`;
    if (data.platinum) document.getElementById('platinumRateDisplay').textContent = `$${data.platinum.toLocaleString()}`;
    
    if (document.getElementById('inputGoldRate')) document.getElementById('inputGoldRate').value = data.gold || '';
    if (document.getElementById('inputSilverRate')) document.getElementById('inputSilverRate').value = data.silver || '';
    if (document.getElementById('inputPlatinumRate')) document.getElementById('inputPlatinumRate').value = data.platinum || '';
}

async function updateSingleMetal(metalType) {
    const rateEl = document.getElementById(`input${metalType.charAt(0).toUpperCase() + metalType.slice(1)}Rate`);
    const rate = parseFloat(rateEl.value);
    
    if (isNaN(rate)) {
        showToast('Please enter a valid rate', 'danger');
        return;
    }

    const body = { metal: metalType, rate: rate };
    await sendUpdate(`${API_BASE}/updateRates`, body, `${metalType.charAt(0).toUpperCase() + metalType.slice(1)} rate updated!`);
    fetchMetalRates().catch(() => loadFallbackData());
}

// --- STONE PRICES ---

function updateStoneSubcategories() {
    const category = document.getElementById('stoneCategory').value;
    const config = STONE_CONFIG[category];
    
    const stoneTypeSelect = document.getElementById('stoneType');
    const stoneSheetSelect = document.getElementById('stoneSheet');
    
    stoneTypeSelect.innerHTML = config.stones.map(s => `<option value="${s}">${s.replace(/_/g, ' ')}</option>`).join('');
    stoneSheetSelect.innerHTML = config.sheets.map(s => `<option value="${s}">${s}</option>`).join('');
}

let currentStoneData = []; // Store current fetch for update

async function fetchAllStoneData() {
    const category = document.getElementById('stoneCategory').value;
    const stone = document.getElementById('stoneType').value;
    const sheet = document.getElementById('stoneSheet').value;
    const config = STONE_CONFIG[category];

    const body = { stone, sheet };
    const container = document.getElementById('stonePriceBody');
    container.innerHTML = '<tr><td colspan="2" class="text-center p-5 text-secondary"><i class="fa-solid fa-spinner fa-spin me-2 text-primary"></i> Accessing live price logs...</td></tr>';

    try {
        // Since user says GET with BODY, we try POST first as it's common for JSON param fetches, or standard fetch if server supports GET body
        const res = await fetchWithTimeout(config.readUrl, {
            method: 'POST', // Most APIs with JSON bodies for read use POST
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        
        const data = await res.json();
        currentStoneData = data;
        renderStoneTable(data, sheet);
        renderStoneUpdateForm(data, sheet, stone);
    } catch (e) {
        console.error('Stone data fetch failed:', e);
        // Fallback
        currentStoneData = DEFAULT_DATA.stonePrices.map(d => ({...d, [sheet]: d.rate}));
        renderStoneTable(currentStoneData, sheet);
        renderStoneUpdateForm(currentStoneData, sheet, stone);
        showToast('Using local stone data (API error)', 'warning');
    }
}

function renderStoneTable(data, sheet) {
    const container = document.getElementById('stonePriceBody');
    if (!data || data.length === 0) {
        container.innerHTML = '<tr><td colspan="2" class="text-center p-4">No data available for this selection</td></tr>';
        return;
    }

    container.innerHTML = data.map(item => `
        <tr>
            <td class="ps-4 py-3 fw-semibold text-dark">${item.carat_start_range} — ${item.carat_end_range} <span class="text-secondary fw-normal">ct</span></td>
            <td class="text-end pe-4 py-3 fw-bold text-primary">$${(item[sheet] || item.rate || 0).toLocaleString()}</td>
        </tr>
    `).join('');
}

function renderStoneUpdateForm(data, sheet, stone) {
    const header = document.getElementById('stoneUpdateHeader');
    header.innerHTML = `Editing: <span class="text-primary">${stone.replace(/_/g, ' ')}</span> | Grade: <span class="text-primary">${sheet}</span>`;
    
    const container = document.getElementById('stoneUpdateForm');
    container.innerHTML = data.map((item, index) => `
        <div class="row g-2 mb-2 align-items-center stone-row" data-index="${index}">
            <div class="col-4">
                <input type="number" step="0.001" class="form-control form-control-sm rounded-pill field-start" value="${item.carat_start_range}">
            </div>
            <div class="col-4">
                <input type="number" step="0.001" class="form-control form-control-sm rounded-pill field-end" value="${item.carat_end_range}">
            </div>
            <div class="col-4">
                <div class="input-group input-group-sm">
                    <span class="input-group-text bg-transparent border-0">$</span>
                    <input type="number" class="form-control rounded-pill field-rate" value="${item[sheet] || item.rate || 0}">
                </div>
            </div>
        </div>
    `).join('');
}

async function updateStonePrices() {
    const category = document.getElementById('stoneCategory').value;
    const stone = document.getElementById('stoneType').value;
    const sheet = document.getElementById('stoneSheet').value;
    const config = STONE_CONFIG[category];

    const rows = document.querySelectorAll('.stone-row');
    const data = Array.from(rows).map(row => ({
        carat_start_range: parseFloat(row.querySelector('.field-start').value),
        carat_end_range: parseFloat(row.querySelector('.field-end').value),
        [sheet]: parseFloat(row.querySelector('.field-rate').value)
    }));

    const body = {
        sheet: sheet,
        stone: stone,
        data: data
    };

    await sendUpdate(config.updateUrl, body, `${stone.replace(/_/g, ' ')} prices updated!`);
    fetchAllStoneData();
    bootstrap.Modal.getInstance(document.getElementById('stoneUpdateModal')).hide();
}


// --- CAD LABOUR ---
async function fetchCadLabour() {
    const res = await fetchWithTimeout(`${API_BASE}/readCadLabour`);
    const data = await res.json();
    renderCadTable(data);
}

function renderCadTable(data) {
    renderTable('cadLabourBody', data, (item) => `
        <tr class="search-container rounded-pill mb-2">
            <td class="ps-4">
                <span class="fw-bold">${item.Metal_wt_low_limit}g - ${item.Metal_wt_high_limit}g</span>
            </td>
            <td class="text-end pe-4 font-headline fw-bold fs-5 text-primary">$${item.CAD_labour}</td>
        </tr>
    `);
    renderForm('cadLabourForm', data, 'CAD_labour');
}

async function updateCadLabour() {
    const data = getFormData('cadLabourForm', ['Metal_wt_low_limit', 'Metal_wt_high_limit', 'CAD_labour']);
    await sendUpdate(`${API_BASE}/updateCadLabour`, data, 'CAD Labour updated!');
    fetchCadLabour().catch(() => loadFallbackData());
    bootstrap.Modal.getInstance(document.getElementById('cadLabourModal')).hide();
}

// --- ENAMEL LABOUR ---
async function fetchEnamelLabour() {
    const res = await fetchWithTimeout(`${API_BASE}/readEnamelLabour`);
    const data = await res.json();
    renderEnamelTable(data);
}

function renderEnamelTable(data) {
    renderTable('enamelBody', data, (item) => `
        <tr>
            <td class="ps-4">
                <small class="text-secondary text-uppercase fw-bold" style="font-size: 9px;">Range: ${item.Metal_wt_low_limit}-${item.Metal_wt_high_limit}g</small>
                <p class="m-0 fw-bold">Enamel Labour</p>
            </td>
            <td class="text-end pe-4 fw-bold text-primary">$${item.engraving_labour || 0}</td>
        </tr>
    `);
    renderForm('enamelForm', data, 'engraving_labour');
}

async function updateEnamelLabour() {
    const data = getFormData('enamelForm', ['Metal_wt_low_limit', 'Metal_wt_high_limit', 'engraving_labour']);
    await sendUpdate(`${API_BASE}/updateEnamelLabour`, data, 'Enamel Labour updated!');
    fetchEnamelLabour().catch(() => loadFallbackData());
    bootstrap.Modal.getInstance(document.getElementById('enamelModal')).hide();
}

// --- ENGRAVING LABOUR ---
async function fetchEngravingLabour() {
    const res = await fetchWithTimeout(`${API_BASE}/readEngravingLabour`);
    const data = await res.json();
    renderEngravingTable(data);
}

function renderEngravingTable(data) {
    renderTable('engravingBody', data, (item) => `
        <tr>
            <td class="ps-4">
                <small class="text-secondary text-uppercase fw-bold" style="font-size: 9px;">Range: ${item.Metal_wt_low_limit}-${item.Metal_wt_high_limit}g</small>
                <p class="m-0 fw-bold">Engraving Service</p>
            </td>
            <td class="text-end pe-4 fw-bold text-primary">$${item.engraving_labour}</td>
        </tr>
    `);
    renderForm('engravingForm', data, 'engraving_labour');
}

async function updateEngravingLabour() {
    const data = getFormData('engravingForm', ['Metal_wt_low_limit', 'Metal_wt_high_limit', 'engraving_labour']);
    await sendUpdate(`${API_BASE}/updateEngravingLabour`, data, 'Engraving Labour updated!');
    fetchEngravingLabour().catch(() => loadFallbackData());
    bootstrap.Modal.getInstance(document.getElementById('engravingModal')).hide();
}

// --- MARGIN LIST ---
async function fetchMarginList() {
    const res = await fetchWithTimeout(`${API_BASE}/readMarginList`);
    const data = await res.json();
    renderMarginTable(data);
}

function renderMarginTable(data) {
    renderTable('marginListBody', data, (item) => `
        <tr>
            <td class="ps-4">
                <p class="m-0 fw-bold">${item['Prices for'] || 'Unknown'}</p>
            </td>
            <td class="text-center">
                <span class="badge ${item.Stone_Present ? 'bg-primary-subtle text-primary' : 'bg-secondary-subtle text-secondary'} rounded-pill px-3">
                    ${item.Stone_Present === 1.0 ? 'Stone Present' : item.Stone_Present === 0.0 ? 'No Stone' : 'N/A'}
                </span>
            </td>
            <td class="text-end pe-4">
                <h4 class="m-0 fw-bold text-primary">${item.multiplier}x</h4>
            </td>
        </tr>
    `);
    renderForm('marginListForm', data, 'multiplier', true);
}

async function updateMarginList() {
    const data = getFormData('marginListForm', [], true);
    await sendUpdate(`${API_BASE}/updateMarginList`, data, 'Global Multipliers updated!');
    fetchMarginList().catch(() => loadFallbackData());
    bootstrap.Modal.getInstance(document.getElementById('marginListModal')).hide();
}

// --- HELPERS ---

function renderTable(id, data, templateFn) {
    const container = document.getElementById(id);
    if (!container) return;
    if (!data || data.length === 0) {
        container.innerHTML = '<tr><td colspan="100%" class="text-center p-4">No data available</td></tr>';
        return;
    }
    container.innerHTML = data.map(templateFn).join('');
}

function renderForm(id, data, mainKey, isMarginList = false) {
    const container = document.getElementById(id);
    if (!container) return;
    container.innerHTML = data.map((item, index) => {
        if (isMarginList) {
            return `
                <div class="row g-3 mb-3 border-bottom pb-3 form-row" data-index="${index}">
                    <input type="hidden" class="field-Prices_for" value="${item['Prices for']}">
                    <input type="hidden" class="field-Stone_Present" value="${item.Stone_Present}">
                    <div class="col-8">
                        <label class="form-label small fw-bold text-uppercase">${item['Prices for'] || 'Item'} (${item.Stone_Present === 1.0 ? 'Stone' : 'No Stone'})</label>
                    </div>
                    <div class="col-4">
                        <input type="number" step="0.01" class="form-control rounded-pill px-4 field-multiplier" value="${item.multiplier}">
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="row g-3 mb-3 border-bottom pb-3 form-row" data-index="${index}">
                    <div class="col-3">
                        <label class="form-label small fw-bold">LOW</label>
                        <input type="number" class="form-control rounded-pill field-Metal_wt_low_limit" value="${item.Metal_wt_low_limit}">
                    </div>
                    <div class="col-3">
                        <label class="form-label small fw-bold">HIGH</label>
                        <input type="number" class="form-control rounded-pill field-Metal_wt_high_limit" value="${item.Metal_wt_high_limit}">
                    </div>
                    <div class="col-6">
                        <label class="form-label small fw-bold">RATE ($)</label>
                        <input type="number" class="form-control rounded-pill field-${mainKey}" value="${item[mainKey]}">
                    </div>
                </div>
            `;
        }
    }).join('');
}

function getFormData(formId, keys, isMarginList = false) {
    const rows = document.querySelectorAll(`#${formId} .form-row`);
    return Array.from(rows).map(row => {
        const obj = {};
        if (isMarginList) {
            obj['Prices for'] = row.querySelector('.field-Prices_for').value;
            obj['Stone_Present'] = row.querySelector('.field-Stone_Present').value === 'null' ? null : parseFloat(row.querySelector('.field-Stone_Present').value);
            obj['multiplier'] = parseFloat(row.querySelector('.field-multiplier').value);
        } else {
            keys.forEach(key => {
                const el = row.querySelector(`.field-${key}`);
                obj[key] = parseFloat(el.value);
            });
        }
        return obj;
    });
}

async function sendUpdate(url, data, successMsg) {
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (res.ok) {
            showToast(successMsg);
        } else {
            throw new Error('Update failed');
        }
    } catch (e) {
        showToast('Update failed. CORS or Server Error.', 'danger');
        console.error(e);
    }
}

function showToast(message, type = 'success') {
    const toastContainer = document.createElement('div');
    toastContainer.className = `position-fixed bottom-0 end-0 p-4 z-3`;
    toastContainer.style.zIndex = "3000";
    toastContainer.innerHTML = `
        <div class="toast show scale-in" role="alert" style="border-radius: 12px; border: none; box-shadow: 0 10px 30px rgba(0,0,0,0.15);">
            <div class="toast-header border-0 bg-transparent">
                <i class="fa-solid fa-${type === 'success' ? 'circle-check' : (type === 'warning' ? 'circle-exclamation' : 'triangle-exclamation')} text-${type} me-2 fs-5"></i>
                <strong class="me-auto text-dark">System Notification</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body pt-0 small fw-medium">
                ${message}
            </div>
        </div>
    `;
    document.body.appendChild(toastContainer);
    setTimeout(() => toastContainer.remove(), 4000);
}
