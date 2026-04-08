import { useState, useMemo } from 'react';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { newsData, LocalizedString } from '@/data/news';
import { Calendar, Search, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function NewsListing() {
  const { t, language } = useLanguage();
  const langKey = language as keyof LocalizedString;

  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract all unique English category strings to act as static filter keys
  const categories = ['All', ...Array.from(new Set(newsData.map(item => item.category.en)))];

  // Map english category keys to translated strings for display
  const getCategoryLabel = (catKey: string) => {
    if (catKey === 'All') return t('news.filters.all') || 'All';
    const found = newsData.find(item => item.category.en === catKey);
    return found ? found.category[langKey] : catKey;
  };

  const filteredNews = useMemo(() => {
    return newsData.filter(item => {
      const matchesCategory = activeFilter === 'All' || item.category.en === activeFilter;
      const matchesSearch = item.title[langKey].toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.excerpt[langKey].toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [activeFilter, searchQuery, langKey]);

  // Format date helper
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      day: '2-digit', month: 'short', year: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(language === 'de' ? 'de-DE' : language === 'ar' ? 'ar-SA' : 'en-GB', options);
  };

  return (
    <div className="min-h-screen pt-32 flex flex-col bg-background">
      {/* Title Header */}
      <div className="bg-secondary text-secondary-foreground py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">{t('nav.news') || 'Latest News'}</h1>
          <p className="text-xl text-gray-400 font-light max-w-2xl">
            {t('home.news.subtitle') || 'Follow our latest updates, product announcements, exhibitions, and company milestones.'}
          </p>
        </div>
      </div>

      <div className="container py-12 flex-1">
        {/* Controls: Search and Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <Button
                key={cat}
                variant={activeFilter === cat ? 'default' : 'outline'}
                className={activeFilter === cat ? 'bg-primary text-white pointer-events-none' : 'text-foreground hover:text-primary'}
                onClick={() => setActiveFilter(cat)}
                size="sm"
              >
                {getCategoryLabel(cat)}
              </Button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder={t('news.searchPlaceholder') || 'Search news...'} 
              className="pl-9 bg-card border-border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Grid Layout */}
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map(item => (
              <Link key={item.id} href={`/news/${item.slug}`} className="group block h-full">
                <div className="flex flex-col h-full bg-card border border-border hover:border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
                  
                  {/* Thumbnail */}
                  <div className="relative h-48 bg-muted flex items-center justify-center overflow-hidden">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.title[langKey]} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-secondary/10 flex items-center justify-center">
                        <span className="text-4xl text-muted-foreground/20 font-heading font-bold">MMB</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 px-2 py-1 bg-primary text-white text-xs font-bold uppercase tracking-wider">
                      {item.category[langKey]}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(item.date)}
                    </div>

                    <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {item.title[langKey]}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm flex-1 leading-relaxed line-clamp-3 mb-6">
                      {item.excerpt[langKey]}
                    </p>

                    <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-xs group-hover:px-2 transition-all">
                      {t('news.readMore') || 'Read More'} <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center border border-dashed border-border text-muted-foreground">
            {t('news.noResults') || 'No news items found matching your criteria.'}
          </div>
        )}
      </div>
    </div>
  );
}
