import { getStore } from '@netlify/blobs';

const jsonHeaders = {
  'content-type': 'application/json; charset=utf-8',
};

const requiredFields = ['nombre', 'email', 'telefono', 'fecha', 'horario', 'sucursal', 'motivo'];

function createJsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: jsonHeaders,
  });
}

function sanitizeReservation(data) {
  const reservation = {};

  requiredFields.forEach((field) => {
    reservation[field] = String(data[field] || '').trim();
  });

  reservation.gato = String(data.gato || '').trim();
  reservation.comentarios = String(data.comentarios || '').trim();

  return reservation;
}

function validateReservation(reservation) {
  const missingFields = requiredFields.filter((field) => !reservation[field]);

  if (missingFields.length > 0) {
    return `Faltan campos obligatorios: ${missingFields.join(', ')}`;
  }

  if (!reservation.email.includes('@')) {
    return 'El email no tiene un formato valido.';
  }

  return null;
}

async function listReservations(store) {
  const { blobs } = await store.list({ consistency: 'strong' });
  const reservations = await Promise.all(
    blobs.map(async (blob) => store.get(blob.key, { type: 'json', consistency: 'strong' }))
  );

  return reservations
    .filter(Boolean)
    .sort((a, b) => new Date(b.creadaEn) - new Date(a.creadaEn));
}

export default async (request) => {
  const store = getStore({ name: 'reservas-catfe', consistency: 'strong' });

  if (request.method === 'GET') {
    const reservas = await listReservations(store);
    return createJsonResponse({ reservas });
  }

  if (request.method === 'POST') {
    let body;

    try {
      body = await request.json();
    } catch (error) {
      return createJsonResponse({ error: 'El cuerpo de la solicitud debe ser JSON.' }, 400);
    }

    const reserva = sanitizeReservation(body);
    const validationError = validateReservation(reserva);

    if (validationError) {
      return createJsonResponse({ error: validationError }, 422);
    }

    const id = crypto.randomUUID();
    const savedReservation = {
      id,
      ...reserva,
      estado: 'pendiente',
      creadaEn: new Date().toISOString(),
    };

    await store.setJSON(id, savedReservation);

    return createJsonResponse({ reserva: savedReservation }, 201);
  }

  return createJsonResponse({ error: 'Metodo no permitido.' }, 405);
};
