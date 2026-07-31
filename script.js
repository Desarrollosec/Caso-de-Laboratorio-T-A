/* ==========================================
   TÍA TE AVISA - INTERACTIVE JAVASCRIPT (SPA)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    init3DBackground();
    initProgressBar();
    initNavbarScroll();
    initWhatsAppCombos();
    initBudgetChart();
    initKPIObserver();
    initCSVFetcher();
    initMobileNav();
});

/* ------------------------------------------
   1. 3D Particle Mesh Background
   ------------------------------------------ */
function init3DBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 18), 70);

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            radius: Math.random() * 2 + 1,
            alpha: Math.random() * 0.6 + 0.2
        });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particleCount; i++) {
            let p = particles[i];

            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(227, 6, 19, ${p.alpha})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#FF0033';
            ctx.fill();

            for (let j = i + 1; j < particleCount; j++) {
                let p2 = particles[j];
                let dist = Math.hypot(p.x - p2.x, p.y - p2.y);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(255, 0, 51, ${0.25 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }

            let distMouse = Math.hypot(p.x - mouseX, p.y - mouseY);
            if (distMouse < 150) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouseX, mouseY);
                ctx.strokeStyle = `rgba(255, 153, 0, ${0.4 * (1 - distMouse / 150)})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}

/* ------------------------------------------
   2. Reading Progress Bar & Scroll Navbar
   ------------------------------------------ */
function initProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) progressBar.style.width = scrolled + '%';
    });
}

function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ------------------------------------------
   3. Interactive Combos & WhatsApp Push Simulator
   ------------------------------------------ */
const comboData = {
    almuerzo: {
        title: "COMBO ALMUERZO FAMILIAR 🥘",
        colorBadge: "🟢 SEÑALÉTICA VERDE IN-STORE",
        price: "$9.99",
        oldPrice: "$12.99",
        savings: "$3.00 (23% Ahorro Real)",
        items: "• 1 Pollo entero fresco\n• 2kg Arroz Supagrano\n• 1 Ltr Aceite vegetal\n• 1 Mazo de Vegetales mixtos",
        time: "Disponible hoy de 11h00 a 14h00",
        recipe: "💡 Receta recomendada: Seco de Pollo Criollo económico en 25 min."
    },
    merienda: {
        title: "COMBO MERIENDA EXPRESS ☕",
        colorBadge: "🟠 SEÑALÉTICA NARANJA IN-STORE",
        price: "$4.50",
        oldPrice: "$6.20",
        savings: "$1.70 (27% Ahorro Real)",
        items: "• 1 Funda de Pan de Molde especial\n• 1 Ltr Yogurt Natural Tía\n• 200g Queso Manaba\n• 1 Ltr Jugo de Naranja",
        time: "Disponible hoy de 16h00 a 18h00",
        recipe: "💡 Tip del día: Tostadas francesas en freidora de aire."
    },
    cena: {
        title: "COMBO CENA RÁPIDA 🍝",
        colorBadge: "🔵 SEÑALÉTICA AZUL IN-STORE",
        price: "$3.99",
        oldPrice: "$5.50",
        savings: "$1.51 (27% Ahorro Real)",
        items: "• 500g Pasta Tallarín\n• 2 Latas de Atún en aceite\n• 1 Pasta de Tomate concentrada\n• 1 Lata Maíz Dulce",
        time: "Disponible hoy de 18h00 a 20h00",
        recipe: "💡 Receta express: Tallarín de atún mediterráneo en 10 min."
    },
    quincena: {
        title: "COMBO QUINCENA COMPLETA 🛒",
        colorBadge: "🟣 SEÑALÉTICA MORADA IN-STORE",
        price: "$24.99",
        oldPrice: "$31.00",
        savings: "$6.01 (20% Ahorro Real)",
        items: "• 5kg Arroz + 2kg Azúcar + 2 Ltrs Aceite\n• 6 Latas Atún + 1kg Detergente\n• Papel higiénico 4-pack + Jabón multifunción",
        time: "Válido días 1 al 5 del mes",
        recipe: "💡 Planificación: Guía de optimización del presupuesto familiar."
    }
};

function initWhatsAppCombos() {
    const cards = document.querySelectorAll('.combo-card');
    const waChatBody = document.getElementById('wa-chat-body');

    function updateWhatsAppScreen(comboKey) {
        const data = comboData[comboKey];
        if (!data || !waChatBody) return;

        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        waChatBody.innerHTML = `
            <div class="wa-msg-bubble">
                <strong>📲 TÍA TE AVISA - SUCURSAL ALBORADA</strong><br><br>
                <strong>${data.title}</strong><br>
                <small>${data.colorBadge}</small><br><br>
                ${data.items.replace(/\n/g, '<br>')}<br><br>
                <strong>🏷️ Precio Especial: ${data.price}</strong> <span style="text-decoration:line-through;color:#aaa;">(${data.oldPrice})</span><br>
                <strong>💰 Ahorro Real: ${data.savings}</strong><br>
                <span>⏰ ${data.time}</span><br><br>
                <em>${data.recipe}</em><br><br>
                <a href="#evidencias" style="color:#00A884;font-weight:bold;text-decoration:none;">👉 Toca aquí para ver el código QR de receta en percha</a>
                <span class="wa-time">${timeStr} ✓✓</span>
            </div>
        `;
    }

    cards.forEach(card => {
        card.addEventListener('click', () => {
            cards.forEach(c => c.classList.remove('active-combo'));
            card.classList.add('active-combo');
            const key = card.getAttribute('data-combo');
            updateWhatsAppScreen(key);
        });
    });

    updateWhatsAppScreen('almuerzo');
}

/* ------------------------------------------
   4. Budget Pie/Donut Chart (Chart.js)
   ------------------------------------------ */
function initBudgetChart() {
    const ctx = document.getElementById('budgetChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                'Pauta Digital Ads ($1,000)',
                'Community Manager ($800)',
                'Diseñador Gráfico ($600)',
                'Producción Señalética ($500)',
                'Licencia CRM ($300)',
                'WhatsApp API ($250)'
            ],
            datasets: [{
                data: [1000, 800, 600, 500, 300, 250],
                backgroundColor: [
                    '#FF0033',
                    '#E30613',
                    '#FF4D4D',
                    '#990000',
                    '#FF8080',
                    '#FFB3B3'
                ],
                borderWidth: 2,
                borderColor: '#0F0F0F'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            cutout: '65%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return ` ${context.label}: $${context.raw} USD`;
                        }
                    }
                }
            }
        }
    });
}

/* ------------------------------------------
   5. Animated KPIs Observer
   ------------------------------------------ */
function initKPIObserver() {
    const kpiSection = document.getElementById('kpis');
    if (!kpiSection) return;

    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                animateNumbers();
                animateBars();
            }
        });
    }, { threshold: 0.3 });

    observer.observe(kpiSection);

    function animateNumbers() {
        const numbers = document.querySelectorAll('.kpi-number');
        numbers.forEach(num => {
            const target = parseInt(num.getAttribute('data-target'));
            let current = 0;
            const step = Math.max(1, Math.floor(target / 40));
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                if (num.innerText.includes('+')) {
                    num.innerText = `+${current}%`;
                } else if (num.innerText.includes('<')) {
                    num.innerText = `< ${current}s`;
                } else {
                    num.innerText = `${current}%`;
                }
            }, 35);
        });
    }

    function animateBars() {
        const bars = document.querySelectorAll('.progress-bar-fill');
        bars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-progress');
            bar.style.width = targetWidth;
        });
    }
}

/* ------------------------------------------
   6. Google Sheets CSV Fetcher & Seamless Marquee
   ------------------------------------------ */
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQx6BnTMVRFQwyFoYOI9Ak0evdzuBT_-Xeqr2DiLPs8LTaYVGuPDM63rPZALsXo9g2F8eFxG4SEdJmz/pub?output=csv';

const fallbackMockups = {
    whatsapp: [
        { title: "Simulador WhatsApp Barrial - Combo Almuerzo", img: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=600&auto=format&fit=crop&q=80" },
        { title: "Notificación Push Hiper-Localizada", img: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&auto=format&fit=crop&q=80" },
        { title: "Respuesta Automática CRM Tía", img: "https://images.unsplash.com/photo-1556742049-0a670f4a4591?w=600&auto=format&fit=crop&q=80" }
    ],
    redes: [
        { title: "Post Instagram Receta Económica", img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&auto=format&fit=crop&q=80" },
        { title: "Reel TikTok Tips de Ahorro Tía", img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&auto=format&fit=crop&q=80" },
        { title: "Campaña Meta Ads Geo-Segmentada", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80" }
    ],
    senaletica: [
        { title: "Hablador Verde - Combo Almuerzo In-Store", img: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=600&auto=format&fit=crop&q=80" },
        { title: "Código de Colores en Pasillos de Tía", img: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=600&auto=format&fit=crop&q=80" },
        { title: "Percha Intervenida Phygital", img: "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=600&auto=format&fit=crop&q=80" }
    ],
    qr: [
        { title: "Landing Page Móvil al Escanear QR", img: "https://images.unsplash.com/photo-1595079672139-cee4c06ac9b9?w=600&auto=format&fit=crop&q=80" },
        { title: "Desglose de Ahorro Real & Receta Video", img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&auto=format&fit=crop&q=80" },
        { title: "Medición de Conversión por QR", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80" }
    ]
};

async function initCSVFetcher() {
    const statusBanner = document.getElementById('csv-status-banner');

    try {
        const response = await fetch(CSV_URL);
        const csvText = await response.text();

        const rows = parseCSV(csvText);
        
        const categoryMap = { whatsapp: [], redes: [], senaletica: [], qr: [] };

        rows.forEach(row => {
            if (row.Categoria && row.Enlace) {
                const catRaw = row.Categoria.trim().toLowerCase();
                const enlace = row.Enlace.trim();

                if (!enlace) return;

                // Handle Logos
                if (catRaw === 'logo') {
                    const mainLogo = document.getElementById('main-logo-img');
                    const footerLogo = document.getElementById('footer-logo-img');
                    if (mainLogo) mainLogo.src = enlace;
                    if (footerLogo) footerLogo.src = enlace;
                } else if (catRaw === 'logowhatsapp' || catRaw === 'logowp' || catRaw === 'logowspp') {
                    const waLogo = document.getElementById('wa-avatar-img');
                    if (waLogo) waLogo.src = enlace;
                }
                // Handle Carousels
                else if (catRaw === 'whatsapp' || catRaw === 'wspp' || catRaw === 'wp') {
                    categoryMap.whatsapp.push(enlace);
                } else if (catRaw === 'redes' || catRaw === 'redessociales' || catRaw === 'social') {
                    categoryMap.redes.push(enlace);
                } else if (catRaw === 'senaletica' || catRaw === 'señaletica' || catRaw === 'percha') {
                    categoryMap.senaletica.push(enlace);
                } else if (catRaw === 'qr' || catRaw === 'landing') {
                    categoryMap.qr.push(enlace);
                }
            }
        });

        const totalItems = categoryMap.whatsapp.length + categoryMap.redes.length + categoryMap.senaletica.length + categoryMap.qr.length;

        if (statusBanner) {
            if (totalItems > 0) {
                statusBanner.innerHTML = `<i class="fa-solid fa-circle-check text-green"></i> Conexión Google Sheets CSV activa. ${totalItems} imagen(es) cargada(s).`;
                statusBanner.style.borderColor = '#00FF66';
                statusBanner.style.color = '#00FF66';
            } else {
                statusBanner.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Esperando filas en Google Sheets (usando prototipos HD de resguardo).`;
            }
        }

        renderCarousels(categoryMap);

    } catch (err) {
        console.warn('Fallback a prototipos locales por error en CSV:', err);
        if (statusBanner) {
            statusBanner.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Usando prototipos HD locales de resguardo.`;
        }
        renderCarouselsFallback();
    }
}

function parseCSV(text) {
    const lines = text.split('\n');
    const result = [];
    if (!lines.length) return result;

    const headers = lines[0].split(',').map(h => h.trim());

    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        const currentline = lines[i].split(',');
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j] ? currentline[j].trim() : '';
        }
        result.push(obj);
    }
    return result;
}

function renderCarousels(map) {
    renderTrack('track-whatsapp', map.whatsapp.length ? map.whatsapp : fallbackMockups.whatsapp.map(m => m.img), "WhatsApp Barrial Prototipo");
    renderTrack('track-redes', map.redes.length ? map.redes : fallbackMockups.redes.map(m => m.img), "Campaña Redes Sociales");
    renderTrack('track-senaletica', map.senaletica.length ? map.senaletica : fallbackMockups.senaletica.map(m => m.img), "Señalética In-Store");
    renderTrack('track-qr', map.qr.length ? map.qr : fallbackMockups.qr.map(m => m.img), "Código QR / Landing Page");
}

function renderCarouselsFallback() {
    renderTrack('track-whatsapp', fallbackMockups.whatsapp.map(m => m.img), "WhatsApp Barrial Prototipo");
    renderTrack('track-redes', fallbackMockups.redes.map(m => m.img), "Campaña Redes Sociales");
    renderTrack('track-senaletica', fallbackMockups.senaletica.map(m => m.img), "Señalética In-Store");
    renderTrack('track-qr', fallbackMockups.qr.map(m => m.img), "Código QR / Landing Page");
}

function renderTrack(trackId, images, labelPrefix) {
    const track = document.getElementById(trackId);
    if (!track || !images || !images.length) return;

    // Ensure array has enough elements for seamless infinite marquee loop (minimum 10 items)
    let loopImages = [...images];
    while (loopImages.length < 10) {
        loopImages = loopImages.concat(images);
    }

    // Duplicate array for CSS marquee animation (-50% transform)
    const fullImages = [...loopImages, ...loopImages];

    track.innerHTML = fullImages.map((imgUrl, index) => `
        <div class="carousel-item-card">
            <img src="${imgUrl}" alt="${labelPrefix} ${index + 1}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80';">
            <div class="carousel-caption">
                <i class="fa-solid fa-eye"></i> ${labelPrefix} #${(index % images.length) + 1}
            </div>
        </div>
    `).join('');
}

/* ------------------------------------------
   7. Mobile Navigation Drawer Toggle
   ------------------------------------------ */
function initMobileNav() {
    const toggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
        });

        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('mobile-active');
            });
        });
    }
}
