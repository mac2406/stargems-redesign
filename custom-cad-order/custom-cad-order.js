let cur = 1;
const total = 5;
const sel = { item: null, metal: null, color: null };

function goToStep(n) { if (n >= cur) return; switchStep(n); }
function nextStep() { if (!validate(cur)) return; if (cur === total) { submit(); return; } switchStep(cur + 1); }
function prevStep() { if (cur > 1) switchStep(cur - 1); }

function switchStep(n) {
    document.getElementById('step' + cur).classList.remove('active');
    cur = n;
    document.getElementById('step' + cur).classList.add('active');

    document.querySelectorAll('.sidebar-step').forEach((el, i) => {
        el.classList.remove('active', 'done');
        if (i + 1 === cur) el.classList.add('active');
        else if (i + 1 < cur) el.classList.add('done');
    });

    document.getElementById('fpFill').style.width = (cur / total * 100) + '%';
    document.getElementById('fpLabel').textContent = `Step ${cur} of ${total}`;
    document.getElementById('prevBtn').style.visibility = cur === 1 ? 'hidden' : 'visible';

    const nb = document.getElementById('nextBtn');
    nb.innerHTML = cur === total
        ? 'Submit Inquiry <i class="fa-solid fa-paper-plane"></i>'
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
    }
    return ok;
}

function selectOpt(el, gid) {
    document.querySelectorAll(`#${gid} .opt-card`).forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    const err = document.getElementById(gid + 'Err'); if (err) err.style.display = 'none';
    if (gid === 'itemType') {
        sel.item = el.dataset.value;
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
    document.querySelectorAll('#metalType .metal-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    document.getElementById('metalTypeErr').style.display = 'none';
    sel.metal = el.dataset.value; refreshChips();
}

function selectColor(el) {
    document.querySelectorAll('#colorSelect .csw').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    document.getElementById('colorTypeErr').style.display = 'none';
    sel.color = el.dataset.value; refreshChips();
}

function selectPill(el, gid) {
    document.querySelectorAll(`#${gid} .cpill`).forEach(p => p.classList.remove('selected'));
    el.classList.add('selected');
    const err = document.getElementById(gid + 'Err'); if (err) err.style.display = 'none';
}

function setBP(el, from, to) {
    document.querySelectorAll('.bp').forEach(p => p.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('budgetFrom').value = from;
    document.getElementById('budgetTo').value = to || '';
}

function toggleLab() { const cb = document.getElementById('labGrown'); cb.checked = !cb.checked; labChanged(); }
function labChanged() {
    const cb = document.getElementById('labGrown');
    const row = document.getElementById('labGrownRow');
    const sub = document.getElementById('labSub');
    if (cb.checked) { row.classList.add('on'); sub.textContent = '✓ Yes, lab grown preferred'; sub.style.color = 'var(--primary)'; }
    else { row.classList.remove('on'); sub.textContent = 'No preference selected'; sub.style.color = ''; }
}

function handleUZ(input, zid, fnid) {
    const z = document.getElementById(zid); const fn = document.getElementById(fnid);
    if (input.files && input.files[0]) {
        z.classList.add('filled');
        z.querySelector('.uz-icon').innerHTML = '<i class="fa-regular fa-circle-check" style="color:var(--primary)"></i>';
        z.querySelector('.uz-label').style.color = 'var(--primary-dark)';
        fn.textContent = '✓ ' + input.files[0].name; fn.style.display = 'block';
    }
}

function refreshChips() {
    const ci = document.getElementById('chip-item');
    const cm = document.getElementById('chip-metal');
    const cc = document.getElementById('chip-color');
    if (sel.item) { ci.textContent = sel.item; ci.classList.add('filled'); }
    if (sel.metal) { cm.textContent = sel.metal; cm.classList.add('filled'); }
    if (sel.color) { cc.textContent = sel.color; cc.classList.add('filled'); }
}

function submit() {
    document.getElementById('step' + total).classList.remove('active');
    document.getElementById('builderFooter').style.display = 'none';
    document.querySelector('.builder-content').style.display = 'none';
    document.getElementById('successScreen').classList.add('active');
    document.querySelectorAll('.sidebar-step').forEach(el => { el.classList.remove('active'); el.classList.add('done'); });
    document.getElementById('fpFill').style.width = '100%';
}