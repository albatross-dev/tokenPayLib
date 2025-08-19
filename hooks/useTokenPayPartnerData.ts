import { useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { tokenPayPartnerService } from '../utilities/tokenpay-partner/tokenPayPartnerService';
import { CategoryWithTranslations, PartnerWithTranslations } from '../types/tokenpay-partner.types';

export const useTokenPayPartnerData = () => {
  const { t } = useTranslation('tokenpay-partner');

  const categories: CategoryWithTranslations[] = useMemo(() => {
    const activeCategories = tokenPayPartnerService.getActiveCategories();
    return activeCategories.map(category => ({
      ...category,
      name: t(category.nameKey),
      description: t(category.descriptionKey),
      href: `/tokenpay-partner/category/${category.slug}`,
      details: {
        features: t(category.detailsKeys.features, { returnObjects: true }),
        benefits: t(category.detailsKeys.benefits, { returnObjects: true }),
        content: t(category.detailsKeys.content, { returnObjects: true }),
      },
    }));
  }, [t]);

  const partners: PartnerWithTranslations[] = useMemo(() => {
    const activePartners = tokenPayPartnerService.getActivePartners();
    return activePartners.map(partner => ({
      ...partner,
      name: t(partner.nameKey),
      description: t(partner.descriptionKey),
      href: `/tokenpay-partner/partner/${partner.slug}`,
      details: {
        about: t(partner.detailsKeys.about, { returnObjects: true }),
        services: t(partner.detailsKeys.services, { returnObjects: true }),
        contact: t(partner.detailsKeys.contact, { returnObjects: true }),
        stats: t(partner.detailsKeys.stats, { returnObjects: true }),
      },
    }));
  }, [t]);

  return {
    categories,
    partners,
  };
};
