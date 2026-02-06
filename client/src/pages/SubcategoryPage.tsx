import { useRoute, Link } from 'wouter';
import { findSubcategory } from '@/data/products';
import { ChevronRight, ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NotFound from './NotFound';

export default function SubcategoryPage() {
  const [match, params] = useRoute('/products/:mainCategorySlug/:subcategorySlug');

  if (!match) return <NotFound />;

  const result = findSubcategory(params.mainCategorySlug, params.subcategorySlug);

  if (!result) return <NotFound />;

  const { mainCategory, subcategory } = result;

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-secondary text-secondary-foreground py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/abstract-metal.jpg')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6 flex-wrap">
            <Link href="/"><a className="hover:text-primary">Home</a></Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Products</span>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/products/${mainCategory.slug}`}>
              <a className="hover:text-primary">{mainCategory.name}</a>
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-primary font-bold">{subcategory.name}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">{subcategory.name}</h1>
          <p className="text-xl text-gray-300 max-w-3xl font-light leading-relaxed">
            {subcategory.description}
          </p>
        </div>
      </section>

      {/* Series Grid or Coming Soon */}
      <section className="py-16 bg-background">
        <div className="container">
          {(subcategory.slug === 'wastewater-submersible-pumps' || subcategory.comingSoon) ? (
            <div className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden border border-border bg-white">
              {/* Blurred Background Image */}
               <div className="absolute inset-0 z-0">
                  <img 
                    src={subcategory.series[0]?.image || '/images/submersible-pump.jpg'}
                    alt={subcategory.name}
                    className="w-full h-full object-cover opacity-20 filter blur-sm scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
              </div>

              <div className="relative z-10 text-center px-4 max-w-3xl">
                <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted border border-border text-muted-foreground">
                  <span className="text-4xl">🚧</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
                  {subcategory.name}
                </h1>
                
                <div className="inline-block px-8 py-3 bg-primary text-white font-bold uppercase tracking-widest text-lg shadow-xl mb-8">
                  Coming Soon
                </div>
                
                <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                  Our engineering team is currently finalizing the technical specifications for this product line. 
                  Please check back shortly for full catalogs and performance curves.
                </p>

                 <div className="mt-10">
                  <Link href={`/products/${mainCategory.slug}`}>
                    <a className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider hover:underline">
                       <ChevronRight className="w-4 h-4 rotate-180" /> Back to {mainCategory.name}
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-heading font-bold mb-8 flex items-center gap-3">
                <span className="w-8 h-1 bg-primary"></span>
                Available Series
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {subcategory.series.map((series) => {
                  // If series has exactly one product, link to that product using its real slug
                  // Otherwise, link to the series page
                  const href = (series.products && series.products.length === 1)
                    ? `/products/${mainCategory.slug}/${subcategory.slug}/${series.slug}/${series.products[0].slug}`
                    : `/products/${mainCategory.slug}/${subcategory.slug}/${series.slug}`;
                  
                  return (
                    <Link key={series.slug} href={href}>
                    <a className="group block h-full">
                      <div className="tech-card h-full flex flex-col bg-white border border-border hover:border-primary transition-all duration-300 hover:shadow-lg">
                        {/* Image Area */}
                        <div className="relative h-80 p-4 bg-white flex items-center justify-center overflow-hidden">
                          <img 
                            src={series.image || '/images/submersible-pump.jpg'} 
                            alt={series.title}
                            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-none">
                              <ArrowRight className="w-5 h-5" />
                            </div>
                          </div>
                        </div>
                        
                        {/* Content Area */}
                        <div className="p-6 flex-1 flex flex-col border-t border-border/10">
                          <h3 className="text-xl font-heading font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                            {series.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3 leading-relaxed">
                            {series.description}
                          </p>
                          
                          <div className="mt-auto pt-4 border-t border-border/50 flex justify-between items-center">
                            <span className="text-xs font-bold uppercase tracking-wider text-foreground">View Series</span>
                            {series.catalog && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-xs gap-1 h-8"
                                onClick={(e) => {
                                  e.preventDefault();
                                  window.open(series.catalog, '_blank');
                                }}
                              >
                                <Download className="w-3 h-3" />
                                Catalog
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </a>
                  </Link>
                );})}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
