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
  slug: 'advancing-german-engineering-uncompromised-quality-at-mmb',
  category: { en: 'Company', de: 'Unternehmen', ar: 'الشركة' },
  date: '2026-02-27',
  image: '/images/Firstone.jpeg',
  title: {
    en: 'ADVANCING GERMAN ENGINEERING: UNCOMPROMISED QUALITY AT MMB',
    de: 'DEUTSCHE INGENIEURSKUNST VORANBRINGEN: KOMPROMISSLOSE QUALITÄT BEI MMB',
    ar: 'تطوير الهندسة الألمانية: جودة بلا مساومة في MMB'
  },
  excerpt: {
    en: 'Quality is at the heart of everything we do. MMB continues to upgrade its rigorous testing protocols to ensure every pump and motor meets the highest international standards.',
    de: 'Qualität steht im Mittelpunkt unseres Handelns. MMB entwickelt seine strengen Prüfprotokolle kontinuierlich weiter, um sicherzustellen, dass jede Pumpe und jeder Motor den höchsten internationalen Standards entspricht.',
    ar: 'الجودة هي جوهر كل ما نقوم به. تواصل MMB تطوير بروتوكولات الاختبار الصارمة لديها لضمان أن كل مضخة ومحرك يفيان بأعلى المعايير الدولية.'
  },
  content: {
    en: 'Commitment to Manufacturing Excellence\nAt Morsbach Maschinenbau GmbH (MMB), "German Engineering" is not just a slogan; it is a standard we live by every day. To maintain our position as a leader in industrial pumping solutions, we are continuously refining our manufacturing processes and quality control systems.\n\nEvery multistage and submersible pump that leaves our facilities undergoes strict hydrostatic and performance testing. By combining premium materials like high-grade stainless steel with precision machining, we ensure that our products deliver maximum reliability and extended service life, even in the harshest industrial and agricultural environments.',
    de: 'Verpflichtung zu höchster Fertigungsqualität\nBei der Morsbach Maschinenbau GmbH (MMB) ist „German Engineering“ nicht nur ein Slogan, sondern ein Standard, nach dem wir jeden Tag arbeiten. Um unsere Position als führender Anbieter industrieller Pumpenlösungen zu sichern, verfeinern wir kontinuierlich unsere Fertigungsprozesse und Qualitätskontrollsysteme.\n\nJede mehrstufige und jede Tauchpumpe, die unser Werk verlässt, durchläuft strenge hydrostatische und leistungsbezogene Prüfungen. Durch die Kombination hochwertiger Materialien wie erstklassigem Edelstahl mit präziser Bearbeitung stellen wir sicher, dass unsere Produkte selbst unter härtesten industriellen und landwirtschaftlichen Bedingungen maximale Zuverlässigkeit und eine lange Lebensdauer bieten.',
    ar: 'الالتزام بالتميّز في التصنيع\nفي Morsbach Maschinenbau GmbH (MMB)، لا تُعد "الهندسة الألمانية" مجرد شعار، بل معيارًا نلتزم به كل يوم. وللحفاظ على مكانتنا كشركة رائدة في حلول الضخ الصناعية، فإننا نواصل تحسين عمليات التصنيع وأنظمة مراقبة الجودة بشكل مستمر.\n\nكل مضخة متعددة المراحل وكل مضخة غاطسة تغادر منشآتنا تخضع لاختبارات صارمة للهيدروستاتيك والأداء. ومن خلال الجمع بين المواد الممتازة مثل الستانلس ستيل عالي الجودة والتصنيع الدقيق، نضمن أن تقدم منتجاتنا أعلى درجات الموثوقية وعمر خدمة طويل حتى في أقسى البيئات الصناعية والزراعية.'
  }
},
  {
  id: '2',
  slug: 'advanced-testing-and-inspection-for-submersible-pumps',
  category: { en: 'Company', de: 'Unternehmen', ar: 'الشركة' },
  date: '2026-03-10',
  image: '/images/news2.jpeg',
  title: {
    en: 'ADVANCED TESTING AND INSPECTION FOR SUBMERSIBLE PUMPS',
    de: 'FORTSCHRITTLICHE PRÜF- UND INSPEKTIONSVERFAHREN FÜR TAUCHPUMPEN',
    ar: 'اختبارات وفحوصات متقدمة للمضخات الغاطسة'
  },
  excerpt: {
    en: 'MMB continues to strengthen its testing and inspection procedures to ensure every submersible pump delivers dependable performance in demanding applications.',
    de: 'MMB stärkt kontinuierlich seine Prüf- und Inspektionsverfahren, um sicherzustellen, dass jede Tauchpumpe auch in anspruchsvollen Anwendungen zuverlässig arbeitet.',
    ar: 'تواصل MMB تعزيز إجراءات الاختبار والفحص لضمان أن كل مضخة غاطسة تقدم أداءً موثوقًا في التطبيقات الصعبة.'
  },
  content: {
    en: 'Focused on Performance and Reliability\nAt Morsbach Maschinenbau GmbH (MMB), product performance begins long before installation. Our engineering and production teams work closely to ensure that every submersible pump is tested under controlled conditions that reflect real operational demands.\n\nThrough advanced inspection methods, hydraulic performance checks, and strict material verification, MMB ensures that each unit meets our internal quality benchmarks as well as international expectations. This careful approach helps our pumps achieve stable operation, improved efficiency, and long-term durability in industrial, agricultural, and water supply environments.',
    de: 'Fokus auf Leistung und Zuverlässigkeit\nBei der Morsbach Maschinenbau GmbH (MMB) beginnt die Produktleistung lange vor der Installation. Unsere Engineering- und Produktionsteams arbeiten eng zusammen, um sicherzustellen, dass jede Tauchpumpe unter kontrollierten Bedingungen geprüft wird, die den realen Betriebsanforderungen entsprechen.\n\nDurch fortschrittliche Inspektionsmethoden, hydraulische Leistungsprüfungen und eine strenge Materialverifizierung stellt MMB sicher, dass jede Einheit unsere internen Qualitätsmaßstäbe sowie internationale Erwartungen erfüllt. Dieser sorgfältige Ansatz unterstützt einen stabilen Betrieb, eine verbesserte Effizienz und eine lange Lebensdauer in industriellen, landwirtschaftlichen und Wasserversorgungsanwendungen.',
    ar: 'التركيز على الأداء والموثوقية\nفي Morsbach Maschinenbau GmbH (MMB)، يبدأ أداء المنتج قبل مرحلة التركيب بوقت طويل. يعمل فريقا الهندسة والإنتاج لدينا بشكل متكامل لضمان اختبار كل مضخة غاطسة ضمن ظروف مدروسة تحاكي متطلبات التشغيل الفعلية.\n\nومن خلال أساليب فحص متقدمة واختبارات أداء هيدروليكي دقيقة والتحقق الصارم من جودة المواد، تضمن MMB أن كل وحدة تحقق معايير الجودة الداخلية لدينا وتلبي كذلك التوقعات الدولية. ويساعد هذا النهج الدقيق مضخاتنا على تحقيق تشغيل مستقر وكفاءة أفضل وعمر تشغيلي طويل في التطبيقات الصناعية والزراعية وأنظمة إمداد المياه.'
  }
},
  {
    id: '3',
    slug: 'strategic-partnership-middle-east',
    category: { en: 'Partnership', de: 'Partnerschaft', ar: 'شراكة' },
    date: '2026-01-20',
      image: '/images/news3.jpeg',
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
  }
];
