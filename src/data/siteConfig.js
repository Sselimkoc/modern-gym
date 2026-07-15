// TODO (Phase 0): Replace with real gym details — name, address, phone,
// email, hours, services, photos, and reviews are all placeholders for now.
const siteConfig = {
  name: "PowerFit",
  tagline: "Your Fitness Journey Starts Here",
  description: "A modern fitness center with the latest equipment and expert trainers",
  descriptionFull:
    "PowerFit is the most modern, tech-forward fitness center around. We offer a spacious facility with world-class equipment and professional trainers.",
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
    {
      src: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "Free weight training area with racks and benches",
    },
    {
      src: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "Row of cardio machines facing the studio windows",
    },
    {
      src: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "Group fitness class in session",
    },
  ],
  freeTrialText: "First week free, no commitment",
  membershipPlans: [
    {
      id: "basic",
      name: "Basic",
      price: 29,
      period: "mo",
      description: "For those just starting their fitness routine",
      features: [
        "Gym access (06:00 - 22:00)",
        "Cardio and weight equipment",
        "Locker room and storage",
      ],
      popular: false,
      cta: "Get Started",
    },
    {
      id: "premium",
      name: "Premium",
      price: 49,
      period: "mo",
      description: "Our most popular package",
      features: [
        "24/7 gym access",
        "Unlimited group classes",
        "2 guest passes per month",
        "Sauna and relaxation area",
      ],
      popular: true,
      cta: "Join Now",
    },
    {
      id: "elite",
      name: "Elite",
      price: 79,
      period: "mo",
      description: "The full experience with a personal trainer",
      features: [
        "Everything in Premium",
        "4 personal training sessions per month",
        "Nutrition coaching",
        "Priority class booking",
      ],
      popular: false,
      cta: "Get Started",
    },
  ],
};

export default siteConfig;
