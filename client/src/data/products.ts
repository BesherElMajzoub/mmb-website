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
  description?: string; // Optional in generated data
  subcategories: Subcategory[];
}

// Import generated data
import generatedData from './products-generated.json';

// Main product data structure
export const mainCategories: MainCategory[] = generatedData as unknown as MainCategory[];

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

// Legacy export for backward compatibility
export const products = mainCategories.map(cat => ({
  id: cat.slug,
  name: cat.name,
  description: cat.description || '',
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
