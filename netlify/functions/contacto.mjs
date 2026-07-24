import { getStore } from '@netlify/blobs';

const jsonHeaders = {
  'content-type': 'application/json; charset=utf-8',
};

const requiredFields = ['nombre', 'email', 'asunto', 'mensaje'];

function createJsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: jsonHeaders,
  });
}

function clean(value) {
  return String(value || '').trim();
}

function escapeHtml(value) {
  return clean(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitizeContact(data) {
  return {
    nombre: clean(data.nombre),
    email: clean(data.email).toLowerCase(),
    telefono: clean(data.telefono),
    pais: clean(data.pais),
    asunto: clean(data.asunto),
    mensaje: clean(data.mensaje),
  };
}

function validateContact(contacto) {
  const missingFields = requiredFields.filter((field) => !contacto[field]);

  if (missingFields.length > 0) {
    return `Faltan campos obligatorios: ${missingFields.join(', ')}`;
  }

  if (!isValidEmail(contacto.email)) {
    return 'Ingresá un email válido.';
  }

  return null;
}

function buildUserEmailHtml(contacto) {
  return `
    <div style="font-family: Arial, sans-serif; color: #4c3129; line-height: 1.5;">
      <h1 style="color: #9C6657;">Recibimos tu consulta en CATfé</h1>
      <p>Hola ${escapeHtml(contacto.nombre)}, gracias por escribirnos.</p>
      <p>Registramos tu mensaje con el asunto:</p>
      <p><strong>${escapeHtml(contacto.asunto)}</strong></p>
      <p>El equipo de CATfé responderá tu consulta a la brevedad.</p>
      <p style="color: #5C9E92;"><strong>Equipo CATfé</strong></p>
    </div>
  `;
}

function buildInternalEmailHtml(contacto) {
  return `
    <div style="font-family: Arial, sans-serif; color: #4c3129; line-height: 1.5;">
      <h1 style="color: #9C6657;">Nueva consulta desde CATfé</h1>
      <p><strong>Nombre:</strong> ${escapeHtml(contacto.nombre)}</p>
      <p><strong>Email:</strong> ${escapeHtml(contacto.email)}</p>
      <p><strong>Teléfono:</strong> ${escapeHtml(contacto.telefono || '-')}</p>
      <p><strong>País:</strong> ${escapeHtml(contacto.pais || '-')}</p>
      <p><strong>Asunto:</strong> ${escapeHtml(contacto.asunto)}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${escapeHtml(contacto.mensaje).replace(/\n/g, '<br>')}</p>
    </div>
  `;
}

async function sendBrevoEmail({ to, subject, htmlContent, textContent, replyTo }) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || 'CATfé';

  if (!apiKey || !senderEmail) {
    throw new Error('Faltan variables de entorno para enviar emails.');
  }

  const body = {
    sender: {
      name: senderName,
      email: senderEmail,
    },
    to,
    subject,
    htmlContent,
    textContent,
  };

  if (replyTo) {
    body.replyTo = replyTo;
  }

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'api-key': apiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
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

  const contacto = sanitizeContact(body);
  const validationError = validateContact(contacto);

  if (validationError) {
    return createJsonResponse({ error: validationError }, 422);
  }

  await sendBrevoEmail({
    to: [{ email: contacto.email, name: contacto.nombre }],
    subject: 'Confirmación de consulta en CATfé',
    htmlContent: buildUserEmailHtml(contacto),
    textContent: `Hola ${contacto.nombre}, recibimos tu consulta en CATfé. Asunto: ${contacto.asunto}.`,
  });

  await sendBrevoEmail({
    to: [{ email: process.env.BREVO_SENDER_EMAIL, name: process.env.BREVO_SENDER_NAME || 'CATfé' }],
    subject: `Nueva consulta CATfé: ${contacto.asunto}`,
    htmlContent: buildInternalEmailHtml(contacto),
    textContent: `Nueva consulta de ${contacto.nombre} (${contacto.email}): ${contacto.mensaje}`,
    replyTo: { email: contacto.email, name: contacto.nombre },
  });

  const store = getStore({ name: 'contactos-catfe', consistency: 'strong' });
  const id = crypto.randomUUID();

  await store.setJSON(id, {
    id,
    ...contacto,
    creadaEn: new Date().toISOString(),
  });

  return createJsonResponse({ ok: true });
};
