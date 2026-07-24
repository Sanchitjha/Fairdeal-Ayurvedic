// Shared footer injected on every page to avoid duplicating markup per file.
document.addEventListener('DOMContentLoaded', () => {
  const mount = document.getElementById('siteFooter');
  if (!mount) return;
  mount.innerHTML = `
  <div class="bg-brand-900 text-white/70">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
      <div>
        <a href="index.html" class="flex items-center gap-3 mb-4">
          <span class="w-10 h-10 rounded-xl bg-saffron-500 text-brand-900 flex items-center justify-center">
            <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 21C7 20 4 16 4 11c0-5 3-8 8-8s8 3 8 8c0 5-3 9-8 10Z"/><path d="M8.5 13c1.5-3 3.5-5 7-6.5"/></svg>
          </span>
          <span class="font-display font-bold text-white text-lg">Fairdeal Trading</span>
        </a>
        <p class="text-sm leading-relaxed max-w-xs">Ayurvedic, Allopathic &amp; Generic wholesale distribution serving medical stores across Rampur, Uttar Pradesh.</p>
        <div class="flex gap-2.5 mt-5">
          <a href="https://wa.me/918603227530" target="_blank" rel="noopener" class="w-9 h-9 rounded-full bg-white/10 hover:bg-saffron-500 hover:text-brand-900 transition flex items-center justify-center" aria-label="Chat on WhatsApp" title="Chat on WhatsApp">
            <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.6L3 20l1-5.3A8.5 8.5 0 1 1 21 11.5Z"/><path d="M8.5 10.5c.4 2.5 2.3 4.4 4.8 4.8"/></svg>
          </a>
          <a href="tel:+918603227530" class="w-9 h-9 rounded-full bg-white/10 hover:bg-saffron-500 hover:text-brand-900 transition flex items-center justify-center" aria-label="Call the shop" title="Call the shop">
            <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15.5 17a13 13 0 0 1-8.5-8.5l2.4-1.6a1.4 1.4 0 0 0 .5-1.7L8.6 2.7A1.4 1.4 0 0 0 7 2 4.5 4.5 0 0 0 2.5 6.5C2.5 14.8 9.2 21.5 17.5 21.5A4.5 4.5 0 0 0 22 17a1.4 1.4 0 0 0-.7-1.6l-2.5-1.3a1.4 1.4 0 0 0-1.7.5Z"/></svg>
          </a>
          <a href="#" data-demo-toast="Demo preview — link your real Instagram profile here" class="w-9 h-9 rounded-full bg-white/10 hover:bg-saffron-500 hover:text-brand-900 transition flex items-center justify-center" aria-label="Instagram" title="Instagram">
            <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1"/></svg>
          </a>
          <a href="#" data-demo-toast="Demo preview — link your real Facebook page here" class="w-9 h-9 rounded-full bg-white/10 hover:bg-saffron-500 hover:text-brand-900 transition flex items-center justify-center" aria-label="Facebook" title="Facebook">
            <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 8.5h2.5V5.3c-.4-.06-1.9-.18-3.1-.18-3.1 0-4.9 1.83-4.9 5.2v2.6H5.3V16h3.2v8h3.4v-8h3.1l.5-3.1h-3.6v-2.2c0-.9.25-1.5 1.6-1.5Z"/></svg>
          </a>
        </div>
      </div>

      <div>
        <p class="font-display font-semibold text-white mb-4 text-sm tracking-wide uppercase">Quick Links</p>
        <ul class="space-y-2.5 text-sm">
          <li><a href="index.html" class="hover:text-saffron-400 transition">Home</a></li>
          <li><a href="catalog.html" class="hover:text-saffron-400 transition">Product Catalog</a></li>
          <li><a href="cart.html" class="hover:text-saffron-400 transition">Cart &amp; Checkout</a></li>
          <li><a href="dashboard.html" class="hover:text-saffron-400 transition">My Ledger</a></li>
          <li><a href="contact.html" class="hover:text-saffron-400 transition">Contact &amp; Support</a></li>
        </ul>
      </div>

      <div>
        <p class="font-display font-semibold text-white mb-4 text-sm tracking-wide uppercase">For Retailers</p>
        <ul class="space-y-2.5 text-sm">
          <li><a href="login.html" class="hover:text-saffron-400 transition">Register Your Shop</a></li>
          <li><a href="dashboard.html" class="hover:text-saffron-400 transition">Track My Orders</a></li>
          <li><a href="dashboard.html" class="hover:text-saffron-400 transition">Download Price List</a></li>
          <li><a href="dashboard.html" class="hover:text-saffron-400 transition">Raise Expiry Claim</a></li>
        </ul>
      </div>

      <div>
        <p class="font-display font-semibold text-white mb-4 text-sm tracking-wide uppercase">Contact</p>
        <ul class="space-y-3 text-sm">
          <li class="flex gap-2.5"><svg class="w-4 h-4 mt-0.5 shrink-0 text-saffron-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7-6.1-7-11a7 7 0 1 1 14 0c0 4.9-7 11-7 11Z"/><circle cx="12" cy="10" r="2.4"/></svg>Bazar Bazar, Civil Lines, Rampur, U.P. – 244901</li>
          <li class="flex gap-2.5"><svg class="w-4 h-4 mt-0.5 shrink-0 text-saffron-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15.5 17a13 13 0 0 1-8.5-8.5l2.4-1.6a1.4 1.4 0 0 0 .5-1.7L8.6 2.7A1.4 1.4 0 0 0 7 2 4.5 4.5 0 0 0 2.5 6.5C2.5 14.8 9.2 21.5 17.5 21.5A4.5 4.5 0 0 0 22 17a1.4 1.4 0 0 0-.7-1.6l-2.5-1.3a1.4 1.4 0 0 0-1.7.5Z"/></svg>+91 86032 27530</li>
          <li class="flex gap-2.5"><svg class="w-4 h-4 mt-0.5 shrink-0 text-saffron-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>fairdeal.rampur@gmail.com</li>
        </ul>
      </div>
    </div>
    <div class="border-t border-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
        <p>© <span data-year>2026</span> Fairdeal Trading Agency, Rampur (U.P.). All rights reserved.</p>
        <p>Design concept for review — not a live ordering system.</p>
      </div>
    </div>
  </div>`;
});
