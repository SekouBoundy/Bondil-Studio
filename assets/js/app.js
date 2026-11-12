// =========================================
// Bondil-studio — Shared UI Logic (app.js)
// Extracted from bondil_studio_menus_digitaux_qr_codes.html
// Handles: utilities, carousel, toast, mobile nav, init
// =========================================

// --- Utilities ---

function formatPrice(value, currency) {
    const num = Number(value) || 0;
    if (currency === 'FCFA') {
        return `${Math.round(num * 655)} FCFA`;
    }
    return `${num.toFixed(2).replace('.', ',')} ${currency}`;
}

function slugify(text) {
    return (text || 'mon-etablissement')
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') || 'mon-etablissement';
}

// Get template index from URL query param (?template=N)
function getTemplateIndexFromUrl(defaultIndex = 0) {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('template');
    if (raw !== null) {
        const idx = parseInt(raw, 10);
        if (!isNaN(idx) && idx >= 0 && idx < clientsData.length) {
            return idx;
        }
    }
    return defaultIndex;
}

// --- Toast ---

let toastTimeout;
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    const msgEl = document.getElementById('toast-message');
    if (msgEl) msgEl.textContent = message;
    toast.classList.remove('translate-y-24', 'opacity-0');
    toast.classList.add('pointer-events-auto');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.add('translate-y-24', 'opacity-0');
    }, 3200);
}

// --- Carousel (20-client showcase) ---

let featuredIndex = 4; // Starts centered on Gustelo
let autoplayEnabled = true;
let autoplayPausedTemp = false;
let autoplayInterval = null;

// Populate Quick Client Select Dropdown
function initClientDropdown() {
    const select = document.getElementById('client-quick-select');
    if (!select) return;
    select.innerHTML = clientsData.map((client, idx) => `
        <option value="${idx}">${idx + 1}. ${client.name} (${client.sector})</option>
    `).join('');
    select.value = featuredIndex;
}

// Render 20 Swiper-style Pagination Bullets
function renderPaginationBullets() {
    const container = document.getElementById('swiper-pagination-bullets');
    if (!container) return;
    container.innerHTML = clientsData.map((client, idx) => {
        const isActive = idx === featuredIndex;
        return `
            <button onclick="setFeaturedClient(${idx})"
                role="tab"
                aria-selected="${isActive}"
                aria-label="Aller au modèle ${idx + 1} : ${client.name}"
                title="${idx + 1}. ${client.name}"
                class="h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                    isActive 
                    ? 'w-7 bg-orange-600 shadow-sm' 
                    : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }">
            </button>
        `;
    }).join('');

    const activeClient = clientsData[featuredIndex];
    const indicator = document.getElementById('active-slide-indicator');
    if (indicator) {
        indicator.innerHTML = `
            Menu <span class="font-bold text-slate-800">${featuredIndex + 1} / ${clientsData.length}</span> — 
            <span class="text-orange-600 font-semibold">${activeClient.name}</span> 
            <span class="text-slate-400">(${activeClient.sector})</span>
        `;
    }
    const select = document.getElementById('client-quick-select');
    if (select) select.value = featuredIndex;
}

function shiftCarousel(direction) {
    const total = clientsData.length;
    featuredIndex = (featuredIndex + direction + total) % total;
    renderPaginationBullets();
    renderPhonesShowcase();
}

function setFeaturedClient(index) {
    featuredIndex = index;
    renderPaginationBullets();
    renderPhonesShowcase();
}

function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(() => {
        if (autoplayEnabled && !autoplayPausedTemp) {
            const modal = document.getElementById('studio-modal');
            if (!modal || modal.classList.contains('hidden')) {
                shiftCarousel(1);
            }
        }
    }, 3400);
}

function stopAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
}

