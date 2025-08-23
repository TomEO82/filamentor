import Fastify, { FastifyReply } from 'fastify';
import cors from '@fastify/cors';
import { prisma } from './prisma.js';
import crypto from 'crypto';

const PORT = parseInt(process.env.PORT || '8000', 10);
const server = Fastify({ logger: true });

await server.register(cors, { origin: true });

server.get('/health', async () => ({ ok: true }));

// Simple auth bootstrap and endpoints (TEMP for MVP)
async function ensureAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const adminPass = process.env.ADMIN_PASSWORD || 'admin123';
  const hash = crypto.createHash('sha256').update(adminPass).digest('hex');
  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existing) {
    await prisma.user.create({ data: { email: adminEmail, passwordHash: hash, role: 'ADMIN', name: 'Admin' } });
  }
}

server.post('/auth/login', async (req: any, reply: FastifyReply) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) return reply.code(400).send({ error: 'email/password required' });
  const user = await prisma.user.findUnique({ where: { email } });
  const hash = crypto.createHash('sha256').update(password).digest('hex');
  if (!user || user.passwordHash !== hash) return reply.code(401).send({ error: 'invalid credentials' });
  // Issue dumb token (not JWT) for MVP demo only
  const token = crypto.randomBytes(16).toString('hex');
  return { token, user: { id: user.id, email: user.email, role: user.role, name: user.name } };
});

// Materials
server.get('/materials', async () => {
  return prisma.material.findMany({ orderBy: { name: 'asc' } });
});
server.post('/materials', async (req: any) => {
  const body = req.body ?? {};
  return prisma.material.create({ data: body });
});

// Spools
server.get('/spools', async (req: any) => {
  const { status, materialId, q } = req.query ?? {};
  return prisma.spool.findMany({
    where: {
      status: status as any,
      materialId: materialId as string | undefined,
      OR: q
        ? [
            { lot: { contains: q, mode: 'insensitive' } },
            { location: { contains: q, mode: 'insensitive' } },
          ]
        : undefined,
    },
    include: { material: true },
    orderBy: { createdAt: 'desc' },
  });
});
server.post('/spools', async (req: any) => prisma.spool.create({ data: req.body }));
server.get('/spools/:id', async (req: any) => prisma.spool.findUnique({ where: { id: req.params.id }, include: { material: true } }));
server.patch('/spools/:id', async (req: any) =>
  prisma.spool.update({ where: { id: req.params.id }, data: req.body })
);
server.post('/spools/:id/events', async (req: any) => {
  const { type, grams, location } = req.body ?? {};
  const id = req.params.id as string;
  if (type === 'use' && typeof grams === 'number') {
    const sp = await prisma.spool.update({
      where: { id },
      data: { remainingG: { decrement: grams } },
    });
    return sp;
  }
  if (type === 'adjust' && typeof grams === 'number') {
    return prisma.spool.update({ where: { id }, data: { remainingG: grams } });
  }
  if (type === 'move' && typeof location === 'string') {
    return prisma.spool.update({ where: { id }, data: { location } });
  }
  return { ok: false };
});

// Printers
server.get('/printers', async () => prisma.printer.findMany({ orderBy: { createdAt: 'desc' } }));
server.post('/printers', async (req: any) => prisma.printer.create({ data: req.body }));

// Jobs
server.get('/jobs', async () => prisma.job.findMany({ orderBy: { createdAt: 'desc' } }));
server.post('/jobs', async (req: any) => {
  const body = req.body ?? {};
  const items = Array.isArray(body.items) ? { create: body.items } : body.items;
  return prisma.job.create({ data: { ...body, items } });
});
server.get('/jobs/:id', async (req: any) => prisma.job.findUnique({ where: { id: req.params.id } }));
server.patch('/jobs/:id', async (req: any) => prisma.job.update({ where: { id: req.params.id }, data: req.body }));

