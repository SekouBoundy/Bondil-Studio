// =========================================
// Bondil-studio — Customer Menu (menu.js)
// Extracted from bondil_studio_menus_digitaux_qr_codes.html
// Renders the published digital menu seen when scanning a QR code.
// Depends on: config.js (clientsData, accentPalettes), app.js (formatPrice)
// =========================================

// Get template index from URL (?template=N) or slug (?slug=...)
function getMenuTemplateIndex() {
    const params = new URLSearchParams(window.location.search);
    const template = params.get('template');
    if (template !== null) {
        const idx = parseInt(template, 10);
        if (!isNaN(idx) && idx >= 0 && idx < clientsData.length) {
            return idx;
        }
    }
    const slug = params.get('slug');
    if (slug) {
        const idx = clientsData.findIndex(c => c.id === slug);
        if (idx !== -1) return idx;
    }
    return 0; // fallback to first client
}

// Render the customer-facing digital menu inside a phone frame
function renderCustomerMenu(index) {
    const client = clientsData[index];
    if (!client) return;

    const isDark = client.themeMode === 'dark';
    const palette = accentPalettes[client.accent] || accentPalettes.indigo;

    const shellBg = isDark ? 'bg-slate-950 text-white' : 'bg-[#F8FAFC] text-slate-900';
    const headerBg = isDark ? 'bg-slate-900 border-b border-slate-800' : 'bg-white border-b border-slate-100';
    const cardSurface = isDark ? 'bg-slate-900 border border-slate-800 text-white' : 'bg-white border border-slate-200/80 text-slate-900 shadow-2xs';

    const categories = ['Tout', ...new Set(client.items.map(i => i.category))];

    document.title = `${client.name} — Menu Digital | Bondil-studio`;

    // Page header outside phone (for SEO / direct link)
    const pageHeader = document.getElementById('menu-page-header');
    if (pageHeader) {
        pageHeader.innerHTML = `
            <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
                <a href="index.html" class="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 mb-6">
                    <i class="fa-solid fa-arrow-left"></i> Retour à Bondil-studio
                </a>
                <div class="w-16 h-16 rounded-2xl ${palette.logoBg} flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <i class="fa-solid ${client.logoIcon} text-2xl"></i>
                </div>
                <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">${client.name}</h1>
                <p class="text-slate-500 text-sm sm:text-base">${client.sector}</p>
            </div>
        `;
    }

    const shell = document.getElementById('customer-phone-shell');
    if (!shell) return;

    shell.className = `w-full max-w-[325px] h-[640px] rounded-[36px] border-[7px] border-slate-900 shadow-2xl overflow-hidden flex flex-col relative bg-white transition-colors ${shellBg} mx-auto`;

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
                        <i class="fa-solid ${client.logoIcon}"></i>
                    </div>
                    <div class="min-w-0">
                        <h4 class="font-extrabold text-sm truncate">${client.name}</h4>
                        <p class="text-[10px] opacity-65 truncate">${client.sector}</p>
                    </div>
                </div>
                <button type="button" class="px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shrink-0 ${isDark ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-700'}">
                    <i class="fa-solid fa-globe text-[9px]"></i>
                    <span>FR</span>
                </button>
            </div>

            <!-- Category Filter Pills -->
            <div class="mt-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                ${categories.map(cat => `
                    <button type="button" class="px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 transition-colors ${palette.pillBg}">
                        ${cat}
                    </button>
                `).join('')}
            </div>
        </div>

        <!-- Scrollable Menu Items -->
        <div class="p-3.5 flex-1 overflow-y-auto no-scrollbar space-y-3">
            ${client.items.map((item, idx) => `
                <div class="rounded-2xl overflow-hidden flex flex-col ${cardSurface}">
                    <div class="relative h-28 w-full bg-slate-200">
                        <img src="${item.img}" alt="${item.name}" class="w-full h-full object-cover">
                        <span class="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/20 text-white text-[10px] font-bold">
                            ${formatPrice(item.price, client.currency)}
                        </span>
                    </div>
                    <div class="p-3 flex items-start justify-between gap-2">
                        <div class="min-w-0">
                            <h5 class="text-xs font-extrabold truncate">${item.name}</h5>
                            <p class="text-[10px] opacity-70 line-clamp-2 mt-0.5">${item.desc}</p>
                        </div>
                        <span class="inline-block mt-1 text-[11px] font-extrabold px-2 py-0.5 rounded-md ${palette.priceText}">
                            ${formatPrice(item.price, client.currency)}
                        </span>
                    </div>
                </div>
            `).join('')}
        </div>

        <!-- Branded Footer inside Phone -->
        <div class="py-2 px-4 text-center text-[9.5px] font-medium shrink-0 ${headerBg}">
            <span class="opacity-65">Menu digital propulsé par</span> <strong>Bondil-studio</strong>
            <br>
            <span class="opacity-50 text-[8px]">Scannez pour commander</span>
        </div>
    `;
}

// --- Initialization ---

function initMenu() {
    const index = getMenuTemplateIndex();
    renderCustomerMenu(index);
}

// Expose global
window.getMenuTemplateIndex = getMenuTemplateIndex;
window.renderCustomerMenu = renderCustomerMenu;
window.initMenu = initMenu;
