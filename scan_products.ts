
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Utilities
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRODUCT_DIR = path.resolve(__dirname, 'product');
const OUTPUT_FILE = path.resolve(__dirname, 'client/src/data/products-generated.json');

// Types
interface Product {
  slug: string;
  name: string;
  image?: string;
  catalog?: string;
  description?: string;
  features?: string[];
  applications?: string[];
  specs?: { param: string; value: string }[];
}

interface Series {
  slug: string;
  title: string;
  image?: string;
  catalog?: string;
  description?: string; // Series level description?
  products: Product[];
}

interface Subcategory {
  slug: string;
  name: string;
  series: Series[];
}

interface MainCategory {
  slug: string;
  name: string;
  subcategories: Subcategory[];
}

// Helpers
function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[&\\/\\#,+()$~%.'":*?<>{}]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function sortSeriesByNumber(seriesA: Series, seriesB: Series): number {
  // Extract leading number
  const numA = parseInt(seriesA.title.match(/^\d+/)?.[0] || '0', 10);
  const numB = parseInt(seriesB.title.match(/^\d+/)?.[0] || '0', 10);

  if (numA !== numB) {
    return numA - numB;
  }
  return seriesA.title.localeCompare(seriesB.title);
}

function parseTxtFile(content: string) {
  const lines = content.split('\n');
  const sections: {
    b: string[];
    d: string[];
    e: string[];
    f: string[];
  } = { b: [], d: [], e: [], f: [] };

  let currentSection: 'b' | 'd' | 'e' | 'f' | null = null;

  for (let line of lines) {
    const rawTrimmed = line.trim();
    if (!rawTrimmed) {
        // If inside b/d/e, we might want to preserve empty lines?
        // But markers need check from stripped line.
    }
    const lower = rawTrimmed.toLowerCase();

    // Check strict markers
    // b : description
    let isMarker = false;
    if (lower.match(/^[bdef]\s*:/)) {
       isMarker = true;
       if (lower.startsWith('b')) currentSection = 'b';
       else if (lower.startsWith('d')) currentSection = 'd';
       else if (lower.startsWith('e')) currentSection = 'e';
       else if (lower.startsWith('f')) currentSection = 'f';
       
       // Handle inline content after marker
       let contentAfter = line.substring(line.indexOf(':') + 1).trim();
       if (contentAfter) {
          // If it's 'description', skip it
          if (currentSection === 'b' && contentAfter.toLowerCase().startsWith('description')) {
             // skip
          } else if (currentSection === 'f' && contentAfter.includes('(')) {
             // e.g. "Technical Specifications ( Table )", ignore
          } else {
             if (currentSection) sections[currentSection].push(contentAfter);
          }
       }
       continue;
    }

    // Ignore junk markers e.g. "a :"
    if (lower.match(/^[acg-z]\s*:/)) {
      currentSection = null;
      continue;
    }

    if (!currentSection) continue;

    if (currentSection === 'b') {
       if (rawTrimmed) sections.b.push(rawTrimmed);
    } else if (currentSection === 'd' || currentSection === 'e') {
       // Bullets
       if (rawTrimmed) sections[currentSection].push(rawTrimmed);
    } else if (currentSection === 'f') {
       if (rawTrimmed) sections.f.push(line); // Keep original indentation logic possible
    }
  }

  // Process contents
  const description = sections.b.join('\n\n');

  const features = sections.d
    .map(l => l.replace(/^\*\s*/, '').trim())
    .filter(l => l.length > 0);

  const applications = sections.e
    .map(l => l.replace(/^\*\s*/, '').trim())
    .filter(l => l.length > 0);

  const specs: { param: string; value: string }[] = [];
  
  for (const line of sections.f) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Check if it's a bullet item "Key ... Value"
    // Remove leading "*" if present
    let clean = trimmed;
    if (clean.startsWith('*')) clean = clean.substring(1).trim();

    // Strategy 1: Split by Pipe "|"
    let parts = clean.split('|');
    let key = '';
    let val = '';
    let validSplit = false;

    if (parts.length >= 2) {
       key = parts[0].trim();
       val = parts.slice(1).join('|').trim();
       // remove trailing pipe
       if (val.endsWith('|')) val = val.slice(0, -1).trim();
       if (key && val) validSplit = true;
    }

    // Strategy 2: If no pipe, split by Tab or Multiple Spaces
    if (!validSplit) {
       // Regex: Split by 2+ spaces or 1+ tab
       parts = clean.split(/(\t|\s{2,})/);
       // parts will contain separators too if captured, filter them?
       const realParts = clean.split(/\t+|\s{2,}/).filter(p => p.trim().length > 0);
       
       if (realParts.length >= 2) {
          key = realParts[0].trim();
          val = realParts.slice(1).join(' ').trim();
          if (key && val) validSplit = true;
       }
    }

    if (validSplit) {
       specs.push({ param: key, value: val });
    } else {
       // Handle multi-line value or continuation
       // If the line has no split, and we have a previous spec, append it.
       // E.g. "Standard: 30C"
       if (specs.length > 0) {
          specs[specs.length - 1].value += '\n' + clean;
       } 
    }
  }

  return { description, features, applications, specs };
}

