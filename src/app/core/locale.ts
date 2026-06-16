export const LANGUAGES = [
  'English',
  'हिन्दी',
  'Deutsch',
  'Français',
  'Español',
  'العربية',
] as const;

export const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP', 'AED', 'SGD'] as const;

export type Language = (typeof LANGUAGES)[number];
export type Currency = (typeof CURRENCIES)[number];

const LANGUAGE_CODES: Record<Language, string> = {
  English: 'en',
  'हिन्दी': 'hi',
  Deutsch: 'de',
  Français: 'fr',
  Español: 'es',
  'العربية': 'ar',
};

export function getLanguageCode(language: Language) {
  return LANGUAGE_CODES[language];
}

export function isRtl(language: Language) {
  return language === 'العربية';
}

export const CURRENCY_CONFIG: Record<
  Currency,
  { symbol: string; locale: string; rate: number }
> = {
  INR: { symbol: '₹', locale: 'en-IN', rate: 1 },
  USD: { symbol: '$', locale: 'en-US', rate: 0.012 },
  EUR: { symbol: '€', locale: 'de-DE', rate: 0.011 },
  GBP: { symbol: '£', locale: 'en-GB', rate: 0.0095 },
  AED: { symbol: 'د.إ', locale: 'ar-AE', rate: 0.044 },
  SGD: { symbol: 'S$', locale: 'en-SG', rate: 0.016 },
};

export function formatPrice(
  monthlyInr: number | null,
  currency: Currency,
  yearly: boolean,
  customLabel = 'Custom',
) {
  if (monthlyInr === null) return customLabel;
  const { symbol, locale, rate } = CURRENCY_CONFIG[currency];
  if (monthlyInr === 0) return `${symbol}0`;
  const inrValue = yearly ? Math.round(monthlyInr * 12 * 0.8) : monthlyInr;
  const converted = currency === 'INR' ? inrValue : Math.round(inrValue * rate);
  if (converted === 0) return `${symbol}0`;
  return `${symbol}${converted.toLocaleString(locale)}`;
}

type PricingCopy = {
  eyebrow: string; title: string; description: string;
  monthly: string; yearly: string; save: string;
  perMonth: string; perYear: string; mostPopular: string; custom: string;
  plans: Record<string, { description: string; features: string[]; cta: string }>;
};

type TranslationCopy = {
  nav: Record<string, string>;
  login: string; signUp: string; startFreeTrial: string;
  pricing: PricingCopy;
  // Page content
  hero: {
    badge: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    noCredit: string; trial: string; soc2: string; teams: string;
    uptime: string; downtime: string; faster: string; automated: string; cloud: string;
  };
  features: { eyebrow: string; title: string; description: string };
  aiCopilot: { eyebrow: string; title: string; description: string; powered: string };
  builder: { eyebrow: string; title: string; description: string; aiSuggests: string };
  security: { eyebrow: string; title: string; description: string; certs: string };
  migration: { eyebrow: string; title: string; description: string };
  analytics: { eyebrow: string; title: string; description: string; live: string };
  comparison: { eyebrow: string; title: string; description: string };
  testimonials: { eyebrow: string; title: string; description: string };
  faq: { eyebrow: string; title: string; description: string; searchPlaceholder: string; noResults: string; contactSupport: string };
  finalCta: { badge: string; title: string; description: string; ctaPrimary: string; ctaSecondary: string; noCredit: string; trial: string; cancel: string; soc2: string };
  footer: { description: string; subscribe: string; subscribeBtn: string; privacy: string; terms: string; cookies: string; operational: string };
  stats: { uptime: string; downtime: string; faster: string; automated: string; cloud: string };
  securityStats: { encrypted: string; uptime: string; requests: string; breaches: string };
};

