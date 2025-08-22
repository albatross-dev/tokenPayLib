export interface Category {
  id: string;
  slug: string;
  nameKey: string;
  descriptionKey: string;
  imageIcon: string;
  imageBanner: string;
  isActive: boolean;
  order: number;
  detailsKeys: {
    features: string;
    benefits: string;
    content: string;
  };
}

export interface Partner {
  id: string;
  slug: string;
  nameKey: string;
  descriptionKey: string;
  logo: string;
  isActive: boolean;
  order: number;
  category?: string[]; // Add category field as optional array of strings
  detailsKeys: {
    about: string;
    services: string;
    contact: string;
    stats: string;
  };
}

export interface CategoryWithTranslations extends Category {
  name: string;
  description: string;
  href: string;
  details: {
    features: any;
    benefits: any;
    content: any;
  };
}

export interface PartnerWithTranslations extends Partner {
  name: string;
  description: string;
  href: string;
  details: {
    about: any;
    services: any;
    contact: any;
    stats: any;
  };
}

export interface TokenPayPartnerData {
  categories: Category[];
  partners: Partner[];
}
