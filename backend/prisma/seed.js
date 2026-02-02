import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1) Crear salón
  const salon = await prisma.salon.create({
    data: {
      name: "Meraki Nails",
      country: "Costa Rica",
      timezone: "America/Costa_Rica",
    },
  });

  // 2) Crear cabinas
  await prisma.cabin.createMany({
    data: [
      { salonId: salon.id, name: "Cabina 1" },
      { salonId: salon.id, name: "Cabina 2" },
    ],
  });

  // 3) Crear servicios (ejemplo — luego afinamos)
  await prisma.service.createMany({
    data: [
      {
        salonId: salon.id,
        category: "Manicure",
        name: "Manicure básico",
        priceCrc: 8000,
        durationMin: 60,
      },
      {
        salonId: salon.id,
        category: "Manicure",
        name: "Manicure con diseño",
        priceCrc: 12000,
        durationMin: 90,
      },
      {
        salonId: salon.id,
        category: "Pedicure",
        name: "Pedicure spa",
        priceCrc: 15000,
        durationMin: 90,
      },
    ],
  });

  console.log("Seed completado ✔️");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