function toggleAutoplay() {
    autoplayEnabled = !autoplayEnabled;
    const icon = document.getElementById('autoplay-icon');
    const label = document.getElementById('autoplay-label');
    if (autoplayEnabled) {
        if (icon) icon.className = 'fa-solid fa-pause text-[10px] text-orange-600';
        if (label) label.textContent = 'Défilement auto';
    } else {
        if (icon) icon.className = 'fa-solid fa-play text-[10px] text-slate-500';
        if (label) label.textContent = 'En pause';
    }
}

function pauseAutoplayTemp() {
    autoplayPausedTemp = true;
}

function resumeAutoplayTemp() {
    autoplayPausedTemp = false;
}

function getOrderedClients() {
    const total = clientsData.length;
    const offsets = [-2, -1, 0, 1, 2];
    return offsets.map(offset => {
        const idx = (featuredIndex + offset + total) % total;
        return { client: clientsData[idx], offset, originalIndex: idx };
    });
}

// Render self-contained simulated mobile menu UI cards in the carousel
function renderPhonesShowcase() {
    const container = document.getElementById('phones-container');
    if (!container) return;
    const ordered = getOrderedClients();

    container.innerHTML = ordered.map(({ client, offset, originalIndex }) => {
        const isCenter = offset === 0;
        const isEdge = Math.abs(offset) === 2;
        const isDark = client.themeMode === 'dark';
        const palette = accentPalettes[client.accent] || accentPalettes.orange;

        let positionClasses = 'phone-side w-[245px] sm:w-[265px] h-[535px]';
        if (isCenter) {
            positionClasses = 'phone-featured w-[275px] sm:w-[295px] h-[585px] ring-2 ring-orange-500/25';
        } else if (isEdge) {
            positionClasses = 'phone-edge hidden xl:flex w-[225px] h-[500px]';
        }

        const shellBg = isDark ? 'bg-slate-950 text-white border-slate-800' : 'bg-[#F8FAFC] text-slate-900 border-slate-200/90';
        const headerBg = isDark ? 'bg-slate-900 border-b border-slate-800' : 'bg-white border-b border-slate-100';
        const cardSurface = isDark ? 'bg-slate-900 border border-slate-800 text-white' : 'bg-white border border-slate-100 text-slate-900 shadow-xs';
        const categories = ['Tout', ...new Set(client.items.map(i => i.category))];

        return `
            <div onclick="location.href='studio.html?template=${originalIndex}'"
                role="button"
                tabindex="0"
                aria-label="Personnaliser le modèle ${client.name}"
                class="phone-mockup group shrink-0 rounded-[30px] overflow-hidden cursor-pointer flex flex-col border relative ${shellBg} ${positionClasses}">
            
            <!-- Mobile Notch -->
            <div class="${headerBg} pt-2 pb-1 flex justify-center shrink-0">
                <div class="w-16 h-3 rounded-full ${isDark ? 'bg-slate-800' : 'bg-slate-200'}"></div>
            </div>

            <!-- Simulated App Header -->
            <div class="${headerBg} px-3.5 py-2.5 shrink-0">
                <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-2 min-w-0">
                        <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${palette.logoBg}">
                            <i class="fa-solid ${client.logoIcon}"></i>
                        </div>
                        <div class="min-w-0">
                            <h3 class="text-xs font-extrabold truncate">${client.name}</h3>
                            <p class="text-[9.5px] opacity-65 truncate">${client.sector}</p>
                        </div>
                    </div>
                    <span class="px-2 py-0.5 rounded-full text-[9px] font-bold shrink-0 ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}">
                        FR
                    </span>
                </div>

                <!-- Category Pills -->
                <div class="mt-2.5 flex items-center gap-1.5 overflow-hidden">
                    ${categories.slice(0, 3).map((cat, cIdx) => `
                        <span class="px-2 py-0.5 rounded-full text-[9px] font-bold shrink-0 ${
                            cIdx === 0 
                            ? palette.pillBg 
                            : (isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600')
                        }">${cat}</span>
                    `).join('')}
                </div>
            </div>

            <!-- Simulated Menu Items Grid -->
            <div class="p-3 flex-1 overflow-hidden space-y-2.5 relative">
                ${client.items.slice(0, 3).map(item => `
                    <div class="rounded-2xl overflow-hidden flex flex-col ${cardSurface}">
                        <div class="relative h-24 w-full bg-slate-200 overflow-hidden">
                            <img src="${item.img}" alt="${item.name}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                            <span class="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-white/90 text-slate-700 flex items-center justify-center text-[9px] shadow-xs">
                                <i class="fa-regular fa-heart"></i>
                            </span>
                        </div>
                        <div class="p-2 flex items-center justify-between gap-1.5">
                            <div class="min-w-0">
                                <div class="text-[10px] font-extrabold truncate">${item.name}</div>
                                <div class="text-[9px] opacity-65 truncate">${item.desc}</div>
                            </div>
                            <span class="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md shrink-0 ${palette.priceText}">
                                ${formatPrice(item.price, client.currency)}
                            </span>
                        </div>
                    </div>
                `).join('')}

                <!-- Hover Overlay CTA -->
                <div class="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/35 transition-colors flex items-center justify-center p-4">
                    <span class="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all px-4 py-2.5 rounded-full bg-white text-slate-900 text-xs font-extrabold shadow-xl flex items-center gap-2">
                        <i class="fa-solid fa-wand-magic-sparkles text-slate-600"></i>
                        <span>Personnaliser ce modèle</span>
                    </span>
                </div>
            </div>

            <!-- Bottom Template Action Footer -->
            <div class="px-3.5 py-2.5 bg-white text-slate-900 border-t border-slate-100 flex items-center justify-between gap-2 shrink-0">
                <span class="text-[10px] font-bold text-slate-500">Modèle #${originalIndex + 1}</span>
                <span class="text-[11px] font-extrabold text-slate-600 group-hover:underline flex items-center gap-1">
                    <span>Choisir ce modèle</span>
                    <i class="fa-solid fa-arrow-right text-[9px]"></i>
                </span>
            </div>
            </div>
        `;
    }).join('');
}

