import { useRoute, Link } from 'wouter';
import { findProduct } from '@/data/products';
import { ChevronRight, FileText, Download, Check, MessageCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NotFound from './NotFound';
import { config } from '@/config';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ProductDetailPage() {
  const [match, params] = useRoute('/products/:mainCategorySlug/:subcategorySlug/:seriesSlug/:productSlug');

  if (!match) return <NotFound />;

  const result = findProduct(params.mainCategorySlug, params.subcategorySlug, params.seriesSlug, params.productSlug);

  if (!result) return <NotFound />;

  const { mainCategory, subcategory, series, product } = result;
  const { t } = useLanguage();

  const catalogPath = product.catalog || series.catalog;

  const handleWhatsAppClick = () => {
    const message = `Hello, I am interested in ${product.name} (${series.title}). URL: ${window.location.href}`;
    const url = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

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
            <Link href={`/products/${mainCategory.slug}/${subcategory.slug}/${series.slug}`}>
              <a className="hover:text-primary">{series.title}</a>
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">{product.name}</span>
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
                  src={product.image || series.image || '/images/submersible-pump.jpg'} 
                  alt={product.name} 
                  className="w-full h-auto object-contain max-h-[500px] mx-auto"
                />
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
                  {series.title}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                  {product.name}
                </h1>
                {product.description && (
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-4">
                {catalogPath ? (
                  <>
                    <Button 
                      className="bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wide rounded-none h-12 px-6 gap-2"
                      onClick={() => window.open(catalogPath, '_blank')}
                    >
                      <FileText className="w-4 h-4" /> Read Datasheet
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-border hover:bg-muted font-bold uppercase tracking-wide rounded-none h-12 px-6 gap-2"
                      onClick={() => window.open(catalogPath, '_blank')}
                    >
                      <Download className="w-4 h-4" /> Download PDF
                    </Button>
                  </>
                ) : (
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wide rounded-none h-12 px-6 gap-2"
                    onClick={handleWhatsAppClick}
                  >
                    <MessageCircle className="w-5 h-5" />
                    {t('products.contactWhatsApp')}
                  </Button>
                )}
              </div>

              {/* Key Features Preview */}
              {product.features && product.features.length > 0 && (
                <div className="bg-muted/20 p-6 border border-border/50">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4 border-b border-border pb-2">
                    Key Features
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.features.slice(0, 6).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      {product.specs && product.specs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left: Specs Table */}
              <div className="lg:col-span-7">
                <h2 className="text-2xl font-heading font-bold mb-8 flex items-center gap-3">
                  <span className="w-8 h-1 bg-primary"></span>
                  Technical Specifications
                </h2>
                
                <div className="overflow-hidden border border-border">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-foreground font-heading uppercase tracking-wider text-xs">
                      <tr>
                        <th className="px-6 py-4 font-bold border-b border-border">Parameter</th>
                        <th className="px-6 py-4 font-bold border-b border-border">Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {product.specs.map((spec, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-muted/10'}>
                          <td className="px-6 py-4 font-medium text-foreground">{spec.param}</td>
                          <td className="px-6 py-4 font-mono text-primary font-bold">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right: Applications & Features */}
              <div className="lg:col-span-5 space-y-12">
                {/* Applications */}
                {product.applications && product.applications.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-heading font-bold mb-8 flex items-center gap-3">
                      <span className="w-8 h-1 bg-primary"></span>
                      Applications
                    </h2>
                    <ul className="space-y-3">
                      {product.applications.map((app, idx) => (
                        <li key={idx} className="flex items-center gap-3 p-3 bg-muted/20 border border-border/50 hover:border-primary/50 transition-colors">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-foreground font-medium">{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Full Features List */}
                {product.features && product.features.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-heading font-bold mb-8 flex items-center gap-3">
                      <span className="w-8 h-1 bg-primary"></span>
                      All Features
                    </h2>
                    <ul className="space-y-3">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Documentation CTA */}
      {catalogPath && (
        <section className="py-16 bg-secondary text-secondary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-heading font-bold mb-6">Technical Documentation</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Download detailed datasheets, performance curves, and installation manuals for {product.name}.
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                className="bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wide rounded-none h-14 px-8 text-base"
                onClick={() => window.open(catalogPath, '_blank')}
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
