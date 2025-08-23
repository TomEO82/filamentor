// Temporary type shims to satisfy local IDE/linter without installing deps
// Runtime types are satisfied in Docker image where deps are installed

declare module 'fastify' {
  const Fastify: any;
  export default Fastify;
  export type FastifyReply = any;
}

declare module '@fastify/cors' {
  const cors: any;
  export default cors;
}

declare module 'crypto' {
  const crypto: any;
  export = crypto;
}

declare const process: any;

declare module '@prisma/client' {
  export class PrismaClient {
    constructor(...args: any[]);
    $connect(): Promise<void>;
    $disconnect(): Promise<void>;
    // minimal placeholders for used models; everything is any to satisfy editor
    material: any;
    spool: any;
    printer: any;
    job: any;
    jobItem: any;
    notification: any;
    request: any;
    vendor: any;
    purchaseOrder: any;
    inventoryItem: any;
    product: any;
    productMaterial: any;
    user: any;
  }
}

