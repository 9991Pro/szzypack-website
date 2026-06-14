import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const RAW_DIR = path.resolve("assets/images/raw");
const PUBLIC_DIR = path.resolve("public/images");

interface ImageConfig {
  directory: string;
  widths: number[];
}

const CONFIG: ImageConfig[] = [
  { directory: "products", widths: [400, 800] },
  { directory: "factory", widths: [400, 800, 1200] },
  { directory: "blog", widths: [400, 800] },
  { directory: "og", widths: [1200] },
];

async function optimizeImage(
  inputPath: string,
  outputDir: string,
  widths: number[],
): Promise<void> {
  const ext = path.extname(inputPath).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return;

  const name = path.basename(inputPath, ext);

  for (const width of widths) {
    const outputPath = path.join(outputDir, `${name}-${width}w.webp`);

    const metadata = await sharp(inputPath).metadata();
    const effectiveWidth = Math.min(width, metadata.width ?? width);

    await sharp(inputPath)
      .resize(effectiveWidth, undefined, { withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(outputPath);

    console.log(`  -> ${path.relative(PUBLIC_DIR, outputPath)}`);
  }
}

async function main(): Promise<void> {
  console.log("SZZYPack Image Optimizer\n");

  await fs.mkdir(PUBLIC_DIR, { recursive: true });

  for (const { directory, widths } of CONFIG) {
    const rawDir = path.join(RAW_DIR, directory);
    const outputDir = path.join(PUBLIC_DIR, directory);

    let files: string[];
    try {
      files = await fs.readdir(rawDir);
    } catch {
      console.log(`  [skip] ${directory} — no raw images found`);
      continue;
    }

    await fs.mkdir(outputDir, { recursive: true });
    console.log(`Processing ${directory}/ (${files.length} images):`);

    for (const file of files) {
      const inputPath = path.join(rawDir, file);
      const stat = await fs.stat(inputPath);
      if (stat.isFile()) {
        await optimizeImage(inputPath, outputDir, widths);
      }
    }
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
