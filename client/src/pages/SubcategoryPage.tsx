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
          {subcategory.comingSoon ? (
            <div className="text-center py-20">
              <h2 className="text-4xl font-heading font-bold text-muted-foreground mb-4">
                Coming Soon
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                We're working on bringing you the best products in this category. Stay tuned for updates!
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-heading font-bold mb-8 flex items-center gap-3">
                <span className="w-8 h-1 bg-primary"></span>
                Available Series
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {subcategory.series.map((series) => (
                  <Link key={series.slug} href={`/products/${mainCategory.slug}/${subcategory.slug}/${series.slug}`}>
                    <a className="group block h-full">
                      <div className="tech-card h-full flex flex-col bg-white border border-border hover:border-primary transition-all duration-300 hover:shadow-lg">
                        {/* Image Area */}
                        <div className="relative h-64 p-8 bg-white flex items-center justify-center overflow-hidden border-b border-border">
                          <img 
                            src={series.image || '/images/submersible-pump.jpg'} 
                            alt={series.title}
                            className="w-auto h-full max-h-48 object-contain transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-none">
                              <ArrowRight className="w-5 h-5" />
                            </div>
                          </div>
                        </div>
                        
                        {/* Content Area */}
                        <div className="p-6 flex-1 flex flex-col">
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
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
