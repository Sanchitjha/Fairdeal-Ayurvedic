// Catalog page — live search, category/company filters and sort.
// The desktop sidebar and mobile drawer are the SAME #filterPanel element
// (shown/hidden responsively via CSS), so there is only ever one set of
// checkboxes to keep in sync — no duplicate-state bugs.

function productCardHTML(p) {
  const badge = p.scheme
    ? `<span class="badge ${p.scheme.type === 'bogo' ? 'badge-scheme' : 'badge-outline'}">${p.scheme.label}</span>`
    : `<span class="badge badge-green">In Stock</span>`;
  return `
  <a href="product.html?id=${p.id}" class="reveal is-visible card card-hover p-5 flex flex-col">
    <div class="flex items-center justify-between mb-4">
      <span class="w-16 h-16 rounded-xl bg-brand-50 text-3xl flex items-center justify-center">${p.icon}</span>
      ${badge}
    </div>
    <p class="font-semibold">${p.name}</p>
    <p class="text-xs text-ink-500 mb-3">${p.brand} · Batch ${p.batch} · Exp ${p.expiry}</p>
    <div class="mt-auto flex items-end justify-between">
      <div><p class="text-[11px] text-ink-500">PTR / MRP</p><p class="font-display font-bold text-brand-800">₹${p.ptr.toFixed(2)} <span class="text-ink-300 font-normal line-through text-xs">₹${p.mrp}</span></p></div>
      <button data-add-to-cart="${p.id}" class="btn btn-primary btn-sm !px-3.5">+ Add</button>
    </div>
  </a>`;
}

function getFilters() {
  const cats = Array.from(document.querySelectorAll('[data-filter-cat]:checked')).map((el) => el.value);
  const companies = Array.from(document.querySelectorAll('[data-filter-company]:checked')).map((el) => el.value);
  const schemeOnly = document.querySelector('[data-filter-scheme-only]')?.checked || false;
  const search = (document.getElementById('catalogSearch')?.value || '').trim().toLowerCase();
  const sort = document.getElementById('catalogSort')?.value || 'popular';
  return { cats, companies, schemeOnly, search, sort };
}

function renderCatalog() {
  const { cats, companies, schemeOnly, search, sort } = getFilters();
  let list = window.PRODUCT_LIST.slice();

  if (cats.length) list = list.filter((p) => cats.includes(p.category));
  if (companies.length) list = list.filter((p) => companies.includes(p.company));
  if (schemeOnly) list = list.filter((p) => !!p.scheme);
  if (search) list = list.filter((p) => p.name.toLowerCase().includes(search) || p.brand.toLowerCase().includes(search));

  if (sort === 'price-asc') list.sort((a, b) => a.ptr - b.ptr);
  else if (sort === 'price-desc') list.sort((a, b) => b.ptr - a.ptr);
  else if (sort === 'name-asc') list.sort((a, b) => a.name.localeCompare(b.name));

  const grid = document.getElementById('catalogGrid');
  const count = document.getElementById('resultsCount');
  if (count) count.textContent = `Showing ${list.length} of ${window.PRODUCT_LIST.length} products`;
  if (!grid) return;

  if (!list.length) {
    grid.innerHTML = `<div class="col-span-full text-center py-16 text-ink-500">
      <p class="text-3xl mb-3">🔍</p>
      <p class="font-semibold text-ink-900">No products match your filters</p>
      <p class="text-sm mt-1">Try clearing a filter or searching a different term.</p>
    </div>`;
    return;
  }
  grid.innerHTML = list.map(productCardHTML).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderCatalog();

  document.querySelectorAll('[data-filter-cat], [data-filter-company], [data-filter-scheme-only]').forEach((el) => {
    el.addEventListener('change', renderCatalog);
  });
  document.getElementById('catalogSearch')?.addEventListener('input', renderCatalog);
  document.getElementById('catalogSort')?.addEventListener('change', renderCatalog);

  document.getElementById('resetFilters')?.addEventListener('click', () => {
    document.querySelectorAll('[data-filter-cat], [data-filter-company], [data-filter-scheme-only]').forEach((el) => (el.checked = false));
    const search = document.getElementById('catalogSearch');
    const sortEl = document.getElementById('catalogSort');
    if (search) search.value = '';
    if (sortEl) sortEl.value = 'popular';
    renderCatalog();
  });
});
