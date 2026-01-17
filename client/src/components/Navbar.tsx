import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ChevronDown } from 'lucide-react';
import { products } from '@/data/products';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#151716]/95 backdrop-blur-md shadow-md ${
        isScrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
            <img 
              src="/images/logo2.png" 
              alt="MMB Logo" 
              className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
            />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className={`text-sm font-medium uppercase tracking-wider hover:text-primary transition-colors ${location === '/' ? 'text-primary' : 'text-gray-100'}`}>
              Home
          </Link>
          
          {/* Products Dropdown */}
          <div className="relative group">
            <button 
              className={`flex items-center gap-1 text-sm font-medium uppercase tracking-wider hover:text-primary transition-colors ${location.startsWith('/products') ? 'text-primary' : 'text-gray-100'}`}
              aria-expanded="false"
            >
              Products <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            </button>
            
            <div className="absolute top-full left-0 mt-2 w-64 bg-card border border-border shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
              <div className="h-1 w-full bg-primary absolute top-0 left-0"></div>
              <div className="py-2">
                {products.map((category) => (
                  <Link key={category.id} href={`/products/${category.id}`} className="block px-6 py-3 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors border-l-2 border-transparent hover:border-primary">
                      {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/about" className={`text-sm font-medium uppercase tracking-wider hover:text-primary transition-colors ${location === '/about' ? 'text-primary' : 'text-gray-100'}`}>
              About Us
          </Link>
          
          <Link href="/contact" className={`text-sm font-medium uppercase tracking-wider hover:text-primary transition-colors ${location === '/contact' ? 'text-primary' : 'text-gray-100'}`}>
              Contact Us
          </Link>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 border-l border-border pl-6 ml-2">
            <button className="text-xs font-bold hover:text-primary transition-colors text-primary">EN</button>
            <span className="text-muted-foreground/50">|</span>
            <button className="text-xs font-bold hover:text-primary transition-colors text-muted-foreground">DE</button>
            <span className="text-muted-foreground/50">|</span>
            <button className="text-xs font-bold hover:text-primary transition-colors text-muted-foreground">AR</button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container py-4 flex flex-col gap-4">
          <Link href="/" className="text-sm font-medium uppercase tracking-wider hover:text-primary p-2">Home</Link>
          
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground px-2">Products</span>
            {products.map((category) => (
              <Link key={category.id} href={`/products/${category.id}`} className="block pl-6 py-2 text-sm text-foreground hover:text-primary border-l border-border hover:border-primary">
                  {category.name}
              </Link>
            ))}
          </div>

          <Link href="/about" className="text-sm font-medium uppercase tracking-wider hover:text-primary p-2">About Us</Link>
          
          <Link href="/contact" className="text-sm font-medium uppercase tracking-wider hover:text-primary p-2">Contact Us</Link>
          
          <div className="flex items-center gap-4 p-2 border-t border-border mt-2 pt-4">
            <button className="text-sm font-bold text-primary">English</button>
            <button className="text-sm font-bold text-muted-foreground hover:text-primary">Deutsch</button>
            <button className="text-sm font-bold text-muted-foreground hover:text-primary">العربية</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
