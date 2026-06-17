const { PrismaClient } = require("@prisma/client");
const data = require("./data/ililcemahalle");
const prisma = new PrismaClient();
async function main() {
  console.log("🌱 Seed başlıyor...");
  for (const il of data) {
    const ilId = parseInt(il.alpha_2_code.split("-")[1]);
    await prisma.il.create({
      data: {
        IlId: ilId,
        IlAdi: il.name,
        Ilceler: {
          create: il.towns.map((ilce) => ({
            IlceAdi: ilce.name,
            Mahalleler: {
              create: ilce.districts.flatMap((district) =>
                district.quarters.map((mahalle) => ({
                  MahalleAdi: mahalle.name,
                }))
              ),
            },
          })),
        },
      },
    });

    process.stdout.write(`\r  ⏳ ${il.name} eklendi...`);
  }

  console.log("\n✅ Seed tamamlandı!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());