// Mobile menu
const tog = document.getElementById('tog');
const menu = document.getElementById('menu');
if (tog && menu) {
  tog.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    tog.setAttribute('aria-expanded', open);
  });
}

// Contact page only
const form = document.getElementById('form');
if (form) {
  // "Request this test" buttons pass ?service=... in the link
  const svc = new URLSearchParams(location.search).get('service');
  const select = document.getElementById('s');
  if (svc && select) select.value = svc;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('send');
    const err = document.getElementById('err');
    if (err) err.style.display = 'none';

    // Opened as a plain file (local preview): nothing can be emailed,
    // so just show the thank-you page.
    if (location.protocol === 'file:') {
      location.href = 'thanks.html';
      return;
    }

    btn.textContent = 'Sending...';
    btn.disabled = true;
    try {
      const res = await fetch(form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/'), {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });
      if (!res.ok) throw new Error('send failed');
      location.href = 'thanks.html';   // success: go to the thank-you page
    } catch (_) {
      form.reset();
      btn.textContent = 'Submit request';
      btn.disabled = false;
      if (err) err.style.display = 'block';
    }
  });
}
