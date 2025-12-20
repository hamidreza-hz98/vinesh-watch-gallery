import mongoose from "mongoose";
import Media from "@/server/modules/media/media.model.js"; // مسیر مدل خودت
import fs from "fs";

const BASE_URL = "https://vinesh-minio-01.chbk.dev/vinesh-watch";

const FILES = [
  "1766213752622-09a98a13c782e12a245930b4515d243b17734a33_1740299441.jpg",
  "1766053245360-5886441958832974990.jpg",
  "1766056444040-5920517885762056432.jpg",
  "1766056461090-Carlington_elite_analog_ladies_watch_CT_2007_roseblack.webp",
  "1766056640084-shopping.webp",
  "1766060154838-Citizen_logo_PNG6.png",
  "1766060829955-05.png",
  "1766061094195-05.png",
  "1766061511895-fabian-heimann-4R_WEmhx8og-unsplash.jpg",
  "1766061703593-amin-hasani-uDSMTV06s4U-unsplash.webp",
  "1766061729702-alvaro-bernal-RgIKRYhmG2k-unsplash.webp",
  "1766061754822-paul-cuoco-CO2vOhPqlrM-unsplash.webp",
  "1766063692224-Citizen_logo_PNG6.png",
  "1766063719760-Swatch_logo_PNG1 (1).png",
  "1766063749609-Hublot_logo_PNG1.png",
  "1766063772411-Seiko_logo_PNG1.png",
  "1766063800319-Omega_logo_PNG1.png",
  "1766063827881-Audemars_Piguet_logo_PNG6.png",
  "1766063848830-Rolex_logo_PNG1.png",
  "1766064698335-5886441958832974990.jpg",
  "1766064732892-Carlington_elite_analog_ladies_watch_CT_2007_roseblack.webp",
  "1766064778239-download (4).jpeg",
  "1766064822346-5920517885762056432.jpg",
  "1766064854903-download (5).jpeg",
  "1766064886552-5814314747670146188.jpg",
  "1766213250885-alexander-andrews-anUOLC3zMD4-unsplash.webp",
  "1766213704620-laurenz-heymann-al6s6JpnZis-unsplash.webp"
];


async function run() {
  await mongoose.connect(process.env.MONGO_URI);

  console.log("🧹 Deleting all media...");
  await Media.deleteMany({});

  console.log("📥 Loading old SEO data...");
  const oldMedia = JSON.parse(
    fs.readFileSync("./vinesh-watch.media.json", "utf8")
  );

  // Map filename => seo fields
  const seoMap = {};
  for (const item of oldMedia) {
    const cleanFilename = item.filename.replace(/^uploads\//, "");
    seoMap[cleanFilename] = item;
  }

  console.log("🚀 Bulk inserting...");
  const docs = FILES.map((filename) => {
    const seo = seoMap[filename] || {};

    return {
      filename,
      path: `${BASE_URL}/${filename}`,
      originalName: seo.originalName || filename,
      extension: filename.split(".").pop(),
      mimeType: seo.mimeType || "image/jpeg",
      size: seo.size || 0,

      title: seo.title || "",
      description: seo.description || "",
      seoTitle: seo.seoTitle || "",
      seoDescription: seo.seoDescription || "",
      seoKeywords: seo.seoKeywords || "",
      mediaAlt: seo.mediaAlt || "",
      mediaTitle: seo.mediaTitle || "",
      mediaCaption: seo.mediaCaption || "",
      mediaTranscript: seo.mediaTranscript || "",
    };
  });

  await Media.insertMany(docs);

  console.log("✅ Migration completed");
  process.exit();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
