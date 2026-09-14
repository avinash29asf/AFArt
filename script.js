/* ============================================================
   A F Art - Online Sketch Store
   Main JavaScript
   ------------------------------------------------------------
   - Configurable WhatsApp number (set once here)
   - Renders sketches on Home / Gallery / Shop / Details
   - Cart (localStorage) + Checkout via WhatsApp
   - Custom Sketch enquiry via WhatsApp
   ============================================================ */

/* ---------- CONFIGURATION (change only this number) ---------- */
const WHATSAPP_NUMBER = "917420806178";
/* ------------------------------------------------------------- */

const CART_KEY = "afart_cart";
const CURRENCY = "\u20B9";

/* ---------- Helpers ---------- */
const formatPrice = (n) => CURRENCY + Number(n).toLocaleString("en-IN");
const waLink = (msg) => "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg);

function getSketch(id) {
    return sketches.find((s) => Number(s.id) === Number(id));
}

function cardHTML(s) {
    const badge = s.featured ? '<span class="product-badge">Featured</span>' : '';
    const avail = s.available
        ? '<span class="sketch-avail avail-in">In Stock</span>'
        : '<span class="sketch-avail avail-out">Sold / On Order</span>';
    const cats = ['Portrait','Couple','Family','Pet','Pencil','Custom','Original','Print','Digital'];
    const catBtn = (cats.includes(s.category)) ? s.category : (s.type || "Sketch");
    return `
    <div class="product-card" data-id="${s.id}" onclick="window.location.href='product.html?id=${s.id}'">
      <div class="product-img-wrap">
        <img src="${s.image}" alt="${escapeAttr(s.title)} by A F Art" width="600" height="400" loading="lazy">
        ${badge}
        <button class="share-icon-btn" onclick="event.stopPropagation(); shareSketch(${s.id})" aria-label="Share ${escapeAttr(s.title)}" title="Share"><i class="fas fa-share-alt"></i></button>
      </div>
      <div class="product-body">
        <h3>${s.title}</h3>
        <p>${escapeHtml(s.description)}</p>
        <div class="sketch-meta">
          <span class="sketch-price">${formatPrice(s.price)}</span>
          <span class="sketch-cat">${escapeHtml(catBtn)}</span>
        </div>
        ${avail}
        <button class="btn-order" onclick="event.stopPropagation(); addToCart(${s.id})">
          <i class="fas fa-cart-plus" aria-hidden="true"></i> Add to Cart
        </button>
      </div>
    </div>`;
}

function galleryItemHTML(s) {
    return `
    <div class="gallery-item" data-cat="${escapeAttr((s.category||'').toLowerCase())} ${escapeAttr((s.type||'').toLowerCase())}" data-filtertext="${escapeAttr((s.title+' '+(s.category||'')+' '+(s.type||'')).toLowerCase())}" onclick="openLightbox(${s.id})">
      <img src="${s.image}" alt="${escapeAttr(s.title)} by A F Art" width="600" height="400" loading="lazy">
      <div class="caption">
        <strong>${s.title}</strong>
        <span>${escapeHtml(s.category || s.type)} &middot; ${escapeHtml(s.size)}</span>
      </div>
    </div>`;
}