// Walk the directory
function scanDirectory(dir: string, rootRelative = ''): any {
  // We want to build the tree.
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  const files = entries.filter(e => e.isFile());
  const folders = entries.filter(e => e.isDirectory());

  const txtFiles = files.filter(f => f.name.endsWith('.txt'));
  
  if (txtFiles.length > 0) {
    // This directory is a detailed node containing one or more products (Series).
    
    const imageFiles = files.filter(f => f.name.match(/\.(jpg|jpeg|png|webp)$/i));
    const pdfFiles = files.filter(f => f.name.match(/\.pdf$/i));

    const getDigits = (str: string) => str.match(/\d+/g)?.join('') || '';

    const matchFile = (pName: string, fileList: import('fs').Dirent[]) => {
      if (fileList.length === 0) return undefined;
      // if (fileList.length === 1) return fileList[0]; // Wait, actually sometimes they all share one image, so this is good.
      const pDigits = getDigits(pName);
      for (const file of fileList) {
        const fBase = file.name.substring(0, file.name.lastIndexOf('.'));
        if (pDigits && getDigits(fBase) === pDigits) return file;
        const normP = pName.toLowerCase().replace(/[^a-z0-9]/g, '');
        const normF = fBase.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (normF.includes(normP) || normP.includes(normF)) return file;
      }
      return fileList[0]; // Fallback
    };

    const assetPathBase = `client/public/product_images`;
    if (!fs.existsSync(assetPathBase)) fs.mkdirSync(assetPathBase, { recursive: true });

    const productsInfo = txtFiles.map(txtFile => {
      const content = fs.readFileSync(path.join(dir, txtFile.name), 'utf-8');
      const parsed = parseTxtFile(content);
      const baseName = txtFile.name.replace('.txt', '');

      const imageFile = matchFile(baseName, imageFiles);
      const pdfFile = matchFile(baseName, pdfFiles);
      
      let publicImgPath = '';
      if (imageFile) {
         const src = path.join(dir, imageFile.name);
         const safeName = rootRelative.replace(/[\\/]/g, '_') + '_' + baseName + '_' + imageFile.name;
         const dest = path.join(assetPathBase, safeName);
         if (!fs.existsSync(dest)) fs.copyFileSync(src, dest);
         publicImgPath = `/product_images/${safeName}`;
      }
      
      let publicPdfPath = '';
      if (pdfFile) {
         const src = path.join(dir, pdfFile.name);
         const safeName = rootRelative.replace(/[\\/]/g, '_') + '_' + baseName + '_' + pdfFile.name;
         const dest = path.join(assetPathBase, safeName);
         if (!fs.existsSync(dest)) fs.copyFileSync(src, dest);
         publicPdfPath = `/product_images/${safeName}`;
      }

      return {
        name: baseName,
        data: parsed,
        img: publicImgPath,
        pdf: publicPdfPath
      };
    });

    return {
      isNode: true,
      seriesName: path.basename(dir), // e.g. "4S - Series"
      products: productsInfo
    };
  }

  // If no txt file, stick to recursion
  const children: any = {};
  for (const folder of folders) {
    const childPath = path.join(dir, folder.name);
    const childRelative = path.join(rootRelative, folder.name);
    const res = scanDirectory(childPath, childRelative);
    if (res) {
      children[folder.name] = res;
    }
  }
  
  // Return null if empty?
  if (Object.keys(children).length === 0) return null;
  return { isFolder: true, children };
}

