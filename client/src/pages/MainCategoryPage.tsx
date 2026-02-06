import { useRoute, Link } from 'wouter';
import { findMainCategory } from '@/data/products';
import { ChevronRight, ArrowRight } from 'lucide-react';
import NotFound from './NotFound';

export default function MainCategoryPage() {
  const [match, params] = useRoute('/products/:mainCategorySlug');

  if (!match) return <NotFound />;

  const mainCategory = findMainCategory(params.mainCategorySlug);

  if (!mainCategory) return <NotFound />;

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-secondary text-secondary-foreground py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/abstract-metal.jpg')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/"><a className="hover:text-primary">Home</a></Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Products</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-primary font-bold">{mainCategory.name}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">{mainCategory.name}</h1>
          <p className="text-xl text-gray-300 max-w-3xl font-light leading-relaxed">
            {mainCategory.description}
          </p>
        </div>
      </section>

      {/* Subcategories Grid */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-2xl font-heading font-bold mb-8 flex items-center gap-3">
            <span className="w-8 h-1 bg-primary"></span>
            Product Categories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainCategory.subcategories.map((subcategory) => {
              const isComingSoon = subcategory.slug === 'wastewater-submersible-pumps' || subcategory.comingSoon;
              const CardContent = (
                  <div className={`tech-card h-full flex flex-col bg-white border border-border ${!isComingSoon ? 'hover:border-primary hover:shadow-lg transition-all duration-300' : ''}`}>
                    {/* Image Area */}
                    <div className="relative h-80 p-4 bg-white flex items-center justify-center overflow-hidden">
                        <>
                          <img 
                            src={subcategory.series[0]?.image || '/images/submersible-pump.jpg'} 
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
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
