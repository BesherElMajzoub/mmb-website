import { useRoute, Link } from 'wouter';
import { products } from '@/data/products';
import { ChevronRight, ArrowRight } from 'lucide-react';
import NotFound from './NotFound';

export default function CategoryPage() {
  const [match, params] = useRoute('/products/:id');

  if (!match) return <NotFound />;

  const category = products.find(c => c.id === params.id);

  if (!category) return <NotFound />;

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
            <span className="text-primary font-bold">{category.name}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">{category.name}</h1>
          <p className="text-xl text-gray-300 max-w-3xl font-light leading-relaxed">
            {category.description}
          </p>
        </div>
      </section>

      {/* Series Grid */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.series.map((series) => (
              <Link key={series.slug} href={`/products/${category.id}/${series.slug}`}>
                <a className="group block h-full">
                  <div className="tech-card h-full flex flex-col bg-white border border-border hover:border-primary transition-all duration-300 hover:shadow-lg">
                    {/* Image Area */}
                    <div className="relative h-96 p-8 bg-muted/30 flex items-center justify-center overflow-hidden border-b border-border">
                      <img 
                        src={series.heroImagePath} 
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
                    <div className="p-8 flex-1 flex flex-col">
                      <h3 className="text-xl font-heading font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                        {series.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-6 flex-1 line-clamp-3 leading-relaxed">
                        {series.description}
                      </p>
                      
                      <div className="mt-auto pt-6 border-t border-border/50 flex justify-between items-center">
                        <span className="text-xs font-bold uppercase tracking-wider text-foreground">View Series</span>
                        <span className="text-xs font-mono text-muted-foreground">
                          {series.specs.length} Specs Available
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
