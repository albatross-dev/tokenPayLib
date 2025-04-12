import React from 'react';
import ContinentsMap from "../../../UI/ContinentMap";
import TransferCountries from "../components/TransferCountries";
import Loader from "../../../UI/Loader";
import { useTranslation } from "next-i18next";
import { Country } from '../../../../types/payload-types';

interface ContinentSelectionProps {
  loading: boolean;
  selectedContinent: string;
  countryData: Country[] | null;
  selectedCountry: Country | null;
  handleContinentSelect: (continent: string) => void;
  handleCountrySelected: (country: Country | null) => void;
}

export default function ContinentSelection({
  loading,
  selectedContinent,
  countryData,
  selectedCountry,
  handleContinentSelect,
  handleCountrySelected
}: ContinentSelectionProps) {
  const { t: tCrossborder } = useTranslation("crossborder");

  return (
    <div className="p-4">
      <div className="text-darkBlue flex flex-col items-center gap-4 ">
        <h2 className="text-2xl font-bold">
          {tCrossborder("transferSection.welcome")}
        </h2>
        <p className="text-sm">
          {tCrossborder("transferSection.region_select")}
        </p>
      </div>
      <div className="max-w-4xl w-full h-92 mx-auto mb-8">
        <ContinentsMap
          onClick={handleContinentSelect}
          selectedContinent={selectedContinent}
        />
      </div>

      <div className="w-full">
        {loading ? (
          <div className="flex w-full items-center justify-center">
            <Loader />
          </div>
        ) : (
          <TransferCountries
            countries={countryData}
            selectedContinent={selectedContinent}
            selectedCountry={selectedCountry}
            countrySelected={handleCountrySelected}
          />
        )}
      </div>
    </div>
  );
} 