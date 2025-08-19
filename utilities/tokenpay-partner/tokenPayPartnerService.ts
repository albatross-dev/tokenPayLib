import { Category, Partner, TokenPayPartnerData } from "../../types/tokenpay-partner.types";
import categoriesData from "../../assets/tokenpay-partner/categories.json";
import partnersData from "../../assets/tokenpay-partner/partners.json";

class TokenPayPartnerService {
  private categories: Category[];
  private partners: Partner[];

  constructor() {
    this.categories = categoriesData.categories;
    this.partners = partnersData.partners;
  }

  // Category methods
  getActiveCategories(): Category[] {
    return this.categories.filter((category) => category.isActive).sort((a, b) => a.order - b.order);
  }

  getCategoryBySlug(slug: string): Category | undefined {
    return this.categories.find((category) => category.slug === slug && category.isActive);
  }

  getCategoryById(id: string): Category | undefined {
    return this.categories.find((category) => category.id === id && category.isActive);
  }

  // Partner methods
  getActivePartners(): Partner[] {
    return this.partners.filter((partner) => partner.isActive).sort((a, b) => a.order - b.order);
  }

  getPartnerBySlug(slug: string): Partner | undefined {
    return this.partners.find((partner) => partner.slug === slug && partner.isActive);
  }

  getPartnerById(id: string): Partner | undefined {
    return this.partners.find((partner) => partner.id === id && partner.isActive);
  }

  // Validation methods
  isValidCategorySlug(slug: string): boolean {
    return this.categories.some((category) => category.slug === slug && category.isActive);
  }

  isValidPartnerSlug(slug: string): boolean {
    return this.partners.some((partner) => partner.slug === slug && partner.isActive);
  }

  // Get all valid slugs for static generation
  getAllCategorySlugs(): string[] {
    return this.getActiveCategories().map((category) => category.slug);
  }

  getAllPartnerSlugs(): string[] {
    return this.getActivePartners().map((partner) => partner.slug);
  }

  // Get all data for external use
  getAllData(): TokenPayPartnerData {
    return {
      categories: this.getActiveCategories(),
      partners: this.getActivePartners(),
    };
  }
}

// Export singleton instance
export const tokenPayPartnerService = new TokenPayPartnerService();
