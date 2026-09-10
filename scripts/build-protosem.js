import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, 'portfolio-content');
const OUTPUT_FILE = path.join(ROOT, 'src', 'content', 'protosem.json');
const PUBLIC_OUTPUT_FILE = path.join(ROOT, 'public', 'protosem-data.json');
const ASSET_ROOT = path.join(ROOT, 'public', 'assets', 'weekly');
const IMAGE_EXT = /\.(jpg|jpeg|png|gif|webp|svg|avif)$/i;

const cleanName = (name) => name.replace(/^\d+_/, '').replace(/[_-]+/g, ' ').trim();
const esc = (s) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');

function processMarkdown(raw, assetPrefix) {
  // Convert Obsidian image embeds into normal web paths.
  return raw.replace(/!\[\[(.*?)\]\]/g, (_, file) => `![${file}](${assetPrefix}/${encodeURIComponent(file)})`);
}

function compile() {
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.mkdirSync(ASSET_ROOT, { recursive: true });
  const weeks = [];

  for (let i = 0; i < 20; i++) {
    const weekId = `Week_${String(i).padStart(2, '0')}`;
    const weekDir = path.join(CONTENT_DIR, weekId);
    if (!fs.existsSync(weekDir)) continue;

    const days = [];
    const dayFolders = fs.readdirSync(weekDir, { withFileTypes: true })
      .filter(x => x.isDirectory())
      .map(x => x.name)
      .sort();

    for (const dayFolder of dayFolders) {
      const dayDir = path.join(weekDir, dayFolder);
      const files = fs.readdirSync(dayDir);
      const markdownFiles = files.filter(f => f.toLowerCase().endsWith('.md')).sort();
      const imageFiles = files.filter(f => IMAGE_EXT.test(f)).sort();
      if (!markdownFiles.length && !imageFiles.length) continue;

      const assetDir = path.join(ASSET_ROOT, weekId, dayFolder);
      fs.mkdirSync(assetDir, { recursive: true });
      for (const image of imageFiles) fs.copyFileSync(path.join(dayDir, image), path.join(assetDir, image));

      const assetPrefix = `assets/weekly/${weekId}/${dayFolder}`;
      let content = '';
      const linked = new Set();
      for (const md of markdownFiles) {
        let raw = fs.readFileSync(path.join(dayDir, md), 'utf8');
        const re = /!\[\[(.*?)\]\]/g;
        let m;
        while ((m = re.exec(raw))) linked.add(m[1]);
        content += processMarkdown(raw, assetPrefix).trim() + '\n\n';
      }
      const gallery = imageFiles.filter(x => !linked.has(x));
      days.push({
        id: dayFolder,
        name: cleanName(dayFolder),
        content: content.trim(),
        images: gallery.map(x => `${assetPrefix}/${encodeURIComponent(x)}`)
      });
    }

    weeks.push({ id: weekId, number: i, title: `Week ${i}`, days });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(weeks, null, 2));
  fs.writeFileSync(PUBLIC_OUTPUT_FILE, JSON.stringify(weeks, null, 2));
  console.log(`ProtoSem compiler: generated ${weeks.length} week(s).`);
}

compile();