// Convert Tree to Products Structure
function transformTree(tree: any): MainCategory[] {
  const categories: MainCategory[] = [];

  // Iterate top level keys (Main Categories)
  for (const mainKey in tree.children) {
    const mainNode = tree.children[mainKey];
    
    // Main Category Object
    const mainCat: MainCategory = {
      slug: toSlug(mainKey),
      name: mainKey,
      subcategories: []
    };

    // If mainNode is a Leaf (Files directly) - e.g. Motors
    if (mainNode.isNode) {
       // For leaf main categories (like Motors/MT), create a series without products
       // The series itself IS the product
       const firstProd = mainNode.products[0];
       const series: Series = {
         slug: toSlug(mainNode.seriesName + '-series'),
         title: mainNode.seriesName + ' Series', // e.g. "MT Series"
         image: firstProd?.img,
         catalog: firstProd?.pdf,
         description: firstProd?.data.description,
         products: [] // No child products - the series is the endpoint
       };
       
       // Attach features, applications, specs to the series for full detail rendering
       if (firstProd) {
         (series as any).features = firstProd.data.features;
         (series as any).applications = firstProd.data.applications;
         (series as any).specs = firstProd.data.specs;
       }

       const sub: Subcategory = {
         slug: 'general',
         name: 'General',
         series: [series]
       };
       
       mainCat.subcategories.push(sub);
    } 
    else if (mainNode.isFolder) {
       // Iterate Subcategories
       for (const subKey in mainNode.children) {
         const subNode = mainNode.children[subKey];
         
         const subCat: Subcategory = {
           slug: toSlug(subKey),
           name: subKey,
           series: []
         };

         if (subNode.isNode) {
             // Subcategory has files? -> Treat as Series
             const serBio: Series = {
                 slug: toSlug(subKey + '-series'),
                 title: subKey, // e.g. "4S - Series"
                 products: []
             };

             const firstProd = subNode.products[0];
             serBio.description = firstProd?.data.description;
             serBio.image = firstProd?.img;
             serBio.catalog = firstProd?.pdf;

             // Create a Product for each text file parsed
             for (const prodFile of subNode.products) {
               const p: Product = {
                  slug: toSlug(prodFile.name),
                  name: prodFile.name,
                  description: prodFile.data.description,
                  features: prodFile.data.features,
                  applications: prodFile.data.applications,
                  specs: prodFile.data.specs,
                  image: prodFile.img,
                  catalog: prodFile.pdf
               };
               serBio.products.push(p);
             }
             subCat.series.push(serBio);
         }
         else if (subNode.isFolder) {
            // Iterate Series
            for (const seriesKey in subNode.children) {
              const seriesNode = subNode.children[seriesKey];
              
              const serBio: Series = {
                 slug: toSlug(seriesKey),
                 title: seriesKey, // e.g. "4S Stainless Steel Submersible"
                 products: []
              };

              if (seriesNode.isNode) {
                 // This is the Leaf Series containing potential multiple products.
                 const firstProd = seriesNode.products[0];
                 
                 // Populate Series info based on the first product as a common denominator
                 serBio.description = firstProd?.data.description;
                 serBio.image = firstProd?.img;
                 serBio.catalog = firstProd?.pdf;

                 // Create a Product for each text file parsed
                 for (const prodFile of seriesNode.products) {
                   const p: Product = {
                      slug: toSlug(prodFile.name),
                      name: prodFile.name,
                      description: prodFile.data.description,
                      features: prodFile.data.features,
                      applications: prodFile.data.applications,
                      specs: prodFile.data.specs,
                      image: prodFile.img,
                      catalog: prodFile.pdf
                   };
                   serBio.products.push(p);
                 }
              }

              subCat.series.push(serBio);
            }
         }
         
         // SORT SERIES HERE
         subCat.series.sort(sortSeriesByNumber);
         
         mainCat.subcategories.push(subCat);
       }
    }
    
    categories.push(mainCat);
  }
  
  return categories;
}

// MAIN EXECUTION
console.log('Scanning products...');
if (!fs.existsSync(PRODUCT_DIR)) {
  console.error('Product directory not found:', PRODUCT_DIR);
  process.exit(1);
}

const tree = scanDirectory(PRODUCT_DIR);
// Tree is { isFolder: true, children: { ... } }

const data = transformTree(tree);

data.sort((a, b) => {
  if (a.name === 'Stainless Steel Submersible Pumps & Motors') return -1;
  if (b.name === 'Stainless Steel Submersible Pumps & Motors') return 1;
  if (a.name === 'Motors') return 1;
  if (b.name === 'Motors') return -1;
  return a.name.localeCompare(b.name);
});

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));
console.log(`Generated ${data.length} main categories to ${OUTPUT_FILE}`);
