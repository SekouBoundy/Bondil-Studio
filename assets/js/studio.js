// =========================================
// Bondil-studio — Studio Customizer (studio.js)
// Extracted from bondil_studio_menus_digitaux_qr_codes.html
// Handles: full customization studio page logic
// Depends on: config.js (clientsData, accentPalettes, logoIconsList),
//             app.js (formatPrice, slugify, showToast)
// =========================================

// --- Studio State ---

let studioBaseIndex = 0;
let customState = null;
let studioSelectedCategory = 'Tout';
let studioLang = 'fr';
let studioCart = [];

// --- Studio Lifecycle ---

function openCustomizerStudio(index) {
    studioBaseIndex = index;
    loadBaseTemplateIntoStudio(index);
    switchStudioTab('identity');
    const modal = document.getElementById('studio-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeCustomizerStudio() {
    const modal = document.getElementById('studio-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function loadBaseTemplateIntoStudio(index) {
    studioBaseIndex = index;
    const base = clientsData[index];
    // Deep clone base template so user can customize freely
    customState = JSON.parse(JSON.stringify(base));
    studioSelectedCategory = 'Tout';
    studioLang = 'fr';
    studioCart = [];

    const baseNumEl = document.getElementById('studio-base-number');
    if (baseNumEl) baseNumEl.textContent = index + 1;

    const banner = document.getElementById('publish-success-banner');
    if (banner) banner.classList.add('hidden');

    syncAllStudioControls();
    renderStudioPhonePreview();
    updateStudioCartUI();
}

function resetCustomTemplate() {
    loadBaseTemplateIntoStudio(studioBaseIndex);
    showToast('Modèle réinitialisé aux valeurs d’origine.');
}

// --- Controls Sync ---

function syncAllStudioControls() {
    const headerName = document.getElementById('studio-header-name');
    if (headerName) headerName.textContent = customState.name || 'Votre Établissement';

    const nameInput = document.getElementById('input-brand-name');
    if (nameInput) nameInput.value = customState.name;

    const sectorInput = document.getElementById('input-brand-sector');
    if (sectorInput) sectorInput.value = customState.sector;

    const currencyInput = document.getElementById('input-brand-currency');
    if (currencyInput) currencyInput.value = customState.currency;

    const badge = document.getElementById('studio-items-badge');
    if (badge) badge.textContent = customState.items.length;

    renderLogoIconPicker();
    renderAccentPalettePicker();
    updateThemeModeButtonsUI();
    updateCardStyleButtonsUI();
    renderStudioTemplateSwitcher();
    renderStudioItemsEditorList();
    updateCustomUrlAndQr();
}

function switchStudioTab(tabName) {
    const tabs = ['identity', 'design', 'items', 'publish'];
    tabs.forEach(t => {
        const btn = document.getElementById(`studio-tab-${t}`);
        const panel = document.getElementById(`panel-${t}`);
        if (t === tabName) {
            if (btn) btn.className = 'studio-tab px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-xl border-b-2 border-orange-600 text-orange-600 bg-white flex items-center gap-2 shrink-0';
            if (panel) panel.classList.remove('hidden');
        } else {
            if (btn) btn.className = 'studio-tab px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-xl border-b-2 border-transparent text-slate-500 hover:text-slate-800 flex items-center gap-2 shrink-0';
            if (panel) panel.classList.add('hidden');
        }
    });
    if (tabName === 'publish') {
        updateCustomUrlAndQr();
    }
}

// --- Field Updates ---

function updateCustomField(field, value) {
    customState[field] = value;
    if (field === 'name') {
        const headerName = document.getElementById('studio-header-name');
        if (headerName) headerName.textContent = value || 'Votre Établissement';
        updateCustomUrlAndQr();
    }
    if (field === 'currency') {
        updateStudioCartUI();
    }
    renderStudioPhonePreview();
}

// --- Logo Icon Picker ---

function renderLogoIconPicker() {
    const container = document.getElementById('logo-icon-picker');
    if (!container) return;
    container.innerHTML = logoIconsList.map(icon => {
        const isSelected = customState.logoIcon === icon;
        return `
            <button type="button" onclick="selectLogoIcon('${icon}')"
                class="h-10 rounded-xl border flex items-center justify-center text-sm transition-all ${
                    isSelected 
                    ? 'border-orange-600 bg-orange-600 text-white shadow-sm' 
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }">
                <i class="fa-solid ${icon}"></i>
            </button>
        `;
    }).join('');
}

function selectLogoIcon(icon) {
    customState.logoIcon = icon;
    renderLogoIconPicker();
    renderStudioPhonePreview();
}

// --- Theme Mode ---

function setCustomThemeMode(mode) {
    customState.themeMode = mode;
    updateThemeModeButtonsUI();
    renderStudioPhonePreview();
}

function updateThemeModeButtonsUI() {
    const lightBtn = document.getElementById('btn-mode-light');
    const darkBtn = document.getElementById('btn-mode-dark');
    if (customState.themeMode === 'light') {
        if (lightBtn) lightBtn.className = 'p-4 rounded-2xl border-2 border-orange-600 bg-orange-50/40 text-left flex items-center gap-3 transition-all';
        if (darkBtn) darkBtn.className = 'p-4 rounded-2xl border-2 border-slate-200 bg-white text-left flex items-center gap-3 transition-all';
    } else {
        if (darkBtn) darkBtn.className = 'p-4 rounded-2xl border-2 border-orange-600 bg-orange-50/40 text-left flex items-center gap-3 transition-all';
        if (lightBtn) lightBtn.className = 'p-4 rounded-2xl border-2 border-slate-200 bg-white text-left flex items-center gap-3 transition-all';
    }
}

// --- Accent Palette ---

function renderAccentPalettePicker() {
    const container = document.getElementById('accent-palette-picker');
    if (!container) return;
    container.innerHTML = Object.entries(accentPalettes).map(([key, pal]) => {
        const isSelected = customState.accent === key;
        return `
            <button type="button" onclick="selectAccentColor('${key}')"
                class="p-3 rounded-xl border-2 flex items-center gap-2.5 text-left transition-all ${
                    isSelected 
                    ? 'border-orange-600 bg-orange-50/40 shadow-xs' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }">
                <span class="w-5 h-5 rounded-full shrink-0 border border-black/10" style="background-color: ${pal.swatch}"></span>
                <span class="text-xs font-bold text-slate-800">${pal.label}</span>
            </button>
        `;
    }).join('');
}

function selectAccentColor(key) {
    customState.accent = key;
    renderAccentPalettePicker();
    renderStudioPhonePreview();
}

// --- Card Style ---

function setCustomCardStyle(style) {
    customState.cardStyle = style;
    updateCardStyleButtonsUI();
    renderStudioPhonePreview();
}

function updateCardStyleButtonsUI() {
    const roundBtn = document.getElementById('btn-card-rounded');
    const compBtn = document.getElementById('btn-card-compact');
    if (customState.cardStyle === 'rounded') {
        if (roundBtn) roundBtn.className = 'px-4 py-3 rounded-xl border-2 border-orange-600 bg-orange-50/40 text-xs font-bold text-slate-900 flex items-center justify-center gap-2';
        if (compBtn) compBtn.className = 'px-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-xs font-bold text-slate-700 flex items-center justify-center gap-2';
    } else {
        if (compBtn) compBtn.className = 'px-4 py-3 rounded-xl border-2 border-orange-600 bg-orange-50/40 text-xs font-bold text-slate-900 flex items-center justify-center gap-2';
        if (roundBtn) roundBtn.className = 'px-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-xs font-bold text-slate-700 flex items-center justify-center gap-2';
    }
}

// --- Template Switcher ---

function renderStudioTemplateSwitcher() {
    const container = document.getElementById('studio-template-switcher');
    if (!container) return;
    container.innerHTML = clientsData.map((client, idx) => {
        const active = idx === studioBaseIndex;
        return `
            <button type="button" onclick="loadBaseTemplateIntoStudio(${idx})"
                class="px-2.5 py-2 rounded-xl text-left border transition-all ${
                    active 
                    ? 'border-orange-600 bg-orange-50/80 text-orange-950 shadow-xs' 
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }">
                <div class="text-[11px] font-bold truncate">${idx + 1}. ${client.name}</div>
                <div class="text-[9.5px] text-slate-500 truncate">${client.sector}</div>
            </button>
        `;
    }).join('');
}

// --- Items Management ---

function renderStudioItemsEditorList() {
    const container = document.getElementById('studio-items-editor-list');
    if (!container) return;
    const badge = document.getElementById('studio-items-badge');
    if (badge) badge.textContent = customState.items.length;

    if (customState.items.length === 0) {
        container.innerHTML = `<p class="text-xs text-slate-400 italic py-4 text-center">Aucun article dans ce menu. Ajoutez votre premier plat ci-dessus !</p>`;
        return;
    }

    container.innerHTML = customState.items.map((item, idx) => `
        <div class="p-3.5 rounded-2xl border border-slate-200 bg-white space-y-2.5 shadow-2xs">
            <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-2.5 min-w-0 flex-1">
                    <img src="${item.img}" alt="${item.name}" class="w-10 h-10 rounded-xl object-cover shrink-0 bg-slate-100">
                    <input type="text" value="${item.name.replace(/"/g, '&quot;')}"
                        oninput="updateCustomItem(${idx}, 'name', this.value)"
                        class="w-full text-xs font-extrabold text-slate-900 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500">
                </div>
                <div class="flex items-center gap-1.5 shrink-0">
                    <button type="button" onclick="toggleItemAvailability(${idx})"
                        title="${item.available ? 'En stock (cliquez pour marquer épuisé)' : 'Épuisé (cliquez pour remettre en stock)'}"
                        class="px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-colors ${
                            item.available 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }">
                        ${item.available ? 'Disponible' : 'Épuisé'}
                    </button>
                    <button type="button" onclick="deleteCustomItem(${idx})"
                        title="Supprimer cet article"
                        class="w-8 h-8 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center transition-colors">
                        <i class="fa-solid fa-trash-can text-xs"></i>
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input type="text" value="${item.category.replace(/"/g, '&quot;')}"
                    oninput="updateCustomItem(${idx}, 'category', this.value)"
                    placeholder="Catégorie"
                    class="px-2.5 py-1.5 rounded-lg border border-slate-200 text-[11px] font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500">
                <input type="number" step="0.01" value="${item.price}"
                    oninput="updateCustomItem(${idx}, 'price', parseFloat(this.value) || 0)"
                    placeholder="Prix"
                    class="px-2.5 py-1.5 rounded-lg border border-slate-200 text-[11px] font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500">
                <input type="text" value="${item.desc.replace(/"/g, '&quot;')}"
                    oninput="updateCustomItem(${idx}, 'desc', this.value)"
                    placeholder="Description"
                    class="px-2.5 py-1.5 rounded-lg border border-slate-200 text-[11px] text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500">
            </div>
        </div>
    `).join('');
}

function updateCustomItem(idx, key, value) {
    if (!customState.items[idx]) return;
    customState.items[idx][key] = value;
    if (key === 'name') {
        customState.items[idx].nameEn = value;
    }
    renderStudioPhonePreview();
}

function toggleItemAvailability(idx) {
    if (!customState.items[idx]) return;
    customState.items[idx].available = !customState.items[idx].available;
    renderStudioItemsEditorList();
    renderStudioPhonePreview();
}

function deleteCustomItem(idx) {
    customState.items.splice(idx, 1);
    studioSelectedCategory = 'Tout';
    renderStudioItemsEditorList();
    renderStudioPhonePreview();
    showToast('Article supprimé du menu.');
}

function addNewCustomItem() {
    const nameInput = document.getElementById('new-item-name');
    const catInput = document.getElementById('new-item-category');
    const priceInput = document.getElementById('new-item-price');
    const descInput = document.getElementById('new-item-desc');

    const name = nameInput.value.trim();
    if (!name) {
        showToast('Veuillez saisir le nom du plat ou service.');
        if (nameInput) nameInput.focus();
        return;
    }

    const category = catInput.value.trim() || 'Spécialités';
    const price = parseFloat(priceInput.value) || 12.00;
    const desc = descInput.value.trim() || 'Préparation maison sélectionnée par le chef.';

    // Pick a matching image from existing items or default gastronomy image
    const fallbackImg = customState.items[0]?.img || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80';

    customState.items.unshift({
        name: name.toUpperCase(),
        nameEn: name.toUpperCase(),
        category,
        price,
        available: true,
        desc,
        img: fallbackImg
    });

    if (nameInput) nameInput.value = '';
    if (catInput) catInput.value = '';
    if (priceInput) priceInput.value = '';
    if (descInput) descInput.value = '';

    studioSelectedCategory = 'Tout';
    renderStudioItemsEditorList();
    renderStudioPhonePreview();
    showToast(`« ${name} » ajouté à votre menu !`);
}

// --- Render Live Mobile Preview inside Studio ---

function renderStudioPhonePreview() {
    const shell = document.getElementById('studio-phone-shell');
    if (!shell) return;
    const isDark = customState.themeMode === 'dark';
    const palette = accentPalettes[customState.accent] || accentPalettes.orange;

    const shellBg = isDark ? 'bg-slate-950 text-white' : 'bg-[#F8FAFC] text-slate-900';
    const headerBg = isDark ? 'bg-slate-900 border-b border-slate-800' : 'bg-white border-b border-slate-100';
    const cardSurface = isDark ? 'bg-slate-900 border border-slate-800 text-white' : 'bg-white border border-slate-200/80 text-slate-900 shadow-2xs';

    const categories = ['Tout', ...new Set(customState.items.map(i => i.category))];
    if (!categories.includes(studioSelectedCategory)) {
        studioSelectedCategory = 'Tout';
    }

    const filteredItems = studioSelectedCategory === 'Tout'
        ? customState.items
        : customState.items.filter(i => i.category === studioSelectedCategory);

    shell.className = `w-full max-w-[325px] h-[595px] max-h-[68vh] lg:max-h-[73vh] rounded-[36px] border-[7px] border-slate-900 shadow-2xl overflow-hidden flex flex-col relative transition-colors duration-300 ${shellBg}`;

    shell.innerHTML = `
        <!-- Phone Top Speaker Notch -->
        <div class="${headerBg} pt-2 pb-1 flex justify-center shrink-0">
            <div class="w-20 h-3.5 bg-slate-900 rounded-full"></div>
        </div>

        <!-- Brand Header -->
        <div class="${headerBg} px-4 pt-2 pb-3 shrink-0">
            <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-2.5 min-w-0">
                    <div class="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-sm shadow-xs ${palette.logoBg}">
                        <i class="fa-solid ${customState.logoIcon}"></i>
                    </div>
                    <div class="min-w-0">
                        <h4 class="font-extrabold text-sm truncate">${customState.name || 'Votre Établissement'}</h4>
                        <p class="text-[10px] opacity-65 truncate">${customState.sector || 'Carte digitale interactive'}</p>
                    </div>
                </div>
                <button type="button" onclick="toggleStudioPhoneLang()"
                    class="px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shrink-0 ${isDark ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-700'}">
                    <i class="fa-solid fa-globe text-[9px]"></i>
                    <span>${studioLang === 'fr' ? 'FR' : 'EN'}</span>
                </button>
            </div>

            <!-- Interactive Category Filter Pills -->
            <div class="mt-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                ${categories.map(cat => {
                    const active = studioSelectedCategory === cat;
                    return `
                        <button type="button" onclick="selectStudioCategory('${cat.replace(/'/g, "\\'")}')"
                            class="px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 transition-colors ${
                                active 
                                ? palette.pillBg 
                                : (isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200')
                            }">
                            ${cat}
                        </button>
                    `;
                }).join('')}
            </div>
        </div>

        <!-- Scrollable Menu Items -->
        <div class="p-3.5 flex-1 overflow-y-auto no-scrollbar space-y-3">
            ${filteredItems.map((item, idx) => {
                const globalIdx = customState.items.indexOf(item);
                const isUnavailable = !item.available;

                if (customState.cardStyle === 'compact') {
                    return `
                        <div class="rounded-2xl p-2.5 flex items-center gap-2.5 ${cardSurface} ${isUnavailable ? 'opacity-55' : ''}">
                            <img src="${item.img}" alt="${item.name}" class="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-200">
                            <div class="min-w-0 flex-1">
                                <div class="flex items-center gap-1.5">
                                    <h5 class="text-[11px] font-extrabold truncate">${studioLang === 'fr' ? item.name : (item.nameEn || item.name)}</h5>
                                </div>
                                <p class="text-[9.5px] opacity-70 line-clamp-1 mt-0.5">${item.desc}</p>
                                <div class="mt-1.5 flex items-center justify-between">
                                    <span class="text-[10px] font-extrabold px-2 py-0.5 rounded-md ${palette.priceText}">
                                        ${formatPrice(item.price, customState.currency)}
                                    </span>
                                    ${isUnavailable 
                                        ? `<span class="text-[9px] font-bold text-amber-600">Épuisé</span>`
                                        : `<button type="button" onclick="addStudioTestItem(${globalIdx})" class="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] shadow-xs ${palette.btnBg}"><i class="fa-solid fa-plus"></i></button>`
                                    }
                                </div>
                            </div>
                        </div>
                    `;
                }

                return `
                    <div class="rounded-2xl overflow-hidden flex flex-col ${cardSurface} ${isUnavailable ? 'opacity-60' : ''}">
                        <div class="relative h-28 w-full bg-slate-200">
                            <img src="${item.img}" alt="${item.name}" class="w-full h-full object-cover">
                            ${isUnavailable ? `
                                <div class="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
                                    <span class="px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase">Épuisé</span>
                                </div>
                            ` : ''}
                        </div>
                        <div class="p-3 flex items-start justify-between gap-2">
                            <div class="min-w-0">
                                <h5 class="text-xs font-extrabold truncate">${studioLang === 'fr' ? item.name : (item.nameEn || item.name)}</h5>
                                <p class="text-[10px] opacity-70 line-clamp-2 mt-0.5">${item.desc}</p>
                                <span class="inline-block mt-1.5 text-[11px] font-extrabold px-2 py-0.5 rounded-md ${palette.priceText}">
                                    ${formatPrice(item.price, customState.currency)}
                                </span>
                            </div>
                            ${!isUnavailable ? `
                                <button type="button" onclick="addStudioTestItem(${globalIdx})"
                                    title="Tester l'ajout au panier"
                                    class="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-xs active:scale-90 transition-transform ${palette.btnBg}">
                                    <i class="fa-solid fa-plus text-xs"></i>
                                </button>
                            ` : ''}
                        </div>
                    </div>
                `;
            }).join('')}
        </div>

        <!-- Branded Footer inside Phone -->
        <div class="py-2 px-4 text-center text-[9.5px] font-medium shrink-0 ${headerBg}">
            <span class="opacity-65">Menu digital propulsé par</span> <strong>Bondil-studio</strong>
        </div>
    `;
}

function selectStudioCategory(cat) {
    studioSelectedCategory = cat;
    renderStudioPhonePreview();
}

function toggleStudioPhoneLang() {
    studioLang = studioLang === 'fr' ? 'en' : 'fr';
    renderStudioPhonePreview();
}

// --- Test Cart ---

function addStudioTestItem(idx) {
    const item = customState.items[idx];
    if (!item || !item.available) return;
    const existing = studioCart.find(c => c.name === item.name);
    if (existing) {
        existing.qty += 1;
    } else {
        studioCart.push({ ...item, qty: 1 });
    }
    updateStudioCartUI();
    showToast(`« ${item.name} » ajouté au panier test !`);
}

function clearStudioCart() {
    studioCart = [];
    updateStudioCartUI();
}

function updateStudioCartUI() {
    const countEl = document.getElementById('studio-cart-count');
    const totalEl = document.getElementById('studio-cart-total');
    const clearBtn = document.getElementById('studio-cart-clear');

    if (!countEl || !totalEl) return;

    const qty = studioCart.reduce((s, i) => s + i.qty, 0);
    const sum = studioCart.reduce((s, i) => s + i.price * i.qty, 0);

    countEl.textContent = `${qty} article${qty > 1 ? 's' : ''} testé${qty > 1 ? 's' : ''}`;
    totalEl.textContent = formatPrice(sum, customState.currency);
    if (clearBtn) {
        if (qty > 0) {
            clearBtn.classList.remove('hidden');
        } else {
            clearBtn.classList.add('hidden');
        }
    }
}

// --- QR Code & Custom Bondil-studio URL ---

function updateCustomUrlAndQr() {
    const slug = slugify(customState.name);
    const fullUrl = `https://Bondil-studio.com/menu/${slug}`;
    const urlInput = document.getElementById('custom-bondil-url');
    if (urlInput) urlInput.value = fullUrl;

    // Generate deterministic crisp SVG QR matrix from slug
    const size = 11;
    let hash = 0;
    for (let i = 0; i < slug.length; i++) {
        hash = ((hash << 5) - hash) + slug.charCodeAt(i);
        hash |= 0;
    }

    let rects = '';
    const cell = 10;
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            // Finder patterns in 3 corners
            const inTopLeft = r < 3 && c < 3;
            const inTopRight = r < 3 && c >= size - 3;
            const inBottomLeft = r >= size - 3 && c < 3;

            let filled = false;
            if (inTopLeft || inTopRight || inBottomLeft) {
                const lr = r % (size - 3);
                const lc = c % (size - 3);
                filled = (lr === 0 || lr === 2 || lc === 0 || lc === 2 || (lr === 1 && lc === 1));
            } else {
                const seed = Math.abs(Math.sin(hash + r * 31 + c * 17));
                filled = seed > 0.48;
            }

            if (filled) {
                rects += `<rect x="${c * cell}" y="${r * cell}" width="${cell - 1}" height="${cell - 1}" rx="2" fill="#0F172A"/>`;
            }
        }
    }

    const qrContainer = document.getElementById('generated-qr-svg');
    if (qrContainer) {
        qrContainer.innerHTML = `
            <svg viewBox="0 0 ${size * cell} ${size * cell}" class="w-full h-full">
                ${rects}
            </svg>
        `;
    }
}

