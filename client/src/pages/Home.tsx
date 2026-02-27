import { Link } from 'wouter';
import { ArrowRight, CheckCircle2, FileText, ChevronRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mainCategories } from '@/data/products';
import { newsData, LocalizedString } from '@/data/news';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Home() {
  const { t, language } = useLanguage();
  const scrollToSolutions = () => {
    const element = document.getElementById('solutions');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center overflow-x-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/engineer-hero.jpg" 
            alt="German Engineering" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#151716]/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#151716] via-[#151716]/80 to-transparent"></div>
        </div>

        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-32 md:pt-40">
          {/* Left Column: Content */}
          <div className="lg:col-span-7 space-y-8 animate-in slide-in-from-left duration-700 fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest rounded-sm">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              {t('hero.badge')}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-white leading-tight">
              {t('hero.title')} <span className="text-primary">{t('hero.titleHighlight')}</span> {t('hero.titleSuffix')}
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl font-light leading-relaxed">
              {t('hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wide rounded-none h-14 px-8 text-base w-full sm:w-auto"
                onClick={scrollToSolutions}
              >
                {t('hero.explore')}
              </Button>
              
              <Link href="/news">
                <a className="inline-flex items-center justify-center h-14 px-8 border border-white/30 text-white hover:bg-white/10 hover:text-white hover:border-white font-bold uppercase tracking-wide rounded-none text-base transition-colors w-full sm:w-auto">
                  {t('nav.news')}
                </a>
              </Link>
            </div>
            
            <p className="text-sm text-gray-400 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              {t('hero.pdfNotice')}
            </p>
          </div>

          {/* Right Column: Technical Highlights */}
          <div className="lg:col-span-5 hidden lg:block animate-in slide-in-from-right duration-700 fade-in delay-200">
            <div className="bg-card/5 backdrop-blur-sm border border-white/10 p-8 relative">
              <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-primary"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-primary"></div>
              
              <h3 className="text-white font-heading text-xl mb-6 border-b border-white/10 pb-4">{t('hero.highlights')}</h3>
              
              <ul className="space-y-4">
                {[
                  'Stainless Steel Construction',
                  'NEMA / International Standards',
                  'High Efficiency Design',
                  'Serviceable / Rewindable Systems'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-200 group">
                    <div className="w-8 h-8 rounded-none bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-sm uppercase tracking-wide">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR SOLUTIONS */}
      <section id="solutions" className="py-24 bg-background relative">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-border pb-6">
            <div>
              <h2 className="text-4xl font-heading font-bold text-foreground mb-2">{t('home.solutions.title')}</h2>
              <p className="text-muted-foreground max-w-xl">{t('home.solutions.subtitle')}</p>
            </div>
            <Link href={`/products/${mainCategories[0]?.slug}`} className="hidden md:flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm hover:underline mt-4 md:mt-0">
                {t('home.solutions.viewAll')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mainCategories.map((category, index) => (
              <Link key={category.slug} href={`/products/${category.slug}`} className="group block h-full">
                  <div className="tech-card h-full flex flex-col border border-border hover:border-primary transition-all duration-300 hover:shadow-lg bg-white">
                    <div className="relative h-80 overflow-hidden bg-white p-4 flex items-center justify-center">
                      <img 
                        src={category.subcategories[0]?.series[0]?.image || '/images/submersible-pump.jpg'} 
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
                        {t('products.viewSeries')} <ChevronRight className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                  </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US */}
      <section className="py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <img src="/images/abstract-metal.jpg" alt="" className="w-full h-full object-cover mix-blend-overlay" />
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">{t('home.whyChoose.title')}</h2>
              <p className="text-xl text-gray-400 font-light mb-8 leading-relaxed">
                {t('home.whyChoose.subtitle')}
              </p>
              
              <div className="prose prose-invert max-w-none mb-8">
                <p>
                  {t('home.whyChoose.description')}
                </p>
              </div>

              <div className="space-y-6">
                {[
                  'excellence',
                  'material',
                  'purity'
                ].map((key, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-primary rotate-45"></div>
                    </div>
                    <div>
                      <h4 className="text-white font-bold uppercase tracking-wide mb-1">{t(`home.whyChoose.features.${key}.title`)}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{t(`home.whyChoose.features.${key}.desc`)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-2xl font-heading font-bold text-primary">{t('home.whyChoose.footer')}</p>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 border-4 border-white/5 shadow-2xl">
                <img src="/images/factory-exterior.jpg" alt="MMB Factory" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
              {/* Decorative Frame */}
              <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-primary/30 z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LATEST NEWS SECTION */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-heading font-bold mb-4">{t('home.news.title')}</h2>
            <p className="text-muted-foreground">
              {t('home.news.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsData.slice(0, 3).map((item) => (
              <Link key={item.id} href={`/news/${item.slug}`} className="group block h-full">
                <div className="flex flex-col h-full bg-card border border-border hover:border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
                  
                  {/* Thumbnail */}
                  <div className="relative h-48 bg-muted flex items-center justify-center overflow-hidden">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.title[language as keyof LocalizedString]} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-secondary/10 flex items-center justify-center">
                        <span className="text-4xl text-muted-foreground/20 font-heading font-bold">MMB</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 px-2 py-1 bg-primary text-white text-xs font-bold uppercase tracking-wider">
                      {item.category[language as keyof LocalizedString]}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(item.date).toLocaleDateString(language === 'de' ? 'de-DE' : language === 'ar' ? 'ar-SA' : 'en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </div>

                    <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {item.title[language as keyof LocalizedString]}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm flex-1 leading-relaxed line-clamp-3 mb-6">
                      {item.excerpt[language as keyof LocalizedString]}
                    </p>

                    <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-xs group-hover:px-2 transition-all">
                      {t('news.readMore') || 'Read More'} <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/news">
              <a className="inline-flex items-center justify-center h-10 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wide rounded-none px-8 transition-colors">
                {t('home.news.viewAll') || 'View All News'}
              </a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
