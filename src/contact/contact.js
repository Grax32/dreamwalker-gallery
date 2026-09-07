const form = document.querySelector('[data-contact-form]');

if (form) {
  const submitButton = form.querySelector('button[type="submit"]');
  const status = form.querySelector('[data-form-status]');
  const success = document.querySelector('[data-contact-success]');
  const enquireAgainButton = success?.querySelector('[data-contact-enquire]');
  const backButton = success?.querySelector('[data-contact-back]');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.textContent = '';
    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      const result = await response.json().catch((error) => {
        console.error('Unable to parse contact form response as JSON.', error);
        return {};
      });

      if (!response.ok) {
        throw new Error(result.error || 'Unable to send your message. Please try again.');
      }

      form.reset();
      form.setAttribute('hidden', '');
      form.style.display = 'none';
      success?.removeAttribute('hidden');
      success?.focus();
    } catch (error) {
      status.textContent = error.message || 'Unable to send your message. Please try again.';
      status.dataset.state = 'error';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
    }
  });

  enquireAgainButton?.addEventListener('click', () => {
    success.setAttribute('hidden', '');
    form.removeAttribute('hidden');
    form.style.removeProperty('display');
    form.querySelector('input, textarea')?.focus();
  });

  backButton?.addEventListener('click', () => window.history.back());
}