// Pricing/quote (simple): material + machine + overhead
server.post('/jobs/:id/quote', async (req: any) => {
  const { gramsUsed = 0, hours = 0, overheadCents = 0, materialId, printerId } = req.body ?? {};
  const material = materialId ? await prisma.material.findUnique({ where: { id: materialId } }) : null;
  const printer = printerId ? await prisma.printer.findUnique({ where: { id: printerId } }) : null;
  const materialCost = material ? Math.round((gramsUsed * material.costPerKg) / 1000) : 0;
  const machineCost = printer?.hourlyRate ? Math.round(hours * printer.hourlyRate) : 0;
  const total = materialCost + machineCost + (overheadCents || 0);
  return { currency: 'ILS', materialCost, machineCost, overheadCents: overheadCents || 0, total };
});

server.post('/jobs/preview-quote', async (req: any) => {
  const { gramsUsed = 0, hours = 0, overheadCents = 0, materialId, printerId } = req.body ?? {};
  const material = materialId ? await prisma.material.findUnique({ where: { id: materialId } }) : null;
  const printer = printerId ? await prisma.printer.findUnique({ where: { id: printerId } }) : null;
  const materialCost = material ? Math.round((gramsUsed * material.costPerKg) / 1000) : 0;
  const machineCost = printer?.hourlyRate ? Math.round(hours * printer.hourlyRate) : 0;
  const total = materialCost + machineCost + (overheadCents || 0);
  return { currency: 'ILS', materialCost, machineCost, overheadCents: overheadCents || 0, total };
});

// Notifications
server.get('/notifications', async (req: any) => {
  const { status, category, severity } = req.query ?? {};
  return prisma.notification.findMany({ where: { status, category, severity }, orderBy: { createdAt: 'desc' } });
});
server.post('/notifications', async (req: any) => prisma.notification.create({ data: req.body }));
server.patch('/notifications/:id', async (req: any) =>
  prisma.notification.update({ where: { id: req.params.id }, data: req.body })
);

// Requests
server.get('/requests', async () => prisma.request.findMany({ orderBy: { createdAt: 'desc' }, include: { items: true } }));
server.post('/requests', async (req: any) => prisma.request.create({ data: { ...req.body, items: { create: req.body.items ?? [] } } }));
server.get('/requests/:id', async (req: any) => prisma.request.findUnique({ where: { id: req.params.id }, include: { items: true } }));
server.patch('/requests/:id', async (req: any) => prisma.request.update({ where: { id: req.params.id }, data: req.body }));

// Vendors & POs
server.get('/vendors', async () => prisma.vendor.findMany({ orderBy: { name: 'asc' } }));
server.post('/vendors', async (req: any) => prisma.vendor.create({ data: req.body }));
server.get('/pos', async () => prisma.purchaseOrder.findMany({ include: { items: true, vendor: true }, orderBy: { orderedAt: 'desc' } }));
server.post('/pos', async (req: any) => prisma.purchaseOrder.create({ data: { ...req.body, items: { create: req.body.items ?? [] } } }));
server.patch('/pos/:id', async (req: any) => prisma.purchaseOrder.update({ where: { id: req.params.id }, data: req.body }));

// Products (Catalog)
server.get('/products', async () => prisma.product.findMany({ include: { materials: { include: { material: true } } } }));
server.post('/products', async (req: any) => prisma.product.create({ data: req.body }));
server.get('/products/:id', async (req: any) => prisma.product.findUnique({ where: { id: req.params.id }, include: { materials: { include: { material: true } } } }));
server.patch('/products/:id', async (req: any) => prisma.product.update({ where: { id: req.params.id }, data: req.body }));
server.delete('/products/:id', async (req: any) => prisma.product.delete({ where: { id: req.params.id } }));

// Inventory
server.get('/inventory', async (req: any) => {
  const { category } = req.query ?? {};
  return prisma.inventoryItem.findMany({ where: { category: category as any | undefined }, orderBy: { name: 'asc' } });
});
server.post('/inventory', async (req: any) => prisma.inventoryItem.create({ data: req.body }));
server.patch('/inventory/:id', async (req: any) => prisma.inventoryItem.update({ where: { id: req.params.id }, data: req.body }));
server.delete('/inventory/:id', async (req: any) => prisma.inventoryItem.delete({ where: { id: req.params.id } }));

try {
  await ensureAdmin();
  await server.listen({ host: '0.0.0.0', port: PORT });
  server.log.info(`API listening on :${PORT}`);
} catch (err) {
  server.log.error(err);
  process.exit(1);
}