function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (m) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]));
}
function escapeAttr(str) {
    return String(str).replace(/"/g, '&quot;').replace(/&/g, '&amp;');
}

/* ---------- Sketch sharing (link + photo) ---------- */
const SITE_URL = "https://avinash29asf.github.io/AFArt/";
const sketchURL = (s) => SITE_URL + "sketch-" + s.id + ".html";
const sketchImageURL = (s) => SITE_URL + encodeURIComponent(s.image);
const shareMsg = (s) => "Check out this beautiful " + s.title + " hand-drawn sketch by A F Art! \uD83C\uDFA8\u2728";
const safeName = (s) => s.title.replace(/[^\w.-]+/g, "_") + ".jpg";

function shareButtonsHTML(s) {
    const url = sketchURL(s);
    const img = sketchImageURL(s);
    const text = shareMsg(s);
    const enc = encodeURIComponent;
    return `
    <div class="share-row">
      <span class="share-label"><i class="fas fa-share-alt"></i> Share:</span>
      <button class="share-btn share-btn-img" onclick="shareImage(${s.id})" type="button" aria-label="Share only the photo"><i class="fas fa-image"></i> Image</button>
      <button class="share-btn share-btn-link" onclick="shareLink(${s.id})" type="button" aria-label="Share only the link"><i class="fas fa-link"></i> Link</button>
      <button class="share-btn share-btn-both" onclick="shareBoth(${s.id})" type="button" aria-label="Share photo and link together"><i class="fas fa-share-alt"></i> Both</button>
    </div>
    <div class="share-row" style="margin-top:10px;">
      <span class="share-label"><i class="fas fa-paper-plane"></i> To:</span>
      <button class="share-btn share-btn-ig" onclick="shareInstagram(${s.id})" type="button" aria-label="Share to Instagram"><i class="fab fa-instagram"></i> Instagram</button>
      <a class="share-btn share-btn-wa" href="https://api.whatsapp.com/send?text=${enc(text + " " + url)}" target="_blank" rel="noopener" aria-label="Share on WhatsApp"><i class="fab fa-whatsapp"></i> WhatsApp</a>
      <a class="share-btn share-btn-fb" href="https://www.facebook.com/sharer/sharer.php?u=${enc(url)}" target="_blank" rel="noopener" aria-label="Share on Facebook"><i class="fab fa-facebook-f"></i> Facebook</a>
      <a class="share-btn share-btn-x" href="https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(text)}" target="_blank" rel="noopener" aria-label="Share on X / Twitter"><i class="fab fa-x-twitter"></i> X</a>
      <a class="share-btn share-btn-pin" href="https://pinterest.com/pin/create/button/?url=${enc(url)}&media=${enc(img)}&description=${enc(text)}" target="_blank" rel="noopener" aria-label="Share photo on Pinterest"><i class="fab fa-pinterest-p"></i> Pinterest</a>
    </div>
    <div class="share-row" style="margin-top:10px;">
      <span class="share-label"><i class="fas fa-copy"></i> Copy / Save:</span>
      <button class="share-btn share-btn-copy" onclick="copySketchLink(${s.id})" type="button" aria-label="Copy page link"><i class="fas fa-link"></i> Page Link</button>
      <button class="share-btn share-btn-photo" onclick="copyPhotoLink(${s.id})" type="button" aria-label="Copy direct photo link"><i class="fas fa-image"></i> Photo Link</button>
      <a class="share-btn share-btn-dl" href="${img}" download="${safeName(s)}" target="_blank" rel="noopener" aria-label="Download sketch photo"><i class="fas fa-download"></i> Download</a>
    </div>`;
}

function shareSketch(id) {
    if (navigator && navigator.share) nativeShareSketch(id);
    else copySketchLink(id);
}

function nativeShareSketch(id) {
    const s = getSketch(id);
    if (!s) return;
    const shareContent = { title: s.title + " | A F Art", text: shareMsg(s), url: sketchURL(s) };
    const doShare = (data) => { if (navigator.share) navigator.share(data).catch(() => {}); else copySketchLink(id); };
    if (navigator.canShare) {
        fetch(sketchImageURL(s))
            .then((r) => { if (!r.ok) throw new Error("fetch failed"); return r.blob(); })
            .then((blob) => {
                const file = new File([blob], safeName(s), { type: (blob.type || "image/jpeg") });
                const withFile = Object.assign({ files: [file] }, shareContent);
                if (navigator.canShare(withFile)) { navigator.share(withFile).catch(() => {}); return; }
                doShare(shareContent);
            })
            .catch(() => doShare(shareContent));
    } else {
        doShare(shareContent);
    }
}

function shareImage(id) {
    const s = getSketch(id);
    if (!s) return;
    const fallback = () => copyPhotoLink(id);
    if (navigator.canShare) {
        fetch(sketchImageURL(s))
            .then((r) => { if (!r.ok) throw new Error("fetch"); return r.blob(); })
            .then((blob) => {
                const file = new File([blob], safeName(s), { type: (blob.type || "image/jpeg") });
                if (navigator.canShare({ files: [file] })) { navigator.share({ files: [file], title: s.title + " | A F Art" }).catch(() => {}); return; }
                fallback();
            })
            .catch(() => fallback());
    } else if (navigator.share) {
        navigator.share({ title: s.title + " | A F Art", text: shareMsg(s) }).catch(() => {});
    } else {
        fallback();
    }
}

function shareLink(id) {
    const s = getSketch(id);
    if (!s) return;
    if (navigator.share) {
        navigator.share({ title: s.title + " | A F Art", text: shareMsg(s), url: sketchURL(s) }).catch(() => {});
    } else {
        copySketchLink(id);
    }
}

function shareBoth(id) {
    nativeShareSketch(id);
}

function shareInstagram(id) {
    const s = getSketch(id);
    if (!s) return;
    const openIg = () => window.open("https://www.instagram.com/avinash_29avi", "_blank", "noopener");
    if (navigator.canShare) {
        fetch(sketchImageURL(s))
            .then((r) => { if (!r.ok) throw new Error("fetch"); return r.blob(); })
            .then((blob) => {
                const file = new File([blob], safeName(s), { type: (blob.type || "image/jpeg") });
                if (navigator.canShare({ files: [file] })) { navigator.share({ files: [file], title: s.title + " | A F Art" }).catch(() => {}); return; }
                openIg();
            })
            .catch(() => openIg());
    } else if (navigator.share) {
        navigator.share({ title: s.title + " | A F Art", text: shareMsg(s), url: sketchURL(s) }).catch(() => {});
    } else {
        openIg();
    }
}

function copySketchLink(id) {
    const s = getSketch(id);
    if (!s) return;
    const url = sketchURL(s);
    const done = () => toast("Page link copied to clipboard!");
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done).catch(() => fallbackCopy(url, done));
    } else {
        fallbackCopy(url, done);
    }
}
function copyPhotoLink(id) {
    const s = getSketch(id);
    if (!s) return;
    const url = sketchImageURL(s);
    const done = () => toast("Photo link copied! Opens directly to this sketch photo.");
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done).catch(() => fallbackCopy(url, done));
    } else {
        fallbackCopy(url, done);
    }
}
function fallbackCopy(text, done) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    if (ok) done();
}

