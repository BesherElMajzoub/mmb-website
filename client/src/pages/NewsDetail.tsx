import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { newsData, LocalizedString } from '@/data/news';
import { ArrowLeft, Calendar } from 'lucide-react';
import NotFound from './NotFound';

interface NewsDetailProps {
  params: {
    slug: string;
  };
}

export default function NewsDetail({ params }: NewsDetailProps) {
  const { t, language } = useLanguage();
  const langKey = language as keyof LocalizedString;

  const article = newsData.find((item) => item.slug === params.slug);

  if (!article) return <NotFound />;

  // Format date helper
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      day: '2-digit', month: 'short', year: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(language === 'de' ? 'de-DE' : language === 'ar' ? 'ar-SA' : 'en-GB', options);
  };

  return (
    <div className="min-h-screen pt-20 pb-24 flex flex-col items-center bg-background">
      <div className="container max-w-4xl py-12">
        {/* Back Button */}
        <Link href="/news" className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" /> {t('news.back') || 'Back to News'}
        </Link>
        
        {/* Article Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest rounded-sm">
              {article.category[langKey]}
            </span>
            <span className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
              <Calendar className="w-4 h-4" />
              {formatDate(article.date)}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground leading-tight">
            {article.title[langKey]}
          </h1>
        </div>

        {/* Optional Article Image */}
        {article.image && (
          <div className="w-full h-auto max-h-[500px] mb-12 overflow-hidden border border-border shadow-md bg-white">
            <img 
              src={article.image} 
              alt={article.title[langKey]} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
          <p className="text-xl leading-relaxed font-medium text-foreground mb-6">
            {article.excerpt[langKey]}
          </p>
          <div className="whitespace-pre-line leading-relaxed">
            {article.content[langKey]}
          </div>
        </div>
      </div>
    </div>
  );
}
