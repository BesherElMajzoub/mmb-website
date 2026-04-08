import { useRoute, Link } from 'wouter';
import { findMainCategory } from '@/data/products';
import { ChevronRight, ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NotFound from './NotFound';

export default function MainCategoryPage() {
  const [match, params] = useRoute('/products/:mainCategorySlug');

  if (!match) return <NotFound />;

  const mainCategory = findMainCategory(params.mainCategorySlug);

  if (!mainCategory) return <NotFound />;

  // Check if we should render series directly
  const isDirectSeries = mainCategory.subcategories.length === 1 && mainCategory.subcategories[0].slug === 'general';

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <section className="bg-secondary text-secondary-foreground pt-36 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/abstract-metal.jpg')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6 flex-wrap">
            <Link href="/"><a className="hover:text-primary">Home</a></Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/products"><a className="text-white hover:text-primary">Products</a></Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-primary font-bold">{mainCategory.name}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">{mainCategory.name}</h1>
          <p className="text-xl text-gray-300 max-w-3xl font-light leading-relaxed">
            {mainCategory.description}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-2xl font-heading font-bold mb-8 flex items-center gap-3">
            <span className="w-8 h-1 bg-primary"></span>
            {isDirectSeries ? 'Available Series' : 'Product Categories'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isDirectSeries ? (
              // RENDER SERIES
              mainCategory.subcategories[0].series.map((series) => {
                const subcategory = mainCategory.subcategories[0];
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
                );
              })
            ) : (
              // RENDER SUBCATEGORIES
              mainCategory.subcategories.map((subcategory) => {
                const subcategoryImages: Record<string, string> = {
                  's-series-stainless-steel-submersible-pumps': '/images/Stainless Steel Submersible Pumps & Motors.jpg',
                  'ta-tb-submersible-motors': '/images/TA-TB-Submersible-Motors.png',
                  'vertical-multistage-pumps': '/images/MMB CDL.png',
                  'horizontal-multistage-centrifugal-pumps': '/images/MMB GM.png',
                };

                const isComingSoon = subcategory.slug === 'wastewater-submersible-pumps' || subcategory.comingSoon;
                const CardContent = (
                    <div className={`tech-card h-full flex flex-col bg-white border border-border ${!isComingSoon ? 'hover:border-primary hover:shadow-lg transition-all duration-300' : ''}`}>
                      {/* Image Area */}
                      <div className="relative h-80 p-4 bg-white flex items-center justify-center overflow-hidden">
                          <>
                            <img 
                              src={subcategoryImages[subcategory.slug] || subcategory.series[0]?.image || '/images/submersible-pump.jpg'} 
                              alt={subcategory.name}
                              className={`w-full h-full object-contain ${
                                !isComingSoon ? 'transition-transform duration-500 group-hover:scale-105' : 'filter blur-[5px] opacity-70'
                              }`}
                            />
                            
                            {isComingSoon && (
                              <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/10 backdrop-blur-[1px]">
                                <div className="bg-primary/90 text-white px-6 py-3 font-heading font-bold text-xl uppercase tracking-widest shadow-lg border border-white/20">
                                  Coming Soon
                                </div>
                              </div>
                            )}

                            {!isComingSoon && (
                              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-none">
                                  <ArrowRight className="w-5 h-5" />
                                </div>
                              </div>
                            )}
                          </>
                      </div>
                      
                      {/* Content Area */}
                      <div className="p-6 flex-1 flex flex-col border-t border-border/10">
                        <h3 className={`text-xl font-heading font-bold mb-3 ${!isComingSoon ? 'text-foreground group-hover:text-primary transition-colors' : 'text-muted-foreground'}`}>
                          {subcategory.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-2 leading-relaxed">
                          {subcategory.description}
                        </p>
                        
                        <div className="mt-auto pt-4 border-t border-border/50 flex justify-between items-center">
                          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            {isComingSoon ? 'Coming Soon' : 'View Products'}
                          </span>
                          {!isComingSoon && (
                            <span className="text-xs font-mono text-muted-foreground">
                              {subcategory.series.length} Series
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                );

                return isComingSoon ? (
                  <div key={subcategory.slug} className="block h-full cursor-default select-none">
                    {CardContent}
                  </div>
                ) : (
                  <Link key={subcategory.slug} href={`/products/${mainCategory.slug}/${subcategory.slug}`}>
                    <a className="group block h-full">
                      {CardContent}
                    </a>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