/* ---------- Cart (localStorage) ---------- */
function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; }
}
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
function addToCart(id, qty) {
    qty = qty || 1;
    let cart = getCart();
    const existing = cart.find((i) => i.id === Number(id));
    if (existing) { existing.qty += qty; } else { cart.push({ id: Number(id), qty: qty }); }
    saveCart(cart);
    updateCartUI();
    toast('Added to cart - ' + (getSketch(id) ? getSketch(id).title : 'Sketch'));
}
function removeFromCart(id) {
    saveCart(getCart().filter((i) => i.id !== Number(id)));
    updateCartUI();
}
function updateCartQty(id, qty) {
    let cart = getCart();
    const item = cart.find((i) => i.id === Number(id));
    if (item) {
        item.qty = Math.max(1, Number(qty) || 1);
        saveCart(cart);
    }
    updateCartUI();
}
function cartCount() {
    return getCart().reduce((sum, i) => sum + i.qty, 0);
}
function cartTotal() {
    return getCart().reduce((sum, i) => sum + (getSketch(i.id) ? getSketch(i.id).price * i.qty : 0), 0);
}
function updateCartUI() {
    const badge = document.getElementById('cartCount');
    if (badge) badge.textContent = cartCount();
    const badge2 = document.getElementById('cartCount2');
    if (badge2) badge2.textContent = cartCount();
    const totalEl = document.getElementById('cartTotal');
    if (totalEl) totalEl.textContent = formatPrice(cartTotal());
    const itemsEl = document.getElementById('cartItems');
    if (itemsEl) {
        const cart = getCart();
        if (!cart.length) {
            itemsEl.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:20px;">Your cart is empty.</p>';
        } else {
            itemsEl.innerHTML = cart.map((i) => {
                const s = getSketch(i.id);
                if (!s) return '';
                return `
                <div class="cart-item">
                  <img src="${s.image}" alt="${escapeAttr(s.title)}">
                  <div class="cart-item-info">
                    <strong>${s.title}</strong>
                    <span>${formatPrice(s.price)}</span>
                    <div class="cart-qty">
                      <button onclick="updateCartQty(${s.id}, ${i.qty - 1})"><i class="fas fa-minus"></i></button>
                      <span>${i.qty}</span>
                      <button onclick="updateCartQty(${s.id}, ${i.qty + 1})"><i class="fas fa-plus"></i></button>
                    </div>
                  </div>
                  <button class="cart-remove" onclick="removeFromCart(${s.id})"><i class="fas fa-trash"></i></button>
                </div>`;
            }).join('');
        }
    }
}

