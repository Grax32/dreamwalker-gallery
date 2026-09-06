const form = document.querySelector('[data-contact-form]');

if (form) {
  const submitButton = form.querySelector('button[type="submit"]');
  const status = form.querySelector('[data-form-status]');

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
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || 'Unable to send your message. Please try again.');
      }

      form.reset();
      status.textContent = 'Thanks—your message has been sent.';
      status.dataset.state = 'success';
    } catch (error) {
      status.textContent = error.message || 'Unable to send your message. Please try again.';
      status.dataset.state = 'error';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
    }
  });
}
