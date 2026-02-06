import { Link } from 'wouter';
import { Mail } from 'lucide-react';
import { products } from '@/data/products';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-secondary text-secondary-foreground pt-16 pb-8 border-t-4 border-primary">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <img src="/images/logo.png" alt="MMB Logo" className="h-12 w-auto brightness-0 invert opacity-90" />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-2 pt-2">
              <Mail className="w-4 h-4 text-primary" />
              <a href="mailto:contact-us@mmbgermany.com" className="text-sm text-muted-foreground hover:text-white transition-colors">
                contact-us@mmbgermany.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-bold mb-6 text-primary">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('nav.home')}</Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('nav.about')}</Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('nav.contact')}</Link>
              </li>
              <li>
                <Link href="/certifications" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('nav.viewCertifications')}</Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-heading font-bold mb-6 text-primary">{t('footer.products')}</h3>
            <ul className="space-y-3">
              {products.map((category) => (
                <li key={category.id}>
                  <Link href={`/products/${category.id}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} Morsbach Maschinen Bau GmbH. {t('footer.rights')}
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-white transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-white transition-colors">{t('footer.terms')}</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-white transition-colors">{t('footer.imprint')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
