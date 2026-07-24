// Fairdeal Trading Agency — demo interactions (front-end only, no backend)

/* ---------- Toast ---------- */
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.querySelector('span').textContent = msg;
  toast.classList.add('show');
  clearTimeout(window.__fdToastTimer);
  window.__fdToastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}
window.fdToast = showToast;

/* ---------- Cart store (localStorage-backed) ----------
   Only { id, qty } pairs are persisted; product details always come
   from PRODUCTS (data.js) so the two can never drift out of sync. */
const CART_KEY = 'fd_cart_v2';

function readCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch (e) { return []; }
}
function writeCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  paintCartBadge();
}
function addToCart(id, qty) {
  qty = Math.max(1, parseInt(qty, 10) || 1);
  const items = readCart();
  const line = items.find((l) => l.id === id);
  if (line) line.qty += qty; else items.push({ id, qty });
  writeCart(items);
  return items;
}
function removeFromCart(id) {
  writeCart(readCart().filter((l) => l.id !== id));
}
function setCartQty(id, qty) {
  qty = parseInt(qty, 10);
  const items = readCart();
  const line = items.find((l) => l.id === id);
  if (!line) return;
  if (!qty || qty < 1) { removeFromCart(id); return; }
  line.qty = qty;
  writeCart(items);
}
function clearCart() { writeCart([]); }
function cartCount() { return readCart().reduce((sum, l) => sum + l.qty, 0); }
function cartLines() {
  return readCart()
    .map((l) => ({ ...l, product: window.PRODUCTS ? window.PRODUCTS[l.id] : null }))
    .filter((l) => l.product);
}
function cartTotals() {
  const lines = cartLines();
  let subtotal = 0, percentSavings = 0, bogoFreeUnits = 0;
  lines.forEach(({ product, qty }) => {
    subtotal += product.ptr * qty;
    if (product.scheme && product.scheme.type === 'percent') {
      percentSavings += (product.ptr * qty * product.scheme.percent) / 100;
    }
    if (product.scheme && product.scheme.type === 'bogo') {
      bogoFreeUnits += Math.floor(qty / product.scheme.freeEvery);
    }
  });
  const taxable = Math.max(0, subtotal - percentSavings);
  const gst = taxable * (window.GST_RATE || 0.12);
  return { subtotal, percentSavings, bogoFreeUnits, taxable, gst, grandTotal: taxable + gst };
}
function paintCartBadge() {
  const count = cartCount();
  document.querySelectorAll('[data-cart-badge]').forEach((b) => (b.textContent = count));
}
window.FD_CART = { addToCart, removeFromCart, setCartQty, clearCart, cartCount, cartLines, cartTotals, readCart };

paintCartBadge();

/* ---------- Universal "Add to Cart" delegation ----------
   Works for any element anywhere on the site: <button data-add-to-cart="product-id">.
   Optional data-qty-input="elementId" reads quantity from a stepper input. */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-add-to-cart]');
  if (!btn) return;
  e.preventDefault();
  e.stopPropagation();
  const id = btn.dataset.addToCart;
  const product = window.PRODUCTS ? window.PRODUCTS[id] : null;
  if (!product) return;
  let qty = 1;
  if (btn.dataset.qtyInput) {
    const input = document.getElementById(btn.dataset.qtyInput);
    if (input) qty = parseInt(input.value, 10) || 1;
  }
  addToCart(id, qty);
  showToast(`Added "${product.name}" to cart`);
});

/* ---------- Quantity steppers (delegated so it also works on
   rows rendered dynamically after page load, e.g. the cart table) ---------- */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-stepper] button');
  if (!btn) return;
  const stepper = btn.closest('[data-stepper]');
  const input = stepper.querySelector('input');
  let val = parseInt(input.value || '1', 10);
  val = btn.dataset.action === 'inc' ? val + 1 : Math.max(1, val - 1);
  input.value = val;
  input.dispatchEvent(new Event('change', { bubbles: true }));
});

/* ---------- Not-yet-wired demo actions (e.g. dashboard downloads) ----------
   <a data-demo-toast="Message shown on click"> instead of a dead link. */
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-demo-toast]');
  if (!el) return;
  e.preventDefault();
  showToast(el.dataset.demoToast);
});

document.addEventListener('DOMContentLoaded', () => {
  /* Mobile nav toggle */
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
      navToggle.setAttribute('aria-expanded', mobileNav.classList.contains('hidden') ? 'false' : 'true');
    });
  }

  /* Mobile filter drawer (catalog page) — single filter panel,
     just toggled between off-canvas (mobile) and static (desktop) via CSS. */
  const filterToggle = document.getElementById('filterToggle');
  const filterPanel = document.getElementById('filterPanel');
  const filterClose = document.getElementById('filterClose');
  if (filterToggle && filterPanel) {
    filterToggle.addEventListener('click', () => filterPanel.classList.remove('translate-x-full'));
  }
  if (filterClose && filterPanel) {
    filterClose.addEventListener('click', () => filterPanel.classList.add('translate-x-full'));
  }

  /* Scroll reveal */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 6) * 60}ms`;
      io.observe(el);
    });
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* Active nav link based on current page */
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach((link) => {
    if (link.getAttribute('href') === path) link.classList.add('active');
  });

  /* Footer year */
  document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));
});