/* Cart drawer open/close */
function openCart() {
    const d = document.getElementById('cartDrawer');
    if (d) { d.classList.add('open'); updateCartUI(); }
}
function closeCart() {
    const d = document.getElementById('cartDrawer');
    if (d) d.classList.remove('open');
}
function openCheckout() {
    if (!getCart().length) { toast('Your cart is empty.'); return; }
    document.getElementById('checkoutModal').classList.add('open');
}
function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('open');
}

/* ---------- Checkout & WhatsApp Order ---------- */
function placeOrder() {
    const name = document.getElementById('orderName').value.trim();
    const mobile = document.getElementById('orderMobile').value.trim();
    const address = document.getElementById('orderAddress').value.trim();
    if (!name || !mobile || !address) {
        toast('Please fill in all billing details.');
        return;
    }
    const cart = getCart();
    const orderId = "AFART-" + Date.now().toString().slice(-6);
    let lines = cart.map((i) => {
        const s = getSketch(i.id);
        return "\u2022 " + s.title + " x" + i.qty + " = " + formatPrice(s.price * i.qty);
    }).join("\n");

    const msg =
        "\uD83C\uDFA8 *New Sketch Order*\n\n" +
        "Order ID: " + orderId + "\n" +
        "Name: " + name + "\n" +
        "Mobile: " + mobile + "\n" +
        "Address: " + address + "\n\n" +
        "Items:\n" + lines + "\n\n" +
        "Total: " + formatPrice(cartTotal()) + "\n\n" +
        "Please confirm my sketch order. Thank you!";

    localStorage.removeItem(CART_KEY);
    updateCartUI();
    closeCheckout();
    closeCart();
    window.open(waLink(msg), "_blank");
}

