import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seed başlıyor...");

  await prisma.role.upsert({
    where: { Name: "user" },
    update: {},
    create: { Name: "user" },
  });

  await prisma.role.upsert({
    where: { Name: "admin" },
    update: {},
    create: { Name: "admin" },
  });

  console.log("Seed tamamlandı.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