export const translations: Record<Language, TranslationCopy> = {
  English: {
    nav: { Product: 'Product', Features: 'Features', Solutions: 'Solutions', Pricing: 'Pricing', Resources: 'Resources', Security: 'Security', Contact: 'Contact' },
    login: 'Login', signUp: 'Sign Up', startFreeTrial: 'Start Free Trial',
    pricing: {
      eyebrow: 'Pricing', title: 'Simple, Transparent Pricing',
      description: 'Start free forever. Upgrade as you grow. No hidden fees, no vendor lock-in.',
      monthly: 'Monthly', yearly: 'Yearly', save: 'Save 20%', perMonth: 'month', perYear: 'year', mostPopular: 'Most Popular', custom: 'Custom',
      plans: {
        Free: { description: 'For small teams getting started.', features: ['Up to 10 employees', 'Basic HR tools', 'Leave management', 'Employee directory', 'Community support'], cta: 'Start Free' },
        Growth: { description: 'For scaling teams that need automation.', features: ['Up to 100 employees', 'Onboarding', 'Asset management', 'Analytics', 'AI chatbot', 'Email support'], cta: 'Start Free Trial' },
        Business: { description: 'For growing companies with complex needs.', features: ['Up to 500 employees', 'Advanced workflows', 'Project management', 'Custom dashboards', 'Priority support', 'API access'], cta: 'Start Free Trial' },
        Enterprise: { description: 'For large, global organizations.', features: ['Unlimited employees', 'Multi-tenant management', 'White-labeling', 'Custom integrations', 'Dedicated support', 'SLA guarantees', 'Advanced security'], cta: 'Book Enterprise Demo' },
      },
    },
    hero: { badge: 'AI-first HR platform · Now with HR Copilot', subtitle: 'Manage employees, projects, assets, onboarding, compliance, and workforce intelligence from one intelligent platform — powered by AI, designed for the enterprise.', ctaPrimary: 'Start Free Forever', ctaSecondary: 'Book Demo', noCredit: 'No credit card', trial: '14-day trial', soc2: 'SOC 2 ready', teams: '2,800+ teams', uptime: 'Uptime SLA', downtime: 'Downtime Deploys', faster: 'Faster HR Ops', automated: 'Workflows Automated', cloud: 'Cloud Native' },
    features: { eyebrow: 'Everything HR, unified', title: 'One platform for the entire employee lifecycle', description: 'From the first interview to performance reviews, run every HR workflow in a single, beautifully designed system.' },
    aiCopilot: { eyebrow: 'HR AI Copilot', title: 'Meet Your HR AI Copilot', description: 'Get instant answers, automate decisions, and surface workforce intelligence — all from a conversational assistant trained on your organization.', powered: 'Powered by our proprietary' },
    builder: { eyebrow: 'No-code customization', title: 'Build Your HRMS Your Way', description: 'Assemble dashboards, forms, and modules with a fully visual builder. No engineering required.', aiSuggests: 'AI suggests the best layout for your team' },
    security: { eyebrow: 'Security', title: 'Security Without Compromise', description: 'Enterprise-grade protection engineered into every layer of the platform, so your most sensitive workforce data stays safe.', certs: 'Certifications:' },
    migration: { eyebrow: 'Seamless migration', title: 'Switch to Knodtecone in Days, Not Months', description: 'Move your entire workforce data over without disruption — validated, mapped, and ready in record time.' },
    analytics: { eyebrow: 'Workforce intelligence', title: 'Real-Time Workforce Intelligence', description: 'Live dashboards turn raw HR data into decisions — attendance, attrition, hiring funnels, and department insights at a glance.', live: 'live' },
    comparison: { eyebrow: 'Why Knodtecone', title: 'Built Different from Traditional HRMS', description: 'See how a modern, AI-native platform compares to the legacy systems holding your team back.' },
    testimonials: { eyebrow: 'Testimonials', title: 'Loved by Teams Building the Future', description: 'HR leaders, founders, and operators trust Knodtecone to run their most important asset — their people.' },
    faq: { eyebrow: 'FAQ', title: 'Frequently Asked Questions', description: 'Everything you need to know about Knodtecone. Can\'t find an answer? Reach out to our team.', searchPlaceholder: 'Search FAQs…', noResults: 'No questions match', contactSupport: 'Contact support' },
    finalCta: { badge: 'Now with HR Copilot GA', title: 'Transform HR Operations with AI', description: 'Join organizations building the future of workforce management. Get started in minutes — no credit card required.', ctaPrimary: 'Start Free Forever', ctaSecondary: 'Schedule Demo', noCredit: 'No credit card', trial: '14-day free trial', cancel: 'Cancel anytime', soc2: 'SOC 2 ready' },
    footer: { description: 'The AI-powered HRMS built for the future of work. Manage your entire workforce from one unified, intelligent platform.', subscribe: 'Subscribe to our newsletter', subscribeBtn: 'Subscribe', privacy: 'Privacy Policy', terms: 'Terms of Service', cookies: 'Cookie Settings', operational: 'All systems operational' },
    stats: { uptime: 'Uptime SLA', downtime: 'Downtime Deploys', faster: 'Faster HR Ops', automated: 'Workflows Automated', cloud: 'Cloud Native' },
    securityStats: { encrypted: 'End-to-End Encrypted', uptime: 'Uptime SLA', requests: 'M Requests / Month', breaches: 'Security Breaches' },
  },
  'हिन्दी': {
    nav: { Product: 'उत्पाद', Features: 'विशेषताएँ', Solutions: 'समाधान', Pricing: 'मूल्य', Resources: 'संसाधन', Security: 'सुरक्षा', Contact: 'संपर्क' },
    login: 'लॉगिन', signUp: 'साइन अप', startFreeTrial: 'मुफ़्त ट्रायल',
    pricing: {
      eyebrow: 'मूल्य', title: 'सरल, पारदर्शी मूल्य निर्धारण',
      description: 'हमेशा मुफ़्त शुरू करें। बढ़ने पर अपग्रेड करें। कोई छिपी फीस नहीं।',
      monthly: 'मासिक', yearly: 'वार्षिक', save: '20% बचाएँ', perMonth: 'माह', perYear: 'वर्ष', mostPopular: 'सबसे लोकप्रिय', custom: 'कस्टम',
      plans: {
        Free: { description: 'शुरुआती छोटी टीमों के लिए।', features: ['10 कर्मचारियों तक', 'बुनियादी HR टूल', 'अवकाश प्रबंधन', 'कर्मचारी निर्देशिका', 'सामुदायिक सहायता'], cta: 'मुफ़्त शुरू करें' },
        Growth: { description: 'स्वचालन चाहने वाली बढ़ती टीमों के लिए।', features: ['100 कर्मचारियों तक', 'ऑनबोर्डिंग', 'संपत्ति प्रबंधन', 'एनालिटिक्स', 'AI चैटबॉट', 'ईमेल सहायता'], cta: 'मुफ़्त ट्रायल' },
        Business: { description: 'जटिल जरूरतों वाली बढ़ती कंपनियों के लिए।', features: ['500 कर्मचारियों तक', 'उन्नत वर्कफ़्लो', 'प्रोजेक्ट प्रबंधन', 'कस्टम डैशबोर्ड', 'प्राथमिकता सहायता', 'API एक्सेस'], cta: 'मुफ़्त ट्रायल' },
        Enterprise: { description: 'बड़े, वैश्विक संगठनों के लिए।', features: ['असीमित कर्मचारी', 'मल्टी-टेनेंट प्रबंधन', 'व्हाइट-लेबलिंग', 'कस्टम इंटीग्रेशन', 'समर्पित सहायता', 'SLA गारंटी', 'उन्नत सुरक्षा'], cta: 'एंटरप्राइज़ डेमो बुक करें' },
      },
    },
    hero: { badge: 'AI-प्रथम HR प्लेटफ़ॉर्म · अब HR Copilot के साथ', subtitle: 'कर्मचारियों, प्रोजेक्ट्स, संपत्तियों, ऑनबोर्डिंग, अनुपालन और कार्यबल बुद्धिमत्ता को एक ही बुद्धिमान प्लेटफ़ॉर्म से प्रबंधित करें — AI द्वारा संचालित, एंटरप्राइज़ के लिए डिज़ाइन किया गया।', ctaPrimary: 'हमेशा मुफ़्त शुरू करें', ctaSecondary: 'डेमो बुक करें', noCredit: 'कोई क्रेडिट कार्ड नहीं', trial: '14-दिन का ट्रायल', soc2: 'SOC 2 तैयार', teams: '2,800+ टीमें', uptime: 'अपटाइम SLA', downtime: 'डाउनटाइम डिप्लॉय', faster: 'तेज़ HR संचालन', automated: 'स्वचालित वर्कफ़्लो', cloud: 'क्लाउड नेटिव' },
    features: { eyebrow: 'सब कुछ HR, एकीकृत', title: 'संपूर्ण कर्मचारी जीवनचक्र के लिए एक प्लेटफ़ॉर्म', description: 'पहले इंटरव्यू से लेकर प्रदर्शन समीक्षा तक, सभी HR वर्कफ़्लो को एक ही खूबसूरत सिस्टम में चलाएं।' },
    aiCopilot: { eyebrow: 'HR AI Copilot', title: 'अपने HR AI Copilot से मिलें', description: 'तुरंत उत्तर प्राप्त करें, निर्णयों को स्वचालित करें और कार्यबल बुद्धिमत्ता प्राप्त करें — एक संवादी सहायक से जो आपके संगठन पर प्रशिक्षित है।', powered: 'हमारे स्वामित्व द्वारा संचालित' },
    builder: { eyebrow: 'नो-कोड अनुकूलन', title: 'अपना HRMS अपने तरीके से बनाएं', description: 'पूरी तरह से विज़ुअल बिल्डर के साथ डैशबोर्ड, फ़ॉर्म और मॉड्यूल तैयार करें। किसी इंजीनियरिंग की आवश्यकता नहीं।', aiSuggests: 'AI आपकी टीम के लिए सर्वश्रेष्ठ लेआउट सुझाता है' },
    security: { eyebrow: 'सुरक्षा', title: 'बिना समझौता सुरक्षा', description: 'एंटरप्राइज़-ग्रेड सुरक्षा प्लेटफ़ॉर्म की हर परत में निर्मित, ताकि आपका सबसे संवेदनशील कार्यबल डेटा सुरक्षित रहे।', certs: 'प्रमाणपत्र:' },
    migration: { eyebrow: 'सहज माइग्रेशन', title: 'महीनों में नहीं, दिनों में Knodtecone पर स्विच करें', description: 'अपना संपूर्ण कार्यबल डेटा बिना किसी रुकावट के स्थानांतरित करें — मान्य, मैप और रिकॉर्ड समय में तैयार।' },
    analytics: { eyebrow: 'कार्यबल बुद्धिमत्ता', title: 'रीयल-टाइम कार्यबल बुद्धिमत्ता', description: 'लाइव डैशबोर्ड कच्चे HR डेटा को निर्णयों में बदलते हैं — उपस्थिति, आकर्षण, भर्ती फ़नल और विभाग अंतर्दृष्टि एक नज़र में।', live: 'लाइव' },
    comparison: { eyebrow: 'क्यों Knodtecone', title: 'पारंपरिक HRMS से अलग बनाया गया', description: 'देखें कि कैसे एक आधुनिक, AI-नेटिव प्लेटफ़ॉर्म पुराने सिस्टम से तुलना करता है।' },
    testimonials: { eyebrow: 'प्रशंसापत्र', title: 'भविष्य बनाने वाली टीमों द्वारा पसंद किया गया', description: 'HR नेता, संस्थापक और ऑपरेटर अपने सबसे महत्वपूर्ण संपत्ति — उनके लोगों को चलाने के लिए Knodtecone पर भरोसा करते हैं।' },
    faq: { eyebrow: 'सामान्य प्रश्न', title: 'अक्सर पूछे जाने वाले प्रश्न', description: 'Knodtecone के बारे में वह सब कुछ जो आपको जानना चाहिए। उत्तर नहीं मिल रहा? हमारी टीम से संपर्क करें।', searchPlaceholder: 'FAQ खोजें…', noResults: 'कोई प्रश्न मेल नहीं खाता', contactSupport: 'सहायता से संपर्क करें' },
    finalCta: { badge: 'अब HR Copilot GA के साथ', title: 'AI के साथ HR संचालन को बदलें', description: 'कार्यबल प्रबंधन का भविष्य बनाने वाले संगठनों से जुड़ें। मिनटों में शुरू करें — कोई क्रेडिट कार्ड नहीं।', ctaPrimary: 'हमेशा मुफ़्त शुरू करें', ctaSecondary: 'डेमो शेड्यूल करें', noCredit: 'कोई क्रेडिट कार्ड नहीं', trial: '14-दिन मुफ़्त ट्रायल', cancel: 'कभी भी रद्द करें', soc2: 'SOC 2 तैयार' },
    footer: { description: 'भविष्य के काम के लिए AI-संचालित HRMS। अपने संपूर्ण कार्यबल को एक एकीकृत, बुद्धिमान प्लेटफ़ॉर्म से प्रबंधित करें।', subscribe: 'हमारे न्यूज़लेटर की सदस्यता लें', subscribeBtn: 'सदस्यता लें', privacy: 'गोपनीयता नीति', terms: 'सेवा की शर्तें', cookies: 'कुकी सेटिंग्स', operational: 'सभी सिस्टम चालू हैं' },
    stats: { uptime: 'अपटाइम SLA', downtime: 'डाउनटाइम डिप्लॉयमेंट', faster: 'तेज़ HR संचालन', automated: 'स्वचालित वर्कफ़्लो', cloud: 'क्लाउड नेटिव' },
    securityStats: { encrypted: 'एंड-टू-एंड एन्क्रिप्टेड', uptime: 'अपटाइम SLA', requests: 'मिलियन अनुरोध/माह', breaches: 'सुरक्षा उल्लंघन' },
  },
  Deutsch: {
    nav: { Product: 'Produkt', Features: 'Funktionen', Solutions: 'Lösungen', Pricing: 'Preise', Resources: 'Ressourcen', Security: 'Sicherheit', Contact: 'Kontakt' },
    login: 'Anmelden', signUp: 'Registrieren', startFreeTrial: 'Kostenlos testen',
    pricing: {
      eyebrow: 'Preise', title: 'Einfache, transparente Preise',
      description: 'Starten Sie kostenlos. Upgraden Sie mit Ihrem Wachstum. Keine versteckten Gebühren.',
      monthly: 'Monatlich', yearly: 'Jährlich', save: '20 % sparen', perMonth: 'Monat', perYear: 'Jahr', mostPopular: 'Am beliebtesten', custom: 'Individuell',
      plans: {
        Free: { description: 'Für kleine Teams zum Einstieg.', features: ['Bis zu 10 Mitarbeitende', 'Basis-HR-Tools', 'Urlaubsverwaltung', 'Mitarbeiterverzeichnis', 'Community-Support'], cta: 'Kostenlos starten' },
        Growth: { description: 'Für wachsende Teams mit Automatisierungsbedarf.', features: ['Bis zu 100 Mitarbeitende', 'Onboarding', 'Asset-Management', 'Analysen', 'KI-Chatbot', 'E-Mail-Support'], cta: 'Kostenlos testen' },
        Business: { description: 'Für wachsende Unternehmen mit komplexen Anforderungen.', features: ['Bis zu 500 Mitarbeitende', 'Erweiterte Workflows', 'Projektmanagement', 'Individuelle Dashboards', 'Prioritäts-Support', 'API-Zugang'], cta: 'Kostenlos testen' },
        Enterprise: { description: 'Für große, globale Organisationen.', features: ['Unbegrenzte Mitarbeitende', 'Multi-Tenant-Verwaltung', 'White-Labeling', 'Individuelle Integrationen', 'Dedizierter Support', 'SLA-Garantien', 'Erweiterte Sicherheit'], cta: 'Enterprise-Demo buchen' },
      },
    },
    hero: { badge: 'KI-First HR-Plattform · Jetzt mit HR Copilot', subtitle: 'Verwalten Sie Mitarbeiter, Projekte, Anlagen, Onboarding, Compliance und Workforce Intelligence von einer intelligenten Plattform aus — unterstützt durch KI, entwickelt für das Unternehmen.', ctaPrimary: 'Für immer kostenlos starten', ctaSecondary: 'Demo buchen', noCredit: 'Keine Kreditkarte', trial: '14-tägige Testversion', soc2: 'SOC 2 bereit', teams: '2.800+ Teams', uptime: 'Betriebszeit SLA', downtime: 'Ausfallzeiten', faster: 'Schnellere HR-Abläufe', automated: 'Automatisierte Workflows', cloud: 'Cloud-nativ' },
    features: { eyebrow: 'Alles HR, vereint', title: 'Eine Plattform für den gesamten Mitarbeiterlebenszyklus', description: 'Vom ersten Vorstellungsgespräch bis zur Leistungsbeurteilung führen Sie alle HR-Workflows in einem einzigen, schön gestalteten System aus.' },
    aiCopilot: { eyebrow: 'HR AI Copilot', title: 'Lernen Sie Ihren HR AI Copilot kennen', description: 'Erhalten Sie sofortige Antworten, automatisieren Sie Entscheidungen und gewinnen Sie Einblicke in Ihre Belegschaft — alles von einem KI-Assistenten, der auf Ihr Unternehmen trainiert wurde.', powered: 'Angetrieben von unserem eigenen' },
    builder: { eyebrow: 'No-Code-Anpassung', title: 'Bauen Sie Ihr HRMS nach Ihren Vorstellungen', description: 'Erstellen Sie Dashboards, Formulare und Module mit einem vollständig visuellen Builder. Keine Programmierkenntnisse erforderlich.', aiSuggests: 'KI schlägt das beste Layout für Ihr Team vor' },
    security: { eyebrow: 'Sicherheit', title: 'Sicherheit ohne Kompromisse', description: 'Enterprise-Grade-Schutz, der in jede Ebene der Plattform integriert ist, damit Ihre sensibelsten Mitarbeiterdaten sicher bleiben.', certs: 'Zertifizierungen:' },
    migration: { eyebrow: 'Nahtlose Migration', title: 'Wechseln Sie in Tagen zu Knodtecone, nicht in Monaten', description: 'Übertragen Sie Ihre gesamten Mitarbeiterdaten ohne Unterbrechung — validiert, zugeordnet und in Rekordzeit bereit.' },
    analytics: { eyebrow: 'Workforce Intelligence', title: 'Echtzeit-Workforce-Intelligence', description: 'Live-Dashboards verwandeln Rohdaten in Entscheidungen — Anwesenheit, Fluktuation, Einstellungstrichter und Abteilungseinblicke auf einen Blick.', live: 'live' },
    comparison: { eyebrow: 'Warum Knodtecone', title: 'Anders als traditionelle HRMS', description: 'Sehen Sie, wie eine moderne, KI-native Plattform im Vergleich zu den Altsystemen abschneidet, die Ihr Team zurückhalten.' },
    testimonials: { eyebrow: 'Testimonials', title: 'Geliebt von Teams, die die Zukunft gestalten', description: 'HR-Leiter, Gründer und Betreiber vertrauen Knodtecone für ihr wichtigstes Kapital — ihre Mitarbeiter.' },
    faq: { eyebrow: 'FAQ', title: 'Häufig gestellte Fragen', description: 'Alles, was Sie über Knodtecone wissen müssen. Keine Antwort gefunden? Kontaktieren Sie unser Team.', searchPlaceholder: 'FAQ durchsuchen…', noResults: 'Keine passenden Fragen', contactSupport: 'Support kontaktieren' },
    finalCta: { badge: 'Jetzt mit HR Copilot GA', title: 'HR-Operationen mit KI transformieren', description: 'Schließen Sie sich Unternehmen an, die die Zukunft des Workforce-Managements gestalten. In Minuten starten — keine Kreditkarte erforderlich.', ctaPrimary: 'Für immer kostenlos starten', ctaSecondary: 'Demo vereinbaren', noCredit: 'Keine Kreditkarte', trial: '14-tägige kostenlose Testversion', cancel: 'Jederzeit kündbar', soc2: 'SOC 2 bereit' },
    footer: { description: 'Das KI-gestützte HRMS für die Zukunft der Arbeit. Verwalten Sie Ihre gesamte Belegschaft von einer einheitlichen, intelligenten Plattform aus.', subscribe: 'Abonnieren Sie unseren Newsletter', subscribeBtn: 'Abonnieren', privacy: 'Datenschutzerklärung', terms: 'Nutzungsbedingungen', cookies: 'Cookie-Einstellungen', operational: 'Alle Systeme betriebsbereit' },
    stats: { uptime: 'Betriebszeit SLA', downtime: 'Ausfallzeiten', faster: 'Schnellere HR-Abläufe', automated: 'Automatisierte Workflows', cloud: 'Cloud-nativ' },
    securityStats: { encrypted: 'Ende-zu-Ende verschlüsselt', uptime: 'Betriebszeit SLA', requests: 'Mio. Anfragen/Monat', breaches: 'Sicherheitsverletzungen' },
  },
  Français: {
    nav: { Product: 'Produit', Features: 'Fonctionnalités', Solutions: 'Solutions', Pricing: 'Tarifs', Resources: 'Ressources', Security: 'Sécurité', Contact: 'Contact' },
    login: 'Connexion', signUp: 'S\'inscrire', startFreeTrial: 'Essai gratuit',
    pricing: {
      eyebrow: 'Tarifs', title: 'Tarification simple et transparente',
      description: 'Commencez gratuitement. Évoluez à votre rythme. Aucun frais caché.',
      monthly: 'Mensuel', yearly: 'Annuel', save: 'Économisez 20 %', perMonth: 'mois', perYear: 'an', mostPopular: 'Le plus populaire', custom: 'Sur mesure',
      plans: {
        Free: { description: 'Pour les petites équipes qui démarrent.', features: ['Jusqu\'à 10 employés', 'Outils RH de base', 'Gestion des congés', 'Annuaire des employés', 'Support communautaire'], cta: 'Commencer gratuitement' },
        Growth: { description: 'Pour les équipes en croissance qui ont besoin d\'automatisation.', features: ['Jusqu\'à 100 employés', 'Intégration', 'Gestion des actifs', 'Analyses', 'Chatbot IA', 'Support par e-mail'], cta: 'Essai gratuit' },
        Business: { description: 'Pour les entreprises en croissance aux besoins complexes.', features: ['Jusqu\'à 500 employés', 'Workflows avancés', 'Gestion de projet', 'Tableaux de bord personnalisés', 'Support prioritaire', 'Accès API'], cta: 'Essai gratuit' },
        Enterprise: { description: 'Pour les grandes organisations mondiales.', features: ['Employés illimités', 'Gestion multi-locataire', 'Marque blanche', 'Intégrations personnalisées', 'Support dédié', 'Garanties SLA', 'Sécurité avancée'], cta: 'Réserver une démo Enterprise' },
      },
    },
    hero: { badge: 'Plateforme RH IA-first · Maintenant avec HR Copilot', subtitle: 'Gérez les employés, projets, actifs, intégration, conformité et intelligence des effectifs depuis une seule plateforme intelligente — propulsée par l\'IA, conçue pour l\'entreprise.', ctaPrimary: 'Commencer gratuitement', ctaSecondary: 'Réserver une démo', noCredit: 'Pas de carte de crédit', trial: 'Essai de 14 jours', soc2: 'SOC 2 prêt', teams: '2 800+ équipes', uptime: 'SLA de disponibilité', downtime: 'Déploiements sans interruption', faster: 'Opérations RH plus rapides', automated: 'Workflows automatisés', cloud: 'Cloud natif' },
    features: { eyebrow: 'Tout RH, unifié', title: 'Une plateforme pour tout le cycle de vie des employés', description: 'Du premier entretien aux évaluations de performance, gérez tous les workflows RH dans un seul système magnifiquement conçu.' },
    aiCopilot: { eyebrow: 'HR AI Copilot', title: 'Rencontrez votre HR AI Copilot', description: 'Obtenez des réponses instantanées, automatisez les décisions et révélez l\'intelligence des effectifs — le tout depuis un assistant conversationnel formé sur votre organisation.', powered: 'Propulsé par notre' },
    builder: { eyebrow: 'Personnalisation sans code', title: 'Construisez votre HRMS à votre façon', description: 'Assemblez des tableaux de bord, formulaires et modules avec un constructeur entièrement visuel. Aucune compétence en ingénierie requise.', aiSuggests: 'L\'IA suggère la meilleure disposition pour votre équipe' },
    security: { eyebrow: 'Sécurité', title: 'Une sécurité sans compromis', description: 'Une protection de niveau entreprise conçue dans chaque couche de la plateforme, afin que vos données les plus sensibles restent en sécurité.', certs: 'Certifications :' },
    migration: { eyebrow: 'Migration transparente', title: 'Passez à Knodtecone en quelques jours, pas des mois', description: 'Transférez toutes vos données RH sans perturbation — validées, mappées et prêtes en un temps record.' },
    analytics: { eyebrow: 'Intelligence des effectifs', title: 'Intelligence des effectifs en temps réel', description: 'Les tableaux de bord en direct transforment les données RH brutes en décisions — présence, attrition, entonnoirs de recrutement et informations départementales en un coup d\'œil.', live: 'en direct' },
    comparison: { eyebrow: 'Pourquoi Knodtecone', title: 'Conçu différemment des HRMS traditionnels', description: 'Découvrez comment une plateforme moderne et native IA se compare aux systèmes existants qui freinent votre équipe.' },
    testimonials: { eyebrow: 'Témoignages', title: 'Adoré par les équipes qui construisent l\'avenir', description: 'Les responsables RH, fondateurs et opérateurs font confiance à Knodtecone pour gérer leur actif le plus important — leurs collaborateurs.' },
    faq: { eyebrow: 'FAQ', title: 'Foire aux questions', description: 'Tout ce que vous devez savoir sur Knodtecone. Vous ne trouvez pas de réponse ? Contactez notre équipe.', searchPlaceholder: 'Rechercher dans la FAQ…', noResults: 'Aucune question ne correspond', contactSupport: 'Contacter le support' },
    finalCta: { badge: 'Maintenant avec HR Copilot GA', title: 'Transformez les opérations RH avec l\'IA', description: 'Rejoignez les organisations qui construisent l\'avenir de la gestion des effectifs. Commencez en quelques minutes — aucune carte de crédit requise.', ctaPrimary: 'Commencer gratuitement', ctaSecondary: 'Planifier une démo', noCredit: 'Pas de carte de crédit', trial: 'Essai gratuit de 14 jours', cancel: 'Annuler à tout moment', soc2: 'SOC 2 prêt' },
    footer: { description: 'Le SIRH alimenté par l\'IA pour l\'avenir du travail. Gérez l\'ensemble de vos effectifs depuis une plateforme unifiée et intelligente.', subscribe: 'Abonnez-vous à notre newsletter', subscribeBtn: 'S\'abonner', privacy: 'Politique de confidentialité', terms: 'Conditions d\'utilisation', cookies: 'Paramètres des cookies', operational: 'Tous les systèmes opérationnels' },
    stats: { uptime: 'SLA de disponibilité', downtime: 'Déploiements sans interruption', faster: 'Opérations RH plus rapides', automated: 'Workflows automatisés', cloud: 'Cloud natif' },
    securityStats: { encrypted: 'Chiffré de bout en bout', uptime: 'SLA de disponibilité', requests: 'M de requêtes/mois', breaches: 'Failles de sécurité' },
  },
  Español: {
    nav: { Product: 'Producto', Features: 'Funciones', Solutions: 'Soluciones', Pricing: 'Precios', Resources: 'Recursos', Security: 'Seguridad', Contact: 'Contacto' },
    login: 'Iniciar sesión', signUp: 'Registrarse', startFreeTrial: 'Prueba gratuita',
    pricing: {
      eyebrow: 'Precios', title: 'Precios simples y transparentes',
      description: 'Empieza gratis. Mejora según crezcas. Sin tarifas ocultas ni permanencia.',
      monthly: 'Mensual', yearly: 'Anual', save: 'Ahorra 20 %', perMonth: 'mes', perYear: 'año', mostPopular: 'Más popular', custom: 'Personalizado',
      plans: {
        Free: { description: 'Para equipos pequeños que empiezan.', features: ['Hasta 10 empleados', 'Herramientas HR básicas', 'Gestión de permisos', 'Directorio de empleados', 'Soporte comunitario'], cta: 'Empezar gratis' },
        Growth: { description: 'Para equipos en crecimiento que necesitan automatización.', features: ['Hasta 100 empleados', 'Incorporación', 'Gestión de activos', 'Analítica', 'Chatbot de IA', 'Soporte por correo'], cta: 'Prueba gratuita' },
        Business: { description: 'Para empresas en crecimiento con necesidades complejas.', features: ['Hasta 500 empleados', 'Flujos avanzados', 'Gestión de proyectos', 'Paneles personalizados', 'Soporte prioritario', 'Acceso API'], cta: 'Prueba gratuita' },
        Enterprise: { description: 'Para grandes organizaciones globales.', features: ['Empleados ilimitados', 'Gestión multiinquilino', 'Marca blanca', 'Integraciones personalizadas', 'Soporte dedicado', 'Garantías SLA', 'Seguridad avanzada'], cta: 'Reservar demo Enterprise' },
      },
    },
    hero: { badge: 'Plataforma HR primero IA · Ahora con HR Copilot', subtitle: 'Gestione empleados, proyectos, activos, incorporación, cumplimiento e inteligencia laboral desde una plataforma inteligente — impulsada por IA, diseñada para la empresa.', ctaPrimary: 'Empezar gratis para siempre', ctaSecondary: 'Reservar demo', noCredit: 'Sin tarjeta de crédito', trial: 'Prueba de 14 días', soc2: 'SOC 2 listo', teams: '2.800+ equipos', uptime: 'SLA de tiempo activo', downtime: 'Implementaciones sin tiempo de inactividad', faster: 'Operaciones RH más rápidas', automated: 'Flujos de trabajo automatizados', cloud: 'Nube nativa' },
    features: { eyebrow: 'Todo RH, unificado', title: 'Una plataforma para todo el ciclo de vida del empleado', description: 'Desde la primera entrevista hasta las evaluaciones de rendimiento, ejecute todos los flujos de trabajo de RRHH en un único sistema bellamente diseñado.' },
    aiCopilot: { eyebrow: 'HR AI Copilot', title: 'Conoce a tu HR AI Copilot', description: 'Obtenga respuestas instantáneas, automatice decisiones y descubra inteligencia laboral — todo desde un asistente conversacional entrenado en su organización.', powered: 'Desarrollado por nuestro' },
    builder: { eyebrow: 'Personalización sin código', title: 'Construye tu HRMS a tu manera', description: 'Monte paneles, formularios y módulos con un constructor completamente visual. Sin necesidad de ingeniería.', aiSuggests: 'La IA sugiere el mejor diseño para tu equipo' },
    security: { eyebrow: 'Seguridad', title: 'Seguridad sin compromisos', description: 'Protección de grado empresarial diseñada en cada capa de la plataforma, para que sus datos más sensibles estén seguros.', certs: 'Certificaciones:' },
    migration: { eyebrow: 'Migración sin problemas', title: 'Cambie a Knodtecone en días, no meses', description: 'Transfiera todos sus datos de RRHH sin interrupciones — validados, mapeados y listos en tiempo récord.' },
    analytics: { eyebrow: 'Inteligencia laboral', title: 'Inteligencia laboral en tiempo real', description: 'Los paneles en vivo convierten los datos brutos de RRHH en decisiones — asistencia, rotación, embudos de contratación e información departamental de un vistazo.', live: 'en vivo' },
    comparison: { eyebrow: 'Por qué Knodtecone', title: 'Construido de manera diferente a los HRMS tradicionales', description: 'Vea cómo una plataforma moderna y nativa de IA se compara con los sistemas heredados que frenan a su equipo.' },
    testimonials: { eyebrow: 'Testimonios', title: 'Amado por los equipos que construyen el futuro', description: 'Líderes de RRHH, fundadores y operadores confían en Knodtecone para gestionar su activo más importante — sus personas.' },
    faq: { eyebrow: 'Preguntas frecuentes', title: 'Preguntas frecuentes', description: 'Todo lo que necesita saber sobre Knodtecone. ¿No encuentra respuesta? Póngase en contacto con nuestro equipo.', searchPlaceholder: 'Buscar en preguntas frecuentes…', noResults: 'No hay preguntas que coincidan', contactSupport: 'Contactar con soporte' },
    finalCta: { badge: 'Ahora con HR Copilot GA', title: 'Transforme las operaciones de RRHH con IA', description: 'Únase a las organizaciones que construyen el futuro de la gestión laboral. Comience en minutos — sin tarjeta de crédito.', ctaPrimary: 'Empezar gratis para siempre', ctaSecondary: 'Programar demo', noCredit: 'Sin tarjeta de crédito', trial: 'Prueba gratuita de 14 días', cancel: 'Cancelar en cualquier momento', soc2: 'SOC 2 listo' },
    footer: { description: 'El HRMS impulsado por IA para el futuro del trabajo. Gestione toda su fuerza laboral desde una plataforma unificada e inteligente.', subscribe: 'Suscríbase a nuestro boletín', subscribeBtn: 'Suscribirse', privacy: 'Política de privacidad', terms: 'Términos del servicio', cookies: 'Configuración de cookies', operational: 'Todos los sistemas operativos' },
    stats: { uptime: 'SLA de tiempo activo', downtime: 'Implementaciones sin tiempo de inactividad', faster: 'Operaciones RH más rápidas', automated: 'Flujos de trabajo automatizados', cloud: 'Nube nativa' },
    securityStats: { encrypted: 'Cifrado de extremo a extremo', uptime: 'SLA de tiempo activo', requests: 'M de solicitudes/mes', breaches: 'Violaciones de seguridad' },
  },
  'العربية': {
    nav: { Product: 'المنتج', Features: 'الميزات', Solutions: 'الحلول', Pricing: 'الأسعار', Resources: 'الموارد', Security: 'الأمان', Contact: 'اتصل بنا' },
    login: 'تسجيل الدخول', signUp: 'إنشاء حساب', startFreeTrial: 'ابدأ التجربة المجانية',
    pricing: {
      eyebrow: 'الأسعار', title: 'أسعار بسيطة وشفافة',
      description: 'ابدأ مجانًا إلى الأبد. قم بالترقية مع نموك. بدون رسوم خفية أو التزام.',
      monthly: 'شهري', yearly: 'سنوي', save: 'وفّر 20%', perMonth: 'شهر', perYear: 'سنة', mostPopular: 'الأكثر شعبية', custom: 'مخصص',
      plans: {
        Free: { description: 'للفرق الصغيرة التي تبدأ.', features: ['حتى 10 موظفين', 'أدوات موارد بشرية أساسية', 'إدارة الإجازات', 'دليل الموظفين', 'دعم المجتمع'], cta: 'ابدأ مجانًا' },
        Growth: { description: 'للفرق المتنامية التي تحتاج إلى أتمتة.', features: ['حتى 100 موظف', 'التهيئة', 'إدارة الأصول', 'التحليلات', 'روبوت محادثة بالذكاء الاصطناعي', 'دعم عبر البريد'], cta: 'ابدأ التجربة المجانية' },
        Business: { description: 'للشركات المتنامية ذات الاحتياجات المعقدة.', features: ['حتى 500 موظف', 'سير عمل متقدم', 'إدارة المشاريع', 'لوحات معلومات مخصصة', 'دعم ذو أولوية', 'وصول API'], cta: 'ابدأ التجربة المجانية' },
        Enterprise: { description: 'للمؤسسات الكبيرة العالمية.', features: ['موظفون بلا حدود', 'إدارة متعددة المستأجرين', 'علامة بيضاء', 'تكاملات مخصصة', 'دعم مخصص', 'ضمانات SLA', 'أمان متقدم'], cta: 'احجز عرض Enterprise' },
      },
    },
    hero: { badge: 'منصة HR أولاً بالذكاء الاصطناعي · الآن مع HR Copilot', subtitle: 'قم بإدارة الموظفين والمشاريع والأصول والتأهيل والامتثال وذكاء القوى العاملة من منصة واحدة ذكية — مدعومة بالذكاء الاصطناعي، مصممة للمؤسسات.', ctaPrimary: 'ابدأ مجانًا إلى الأبد', ctaSecondary: 'احجز عرضًا توضيحيًا', noCredit: 'لا حاجة لبطاقة ائتمان', trial: 'تجربة 14 يومًا', soc2: 'SOC 2 جاهز', teams: 'أكثر من 2,800 فريق', uptime: 'ضمان وقت التشغيل', downtime: 'نشر بدون توقف', faster: 'عمليات HR أسرع', automated: 'سير عمل آلي', cloud: 'سحابة أصلية' },
    features: { eyebrow: 'كل HR، موحد', title: 'منصة واحدة لدورة حياة الموظف بأكملها', description: 'من المقابلة الأولى إلى مراجعات الأداء، قم بتشغيل جميع سير عمل HR في نظام واحد جميل التصميم.' },
    aiCopilot: { eyebrow: 'HR AI Copilot', title: 'تعرف على مساعد HR AI الخاص بك', description: 'احصل على إجابات فورية، وأتمتة القرارات، واكتشف ذكاء القوى العاملة — كل ذلك من مساعد محادثة مدرب على مؤسستك.', powered: 'مدعوم من' },
    builder: { eyebrow: 'تخصيص بدون برمجة', title: 'ابنِ نظام HRMS الخاص بك بطريقتك', description: 'قم بتجميع لوحات المعلومات والنماذج والوحدات باستخدام منشئ بصري بالكامل. لا حاجة لهندسة.', aiSuggests: 'يقترح الذكاء الاصطناعي أفضل تخطيط لفريقك' },
    security: { eyebrow: 'الأمان', title: 'أمان بدون تنازل', description: 'حماية من الدرجة المؤسسية مدمجة في كل طبقة من المنصة، بحيث تبقى بيانات القوى العاملة الأكثر حساسية آمنة.', certs: 'الشهادات:' },
    migration: { eyebrow: 'ترحيل سلس', title: 'انتقل إلى Knodtecone في أيام وليس أشهر', description: 'انقل جميع بيانات القوى العاملة لديك دون انقطاع — تم التحقق منها ورسمها وجاهزيتها في وقت قياسي.' },
    analytics: { eyebrow: 'ذكاء القوى العاملة', title: 'ذكاء القوى العاملة في الوقت الفعلي', description: 'لوحات المعلومات المباشرة تحول بيانات HR الخام إلى قرارات — الحضور، التسرب، مسار التوظيف ورؤى الأقسام في لمحة.', live: 'مباشر' },
    comparison: { eyebrow: 'لماذا Knodtecone', title: 'مُبنى بشكل مختلف عن أنظمة HRMS التقليدية', description: 'شاهد كيف تقارن منصة حديثة أصلية بالذكاء الاصطناعي مع الأنظمة القديمة التي تعيق فريقك.' },
    testimonials: { eyebrow: 'الشهادات', title: 'محبوب من الفرق التي تبني المستقبل', description: 'قادة HR والمؤسسون والمشغلون يثقون في Knodtecone لإدارة أهم أصولهم — موظفيهم.' },
    faq: { eyebrow: 'الأسئلة الشائعة', title: 'الأسئلة المتداولة', description: 'كل ما تحتاج لمعرفته حول Knodtecone. لم تجد إجابة؟ تواصل مع فريقنا.', searchPlaceholder: 'ابحث في الأسئلة الشائعة…', noResults: 'لا توجد أسئلة مطابقة', contactSupport: 'اتصل بالدعم' },
    finalCta: { badge: 'الآن مع HR Copilot GA', title: 'حول عمليات HR بالذكاء الاصطناعي', description: 'انضم إلى المؤسسات التي تبني مستقبل إدارة القوى العاملة. ابدأ في دقائق — لا حاجة لبطاقة ائتمان.', ctaPrimary: 'ابدأ مجانًا إلى الأبد', ctaSecondary: 'جدولة عرض توضيحي', noCredit: 'لا حاجة لبطاقة ائتمان', trial: 'تجربة مجانية 14 يومًا', cancel: 'ألغِ في أي وقت', soc2: 'SOC 2 جاهز' },
    footer: { description: 'نظام HRMS المدعوم بالذكاء الاصطناعي لمستقبل العمل. قم بإدارة القوى العاملة بأكملها من منصة موحدة وذكية.', subscribe: 'اشترك في نشرتنا الإخبارية', subscribeBtn: 'اشترك', privacy: 'سياسة الخصوصية', terms: 'شروط الخدمة', cookies: 'إعدادات الكوكيز', operational: 'جميع الأنظمة تعمل' },
    stats: { uptime: 'ضمان وقت التشغيل', downtime: 'نشر بدون توقف', faster: 'عمليات HR أسرع', automated: 'سير عمل آلي', cloud: 'سحابة أصلية' },
    securityStats: { encrypted: 'مشفر من النهاية إلى النهاية', uptime: 'ضمان وقت التشغيل', requests: 'مليون طلب/شهر', breaches: 'اختراقات أمنية' },
  },
};