/* ---------- Generic toast notification ---------- */
let toastTimer = null;
function toast(msg) {
    let el = document.getElementById('afartToast');
    if (!el) {
        el = document.createElement('div');
        el.id = 'afartToast';
        el.className = 'afart-toast';
        document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}


/* ---------- Sketch Details view (product.html?id=N) ---------- */
function renderDetails() {
    const el = document.getElementById('sketchDetails');
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!el) return;
    if (!id) { el.style.display = 'none'; return; }
    const s = getSketch(id);
    if (!s) { el.innerHTML = '<p style="text-align:center;color:var(--text-muted)">Sketch not found.</p>'; return; }

    document.getElementById('shopGridWrap').style.display = 'none';
    el.style.display = 'block';

    // Hide the static shop page-header (its H1) so a product detail page has exactly one H1
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) pageHeader.style.display = 'none';

    // Set a unique, keyword-rich title and meta description for this product detail page
    if (document.querySelector('title')) {
        document.title = s.title + ' | Hand-Drawn ' + s.category + ' Sketch by A F Art';
    }
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.setAttribute('content', s.description + ' Available as an original hand-drawn ' + s.category.toLowerCase() + ' sketch at A F Art, priced at ' + formatPrice(s.price) + '.');
    }
    // Refresh Open Graph / Twitter meta so shared links show this sketch's photo & title
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.setAttribute('content', sketchImageURL(s));
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', s.title + ' | Hand-Drawn ' + s.category + ' Sketch by A F Art');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', s.description);
    const ogAlt = document.querySelector('meta[property="og:image:alt"]');
    if (ogAlt) ogAlt.setAttribute('content', s.title + ' by A F Art');
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', s.title + ' | A F Art');
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', s.description);
    const twImg = document.querySelector('meta[name="twitter:image"]');
    if (twImg) twImg.setAttribute('content', sketchImageURL(s));
    const metaCanonical = document.querySelector('link[rel="canonical"]');
    if (metaCanonical) {
        metaCanonical.setAttribute('href', 'https://avinash29asf.github.io/AFArt/product.html?id=' + s.id);
    }
    const avail = s.available
        ? '<span class="sketch-avail avail-in">Available</span>'
        : '<span class="sketch-avail avail-out">Currently Unavailable</span>';

    // Prev / next + all-sketch thumbnails for the detail view
    const allSketches = sketches.slice().sort((a, b) => Number(a.id) - Number(b.id));
    const curIdx = allSketches.findIndex((x) => Number(x.id) === Number(id));
    const prevS = allSketches[(curIdx - 1 + allSketches.length) % allSketches.length];
    const nextS = allSketches[(curIdx + 1) % allSketches.length];

    el.innerHTML = `
    <div class="sketch-detail-layout">
      <div class="sketch-detail-img">
        <img src="${s.image}" alt="${escapeAttr(s.title)} by A F Art" title="${escapeAttr(s.title)} by A F Art" style="width:100%;border-radius:var(--radius);box-shadow:var(--shadow-lg);">
      </div>
      <div class="sketch-detail-info">
        <span class="section-label">${escapeHtml(s.category)} Sketch</span>
        <h1 class="section-title" style="text-align:left">${s.title}</h1>
        <p class="section-sub" style="margin-bottom:20px">${escapeHtml(s.description)}</p>
        <div class="sketch-specs">
          <div><span>Price</span><strong>${formatPrice(s.price)}</strong></div>
          <div><span>Size</span><strong>${escapeHtml(s.size)}</strong></div>
          <div><span>Type</span><strong>${escapeHtml(s.type)}</strong></div>
          <div><span>Category</span><strong>${escapeHtml(s.category)}</strong></div>
          <div><span>Date</span><strong>${s.date}</strong></div>
          <div><span>Availability</span>${avail}</div>
        </div>
        <div class="detail-qty">
          <span>Quantity:</span>
          <div class="cart-qty">
            <button onclick="setDetailQty(-1)"><i class="fas fa-minus"></i></button>
            <span id="detailQty">${s.available ? 1 : 0}</span>
            <button onclick="setDetailQty(1)"><i class="fas fa-plus"></i></button>
          </div>
        </div>
        <div class="hero-btns" style="margin-top:24px">
          <button class="btn btn-primary" onclick="detailsAddToCart()"><i class="fas fa-cart-plus"></i> Add to Cart</button>
          <button class="btn btn-whatsapp" onclick="detailsBuyNow()"><i class="fas fa-bolt"></i> Buy Now</button>
          <button class="btn btn-outline" onclick="detailsEnquire()"><i class="fab fa-whatsapp"></i> WhatsApp Enquiry</button>
        </div>
        <a class="btn btn-outline" href="product.html" style="margin-top:12px"><i class="fas fa-arrow-left"></i> Back to Shop</a>
        <div class="share-block">
          <h3><i class="fas fa-share-alt" style="margin-right:8px;color:var(--primary);"></i>Share this sketch</h3>
          ${shareButtonsHTML(s)}
        </div>
      </div>
    </div>

    <div class="detail-nav">
      <a class="btn btn-outline detail-nav-btn" href="product.html?id=${prevS.id}"><i class="fas fa-arrow-left"></i><span>${escapeHtml(prevS.title)}</span></a>
      <a class="btn btn-outline detail-nav-btn" href="product.html?id=${nextS.id}"><span>${escapeHtml(nextS.title)}</span><i class="fas fa-arrow-right"></i></a>
    </div>

    <div class="all-sketches">
      <h3><i class="fas fa-images" style="margin-right:8px;color:var(--primary);"></i>All Sketches</h3>
      <p style="color:var(--text-muted);font-size:0.88rem;margin-bottom:16px;">View every hand-drawn sketch photo &mdash; click any thumbnail to open its detail page.</p>
      <div class="thumb-strip">
        ${allSketches.map(function (x) {
            const active = Number(x.id) === Number(id) ? ' active' : '';
            return '<a class="thumb-item' + active + '" href="product.html?id=' + x.id + '" title="' + escapeAttr(x.title) + '"><img src="' + x.image + '" alt="' + escapeAttr(x.title) + ' by A F Art" loading="lazy" width="130" height="96"><span>' + escapeHtml(x.title) + '</span></a>';
        }).join('')}
      </div>
    </div>`;
    window.detailSketch = s;
    window.detailQty = s.available ? 1 : 0;
    document.title = s.title + ' - ' + s.size + ' Sketch | A F Art';
}
function setDetailQty(d) {
    if (!window.detailSketch || !window.detailSketch.available) return;
    window.detailQty = Math.max(1, (window.detailQty || 1) + d);
    document.getElementById('detailQty').textContent = window.detailQty;
}
function detailsAddToCart() {
    if (!window.detailSketch || !window.detailSketch.available) { toast('This sketch is currently unavailable.'); return; }
    addToCart(window.detailSketch.id, window.detailQty || 1);
}
function detailsBuyNow() {
    if (!window.detailSketch || !window.detailSketch.available) { toast('This sketch is currently unavailable.'); return; }
    addToCart(window.detailSketch.id, window.detailQty || 1);
    openCart();
    openCheckout();
}
function detailsEnquire() {
    const s = window.detailSketch;
    if (!s) return;
    const msg = "\uD83C\uDFA8 *Sketch Enquiry*\n\nTitle: " + s.title + "\nSize: " + s.size + "\nType: " + s.type + "\nPrice: " + formatPrice(s.price) + "\nQuantity: " + (window.detailQty || 1) + "\n\nIs this sketch available? Please confirm.";
    window.open(waLink(msg), "_blank");
}

