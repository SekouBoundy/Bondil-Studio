// =========================================
// Bondil-studio — Shared Data / Config
// Extracted from bondil_studio_menus_digitaux_qr_codes.html
// =========================================

// 20 self-contained client templates for Bondil-studio (zero external install)
const clientsData = [
    {
        id: 'wagamama',
        name: 'Wagamama',
        sector: 'Cuisine Asiatique & Ramen',
        themeMode: 'dark',
        accent: 'crimson',
        cardStyle: 'rounded',
        logoIcon: 'fa-bowl-rice',
        currency: '€',
        items: [
            { name: 'CHICKEN KATSU CURRY', nameEn: 'CHICKEN KATSU CURRY', category: 'Plats', price: 15.95, available: true, desc: 'Poulet pané croustillant, sauce curry parfumée et riz gluant', img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=500&q=80' },
            { name: 'CHILLI SQUID', nameEn: 'CHILLI SQUID', category: 'Entrées', price: 9.75, available: true, desc: 'Calamars croustillants assaisonnés au shichimi et coriandre', img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=500&q=80' },
            { name: 'YAKI SOBA NOUILLES', nameEn: 'YAKI SOBA', category: 'Nouilles', price: 14.50, available: true, desc: 'Nouilles teppanyaki sautées au poulet, crevettes et légumes croquants', img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80' }
        ]
    },
    {
        id: 'glamours-touch',
        name: 'Glamours Touch',
        sector: 'Salon de Beauté & Spa',
        themeMode: 'light',
        accent: 'gold',
        cardStyle: 'rounded',
        logoIcon: 'fa-spa',
        currency: '€',
        items: [
            { name: 'SOINS CAPILLAIRES', nameEn: 'HAIR SERVICES', category: 'Coiffure', price: 45.00, available: true, desc: 'Coupe, brushing et soins profonds sur mesure', img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=500&q=80' },
            { name: 'COLORATION & BALAYAGE', nameEn: 'HAIR COLOR', category: 'Coiffure', price: 75.00, available: true, desc: 'Prestations expertes de coloration lumineuse', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=500&q=80' },
            { name: 'MANUCURE & SOIN ONGLES', nameEn: 'NAIL CARE', category: 'Onglerie', price: 35.00, available: true, desc: 'Manucure complète et pose vernis semi-permanent', img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=500&q=80' }
        ]
    },
    {
        id: 'baked-potato',
        name: 'The Baked Potato Factory',
        sector: 'Restaurant & Street-Food',
        themeMode: 'dark',
        accent: 'indigo',
        cardStyle: 'rounded',
        logoIcon: 'fa-fire-flame-curved',
        currency: '€',
        items: [
            { name: "PAW PAW'S TATER", nameEn: "PAW PAW'S TATER", category: 'Spécialités', price: 11.99, available: true, desc: 'Pomme de terre au four, cheddar affiné, bacon croustillant et crème', img: 'https://images.unsplash.com/photo-1568569350062-ebfa3cb195df?auto=format&fit=crop&w=500&q=80' },
            { name: 'THE TEXAS WAY', nameEn: 'THE TEXAS WAY', category: 'Spécialités', price: 13.99, available: true, desc: 'Effiloché de bœuf fumé BBQ, cheddar fondu et ciboulette', img: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=500&q=80' },
            { name: 'STUFF YOUR OWN', nameEn: 'STUFF YOUR OWN', category: 'À composer', price: 4.00, available: true, desc: 'Pomme de terre dorée au four à composer selon vos envies', img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=500&q=80' }
        ]
    },
    {
        id: 'european-bakery',
        name: 'European Bakery',
        sector: 'Pâtisserie & Boulangerie',
        themeMode: 'dark',
        accent: 'gold',
        cardStyle: 'rounded',
        logoIcon: 'fa-cake-candles',
        currency: '€',
        items: [
            { name: 'Red Velvet Cake', nameEn: 'Red velvet Cake', category: 'Gâteaux', price: 42.00, available: true, desc: 'Génoise velours rouge et glaçage crémeux au fromage frais', img: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=500&q=80' },
            { name: 'Cheesecake Myrtille', nameEn: 'Blueberry cheesecake', category: 'Gâteaux', price: 45.00, available: true, desc: 'Cheesecake onctueux sur biscuit sablé et coulis de myrtilles', img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=500&q=80' },
            { name: 'Forêt-Noire', nameEn: 'Black Forest Cake', category: 'Signature', price: 40.00, available: true, desc: 'Biscuit chocolat intense, chantilly légère et griottes', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=500&q=80' }
        ]
    },
    {
        id: 'gustelo',
        name: 'Gustelo',
        sector: 'Grill & Cuisine Mexicaine',
        themeMode: 'light',
        accent: 'sunset',
        cardStyle: 'rounded',
        logoIcon: 'fa-pepper-hot',
        currency: '€',
        items: [
            { name: 'FAJITAS POULET GRILLÉ', nameEn: 'GRILLED CHICKEN FAJITAS', category: 'Tex-Mex', price: 15.50, available: true, desc: 'Émincé de poulet mariné, poivrons grillés, guacamole et tortillas', img: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=500&q=80' },
            { name: 'ENTRECÔTE GRILLÉE', nameEn: 'RIBEYE STEAK', category: 'Grillades', price: 21.90, available: true, desc: 'Pièce de bœuf maturée, sauce chimichurri et pommes rôties', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80' }
        ]
    },
    {
        id: 'janan-restaurant',
        name: 'Janan Restaurant',
        sector: 'Cuisine Orientale & Boissons',
        themeMode: 'dark',
        accent: 'emerald',
        cardStyle: 'rounded',
        logoIcon: 'fa-martini-glass-citrus',
        currency: '€',
        items: [
            { name: 'COCKTAIL MENTHE CITRON', nameEn: 'MINT LEMONADE', category: 'Boissons', price: 6.50, available: true, desc: 'Citrons pressés minute, feuilles de menthe fraîche et glace pilée', img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=80' },
            { name: 'MEZZÉS ROYAUX À PARTAGER', nameEn: 'ROYAL MEZZE', category: 'Entrées', price: 16.00, available: true, desc: 'Houmous, moutabal, taboulé libanais et falafels croustillants', img: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=500&q=80' }
        ]
    },
    {
        id: 'maritxu',
        name: 'Maritxu',
        sector: 'Tapas & Gastronomie Basque',
        themeMode: 'light',
        accent: 'crimson',
        cardStyle: 'rounded',
        logoIcon: 'fa-wine-glass',
        currency: '€',
        items: [
            { name: 'ASSORTIMENT DE PINTXOS', nameEn: 'PINTXOS SELECTION', category: 'Tapas', price: 12.50, available: true, desc: 'Sélection de 4 pintxos du chef au jambon ibérique et fromage de brebis', img: 'https://images.unsplash.com/photo-1515443961218-a51367888e4b?auto=format&fit=crop&w=500&q=80' },
            { name: 'GÂTEAU BASQUE À LA CRÈME', nameEn: 'BASQUE CAKE', category: 'Desserts', price: 7.00, available: true, desc: 'Recette artisanale dorée au four et crème pâtissière vanillée', img: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=500&q=80' }
        ]
    },
    {
        id: 'new-lucky-star',
        name: 'New Lucky Star',
        sector: 'Cuisine Chinoise & Wok',
        themeMode: 'light',
        accent: 'sunset',
        cardStyle: 'rounded',
        logoIcon: 'fa-star',
        currency: '€',
        items: [
            { name: 'CANARD LAQUÉ PÉKINOIS', nameEn: 'PEKING DUCK', category: 'Plats', price: 19.50, available: true, desc: 'Filets de canard laqué croustillant, crêpes fines et sauce hoisin', img: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=500&q=80' },
            { name: 'DIM SUM VAPEUR (8 PCS)', nameEn: 'STEAMED DIM SUM', category: 'Vapeur', price: 11.50, available: true, desc: 'Raviolis crevettes, porc et légumes cuits au panier bambou', img: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=500&q=80' }
        ]
    },
    {
        id: 'swiety-michal',
        name: 'Swiety Michal',
        sector: 'Bistrot Européen & Tradition',
        themeMode: 'light',
        accent: 'monochrome',
        cardStyle: 'rounded',
        logoIcon: 'fa-utensils',
        currency: '€',
        items: [
            { name: 'PIEROGI MAISON DORÉS', nameEn: 'HOMEMADE PIEROGI', category: 'Tradition', price: 13.00, available: true, desc: 'Raviolis traditionnels farcis fromage frais et pommes de terre', img: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=500&q=80' },
            { name: 'GOULASH DE BŒUF MIJOTÉ', nameEn: 'BEEF GOULASH', category: 'Plats', price: 16.50, available: true, desc: 'Mijoté lentement aux épices douces, accompagné de galettes', img: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=500&q=80' }
        ]
    },
    {
        id: 'pump-penang',
        name: 'Pump Penang Automall',
        sector: 'Café Lounge & Fusion',
        themeMode: 'dark',
        accent: 'gold',
        cardStyle: 'rounded',
        logoIcon: 'fa-mug-hot',
        currency: '€',
        items: [
            { name: 'BURGER SIGNATURE AUTOMALL', nameEn: 'SIGNATURE BURGER', category: 'Burgers', price: 14.90, available: true, desc: 'Pain brioché toasté, steak haché frais, cheddar affiné et frites', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80' },
            { name: 'ICED CARAMEL LATTE', nameEn: 'ICED CARAMEL LATTE', category: 'Cafés', price: 5.50, available: true, desc: 'Double expresso arabica, lait frais et caramel beurre salé', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=500&q=80' }
        ]
    },
    {
        id: 'sisi-hai-xian',
        name: 'Sisi Hai Xian',
        sector: 'Fruits de Mer & Spécialités',
        themeMode: 'light',
        accent: 'emerald',
        cardStyle: 'rounded',
        logoIcon: 'fa-fish',
        currency: '€',
        items: [
            { name: 'PLATEAU FRUITS EXOTIQUES', nameEn: 'EXOTIC FRUIT PLATTER', category: 'Fraîcheur', price: 12.00, available: true, desc: 'Mangue fraîche, fruit du dragon, pastèque et litchis', img: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?auto=format&fit=crop&w=500&q=80' },
            { name: 'GAMBAS SAUTÉES À L’AIL', nameEn: 'GARLIC PRAWNS', category: 'Mer', price: 18.50, available: true, desc: 'Crevettes royales saisies au wok avec ail croustillant et ciboulette', img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=500&q=80' }
        ]
    },
    {
        id: 'chocolanche',
        name: 'Chocolanche',
        sector: 'Chocolaterie & Desserts Gourmands',
        themeMode: 'light',
        accent: 'gold',
        cardStyle: 'rounded',
        logoIcon: 'fa-cookie-bite',
        currency: '€',
        items: [
            { name: 'GAUFRE BELGE TRIPLE CHOCOLAT', nameEn: 'TRIPLE CHOC WAFFLE', category: 'Gaufres', price: 9.50, available: true, desc: 'Gaufre croustillante nappée de chocolat noir, lait et blanc fondu', img: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=500&q=80' },
            { name: 'FONDANT COULANT GRAND CRU', nameEn: 'MOLTEN LAVA CAKE', category: 'Desserts', price: 8.90, available: true, desc: 'Cœur coulant chocolat 72 % et boule de glace vanille', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=500&q=80' }
        ]
    },
    {
        id: 'ground-coffee-batroun',
        name: 'Ground Coffee Batroun',
        sector: 'Coffee Shop & Brunch',
        themeMode: 'light',
        accent: 'monochrome',
        cardStyle: 'rounded',
        logoIcon: 'fa-mug-saucer',
        currency: '€',
        items: [
            { name: 'FLAT WHITE SPÉCIALITÉ', nameEn: 'SPECIALTY FLAT WHITE', category: 'Cafés', price: 4.50, available: true, desc: 'Torréfaction artisanale, micro-mousse veloutée', img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=500&q=80' },
            { name: 'AVOCADO TOAST & ŒUF POCHÉ', nameEn: 'AVOCADO TOAST', category: 'Brunch', price: 11.50, available: true, desc: 'Pain au levain grillé, avocat frais, graines et œuf fermier', img: 'https://images.unsplash.com/photo-1525351484163-7529414342d8?auto=format&fit=crop&w=500&q=80' }
        ]
    },
    {
        id: 'zero-pub',
        name: 'Zero Pub',
        sector: 'Pub, Burgers & Cocktails',
        themeMode: 'dark',
        accent: 'indigo',
        cardStyle: 'rounded',
        logoIcon: 'fa-beer-mug-empty',
        currency: '€',
        items: [
            { name: 'DOUBLE SMASH BACON BURGER', nameEn: 'DOUBLE SMASH BURGER', category: 'Burgers', price: 15.00, available: true, desc: 'Double steak smashé, bacon fumé, cheddar et sauce secrète', img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=80' },
            { name: 'PLANCHE APÉRO ZERO PUB', nameEn: 'PUB SHARING BOARD', category: 'À partager', price: 17.50, available: true, desc: 'Onion rings, tenders croustillants, sticks mozzarella et sauces', img: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=500&q=80' }
        ]
    },
    {
        id: 'bar-ansleep',
        name: 'Bar Ansleep',
        sector: 'Bar à Cocktails & Tapas',
        themeMode: 'dark',
        accent: 'crimson',
        cardStyle: 'rounded',
        logoIcon: 'fa-martini-glass',
        currency: '€',
        items: [
            { name: 'COCKTAIL SIGNATURE ANSLEEP', nameEn: 'ANSLEEP SIGNATURE', category: 'Cocktails', price: 11.00, available: true, desc: 'Création maison fruitée aux notes d’agrumes et hibiscus', img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=500&q=80' },
            { name: 'BRUSCHETTA TRUFFE & PARMESAN', nameEn: 'TRUFFLE BRUSCHETTA', category: 'Tapas', price: 9.50, available: true, desc: 'Pain ciabatta grillé, crème de truffe noire et copeaux de parmesan', img: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=500&q=80' }
        ]
    },
    {
        id: 'cafe-victoria',
        name: 'Cafe Victoria',
        sector: 'Salon de Thé & Pâtisserie',
        themeMode: 'light',
        accent: 'crimson',
        cardStyle: 'rounded',
        logoIcon: 'fa-crown',
        currency: '€',
        items: [
            { name: 'AFTERNOON TEA VICTORIA', nameEn: 'VICTORIA HIGH TEA', category: 'Formules', price: 24.00, available: true, desc: 'Assortiment de scones, mignardises, finger sandwiches et thé bio', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=500&q=80' },
            { name: 'CROISSANT PISTACHE FRAMBOISE', nameEn: 'PISTACHIO CROISSANT', category: 'Viennoiserie', price: 4.80, available: true, desc: 'Croissant artisanal fourré au praliné pistache et framboises', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=500&q=80' }
        ]
    },
    {
        id: 'pan-hmelu',
        name: 'Pan Hmelu',
        sector: 'Brasserie Artisanale & Grill',
        themeMode: 'light',
        accent: 'sunset',
        cardStyle: 'rounded',
        logoIcon: 'fa-wheat-awn',
        currency: '€',
        items: [
            { name: 'TRAVERS DE PORC CARAMÉLISÉS', nameEn: 'GLAZED PORK RIBS', category: 'Grill', price: 18.90, available: true, desc: 'Cuisson basse température, glaçage miel-bière artisanale', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80' },
            { name: 'BRETZEL CHAUD & SAUCE CHEDDAR', nameEn: 'WARM PRETZEL', category: 'Snacks', price: 7.50, available: true, desc: 'Bretzel moelleux doré au four avec dip fromage fondant', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80' }
        ]
    },
    {
        id: 'sarnic',
        name: 'Sarnic',
        sector: 'Cuisine Méditerranéenne & Grill',
        themeMode: 'light',
        accent: 'emerald',
        cardStyle: 'rounded',
        logoIcon: 'fa-fire',
        currency: '€',
        items: [
            { name: 'BROCHETTES D’AGNEAU AU FEU DE BOIS', nameEn: 'LAMB SKEWERS', category: 'Grillades', price: 19.50, available: true, desc: 'Viande d’agneau marinée aux herbes, riz pilaf et légumes grillés', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=500&q=80' },
            { name: 'BAKLAVA PISTACHE & MIEL', nameEn: 'PISTACHIO BAKLAVA', category: 'Desserts', price: 6.90, available: true, desc: 'Pâte filo croustillante, pistaches d’Antep et sirop léger', img: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=500&q=80' }
        ]
    },
    {
        id: 'morpho-yu-hua',
        name: 'Morpho Yu Hua',
        sector: 'Gastronomie Asiatique Moderne',
        themeMode: 'light',
        accent: 'indigo',
        cardStyle: 'rounded',
        logoIcon: 'fa-leaf',
        currency: '€',
        items: [
            { name: 'BŒUF SAUTÉ AU POIVRE NOIR', nameEn: 'BLACK PEPPER BEEF', category: 'Plats', price: 17.50, available: true, desc: 'Émincé de filet de bœuf tendre, poivrons croquants et riz jasmin', img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=500&q=80' },
            { name: 'THÉ FLEUR DE JASMIN GLACÉ', nameEn: 'ICED JASMINE TEA', category: 'Boissons', price: 5.20, available: true, desc: 'Infusion florale délicate, perles de fruits et citron vert', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=500&q=80' }
        ]
    },
    {
        id: 'rose-cakes',
        name: 'Rose Cakes',
        sector: 'Cake Design & Pâtisserie Fine',
        themeMode: 'light',
        accent: 'crimson',
        cardStyle: 'rounded',
        logoIcon: 'fa-cake-candles',
        currency: '€',
        items: [
            { name: 'LAYER CAKE ROSE & FRAMBOISE', nameEn: 'ROSE RASPBERRY CAKE', category: 'Gâteaux', price: 48.00, available: true, desc: 'Gâteau à étages parfumé à l’eau de rose, crème mascarpone et framboises', img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=500&q=80' },
            { name: 'COFFRET CUPCAKES FLEURIS (6 PCS)', nameEn: 'FLORAL CUPCAKES BOX', category: 'Cupcakes', price: 22.00, available: true, desc: 'Assortiment vanille, chocolat et fraise décorés à la main', img: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=500&q=80' }
        ]
    }
];

// Theme & Color Accent Presets
const accentPalettes = {
    indigo: { label: 'Indigo', swatch: '#4F46E5', btnBg: 'bg-indigo-600 hover:bg-indigo-700 text-white', pillBg: 'bg-indigo-600 text-white', priceText: 'text-indigo-600 bg-indigo-50', logoBg: 'bg-indigo-600 text-white', ring: 'ring-indigo-500' },
    gold: { label: 'Or & Ambre', swatch: '#D97706', btnBg: 'bg-amber-500 hover:bg-amber-600 text-slate-950', pillBg: 'bg-amber-500 text-slate-950', priceText: 'text-amber-700 bg-amber-50', logoBg: 'bg-amber-400 text-slate-950', ring: 'ring-amber-500' },
    emerald: { label: 'Émeraude', swatch: '#059669', btnBg: 'bg-emerald-600 hover:bg-emerald-700 text-white', pillBg: 'bg-emerald-600 text-white', priceText: 'text-emerald-700 bg-emerald-50', logoBg: 'bg-emerald-600 text-white', ring: 'ring-emerald-500' },
    crimson: { label: 'Carmin', swatch: '#E11D48', btnBg: 'bg-rose-600 hover:bg-rose-700 text-white', pillBg: 'bg-rose-600 text-white', priceText: 'text-rose-600 bg-rose-50', logoBg: 'bg-rose-600 text-white', ring: 'ring-rose-500' },
    sunset: { label: 'Coucher de soleil', swatch: '#EA580C', btnBg: 'bg-orange-600 hover:bg-orange-700 text-white', pillBg: 'bg-orange-600 text-white', priceText: 'text-orange-600 bg-orange-50', logoBg: 'bg-orange-600 text-white', ring: 'ring-orange-500' },
    monochrome: { label: 'Monochrome', swatch: '#1E293B', btnBg: 'bg-slate-900 hover:bg-slate-800 text-white', pillBg: 'bg-slate-900 text-white', priceText: 'text-slate-900 bg-slate-100', logoBg: 'bg-slate-900 text-white', ring: 'ring-slate-800' }
};

const logoIconsList = [
    'fa-utensils', 'fa-burger', 'fa-pizza-slice', 'fa-mug-hot', 'fa-cake-candles',
    'fa-wine-glass', 'fa-spa', 'fa-fish', 'fa-pepper-hot', 'fa-crown'
];
