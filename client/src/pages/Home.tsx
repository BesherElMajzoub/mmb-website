import { Link } from 'wouter';
import { ArrowRight, CheckCircle2, FileText, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';

export default function Home() {
  const scrollToSolutions = () => {
    const element = document.getElementById('solutions');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
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

        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-20">
          {/* Left Column: Content */}
          <div className="lg:col-span-7 space-y-8 animate-in slide-in-from-left duration-700 fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest rounded-sm">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              Premium Industrial Solutions
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight">
              German Engineering for <span className="text-primary">Pure Water</span> Solutions
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl font-light leading-relaxed">
              Precision-crafted pumps and motors for demanding industrial and agricultural applications.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wide rounded-none h-14 px-8 text-base"
                onClick={scrollToSolutions}
              >
                Explore Products
              </Button>
              
              <Link href="/certifications">
                <a className="inline-flex items-center justify-center h-14 px-8 border border-white/30 text-white hover:bg-white/10 hover:text-white hover:border-white font-bold uppercase tracking-wide rounded-none text-base transition-colors">
                  View Certifications
                </a>
              </Link>
            </div>
            
            <p className="text-sm text-gray-400 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Technical datasheets available as PDF downloads.
            </p>
          </div>

          {/* Right Column: Technical Highlights */}
          <div className="lg:col-span-5 hidden lg:block animate-in slide-in-from-right duration-700 fade-in delay-200">
            <div className="bg-card/5 backdrop-blur-sm border border-white/10 p-8 relative">
              <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-primary"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-primary"></div>
              
              <h3 className="text-white font-heading text-xl mb-6 border-b border-white/10 pb-4">Technical Highlights</h3>
              
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
              <h2 className="text-4xl font-heading font-bold text-foreground mb-2">Our Solutions</h2>
              <p className="text-muted-foreground max-w-xl">Comprehensive pumping systems engineered for performance.</p>
            </div>
            <Link href="/products/submersible" className="hidden md:flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm hover:underline mt-4 md:mt-0">
                View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((category) => (
              <Link key={category.id} href={`/products/${category.id}`} className="group block h-full">
                  <div className="tech-card h-full flex flex-col">
                    <div className="relative h-64 overflow-hidden bg-muted">
                      <img 
                        src={category.series[0]?.heroImagePath || '/images/submersible-pump.jpg'} 
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                      
                      {/* Category Label */}
                      <div className="absolute bottom-0 left-0 bg-primary text-white px-4 py-2 text-sm font-bold uppercase tracking-wider">
                        Series 0{products.indexOf(category) + 1}
                      </div>
                    </div>
                    
                    <div className="p-8 flex-1 flex flex-col">
                      <h3 className="text-2xl font-heading font-bold mb-3 group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-muted-foreground mb-6 flex-1 line-clamp-3">
                        {category.description}
                      </p>
                      
                      <div className="flex items-center gap-2 text-foreground font-bold uppercase tracking-wider text-sm group-hover:translate-x-2 transition-transform">
                        View Series <ChevronRight className="w-4 h-4 text-primary" />
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
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">WHY CHOOSE MMB?</h2>
              <p className="text-xl text-gray-400 font-light mb-8 leading-relaxed">
                German Engineering. Enduring Reliability. Precision-crafted solutions for the world’s pure water needs.
              </p>
              
              <div className="prose prose-invert max-w-none mb-8">
                <p>
                  At Morsbach Maschinen Bau GmbH (MMB), we combine the heritage of German precision with modern innovation to deliver superior pumping systems. We are not just a manufacturer; we are a partner dedicated to efficiency and durability.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: 'Engineering Excellence',
                    desc: 'Rooted in our German origins, every unit is built to rigorous standards, ensuring consistent performance and energy efficiency in demanding environments.'
                  },
                  {
                    title: 'Premium Material Construction',
                    desc: 'We prioritize longevity by utilizing high-grade Stainless Steel across our Submersible Pumps (6S Series) and Motors, offering maximum corrosion resistance and structural integrity.'
                  },
                  {
                    title: 'Dedicated to Purity',
                    desc: 'True to our slogan, "German Engineering For Pure Water Solutions," our technology is specifically designed to maintain water safety and hygiene for municipal, agricultural, and industrial applications.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-primary rotate-45"></div>
                    </div>
                    <div>
                      <h4 className="text-white font-bold uppercase tracking-wide mb-1">{item.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-2xl font-heading font-bold text-primary">MMB – Engineered to Last.</p>
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

      {/* 4. CERTIFICATION SECTION */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-heading font-bold mb-4">Certifications & Standards</h2>
            <p className="text-muted-foreground">
              Our commitment to quality is backed by international standards and rigorous testing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card border border-border p-8 flex flex-col items-center text-center hover:border-primary transition-colors group">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                  <FileText className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-lg font-bold mb-2">ISO 9001:2015</h3>
                <p className="text-sm text-muted-foreground mb-6">Quality Management System Certification</p>
                
                <div className="flex gap-3 w-full">
                  <Button variant="outline" className="flex-1 text-xs uppercase font-bold" size="sm">
                    Read PDF
                  </Button>
                  <Button variant="ghost" className="px-3" size="sm">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/certifications">
              <a className="inline-flex items-center justify-center h-10 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wide rounded-none px-8 transition-colors">
                View All Certifications
              </a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
