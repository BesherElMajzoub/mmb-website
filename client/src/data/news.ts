export interface LocalizedString {
  en: string;
  de: string;
  ar: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  category: LocalizedString;
  date: string; // ISO format
  title: LocalizedString;
  excerpt: LocalizedString;
  content: LocalizedString;
  image?: string;
}

export const newsData: NewsArticle[] = [
  {
    id: '1',
    slug: 'new-6s-submersible-pump-series',
    category: { en: 'Product', de: 'Produkt', ar: 'منتج' },
    date: '2026-02-27',
    image: '/images/submersible-pump.jpg',
    title: {
      en: 'MMB Launches New 6S Submersible Pump Series',
      de: 'MMB bringt neue 6S-Tauchpumpenserie auf den Markt',
      ar: 'MMB تطلق سلسلة مضخات غاطسة 6S جديدة'
    },
    excerpt: {
      en: 'Experience our latest high-efficiency 6-inch stainless steel submersible pumps designed specifically for rigorous deep well applications.',
      de: 'Erleben Sie unsere neuesten hocheffizienten 6-Zoll-Edelstahltauchpumpen, die speziell für anspruchsvolle Tiefbrunnenanwendungen entwickelt wurden.',
      ar: 'اكتشف أحدث مضخاتنا الغاطسة من الستانلس ستيل مقاس 6 بوصات عالية الكفاءة والمصممة خصيصًا لتطبيقات الآبار العميقة الصعبة.'
    },
    content: {
      en: 'We are thrilled to announce the launch of our new 6S Series. Built entirely from high-grade, corrosion-resistant stainless steel, these pumps ensure exceptional longevity even in aggressive water conditions. The precision-machined radial or mixed-flow impellers deliver superior head and flow performance, maintaining the high standards expected from German engineering.',
      de: 'Wir freuen uns, die Markteinführung unserer neuen 6S-Serie bekannt zu geben. Diese komplett aus hochwertigem, korrosionsbeständigem Edelstahl gefertigten Pumpen gewährleisten eine außergewöhnliche Langlebigkeit selbst bei aggressiven Wasserbedingungen. Die präzisionsgefertigten Radial- oder Halbaxiallaufräder bieten hervorragende Förderhöhen- und Durchflussleistungen und entsprechen den hohen Standards der deutschen Ingenieurskunst.',
      ar: 'نحن متحمسون للإعلان عن إطلاق سلسلة 6S الجديدة. تم تصميم هذه المضخات بالكامل من الستانلس ستيل عالي الجودة والمقاوم للتآكل، مما يضمن عمرًا طويلاً استثنائيًا حتى في ظروف المياه القاسية. توفر الدفاعات الشعاعية أو مختلطة التدفق المصنعة بدقة أداءً فائقًا في الرأس والتدفق، مع الحفاظ على المعايير العالية المتوقعة من الهندسة الألمانية.'
    }
  },
  {
    id: '2',
    slug: 'hannover-messe-2026-participation',
    category: { en: 'Exhibition', de: 'Messe', ar: 'معرض' },
    date: '2026-02-15',
    image: '/images/factory-exterior.jpg',
    title: {
      en: 'MMB to Exhibit at Hannover Messe 2026',
      de: 'MMB stellt auf der Hannover Messe 2026 aus',
      ar: 'MMB تشارك في معرض هانوفر ميسي 2026'
    },
    excerpt: {
      en: 'Join us at the world\'s leading industrial technology show where we will showcase our latest pumping systems.',
      de: 'Besuchen Sie uns auf der weltweit führenden Messe für Industrietechnologie, auf der wir unsere neuesten Pumpensysteme präsentieren werden.',
      ar: 'انضم إلينا في المعرض الرائد عالميًا للتكنولوجيا الصناعية حيث سنعرض أحدث أنظمة الضخ لدينا.'
    },
    content: {
      en: 'MMB will be presenting our cutting-edge water solutions at Hannover Messe 2026. Visitors will have the opportunity to see our extensive range of multidisciplinary centrifugal and submersible pumps, alongside our state-of-the-art motors. Our team of engineering experts will be on-site to discuss customized infrastructure and industrial integrations.',
      de: 'MMB wird auf der Hannover Messe 2026 unsere hochmodernen Wasserlösungen vorstellen. Besucher haben die Möglichkeit, unser umfangreiches Sortiment an multidisziplinären Zentrifugal- und Tauchpumpen sowie unsere hochmodernen Motoren zu sehen. Unser Team von Ingenieurexperten wird vor Ort sein, um maßgeschneiderte Infrastruktur- und Industrieintegrationen zu besprechen.',
      ar: 'ستعرض MMB أحدث حلول المياه لدينا في معرض هانوفر ميسي 2026. ستتاح للزوار الفرصة لمشاهدة مجموعتنا الواسعة من مضخات الطرد المركزي والمضخات الغاطسة متعددة التخصصات، إلى جانب أحدث المحركات لدينا. سيكون فريقنا من خبراء الهندسة متواجدًا في الموقع لمناقشة البنية التحتية المخصصة والتكامل الصناعي.'
    }
  },
  {
    id: '3',
    slug: 'strategic-partnership-middle-east',
    category: { en: 'Partnership', de: 'Partnerschaft', ar: 'شراكة' },
    date: '2026-01-20',
    title: {
      en: 'MMB Announces Strategic Partnership in the Middle East',
      de: 'MMB kündigt strategische Partnerschaft im Nahen Osten an',
      ar: 'MMB تعلن عن شراكة استراتيجية في الشرق الأوسط'
    },
    excerpt: {
      en: 'Expanding our global reach with new distribution and service networks across key Middle Eastern markets.',
      de: 'Ausbau unserer globalen Reichweite mit neuen Vertriebs- und Servicenetzwerken in wichtigen Märkten des Nahen Ostens.',
      ar: 'توسيع نطاق وصولنا العالمي من خلال شبكات توزيع وخدمة جديدة عبر أسواق الشرق الأوسط الرئيسية.'
    },
    content: {
      en: 'In line with our commitment to fulfilling pure water demands globally, MMB has entered a long-term partnership with premier industrial distributors in the Middle East. This strategic move ensures faster delivery, localized support, and improved availability of our high-quality pump parts and maintenance services across the region.',
      de: 'Im Einklang mit unserem Engagement, den weltweiten Bedarf an reinem Wasser zu decken, hat MMB eine langfristige Partnerschaft mit führenden Industriedistributoren im Nahen Osten geschlossen. Dieser strategische Schritt sichert eine schnellere Lieferung, lokalen Support und eine verbesserte Verfügbarkeit unserer hochwertigen Pumpenteile und Wartungsdienste in der gesamten Region.',
      ar: 'تماشياً مع التزامنا بتلبية احتياجات المياه النقية عالمياً، دخلت MMB في شراكة طويلة الأمد مع موزعين صناعيين رائدين في الشرق الأوسط. تضمن هذه الخطوة الاستراتيجية تسليمًا أسرع ودعمًا محليًا وتوافرًا أفضل لأجزاء المضخات عالية الجودة وخدمات الصيانة الخاصة بنا في جميع أنحاء المنطقة.'
    }
  },
  {
    id: '4',
    slug: 'maintenance-update-q1',
    category: { en: 'Maintenance', de: 'Wartung', ar: 'صيانة' },
    date: '2025-12-10',
    title: {
      en: 'Quarterly Maintenance and Service Updates',
      de: 'Vierteljährliche Wartungs- und Service-Updates',
      ar: 'تحديثات الصيانة والخدمة ربع السنوية'
    },
    excerpt: {
      en: 'Important updates regarding service schedules and best practices for maximum pump reliability through the winter.',
      de: 'Wichtige Updates zu Serviceplänen und Best Practices für maximale Pumpenzuverlässigkeit im Winter.',
      ar: 'تحديثات مهمة فيما يتعلق بجداول الخدمة وأفضل الممارسات لتحقيق أقصى قدر من الموثوقية للمضخة خلال فصل الشتاء.'
    },
    content: {
      en: 'As temperatures drop, ensuring your exterior pumping systems remain properly insulated is critical. MMB is releasing updated manuals focusing on frost protection mechanisms and winter start-up procedures for our GM and GMVB line of multistage centrifugal pumps. Scheduled maintenance will be prioritized according to the new winter guidelines.',
      de: 'Da die Temperaturen sinken, ist es wichtig, dass Ihre Außenpumpensysteme ordnungsgemäß isoliert bleiben. MMB veröffentlicht aktualisierte Handbücher mit Schwerpunkt auf Frostschutzmechanismen und im Winter geltenden Startverfahren für unsere GM- und GMVB-Reihe mehrstufiger Kreiselpumpen. Planmäßige Wartungsarbeiten werden gemäß den neuen Winterrichtlinien priorisiert.',
      ar: 'مع انخفاض درجات الحرارة، يعد التأكد من بقاء أنظمة الضخ الخارجية معزولة بشكل صحيح أمرًا بالغ الأهمية. تصدر MMB أدلة محدثة تركز على آليات الحماية من الصقيع وإجراءات بدء التشغيل الشتوي لخط GM و GMVB من مضخات الطرد المركزي متعددة المراحل. سيتم تحديد أولويات الصيانة المجدولة وفقًا لإرشادات الشتاء الجديدة.'
    }
  },
  {
    id: '5',
    slug: 'factory-production-upgrade',
    category: { en: 'Company', de: 'Unternehmen', ar: 'الشركة' },
    date: '2025-11-05',
    image: '/images/abstract-metal.jpg',
    title: {
      en: 'MMB Completes Factory Production Upgrade',
      de: 'MMB schließt Werks-Produktions-Upgrade ab',
      ar: 'MMB تكمل تحديث الإنتاج في المصنع'
    },
    excerpt: {
      en: 'Our manufacturing facility has been modernized to increase production capacity and incorporate advanced quality-testing automation.',
      de: 'Unsere Produktionsstätte wurde modernisiert, um die Produktionskapazität zu erhöhen und eine fortschrittliche Qualitätsprüfungsautomatisierung zu integrieren.',
      ar: 'تم تحديث منشأة التصنيع الخاصة بنا لزيادة القدرة الإنتاجية ودمج أتمتة اختبار الجودة المتقدمة.'
    },
    content: {
      en: 'To keep pace with the growing international demand for robust water solutions, MMB has successfully finalized its phase-two production upgrade. The integration of advanced balancing machines and automated assembly stations will drastically cut down lead times without compromising our trademark German engineering excellence.',
      de: 'Um mit der wachsenden internationalen Nachfrage nach robusten Wasserlösungen Schritt zu halten, hat MMB sein Produktions-Upgrade der Phase zwei erfolgreich abgeschlossen. Die Integration hochmoderner Auswuchtmaschinen und automatisierter Montagestationen wird die Vorlaufzeiten drastisch verkürzen, ohne unsere bezeichnende deutsche Ingenieurskunst zu beeinträchtigen.',
      ar: 'لمواكبة الطلب الدولي المتزايد على حلول المياه القوية، أنهت MMB بنجاح تحديث الإنتاج في مرحلته الثانية. سيؤدي دمج آلات الموازنة المتقدمة ومحطات التجميع الآلية إلى تقليل المهل الزمنية بشكل كبير دون المساس بتميزنا الهندسي الألماني.'
    }
  },
  {
    id: '6',
    slug: 'hiring-engineering-talent',
    category: { en: 'Company', de: 'Unternehmen', ar: 'الشركة' },
    date: '2025-09-22',
    title: {
      en: 'Expanding Our Engineering Team',
      de: 'Erweiterung unseres Ingenieurteams',
      ar: 'توسيع فريق المهندسين لدينا'
    },
    excerpt: {
      en: 'MMB is actively hiring fluid dynamics engineers and technicians to fuel our next generation of sustainable pumping operations.',
      de: 'MMB sucht aktiv nach Ingenieuren und Technikern für Strömungsmechanik, um unsere nächste Generation nachhaltiger Pumpen voranzutreiben.',
      ar: 'تعمل MMB بنشاط على توظيف مهندسي وفنيي ديناميكيات الموائع لتعزيز جيلنا القادم من عمليات الضخ المستدامة.'
    },
    content: {
      en: 'Quality is a habit that requires top-tier talent. MMB is embarking on an expansion phase and currently seeking driven fluid dynamics engineers, mechatronics specialists, and experienced technicians. Check out our careers portal to join a company rooted in enduring reliability.',
      de: 'Qualität ist eine Gewohnheit, die Spitzentalente erfordert. MMB befindet sich in einer Expansionsphase und sucht derzeit engagierte Ingenieure für Strömungsmechanik, Mechatronik-Spezialisten und erfahrene Techniker. Besuchen Sie unser Karriereportal, um sich einem Unternehmen anzuschließen, das auf dauerhafter Zuverlässigkeit basiert.',
      ar: 'الجودة هي عادة تتطلب مواهب من الدرجة الأولى. تشرع MMB في مرحلة توسع وتسعى حاليًا إلى توظيف مهندسي ديناميكيات الموائع والمتخصصين في الميكاترونكس والفنيين ذوي الخبرة. تحقق من بوابة الوظائف لدينا للانضمام إلى شركة متجذرة في الموثوقية الدائمة.'
    }
  }
];
