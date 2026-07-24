// Product detail page — renders whichever product is in the ?id= query
// param (falls back to Liv.52). Previously every catalog card linked to
// the same static page that always showed Liv.52, regardless of which
// product was clicked — this fixes that.

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const requestedId = params.get('id');
  const product = (requestedId && window.PRODUCTS[requestedId]) || window.PRODUCTS['liv52-syrup'];

  document.title = `${product.name} | Fairdeal Trading Agency`;

  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  setText('pdBreadcrumb', product.name);
  setText('pdName', product.name);
  setText('pdBrand', product.brand);
  setText('pdIconBig', product.icon);
  setText('pdIconThumb', product.icon);
  setText('pdMRP', '₹' + product.mrp.toFixed(2));
  setText('pdPTR', '₹' + product.ptr.toFixed(2));
  setText('pdPTS', '₹' + product.pts.toFixed(2));
  setText('pdPack', product.name.match(/\(([^)]+)\)/)?.[1] || 'Standard Pack');
  setText('pdBatch', product.batch);
  setText('pdExpiry', product.expiry);
  setText('pdBatchBatch', product.batch);
  setText('pdBatchExpiry', product.expiry);
  setText('pdDescription', `${product.name} is a trusted wholesale product from ${product.brand}, among the fastest-moving SKUs across Fairdeal's retailer network. Tracked under batch ${product.batch}, it ships with full GST documentation and ${product.scheme ? `qualifies for the standing ${product.scheme.label} scheme.` : 'standard wholesale pricing.'}`);

  const cornerBadge = document.getElementById('pdSchemeCorner');
  const schemeBox = document.getElementById('pdSchemeBox');
  if (product.scheme) {
    cornerBadge.textContent = product.scheme.label;
    cornerBadge.classList.remove('hidden');
    schemeBox.classList.remove('hidden');
    setText('pdSchemeTitle', `Scheme Active: ${product.scheme.label}`);
    setText('pdSchemeDesc', product.scheme.type === 'bogo'
      ? `Automatically applied — order in multiples of ${product.scheme.freeEvery} to receive bonus free units at checkout.`
      : `Automatically applied as a price reduction at checkout.`);
  } else {
    cornerBadge.classList.add('hidden');
    schemeBox.classList.add('hidden');
  }

  const addBtn = document.getElementById('pdAddBtn');
  if (addBtn) addBtn.dataset.addToCart = product.id;

  const related = window.PRODUCT_LIST.filter((p) => p.id !== product.id).slice(0, 4);
  const relatedGrid = document.getElementById('relatedGrid');
  if (relatedGrid) {
    relatedGrid.innerHTML = related.map((p) => `
      <a href="product.html?id=${p.id}" class="reveal is-visible card card-hover p-5 flex flex-col">
        <span class="w-14 h-14 rounded-xl bg-brand-50 text-2xl flex items-center justify-center mb-4">${p.icon}</span>
        <p class="font-semibold text-sm">${p.name}</p>
        <p class="text-xs text-ink-500 mb-3">PTR ₹${p.ptr.toFixed(2)}</p>
        <button data-add-to-cart="${p.id}" class="btn btn-primary btn-sm mt-auto">+ Add</button>
      </a>`).join('');
  }
});
