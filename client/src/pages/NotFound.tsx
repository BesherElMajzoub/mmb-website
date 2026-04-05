import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NotFound() {
  const [, setLocation] = useLocation();
  const { t, dir } = useLanguage();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center py-12 px-4" dir={dir}>
      <Card className="w-full max-w-lg mx-auto shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse" />
              <AlertCircle className="relative h-16 w-16 text-primary" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-slate-900 mb-2">{t("notFound.title")}</h1>

          <h2 className="text-xl font-semibold text-slate-700 mb-4">
            {t("notFound.subtitle")}
          </h2>

          <p className="text-slate-600 mb-8 leading-relaxed">
            {t("notFound.description")}
            <br />
            {t("notFound.deleted")}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={handleGoHome}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Home className={dir === 'rtl' ? "w-4 h-4 ml-2 max-rtl:mr-2" : "w-4 h-4 mr-2 max-ltr:ml-2"} />
              {t("notFound.goHome")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
