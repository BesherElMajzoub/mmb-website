import { Link } from 'wouter';
import { FileText, Download, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Certifications() {
  const certs = [
    { title: 'ISO 9001:2015', desc: 'Quality Management System', id: 'iso9001' },
    { title: 'CE Declaration', desc: 'European Conformity', id: 'ce' },
    { title: 'TÜV Rheinland', desc: 'Safety Standard Certification', id: 'tuv' },
    { title: 'Energy Efficiency Class A', desc: 'IE3 Motor Efficiency', id: 'ie3' },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-secondary text-secondary-foreground py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/abstract-metal.jpg')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/"><a className="hover:text-primary">Home</a></Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-primary font-bold">Certifications</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Certifications</h1>
          <p className="text-xl text-gray-300 font-light">
            Verified quality and international standards.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certs.map((cert, idx) => (
              <div key={idx} className="bg-card border border-border p-8 flex items-start gap-6 hover:border-primary transition-colors group">
                <div className="w-16 h-16 bg-muted rounded-none flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                  <FileText className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-heading font-bold mb-2 text-foreground">{cert.title}</h3>
                  <p className="text-muted-foreground mb-6">{cert.desc}</p>
                  
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="font-bold uppercase tracking-wide text-xs">
                      Read PDF
                    </Button>
                    <Button variant="ghost" size="sm" className="font-bold uppercase tracking-wide text-xs gap-2">
                      <Download className="w-3 h-3" /> Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
