const SENDER = { email: 'dreamwalker-gallery@vt-hub.win', name: 'DreamWalker Gallery Website' };
const RECIPIENT = 'dreamwalker-gallery-email@vt-hub.win';
const MAX_MESSAGE_LENGTH = 5000;

function json(body, status = 200) {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);
}

function clean(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname !== '/api/contact') {
      return env.ASSETS.fetch(request);
    }

    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed.' }, 405);
    }

    const origin = request.headers.get('Origin');
    if (origin && origin !== url.origin) {
      return json({ error: 'Invalid request origin.' }, 403);
    }

    let data;
    try {
      data = await request.formData();
    } catch {
      return json({ error: 'Please submit the form again.' }, 400);
    }

    if (clean(data.get('website'))) {
      return json({ ok: true }, 202);
    }

    const name = clean(data.get('name'));
    const email = clean(data.get('email'));
    const subject = clean(data.get('subject')).replace(/\s+/g, ' ');
    const message = clean(data.get('message'));

    if (!name || name.length > 100 || !isValidEmail(email) || !subject || subject.length > 160 || !message || message.length > MAX_MESSAGE_LENGTH) {
      return json({ error: 'Please complete every field with a valid message.' }, 400);
    }

    const text = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const html = `<p><strong>Name:</strong> ${escapeHtml(name)}<br><strong>Email:</strong> ${escapeHtml(email)}</p><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`;

    try {
      await env.EMAIL.send({
        to: RECIPIENT,
        from: SENDER,
        replyTo: email,
        subject: `Website contact: ${subject}`,
        text,
        html,
      });
    } catch (error) {
      console.error(JSON.stringify({ event: 'contact_email_failed', code: error?.code }));
      return json({ error: 'Unable to send your message right now. Please try again later.' }, 502);
    }

    return json({ ok: true }, 201);
  },
};