function copyCustomBondilUrl() {
    const input = document.getElementById('custom-bondil-url');
    if (!input) return;
    input.select();
    document.execCommand('copy');
    showToast('Lien Bondil-studio copié dans le presse-papiers !');
}

function publishCustomMenu() {
    switchStudioTab('publish');
    const banner = document.getElementById('publish-success-banner');
    if (banner) banner.classList.remove('hidden');
    showToast(`Menu « ${customState.name} » publié sur Bondil-studio !`);
}

// Expose globals for inline HTML handlers
window.openCustomizerStudio = openCustomizerStudio;
window.closeCustomizerStudio = closeCustomizerStudio;
window.loadBaseTemplateIntoStudio = loadBaseTemplateIntoStudio;
window.resetCustomTemplate = resetCustomTemplate;
window.syncAllStudioControls = syncAllStudioControls;
window.switchStudioTab = switchStudioTab;
window.updateCustomField = updateCustomField;
window.renderLogoIconPicker = renderLogoIconPicker;
window.selectLogoIcon = selectLogoIcon;
window.setCustomThemeMode = setCustomThemeMode;
window.updateThemeModeButtonsUI = updateThemeModeButtonsUI;
window.renderAccentPalettePicker = renderAccentPalettePicker;
window.selectAccentColor = selectAccentColor;
window.setCustomCardStyle = setCustomCardStyle;
window.updateCardStyleButtonsUI = updateCardStyleButtonsUI;
window.renderStudioTemplateSwitcher = renderStudioTemplateSwitcher;
window.renderStudioItemsEditorList = renderStudioItemsEditorList;
window.updateCustomItem = updateCustomItem;
window.toggleItemAvailability = toggleItemAvailability;
window.deleteCustomItem = deleteCustomItem;
window.addNewCustomItem = addNewCustomItem;
window.renderStudioPhonePreview = renderStudioPhonePreview;
window.selectStudioCategory = selectStudioCategory;
window.toggleStudioPhoneLang = toggleStudioPhoneLang;
window.addStudioTestItem = addStudioTestItem;
window.clearStudioCart = clearStudioCart;
window.updateStudioCartUI = updateStudioCartUI;
window.updateCustomUrlAndQr = updateCustomUrlAndQr;
window.copyCustomBondilUrl = copyCustomBondilUrl;
window.publishCustomMenu = publishCustomMenu;
