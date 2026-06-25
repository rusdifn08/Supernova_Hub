import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const imageMappings: Record<string, string[]> = {
  "Sub-bab 1: Prinsip Superposisi Gerak X dan Y": [
    "![Lintasan Parabola Meriam](/images/parabola_cannon_1782375868028.png)"
  ],
  "Sub-bab 1: Konsep Posisi, Kecepatan, Percepatan Sudut": [
    "![Vektor Gerak Melingkar](/images/circular_motion_wheel_1782375877281.png)"
  ],
  "Sub-bab 3: Menggambar Diagram Benda Bebas (Free Body Diagram)": [
    "![Free Body Diagram Kotak](/images/newton_pushing_box_1782375888393.png)"
  ],
  "Sub-bab 3: Analisis Gerak pada Bidang Miring Kasar": [
    "![Balok di Bidang Miring](/images/inclined_plane_block_1782375899511.png)"
  ],
  "Sub-bab 1: Analisis Percepatan Mesin Atwood (Katrol Licin)": [
    "![Mesin Atwood Katrol](/images/atwood_machine_pulley_1782375917653.png)"
  ],
  "Sub-bab 3: Kendaraan Berbelok di Tikungan Datar dan Miring": [
    "![Mobil Balap di Tikungan Miring](/images/banked_curve_racecar_1782375928434.png)"
  ],
  "Sub-bab 2: Hukum Kekekalan Energi pada Roller Coaster & Bandul": [
    "![Energi Potensial Roller Coaster](/images/roller_coaster_energy_1782375941394.png)",
    "![Ayunan Bandul Pendulum](/images/swinging_pendulum_1782375952237.png)"
  ]
};

async function main() {
  const course = await prisma.course.findFirst({
    where: { title: "Physics for Beginners" }
  });

  if (!course) return;

  const modules = await prisma.courseModule.findMany({
    where: { courseId: course.id }
  });

  for (const mod of modules) {
    if (imageMappings[mod.title]) {
      let content = mod.contentMd;
      
      // Inject images after the first paragraph (usually after the first double newline)
      // or if not found, just append at the top below the title if title is in content.
      // Since our generated content doesn't have the title explicitly inside contentMd in parts 6-11
      // we can just prepend it right at the very beginning of the content.
      
      const imagesMd = imageMappings[mod.title].join('\\n\\n');
      
      // Prevent double injection
      if (!content.includes(imageMappings[mod.title][0])) {
        // Find the first paragraph break
        const firstBreakIdx = content.indexOf('\\n\\n');
        if (firstBreakIdx !== -1 && firstBreakIdx < 500) {
           content = content.substring(0, firstBreakIdx) + '\\n\\n' + imagesMd + content.substring(firstBreakIdx);
        } else {
           content = imagesMd + '\\n\\n' + content;
        }

        await prisma.courseModule.update({
          where: { id: mod.id },
          data: { contentMd: content }
        });
        console.log(`Injected images into: ${mod.title}`);
      }
    }
  }
}

main().finally(() => prisma.$disconnect());
