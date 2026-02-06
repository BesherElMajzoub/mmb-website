import { useRoute, Link } from 'wouter';
import { findSeries } from '@/data/products';
import { ChevronRight, Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NotFound from './NotFound';

export default function SeriesPage() {
  const [match, params] = useRoute('/products/:mainCategorySlug/:subcategorySlug/:seriesSlug');

  if (!match) return <NotFound />;

  const result = findSeries(params.mainCategorySlug, params.subcategorySlug, params.seriesSlug);

  if (!result) return <NotFound />;

  const { mainCategory, subcategory, series } = result;

  // If series has exactly one product, display that product's details
  // Otherwise, display series-level details
  const hasOneProduct = series.products && series.products.length === 1;
  const displayData = hasOneProduct ? series.products[0] : series;
  const displayTitle = hasOneProduct ? series.products[0].name : series.title;
  const displayFeatures = hasOneProduct ? series.products[0].features : (series as any).features;
  const displayApplications = hasOneProduct ? series.products[0].applications : (series as any).applications;
  const displaySpecs = hasOneProduct ? series.products[0].specs : (series as any).specs;

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
                  src={displayData.image || series.image || '/images/submersible-pump.jpg'} 
                  alt={displayTitle} 
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
                  {displayTitle}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {displayData.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                {displayData.catalog ? (
                  <>
                    <Button 
                      className="bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wide rounded-none h-12 px-6 gap-2"
                      onClick={() => window.open(displayData.catalog, '_blank')}
                    >
                      <FileText className="w-4 h-4" /> Read Datasheet
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-border hover:bg-muted font-bold uppercase tracking-wide rounded-none h-12 px-6 gap-2"
                      onClick={() => window.open(displayData.catalog, '_blank')}
                    >
                      <Download className="w-4 h-4" /> Download Catalog
                    </Button>
                  </>
                ) : (
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wide rounded-none h-12 px-6 gap-2"
                    onClick={() => {
                      const message = `Hello, I am interested in ${displayTitle}. URL: ${window.location.href}`;
                      window.open(`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
                    }}
                  >
                    Contact via WhatsApp
                  </Button>
                )}
              </div>

              {/* Key Features Preview */}
              {displayFeatures && displayFeatures.length > 0 && (
                <div className="bg-muted/20 p-6 border border-border/50">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4 border-b border-border pb-2">
                    Key Features
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {displayFeatures.slice(0, 6).map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-0.5">✓</span>
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
      {displaySpecs && displaySpecs.length > 0 && (
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
                      {displaySpecs.map((spec: any, idx: number) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-muted/10'}>
                          <td className="px-6 py-4 font-medium text-foreground align-top">{spec.param}</td>
                          <td className="px-6 py-4 font-mono text-primary font-bold align-top whitespace-pre-line">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right: Applications & Features */}
              <div className="lg:col-span-5 space-y-12">
                {/* Applications */}
                {displayApplications && displayApplications.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-heading font-bold mb-8 flex items-center gap-3">
                      <span className="w-8 h-1 bg-primary"></span>
                      Applications
                    </h2>
                    <ul className="space-y-3">
                      {displayApplications.map((app: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-3 p-3 bg-muted/20 border border-border/50 hover:border-primary/50 transition-colors">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-foreground font-medium">{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Full Features List */}
                {displayFeatures && displayFeatures.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-heading font-bold mb-8 flex items-center gap-3">
                      <span className="w-8 h-1 bg-primary"></span>
                      All Features
                    </h2>
                    <ul className="space-y-3">
                      {displayFeatures.map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-primary shrink-0 mt-0.5">✓</span>
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