/* ---------- Custom Sketch Enquiry (WhatsApp) ---------- */
function submitCustomSketch(event) {
    event.preventDefault();
    const name = document.getElementById('csName').value.trim();
    const mobile = document.getElementById('csMobile').value.trim();
    const email = document.getElementById('csEmail').value.trim();
    const type = document.getElementById('csType').value;
    const size = document.getElementById('csSize').value;
    const persons = document.getElementById('csPersons').value;
    const instructions = document.getElementById('csInstructions').value.trim();
    if (!name || !mobile) { toast('Please enter your name and mobile number.'); return; }

    const msg =
        "\uD83C\uDFA8 *Custom Sketch Request*\n\n" +
        "Name: " + name + "\n" +
        "Mobile: " + mobile + "\n" +
        "Email: " + (email || "\u2014") + "\n" +
        "Sketch Type: " + type + "\n" +
        "Size: " + size + "\n" +
        "Number of Persons: " + persons + "\n\n" +
        "Instructions: " + (instructions || "\u2014") + "\n\n" +
        "I will send the reference photo on WhatsApp.\nThank you!";
    window.open(waLink(msg), "_blank");
}


/* ---------- Reveal dynamic cards (fade-in) ---------- */
function revealContainer(container) {
    if (!container) return;
    container.querySelectorAll('.product-card, .overview-card, .service-card').forEach((el) => el.classList.add('visible'));
}

/* ---------- Keep WhatsApp / phone links & numbers in sync ----------
   WHATSAPP_NUMBER above is the single source of truth. Static links in
   the HTML act as a no-JS fallback; this rewrites them at runtime so
   changing the config updates every page automatically. */
function syncContactDetails() {
    const digits = String(WHATSAPP_NUMBER).replace(/\D/g, '');
    if (!digits) return;
    const pretty = (digits.length > 10 && digits.indexOf('91') === 0)
        ? '+91 ' + digits.slice(2)
        : '+' + digits;

    document.querySelectorAll('a[href]').forEach((a) => {
        const href = a.getAttribute('href') || '';
        if (/^https:\/\/wa\.me\//i.test(href)) {
            a.setAttribute('href', 'https://wa.me/' + digits);
        } else if (/^tel:/i.test(href)) {
            a.setAttribute('href', 'tel:+' + digits);
        }
    });

    // visible numbers are wrapped in .js-phone spans in the markup
    document.querySelectorAll('.js-phone').forEach((el) => {
        el.textContent = pretty;
    });
}