// Touch & Swipe Support on Carousel
function initCarouselTouch() {
    const phonesEl = document.getElementById('phones-container');
    if (!phonesEl) return;
    let touchStartX = 0;
    phonesEl.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    phonesEl.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 40) {
            shiftCarousel(diff > 0 ? 1 : -1);
        }
    }, { passive: true });
}

// --- Mobile Menu ---

function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }
}

// --- Initialization ---

function initApp() {
    initClientDropdown();
    renderPaginationBullets();
    renderPhonesShowcase();
    initCarouselTouch();
    initMobileMenu();
    startAutoplay();

    // Close modal on backdrop click or Escape key (if modal exists)
    const modal = document.getElementById('studio-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target.id === 'studio-modal') closeCustomizerStudio();
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('studio-modal');
            if (modal && !modal.classList.contains('hidden')) closeCustomizerStudio();
        }
    });
}

// Expose globals for inline HTML handlers
window.formatPrice = formatPrice;
window.slugify = slugify;
window.getTemplateIndexFromUrl = getTemplateIndexFromUrl;
window.showToast = showToast;
window.initClientDropdown = initClientDropdown;
window.renderPaginationBullets = renderPaginationBullets;
window.shiftCarousel = shiftCarousel;
window.setFeaturedClient = setFeaturedClient;
window.startAutoplay = startAutoplay;
window.stopAutoplay = stopAutoplay;
window.toggleAutoplay = toggleAutoplay;
window.pauseAutoplayTemp = pauseAutoplayTemp;
window.resumeAutoplayTemp = resumeAutoplayTemp;
window.getOrderedClients = getOrderedClients;
window.renderPhonesShowcase = renderPhonesShowcase;
window.initApp = initApp;
