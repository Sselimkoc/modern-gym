// TODO (Faz 0): Gerçek salon bilgileriyle güncelle — isim, adres, telefon,
// e-posta, saatler, hizmetler, fotoğraflar ve yorumlar şu an placeholder.
const siteConfig = {
  name: "PowerFit",
  tagline: "Your Fitness Journey Starts Here",
  description: "Modern fitness merkezi, en son ekipmanlar ve profesyonel antrenörlerle",
  descriptionFull:
    "PowerFit, en modern ve teknolojik fitness merkezidir. Geniş bir alanda, dünya standartlarındaki ekipmanlar ve profesyonel antrenörlerle hizmet vermekteyiz.",
  address: "123 Fitness Avenue, Wellness District, New York, NY 10001",
  phone: "+1 (555) 123-4567",
  email: "info@powerfit.com",
  heroImage:
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  services: [
    "Weight Training",
    "Cardio Equipment",
    "Yoga Classes",
    "Personal Training",
    "Pilates",
    "Boxing",
    "CrossFit",
    "Nutrition Consulting",
  ],
  hours: {
    monday: "06:00 - 22:00",
    tuesday: "06:00 - 22:00",
    wednesday: "06:00 - 22:00",
    thursday: "06:00 - 22:00",
    friday: "06:00 - 23:00",
    saturday: "08:00 - 21:00",
    sunday: "09:00 - 20:00",
  },
  images: [
    "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1552821554-5fefe8c9ef14?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  ],
  freeTrialText: "İlk hafta ücretsiz, taahhüt yok",
  membershipPlans: [
    {
      id: "basic",
      name: "Basic",
      price: 29,
      period: "ay",
      description: "Spor rutinine yeni başlayanlar için",
      features: [
        "Salon erişimi (06:00 - 22:00)",
        "Kardiyo ve ağırlık ekipmanları",
        "Soyunma odası ve dolap",
      ],
      popular: false,
      cta: "Başla",
    },
    {
      id: "premium",
      name: "Premium",
      price: 49,
      period: "ay",
      description: "En çok tercih edilen paket",
      features: [
        "7/24 salon erişimi",
        "Sınırsız grup dersleri",
        "Ayda 2 misafir hakkı",
        "Sauna ve dinlenme alanı",
      ],
      popular: true,
      cta: "Hemen Katıl",
    },
    {
      id: "elite",
      name: "Elite",
      price: 79,
      period: "ay",
      description: "Kişisel antrenörlü tam kapsamlı deneyim",
      features: [
        "Premium paketindeki her şey",
        "Ayda 4 personal training seansı",
        "Beslenme danışmanlığı",
        "Öncelikli ders rezervasyonu",
      ],
      popular: false,
      cta: "Başla",
    },
  ],
};

export default siteConfig;
