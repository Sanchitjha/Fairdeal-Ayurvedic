// Contact / enquiry form — client-side validation + simulated send (no backend).

document.addEventListener('DOMContentLoaded', () => {
  const submitBtn = document.getElementById('contactSubmit');
  const name = document.getElementById('fldName');
  const shop = document.getElementById('fldShop');
  const phone = document.getElementById('fldPhone');
  const message = document.getElementById('fldMessage');
  if (!submitBtn) return;

  function showFieldError(input, msg) {
    clearFieldError(input);
    const err = document.createElement('p');
    err.className = 'text-xs text-red-600 mt-1.5 field-error';
    err.textContent = msg;
    input.insertAdjacentElement('afterend', err);
    input.classList.add('!border-red-400');
  }
  function clearFieldError(input) {
    input.classList.remove('!border-red-400');
    const next = input.nextElementSibling;
    if (next && next.classList.contains('field-error')) next.remove();
  }

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let valid = true;
    [name, shop, phone, message].forEach((input) => clearFieldError(input));

    if (!name.value.trim()) { showFieldError(name, 'Please enter your name.'); valid = false; }
    if (!shop.value.trim()) { showFieldError(shop, 'Please enter your shop name.'); valid = false; }
    if (!/^\d{10}$/.test(phone.value.trim())) { showFieldError(phone, 'Enter a valid 10-digit mobile number.'); valid = false; }
    if (!message.value.trim()) { showFieldError(message, 'Please add a short message.'); valid = false; }

    if (!valid) return;

    showToast("Message sent — we'll reply within a few hours");
    [name, shop, phone, message].forEach((input) => (input.value = ''));
  });
});
