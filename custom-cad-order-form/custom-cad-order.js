let cur = 1;
const total = 5;
const sel = { item: null, metal: null, color: null, stones: null };
let isSubmitted = false;

function goToStep(n) { if (isSubmitted || n >= cur) return; switchStep(n); }
function nextStep() { if (isSubmitted || !validate(cur)) return; if (cur === total) { submit(); return; } switchStep(cur + 1); }
function skipStep() { if (isSubmitted) return; if (cur < total) switchStep(cur + 1); }
function prevStep() { if (isSubmitted) return; if (cur > 1) switchStep(cur - 1); }

function switchStep(n) {
    document.getElementById('step' + cur).classList.remove('active');
    cur = n;
    document.getElementById('step' + cur).classList.add('active');

    document.querySelectorAll('.step-indicator').forEach((el, i) => {
        el.classList.remove('active', 'done');
        if (i + 1 === cur) el.classList.add('active');
        else if (i + 1 < cur) el.classList.add('done');
    });

    document.getElementById('prevBtn').style.visibility = cur === 1 ? 'hidden' : 'visible';

    const nb = document.getElementById('nextBtn');
    nb.innerHTML = cur === total
        ? 'SUBMIT ENQUIRY <i class="fa-solid fa-paper-plane"></i>'
        : 'Continue <i class="fa-solid fa-arrow-right"></i>';

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setV(el, ok) {
    if (ok) el.classList.remove('is-invalid');
    else el.classList.add('is-invalid');
}

function validate(step) {
    let ok = true;
    if (step === 1) {
        const n = document.getElementById('fullName');
        setV(n, n.value.trim() && /^[a-zA-Z\s'-]+$/.test(n.value.trim()));
        if (!n.value.trim() || !/^[a-zA-Z\s'-]+$/.test(n.value.trim())) ok = false;

        const c = document.getElementById('country');
        setV(c, !!c.value); if (!c.value) ok = false;

        const p = document.getElementById('phone');
        setV(p, !!p.value.trim()); if (!p.value.trim()) ok = false;

        const e = document.getElementById('email');
        const eok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.value);
        setV(e, eok); if (!eok) ok = false;

        const cm = document.querySelector('#contactMethod .selected');
        const cme = document.getElementById('contactMethodErr');
        if (!cm) { cme.style.display = 'block'; ok = false; } else cme.style.display = 'none';
    }
    if (step === 3) {
        const ie = document.getElementById('itemTypeErr');
        const isSelected = !!document.querySelector('#itemType .opt-card.selected');
        if (!isSelected) { ie.style.display = 'block'; ok = false; } else ie.style.display = 'none';

        if (isSelected) {
            const item = sel.item;
            if (item === 'Ring' || item === 'Band') {
                const fs = document.getElementById('fingerSize');
                setV(fs, !!fs.value.trim());
                if (!fs.value.trim()) ok = false;
            }
            if (item === 'Other/Misc') {
                const oi = document.getElementById('otherItemType');
                setV(oi, !!oi.value.trim());
                if (!oi.value.trim()) ok = false;
            }
        }
    }
    if (step === 4) {
        const me = document.getElementById('metalTypeErr');
        if (!document.querySelector('#metalType .metal-card.selected')) { me.style.display = 'block'; ok = false; } else me.style.display = 'none';

        const ce = document.getElementById('colorTypeErr');
        if (!document.querySelector('#colorSelect .csw.selected')) { ce.style.display = 'block'; ok = false; } else ce.style.display = 'none';

        if (sel.color === 'Two-Tone') {
            const t1 = document.getElementById('tone1');
            const t2 = document.getElementById('tone2');
            const tte = document.getElementById('twoToneErr');
            setV(t1, !!t1.value);
            setV(t2, !!t2.value);
            if (!t1.value || !t2.value) { tte.style.display = 'block'; ok = false; } else tte.style.display = 'none';
        }
        if (sel.color === 'Tri-Tone') {
            const tr1 = document.getElementById('triTone1');
            const tr2 = document.getElementById('triTone2');
            const tr3 = document.getElementById('triTone3');
            const tre = document.getElementById('triToneErr');
            setV(tr1, !!tr1.value);
            setV(tr2, !!tr2.value);
            setV(tr3, !!tr3.value);
            if (!tr1.value || !tr2.value || !tr3.value) { tre.style.display = 'block'; ok = false; } else tre.style.display = 'none';
        }
    }
    if (step === 5) {
        const cv = document.getElementById('captchaValid');
        const ce = document.getElementById('captchaErr');
        if (!cv.checked) {
            ce.style.display = 'block';
            ok = false;
        } else {
            ce.style.display = 'none';
        }
    }
    return ok;
}

function toggleCaptcha() {
    const box = document.querySelector('.captcha-box');
    const valid = document.getElementById('captchaValid');
    valid.checked = !valid.checked;
    if (valid.checked) box.classList.add('checked');
    else box.classList.remove('checked');

    const err = document.getElementById('captchaErr');
    if (valid.checked && err) err.style.display = 'none';
}

function selectOpt(el, gid) {
    const isSelected = el.classList.contains('selected');
    document.querySelectorAll(`#${gid} .opt-card`).forEach(c => c.classList.remove('selected'));

    if (isSelected) {
        sel.item = null;
    } else {
        el.classList.add('selected');
        sel.item = el.dataset.value;
    }

    const err = document.getElementById(gid + 'Err'); if (err) err.style.display = 'none';
    if (gid === 'itemType') {
        refreshChips();
        const rsr = document.getElementById('ringSizeRow');
        if (sel.item === 'Ring' || sel.item === 'Band') rsr.style.display = 'block';
        else rsr.style.display = 'none';

        const oir = document.getElementById('otherItemRow');
        if (sel.item === 'Other/Misc') oir.style.display = 'block';
        else oir.style.display = 'none';
    }
}

function selectMetal(el) {
    const isSelected = el.classList.contains('selected');
    document.querySelectorAll('#metalType .metal-card').forEach(c => c.classList.remove('selected'));

    if (isSelected) {
        sel.metal = null;
    } else {
        el.classList.add('selected');
        sel.metal = el.dataset.value;
    }

    document.getElementById('metalTypeErr').style.display = 'none';
    refreshChips();
}

function selectColor(el) {
    const isSelected = el.classList.contains('selected');
    document.querySelectorAll('#colorSelect .csw').forEach(c => c.classList.remove('selected'));

    if (isSelected) {
        sel.color = null;
    } else {
        el.classList.add('selected');
        sel.color = el.dataset.value;
    }

    document.getElementById('colorTypeErr').style.display = 'none';

    const mt = document.getElementById('multiToneOptions');
    const tt = document.getElementById('twoToneRow');
    const tr = document.getElementById('triToneRow');

    mt.style.display = (sel.color === 'Two-Tone' || sel.color === 'Tri-Tone') ? 'block' : 'none';
    tt.style.display = (sel.color === 'Two-Tone') ? 'block' : 'none';
    tr.style.display = (sel.color === 'Tri-Tone') ? 'block' : 'none';

    document.querySelectorAll('#multiToneOptions select').forEach(s => {
        s.classList.remove('is-invalid');
        s.value = '';
    });
    const tte = document.getElementById('twoToneErr');
    const tre = document.getElementById('triToneErr');
    if (tte) tte.style.display = 'none';
    if (tre) tre.style.display = 'none';

    refreshChips();
}

function selectPill(el, gid) {
    const isSelected = el.classList.contains('selected');
    document.querySelectorAll(`#${gid} .cpill`).forEach(p => p.classList.remove('selected'));

    if (isSelected) {
        if (gid === 'stoneType') sel.stones = null;
        if (gid === 'contactMethod') sel.contact = null;
    } else {
        el.classList.add('selected');
        if (gid === 'stoneType') sel.stones = el.dataset.value;
        if (gid === 'contactMethod') sel.contact = el.dataset.value;
    }

    const err = document.getElementById(gid + 'Err'); if (err) err.style.display = 'none';
    refreshChips();
}

function setBP(el, from, to) {
    document.querySelectorAll('.bp').forEach(p => p.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('budgetFrom').value = from;
    document.getElementById('budgetTo').value = to || '';
}

function clearPresets() {
    document.querySelectorAll('.bp').forEach(p => p.classList.remove('active'));
}

function toggleLab() { const cb = document.getElementById('labGrown'); cb.checked = !cb.checked; labChanged(); }
function labChanged() {
    const cb = document.getElementById('labGrown');
    const row = document.getElementById('labGrownRow');
    const sub = document.getElementById('labSub');
    if (cb.checked) { row.classList.add('on'); sub.textContent = '✓ Yes, lab grown preferred'; sub.style.color = 'var(--primary)'; }
    else { row.classList.remove('on'); sub.textContent = 'No preference selected'; sub.style.color = ''; }
}

function handleUZ(input, zid, fnid, nid, nextZid) {
    const z = document.getElementById(zid); const fn = document.getElementById(fnid);
    const notes = document.getElementById(nid);
    if (input.files && input.files[0]) {
        z.classList.add('filled');
        z.querySelector('.uz-icon').innerHTML = '<i class="fa-regular fa-circle-check" style="color:var(--primary)"></i>';
        z.querySelector('.uz-label').style.color = 'var(--primary-dark)';
        fn.textContent = '✓ ' + input.files[0].name; fn.style.display = 'block';
        if (notes) notes.disabled = false;

        if (nextZid) {
            const nextZ = document.getElementById(nextZid);
            if (nextZ) {
                nextZ.classList.remove('disabled');
                const nextInput = nextZ.querySelector('input[type="file"]');
                if (nextInput) nextInput.disabled = false;
            }
        }
    }
}

function refreshChips() {
    const ci = document.getElementById('chip-item');
    const cm = document.getElementById('chip-metal');
    const cc = document.getElementById('chip-color');
    const cs = document.getElementById('chip-stones');

    if (sel.item) { ci.textContent = sel.item; ci.classList.add('filled'); }
    else { ci.textContent = 'Item —'; ci.classList.remove('filled'); }

    if (sel.metal) { cm.textContent = sel.metal; cm.classList.add('filled'); }
    else { cm.textContent = 'Metal —'; cm.classList.remove('filled'); }

    if (sel.color) { cc.textContent = sel.color; cc.classList.add('filled'); }
    else { cc.textContent = 'Color —'; cc.classList.remove('filled'); }

    if (sel.stones) { cs.textContent = sel.stones; cs.classList.add('filled'); }
    else { cs.textContent = 'Stones —'; cs.classList.remove('filled'); }
}

function submit() {
    isSubmitted = true;
    document.getElementById('step' + total).classList.remove('active');
    document.getElementById('builderFooter').style.display = 'none';
    document.querySelector('.selection-bar').style.display = 'none';
    document.getElementById('successScreen').classList.add('active');
    document.querySelectorAll('.step-indicator').forEach(el => {
        el.classList.remove('active');
        el.classList.add('done');
        el.style.pointerEvents = 'none';
        el.style.opacity = '0.7';
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
    const fs = document.getElementById('fingerSize');
    if (fs) {
        for (let i = 1; i <= 16; i += 0.25) {
            const opt = document.createElement('option');
            opt.value = i;
            opt.textContent = i.toFixed(2).endsWith('.00') ? i.toFixed(0) : (i.toFixed(2).endsWith('0') ? i.toFixed(1) : i.toFixed(2));
            fs.appendChild(opt);
        }
    }
    const deadline = document.getElementById('deadline');
    if (deadline) {
        deadline.min = new Date().toISOString().split('T')[0];
    }
});