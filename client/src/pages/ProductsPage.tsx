import { Link } from "wouter";
import { ChevronRight, ArrowRight } from "lucide-react";
import { mainCategories } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProductsPage() {
  const { t } = useLanguage();

  const categoryImages: Record<string, string> = {
    "stainless-steel-submersible-pumps-motors": "/images/Stainless Steel Submersible Pumps & Motors.jpg",
    "multistage-pumps": "/images/Multistage Pumps_Horizontal Multistage Centrifugal Pumps_GM SERIES_GM SERIES.png",
    "motors": "/images/Motors_MT.png",
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-secondary text-secondary-foreground py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/abstract-metal.jpg')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6 flex-wrap">
            <Link href="/">
              <a className="hover:text-primary">Home</a>
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-primary font-bold">Products</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Our Solutions
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl font-light leading-relaxed">
            Discover our comprehensive range of high-performance pumps and
            engineering solutions.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24 bg-background relative">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-border pb-6">
            <div>
              <h2 className="text-4xl font-heading font-bold text-foreground mb-2">
                {t("home.solutions.title") || "Product Categories"}
              </h2>
              <p className="text-muted-foreground max-w-xl">
                {t("home.solutions.subtitle") || "Explore our divisions"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mainCategories.map(category => (
              <Link key={category.slug} href={`/products/${category.slug}`}>
                <a className="group block h-full">
                  <div className="tech-card h-full flex flex-col border border-border hover:border-primary transition-all duration-300 hover:shadow-lg bg-white">
                    <div className="relative h-80 overflow-hidden bg-white p-4 flex items-center justify-center">
                      <img
                        src={
                          categoryImages[category.slug] ||
                          category.subcategories[0]?.series[0]?.image ||
                          "/images/submersible-pump.jpg"
                        }
                        alt={category.name}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-transparent group-hover:bg-black/5 transition-colors"></div>
                    </div>

                    <div className="p-8 flex-1 flex flex-col">
                      <h3 className="text-2xl font-heading font-bold mb-3 group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-muted-foreground mb-6 flex-1 line-clamp-3">
                        {category.description}
                      </p>

                      <div className="flex items-center gap-2 text-foreground font-bold uppercase tracking-wider text-sm group-hover:translate-x-2 transition-transform">
                        {t("products.viewSeries") || "View Series"}{" "}
                        <ChevronRight className="w-4 h-4 text-primary" />
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