/* ---------- Page-specific initialisation ---------- */
function initPage() {
    syncContactDetails();
    updateCartUI();

    // Home page sketch sections
    const latest = document.getElementById('latestSketches');
    if (latest) {
        const sorted = sketches.slice().sort((a, b) => (b.date < a.date ? -1 : 1));
        latest.innerHTML = sorted.slice(0, 4).map(cardHTML).join('');
        revealContainer(latest);
    }
    const featured = document.getElementById('featuredSketches');
    if (featured) {
        featured.innerHTML = sketches.filter((s) => s.featured).slice(0, 4).map(cardHTML).join('');
        revealContainer(featured);
    }
    const shopSketches = document.getElementById('shopSketches');
    if (shopSketches) {
        shopSketches.innerHTML = sketches.filter((s) => s.available).slice(0, 4).map(cardHTML).join('');
        revealContainer(shopSketches);
    }

    // Shop page grid
    const shopGrid = document.getElementById('shopGrid');
    if (shopGrid) {
        shopGrid.innerHTML = sketches.map(cardHTML).join('');
        revealContainer(shopGrid);
    }

    // Gallery
    const galleryGrid = document.getElementById('galleryGrid');
    if (galleryGrid) {
        galleryGrid.innerHTML = sketches.map(galleryItemHTML).join('');
        // items are revealed by CSS only with .visible; add it (with stagger) since
        // the inline observer runs before these dynamic items exist
        galleryGrid.querySelectorAll('.gallery-item').forEach((el, idx) => {
            el.style.transitionDelay = (Math.min(idx, 8) * 0.06).toFixed(2) + 's';
            el.classList.add('visible');
        });
        setupGalleryFilters();
    }

    // Sketch details (from query string)
    renderDetails();

    // Custom sketch form
    const form = document.getElementById('customSketchForm');
    if (form) form.addEventListener('submit', submitCustomSketch);
}

document.addEventListener('DOMContentLoaded', initPage);

/* ---------- Gallery: Search + Category filter + Lightbox ---------- */
function setupGalleryFilters() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;
    const items = Array.from(grid.querySelectorAll('.gallery-item'));

    // Filter buttons
    const buttons = document.querySelectorAll('.filter-btn');
    let activeCat = 'all';
    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            buttons.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            activeCat = btn.getAttribute('data-filter') || 'all';
            applyFilters(activeCat);
        });
    });

    const search = document.getElementById('gallerySearch');
    if (search) {
        search.addEventListener('input', () => applyFilters(activeCat));
    }

    function applyFilters(cat) {
        const q = (search ? search.value.trim().toLowerCase() : '');
        items.forEach((it) => {
            const matchCat = cat === 'all' || it.getAttribute('data-cat').indexOf(cat) !== -1;
            const matchQuery = !q || it.getAttribute('data-filtertext').indexOf(q) !== -1;
            it.style.display = (matchCat && matchQuery) ? '' : 'none';
        });
    }
}

function openLightbox(id) {
    const s = getSketch(id);
    if (!s) return;
    const lb = document.getElementById('lightbox');
    if (!lb) return;
    document.getElementById('lightboxImg').src = s.image;
    document.getElementById('lightboxImg').alt = s.title + ' by A F Art';
    document.getElementById('lightboxTitle').textContent = s.title;
    document.getElementById('lightboxMeta').innerHTML =
        "<strong>" + escapeHtml(s.category) + "</strong> &middot; " + escapeHtml(s.size) + " &middot; " + formatPrice(s.price);
    const viewLink = document.getElementById('lightboxView');
    if (viewLink) viewLink.href = 'product.html?id=' + s.id;
    const lbShare = document.getElementById('lightboxShare');
    if (lbShare) lbShare.innerHTML = shareButtonsHTML(s);
    lb.classList.add('open');
}
function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (lb) lb.classList.remove('open');
}

/* Click-outside handlers for cart drawer, checkout & lightbox */
document.addEventListener('click', function (e) {
    const drawer = document.getElementById('cartDrawer');
    if (drawer && drawer.classList.contains('open') && e.target && e.target.id === 'cartOverlay') closeCart();
    const checkout = document.getElementById('checkoutModal');
    if (checkout && checkout.classList.contains('open') && e.target && e.target.id === 'checkoutModal') closeCheckout();
    const lb = document.getElementById('lightbox');
    if (lb && lb.classList.contains('open') && e.target && e.target.id === 'lightbox') closeLightbox();
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeCart(); closeCheckout(); closeLightbox(); }
});

