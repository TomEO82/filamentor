import { prisma } from './prisma.js';

async function main(){
  // Materials (common)
  const common = [
    { id:'mat-pla-black', name:'PLA - eSun - Black', brand:'eSun', color:'Black', hex:'#111111', diameter:'1.75', costPerKg:6500, sku:'ESUN-PLA-BLK-1KG' },
    { id:'mat-pla-white', name:'PLA - eSun - White', brand:'eSun', color:'White', hex:'#ffffff', diameter:'1.75', costPerKg:6500, sku:'ESUN-PLA-WHT-1KG' },
    { id:'mat-petg-black', name:'PETG - eSun - Black', brand:'eSun', color:'Black', hex:'#111111', diameter:'1.75', costPerKg:7500 },
    { id:'mat-abs-black', name:'ABS - Generic - Black', brand:'Generic', color:'Black', hex:'#111111', diameter:'1.75', costPerKg:7000 },
    { id:'mat-asa-black', name:'ASA - Generic - Black', brand:'Generic', color:'Black', hex:'#111111', diameter:'1.75', costPerKg:9000 },
    { id:'mat-tpu-black', name:'TPU - Generic - Black', brand:'Generic', color:'Black', hex:'#111111', diameter:'1.75', costPerKg:9500 },
  ];
  for (const m of common) {
    await prisma.material.upsert({ where: { id: m.id }, update: {}, create: m as any });
  }

  // Printer
  const printer = await prisma.printer.upsert({
    where: { id: 'seed-printer-p1s' },
    update: {},
    create: { id: 'seed-printer-p1s', name: 'Bambu P1S', model: 'P1S', volume: '256x256x256', nozzle: '0.4', slots: 4, hourlyRate: 3000 }
  });

  // Spools
  await prisma.spool.upsert({
    where: { id: 'seed-spool-1' },
    update: {},
    create: { id: 'seed-spool-1', materialId: 'mat-pla-black', lot: 'L001', tareG: 250, netG: 1000, remainingG: 900, color:'#111111', status: 'IN_STORAGE', location: 'Shelf A1' }
  });
  await prisma.spool.upsert({
    where: { id: 'seed-spool-2' },
    update: {},
    create: { id: 'seed-spool-2', materialId: 'mat-pla-black', lot: 'L002', tareG: 250, netG: 1000, remainingG: 300, color:'#111111', status: 'IN_USE', location: 'P1S / AMS1-S1' }
  });

  // Job
  const job = await prisma.job.upsert({
    where: { id: 'seed-job-1' },
    update: {},
    create: { id: 'seed-job-1', title: 'Phone Stand Batch', status: 'QUEUED', priority: 1 }
  });
  await prisma.jobItem.upsert({
    where: { id: 'seed-jobitem-1' },
    update: {},
    create: { id: 'seed-jobitem-1', jobId: job.id, qty: 10, materialId: 'mat-pla-black', gramsPlanned: 500 }
  });

  // Catalog product + materials
  const product = await prisma.product.upsert({ where: { id: 'seed-product-stand' }, update: {}, create: { id: 'seed-product-stand', name: 'Phone Stand', defaults: { color:'#111111' } } });
  await prisma.productMaterial.upsert({ where: { id:'seed-pm-1' }, update:{}, create: { id:'seed-pm-1', productId: product.id, materialId:'mat-pla-black', gramsPerUnit: 50 } });

  // Inventory items
  await prisma.inventoryItem.upsert({ where: { id:'inv-printer-1' }, update:{}, create:{ id:'inv-printer-1', category:'PRINTER', name:'Bambu P1S', qty:1, unit:'pcs', location:'Bench A' } });
  await prisma.inventoryItem.upsert({ where: { id:'inv-spare-nozzle' }, update:{}, create:{ id:'inv-spare-nozzle', category:'PRINTER_SPARE', name:'Nozzle 0.4', qty:5, unit:'pcs', location:'Drawer 1' } });
  await prisma.inventoryItem.upsert({ where: { id:'inv-pack-box' }, update:{}, create:{ id:'inv-pack-box', category:'PACKAGING', name:'Box 20x20x10', qty:20, unit:'pcs', location:'Shelf P2' } });
  await prisma.inventoryItem.upsert({ where: { id:'inv-general-bulb' }, update:{}, create:{ id:'inv-general-bulb', category:'GENERAL', name:'LED Bulb E27 9W', qty:10, unit:'pcs', location:'Cabinet' } });

  // Notifications
  await prisma.notification.create({ data: { category: 'INVENTORY', severity: 'WARN', sourceType: 'Spool', sourceId: 'seed-spool-2', title: 'Low spool', body: 'Spool seed-spool-2 below 300g' } });
  await prisma.notification.create({ data: { category: 'JOB', severity: 'INFO', sourceType: 'Job', sourceId: job.id, title: 'Job queued', body: 'Phone Stand Batch is queued' } });
}

main().then(()=>{ console.log('Seed done'); process.exit(0); }).catch((e)=>{ console.error(e); process.exit(1); });

