// Types for the product hierarchy
export interface Product {
  slug: string;
  name: string;
  image?: string;
  catalog?: string;
  description?: string;
  features?: string[];
  applications?: string[];
  specs?: { param: string; value: string }[];
}

export interface Series {
  slug: string;
  title: string;
  image?: string;
  description?: string;
  catalog?: string;
  products: Product[];
}

export interface Subcategory {
  slug: string;
  name: string;
  description?: string;
  comingSoon?: boolean;
  series: Series[];
}

export interface MainCategory {
  slug: string;
  name: string;
  description: string;
  subcategories: Subcategory[];
}

// Helper to create slugs
function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Main product data structure
export const mainCategories: MainCategory[] = [
  {
    slug: 'stainless-steel-submersible-pumps-motors',
    name: 'Stainless Steel Submersible Pumps & Motors',
    description: 'High-quality stainless steel submersible pumps and motors for demanding applications.',
    subcategories: [
      {
        slug: 'submersible-pump-ends',
        name: 'Submersible Pump Ends',
        description: 'S-Series stainless steel submersible pump ends for deep well applications.',
        series: [
          {
            slug: '4s-series',
            title: '4S Series',
            image: '/images/submersible-pump.jpg',
            description: 'Compact 4-inch stainless steel submersible pump ends for residential and light commercial use.',
            products: []
          },
          {
            slug: '6s-series',
            title: '6S Series',
            image: '/images/submersible-pump.jpg',
            description: '6-inch stainless steel submersible pump ends for agricultural and industrial applications.',
            products: []
          },
          {
            slug: '8s-series',
            title: '8S Series',
            image: '/images/submersible-pump.jpg',
            description: '8-inch high-capacity stainless steel submersible pump ends.',
            products: []
          },
          {
            slug: '10s-series',
            title: '10S Series',
            image: '/images/submersible-pump.jpg',
            description: '10-inch heavy-duty stainless steel submersible pump ends for high flow applications.',
            products: []
          },
          {
            slug: '12s-series',
            title: '12S Series',
            image: '/images/submersible-pump.jpg',
            description: '12-inch industrial stainless steel submersible pump ends for maximum capacity.',
            products: []
          }
        ]
      },
      {
        slug: 'submersible-motors',
        name: 'Submersible Motors',
        description: 'TA-TB Series submersible motors built to NEMA standards.',
        series: [
          {
            slug: '4ta-series',
            title: '4TA Series',
            image: '/images/submersible-pump.jpg',
            description: '4-inch submersible motors for small to medium applications.',
            products: []
          },
          {
            slug: '6ta-series',
            title: '6TA Series',
            image: '/images/submersible-pump.jpg',
            description: '6-inch submersible motors for agricultural and industrial use.',
            products: []
          },
          {
            slug: '8tb-series',
            title: '8TB Series',
            image: '/images/submersible-pump.jpg',
            description: '8-inch heavy-duty submersible motors.',
            products: []
          },
          {
            slug: '10tb-series',
            title: '10TB Series',
            image: '/images/submersible-pump.jpg',
            description: '10-inch high-power submersible motors.',
            products: []
          },
          {
            slug: '12tb-series',
            title: '12TB Series',
            image: '/images/submersible-pump.jpg',
            description: '12-inch industrial submersible motors for maximum power.',
            products: []
          }
        ]
      },
      {
        slug: 'wastewater-submersible-pumps',
        name: 'Wastewater Submersible Pumps',
        description: 'Submersible pumps designed for wastewater and sewage applications.',
        comingSoon: true,
        series: []
      }
    ]
  },
  {
    slug: 'multistage-pumps',
    name: 'Multistage Pumps',
    description: 'Vertical and horizontal multistage pumps for high-pressure applications.',
    subcategories: [
      {
        slug: 'vertical-multistage-pumps',
        name: 'Vertical Multistage Pumps',
        description: 'Space-saving vertical multistage pumps for high-pressure water systems.',
        series: [
          {
            slug: 'cdl-cdlf-series',
            title: 'CDL / CDLF Series',
            image: '/images/multistage-pump.jpg',
            description: 'Vertical multistage centrifugal pumps with stainless steel construction.',
            products: []
          },
          {
            slug: 'gmvb-series',
            title: 'GMVB Series',
            image: '/images/multistage-pump.jpg',
            description: 'High-efficiency vertical multistage booster pumps.',
            products: []
          }
        ]
      },
      {
        slug: 'horizontal-multistage-centrifugal-pumps',
        name: 'Horizontal Multistage Centrifugal Pumps',
        description: 'Horizontal multistage pumps for industrial and commercial applications.',
        series: [
          {
            slug: 'gm-series',
            title: 'GM Series',
            image: '/images/multistage-pump.jpg',
            description: 'Horizontal multistage centrifugal pumps for high-pressure applications.',
            products: []
          }
        ]
      }
    ]
  },
  {
    slug: 'motors',
    name: 'Motors',
    description: 'High-efficiency industrial motors for various applications.',
    subcategories: [
      {
        slug: 'ac-induction-motors',
        name: 'A.C. Induction Motors',
        description: 'Robust A.C. induction motors for industrial applications.',
        series: [
          {
            slug: 'mt-series',
            title: 'MT Series (2-Pole / 4-Pole)',
            image: '/images/submersible-pump.jpg',
            description: 'High-efficiency MT Series A.C. induction motors available in 2-pole and 4-pole configurations.',
            products: []
          }
        ]
      }
    ]
  }
];

// Helper functions to find items by slug
export function findMainCategory(slug: string): MainCategory | undefined {
  return mainCategories.find(c => c.slug === slug);
}

export function findSubcategory(mainCategorySlug: string, subcategorySlug: string): { mainCategory: MainCategory; subcategory: Subcategory } | undefined {
  const mainCategory = findMainCategory(mainCategorySlug);
  if (!mainCategory) return undefined;
  
  const subcategory = mainCategory.subcategories.find(s => s.slug === subcategorySlug);
  if (!subcategory) return undefined;
  
  return { mainCategory, subcategory };
}

export function findSeries(mainCategorySlug: string, subcategorySlug: string, seriesSlug: string): { mainCategory: MainCategory; subcategory: Subcategory; series: Series } | undefined {
  const result = findSubcategory(mainCategorySlug, subcategorySlug);
  if (!result) return undefined;
  
  const series = result.subcategory.series.find(s => s.slug === seriesSlug);
  if (!series) return undefined;
  
  return { ...result, series };
}

export function findProduct(mainCategorySlug: string, subcategorySlug: string, seriesSlug: string, productSlug: string): { mainCategory: MainCategory; subcategory: Subcategory; series: Series; product: Product } | undefined {
  const result = findSeries(mainCategorySlug, subcategorySlug, seriesSlug);
  if (!result) return undefined;
  
  const product = result.series.products.find(p => p.slug === productSlug);
  if (!product) return undefined;
  
  return { ...result, product };
}

// Legacy export for backward compatibility (will be removed after full migration)
export const products = mainCategories.map(cat => ({
  id: cat.slug,
  name: cat.name,
  description: cat.description,
  series: cat.subcategories.flatMap(sub => 
    sub.series.map(s => ({
      slug: s.slug,
      title: s.title,
      category: cat.slug,
      heroImagePath: s.image || '/images/submersible-pump.jpg',
      description: s.description || '',
      specs: [],
      features: [],
      applications: [],
    }))
  )
}));
