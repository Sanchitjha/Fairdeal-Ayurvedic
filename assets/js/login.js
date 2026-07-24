// Retailer signup form — client-side validation only (no backend).

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

document.addEventListener('DOMContentLoaded', () => {
  const submitBtn = document.getElementById('signupSubmit');
  const shopName = document.getElementById('fldShopName');
  const dlNumber = document.getElementById('fldDL');
  const mobile = document.getElementById('fldMobile');
  if (!submitBtn) return;

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let valid = true;

    [shopName, dlNumber, mobile].forEach((input) => clearFieldError(input));

    if (!shopName.value.trim()) { showFieldError(shopName, 'Shop name is required.'); valid = false; }
    if (!dlNumber.value.trim()) { showFieldError(dlNumber, 'Drug Licence number is required.'); valid = false; }
    if (!/^\d{10}$/.test(mobile.value.trim())) { showFieldError(mobile, 'Enter a valid 10-digit mobile number.'); valid = false; }

    if (!valid) return;

    showToast('Registration submitted — verifying your Drug Licence');
    document.getElementById('pending').classList.remove('hidden');
    document.getElementById('pending').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
