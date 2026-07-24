import { getStore } from '@netlify/blobs';

const jsonHeaders = {
  'content-type': 'application/json; charset=utf-8',
};

function createJsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: jsonHeaders,
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function buildEmailHtml(email) {
  return `
    <div style="font-family: Arial, sans-serif; color: #4c3129; line-height: 1.5;">
      <h1 style="color: #9C6657;">Gracias por suscribirte a CATfé</h1>
      <p>Recibimos tu suscripción al newsletter con este email:</p>
      <p><strong>${email}</strong></p>
      <p>Te enviaremos novedades, descuentos especiales, información sobre la cafetería y noticias de adopciones.</p>
      <p style="color: #5C9E92;"><strong>Equipo CATfé</strong></p>
    </div>
  `;
}

async function sendWelcomeEmail(email) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || 'CATfé';

  if (!apiKey || !senderEmail) {
    throw new Error('Faltan variables de entorno para enviar emails.');
  }

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'api-key': apiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: {
        name: senderName,
        email: senderEmail,
      },
      to: [
        {
          email,
        },
      ],
      subject: 'Confirmación de suscripción a CATfé',
      htmlContent: buildEmailHtml(email),
      textContent: `Gracias por suscribirte a CATfé. Recibimos tu suscripción con el email ${email}.`,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || 'Brevo no pudo enviar el email.');
  }
}

export default async (request) => {
  if (request.method !== 'POST') {
    return createJsonResponse({ error: 'Método no permitido.' }, 405);
  }

  let body;

  try {
    body = await request.json();
  } catch (error) {
    return createJsonResponse({ error: 'El cuerpo de la solicitud debe ser JSON.' }, 400);
  }

  const email = String(body.email || '').trim().toLowerCase();

  if (!isValidEmail(email)) {
    return createJsonResponse({ error: 'Ingresá un email válido.' }, 422);
  }

  await sendWelcomeEmail(email);

  const store = getStore({ name: 'newsletter-catfe', consistency: 'strong' });

  await store.setJSON(email, {
    email,
    origen: 'newsletter-nosotros',
    creadaEn: new Date().toISOString(),
  });

  return createJsonResponse({ ok: true });
};
