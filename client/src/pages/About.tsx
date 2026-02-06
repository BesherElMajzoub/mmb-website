import { Link } from 'wouter';
import { ChevronRight, Award, Users, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-secondary text-secondary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/factory-exterior.jpg')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">{t('about.title')}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
            {t('about.subtitle')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-6">
              <h2 className="text-3xl font-heading font-bold text-foreground">{t('about.heritageTitle')}</h2>
              <div className="w-20 h-1 bg-primary"></div>
              <div className="prose prose-lg text-muted-foreground">
                <p>
                  {t('about.heritageText1')}
                </p>
                <p>
                  {t('about.heritageText2')}
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="border-8 border-muted shadow-2xl">
                <img src="/images/team.jpg" alt="MMB Team" className="w-full h-auto" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary text-white p-8 max-w-xs hidden md:block">
                <p className="font-heading text-2xl font-bold">{t('about.quote')}</p>
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: <Award className="w-10 h-10 text-primary" />,
                title: t('about.values.excellence.title'),
                desc: t('about.values.excellence.desc')
              },
              {
                icon: <Users className="w-10 h-10 text-primary" />,
                title: t('about.values.partnership.title'),
                desc: t('about.values.partnership.desc')
              },
              {
                icon: <Globe className="w-10 h-10 text-primary" />,
                title: t('about.values.sustainability.title'),
                desc: t('about.values.sustainability.desc')
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-muted/30 p-8 border border-border hover:border-primary transition-colors text-center">
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-xl font-heading font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
