import { useRoute, Link } from 'wouter';
import { findSeries } from '@/data/products';
import { ChevronRight, ArrowRight, Download, FileText, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NotFound from './NotFound';

export default function SeriesPage() {
  const [match, params] = useRoute('/products/:mainCategorySlug/:subcategorySlug/:seriesSlug');

  if (!match) return <NotFound />;

  const result = findSeries(params.mainCategorySlug, params.subcategorySlug, params.seriesSlug);

  if (!result) return <NotFound />;

  const { mainCategory, subcategory, series } = result;

  // If series has no products yet, show the series detail page instead
  const hasProducts = series.products && series.products.length > 0;

  return (
    <div className="min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
            <Link href="/"><a className="hover:text-primary">Home</a></Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/products/${mainCategory.slug}`}>
              <a className="hover:text-primary">{mainCategory.name}</a>
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/products/${mainCategory.slug}/${subcategory.slug}`}>
              <a className="hover:text-primary">{subcategory.name}</a>
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">{series.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Row */}
      <section className="bg-background py-12 border-b border-border">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Image */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-border p-8 relative">
                <img 
                  src={series.image || '/images/submersible-pump.jpg'} 
                  alt={series.title} 
                  className="w-full h-auto object-contain max-h-[500px] mx-auto"
                />
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
                  {subcategory.name}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                  {series.title}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {series.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                {series.catalog && (
                  <>
                    <Button 
                      className="bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wide rounded-none h-12 px-6 gap-2"
                      onClick={() => window.open(series.catalog, '_blank')}
                    >
                      <FileText className="w-4 h-4" /> Read Datasheet
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-border hover:bg-muted font-bold uppercase tracking-wide rounded-none h-12 px-6 gap-2"
                      onClick={() => window.open(series.catalog, '_blank')}
                    >
                      <Download className="w-4 h-4" /> Download Catalog
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      {hasProducts ? (
        <section className="py-16 bg-white">
          <div className="container">
            <h2 className="text-2xl font-heading font-bold mb-8 flex items-center gap-3">
              <span className="w-8 h-1 bg-primary"></span>
              Products in this Series
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {series.products.map((product) => (
                <Link key={product.slug} href={`/products/${mainCategory.slug}/${subcategory.slug}/${series.slug}/${product.slug}`}>
                  <a className="group block h-full">
                    <div className="tech-card h-full flex flex-col bg-white border border-border hover:border-primary transition-all duration-300 hover:shadow-lg">
                      {/* Image Area */}
                      <div className="relative h-48 p-6 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden border-b border-border">
                        <img 
                          src={product.image || series.image || '/images/submersible-pump.jpg'} 
                          alt={product.name}
                          className="w-auto h-full max-h-36 object-contain transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-none">
                            <ArrowRight className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Content Area */}
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-lg font-heading font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        {product.description && (
                          <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>
                        )}
                        
                        <div className="mt-auto pt-4 border-t border-border/50 flex justify-between items-center">
                          <span className="text-xs font-bold uppercase tracking-wider text-foreground">View Details</span>
                          {product.catalog && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs gap-1 h-8"
                              onClick={(e) => {
                                e.preventDefault();
                                window.open(product.catalog, '_blank');
                              }}
                            >
                              <Download className="w-3 h-3" />
                              PDF
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-16 bg-white">
          <div className="container text-center">
            <p className="text-muted-foreground">
              Product details will be available soon. Contact us for more information.
            </p>
          </div>
        </section>
      )}

      {/* Documentation CTA */}
      {series.catalog && (
        <section className="py-16 bg-secondary text-secondary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-heading font-bold mb-6">Technical Documentation</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Download detailed datasheets, performance curves, and installation manuals for the {series.title}.
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                className="bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wide rounded-none h-14 px-8 text-base"
                onClick={() => window.open(series.catalog, '_blank')}
              >
                Download Full Datasheet
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
