// Cart page — renders real cart contents from FD_CART, keeps totals live
// as quantities change, and runs a (simulated) checkout that clears the cart.

function fmt(n) {
  return '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function cartRowHTML({ id, qty, product }) {
  const lineTotal = product.ptr * qty;
  let schemeNote = '<span class="text-ink-300 text-xs">None</span>';
  if (product.scheme?.type === 'bogo') {
    const free = Math.floor(qty / product.scheme.freeEvery);
    schemeNote = free > 0
      ? `<span class="badge badge-scheme">${free} Free (${product.scheme.label})</span>`
      : `<span class="badge badge-outline">${product.scheme.label} at qty ${product.scheme.freeEvery}+</span>`;
  } else if (product.scheme?.type === 'percent') {
    schemeNote = `<span class="badge badge-outline">${product.scheme.label}</span>`;
  }
  return `
  <tr>
    <td>
      <div class="flex items-center gap-3">
        <span class="w-11 h-11 rounded-lg bg-brand-50 flex items-center justify-center text-lg shrink-0">${product.icon}</span>
        <div><p class="font-semibold">${product.name}</p><p class="text-xs text-ink-500">${product.brand} · Batch ${product.batch}</p></div>
      </div>
    </td>
    <td>
      <div class="stepper" data-stepper>
        <button data-action="dec" type="button">−</button>
        <input type="number" value="${qty}" min="1" data-cart-qty-input data-cart-id="${id}">
        <button data-action="inc" type="button">+</button>
      </div>
    </td>
    <td>₹${product.ptr.toFixed(2)}</td>
    <td>${schemeNote}</td>
    <td>12%</td>
    <td class="text-right font-semibold">₹${lineTotal.toFixed(2)}</td>
    <td class="text-right">
      <button data-remove-id="${id}" class="w-8 h-8 rounded-full hover:bg-red-50 text-red-500 inline-flex items-center justify-center transition" aria-label="Remove item">✕</button>
    </td>
  </tr>`;
}

function renderCart() {
  const lines = window.FD_CART.cartLines();
  const totals = window.FD_CART.cartTotals();

  const tableWrap = document.getElementById('cartTableWrap');
  const emptyEl = document.getElementById('cartEmpty');
  const rowsEl = document.getElementById('cartRows');
  const placeOrderBtn = document.getElementById('placeOrderBtn');

  if (!lines.length) {
    tableWrap?.classList.add('hidden');
    emptyEl?.classList.remove('hidden');
    if (placeOrderBtn) placeOrderBtn.disabled = true;
  } else {
    tableWrap?.classList.remove('hidden');
    emptyEl?.classList.add('hidden');
    if (rowsEl) rowsEl.innerHTML = lines.map(cartRowHTML).join('');
    if (placeOrderBtn) placeOrderBtn.disabled = false;
  }

  const set = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
  set('sumSubtotal', fmt(totals.subtotal));
  set('sumGST', fmt(totals.gst));
  set('sumGrandTotal', fmt(totals.grandTotal));

  const savingsRow = document.getElementById('sumSavingsRow');
  if (savingsRow) {
    if (totals.percentSavings > 0) {
      savingsRow.classList.remove('hidden');
      set('sumSavings', '− ' + fmt(totals.percentSavings));
    } else {
      savingsRow.classList.add('hidden');
    }
  }
  const bonusRow = document.getElementById('sumBonusRow');
  if (bonusRow) {
    if (totals.bogoFreeUnits > 0) {
      bonusRow.classList.remove('hidden');
      set('sumBonusUnits', totals.bogoFreeUnits);
    } else {
      bonusRow.classList.add('hidden');
    }
  }
}

document.addEventListener('DOMContentLoaded', renderCart);

/* Row quantity edits (typed directly into the stepper input) */
document.addEventListener('change', (e) => {
  if (e.target.matches('[data-cart-qty-input]')) {
    window.FD_CART.setCartQty(e.target.dataset.cartId, e.target.value);
    renderCart();
  }
});

document.addEventListener('click', (e) => {
  const removeBtn = e.target.closest('[data-remove-id]');
  if (removeBtn) {
    window.FD_CART.removeFromCart(removeBtn.dataset.removeId);
    renderCart();
    return;
  }

  if (e.target.closest('#placeOrderBtn')) {
    const lines = window.FD_CART.cartLines();
    if (!lines.length) {
      showToast('Your cart is empty — add some products first');
      return;
    }
    const paymentMode = document.querySelector('input[name="pay"]:checked');
    if (!paymentMode) {
      showToast('Please choose a payment mode');
      return;
    }
    const totals = window.FD_CART.cartTotals();
    const orderId = 'FD-' + Math.floor(10000 + Math.random() * 89999);

    document.getElementById('confirmOrderId').textContent = '#' + orderId;
    document.getElementById('confirmOrderTotal').textContent = fmt(totals.grandTotal);
    document.getElementById('confirmWhatsAppMsg').textContent =
      `"Namaste Gupta Medicos, your Order #${orderId} is confirmed. Amt: ${fmt(totals.grandTotal)}. Bill PDF is attached."`;

    window.FD_CART.clearCart();
    renderCart();

    const confirmSection = document.getElementById('confirm');
    confirmSection.classList.remove('hidden');
    confirmSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});
