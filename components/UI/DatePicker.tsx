import React, { useState } from "react";
import { Calendar, utils } from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { Popover } from "@headlessui/react";
import { BsChevronDown, BsCalendar4Week } from "react-icons/bs";
import addDaysToDate from "@/utilities/addDaysToDate";
import { useTranslation } from "next-i18next";

export interface DateRange {
  from: {
    year: number;
    month: number;
    day: number;
  } | null;
  to: {
    year: number;
    month: number;
    day: number;
  } | null;
}

interface PredefinedRange {
  label: string;
  value: number | null;
}

interface DatePickerProps {
  onDateChange: (range: DateRange | null) => void;
  minDate: string;
  defaultRange?: number;
}

const DatePicker: React.FC<DatePickerProps> = ({
  onDateChange,
  minDate,
  defaultRange = 28,
}) => {
  const { t } = useTranslation("common");

  const predefinedRanges: PredefinedRange[] = [
    { label: t("date_picker_entire_time"), value: null },
    { label: t("date_picker_last_7_days"), value: 7 },
    { label: t("date_picker_last_4_weeks"), value: 28 },
    { label: t("date_picker_last_90_days"), value: 90 },
  ];

  const [selectedDayRange, setSelectedDayRange] = useState<DateRange>(
    defaultRange === null
      ? { from: null, to: null }
      : {
          from: addDaysToDate(utils("de").getToday(), -defaultRange),
          to: utils("de").getToday(),
        }
  );

  const [selectedPreset, setSelectedPreset] = useState<string>(
    predefinedRanges.find((range) => range.value === defaultRange)?.label ||
      t("date_picker_last_4_weeks")
  );

  const minDateObj = minDate
    ? {
        year: new Date(minDate).getFullYear(),
        month: new Date(minDate).getMonth() + 1,
        day: new Date(minDate).getDate(),
      }
    : undefined;

  const handlePredefinedRangeSelect = (range: PredefinedRange): void => {
    if (range.value === null) {
      setSelectedDayRange({ from: null, to: null });
      onDateChange(null);
    } else {
      const endDate = utils("de").getToday();
      const startDate = addDaysToDate(endDate, -range.value);
      const newRange: DateRange = { from: startDate, to: endDate };
      setSelectedDayRange(newRange);
      onDateChange(newRange);
    }
    setSelectedPreset(range.label);
  };

  const handleCustomDateSelect = (range: DateRange): void => {
    setSelectedDayRange(range);
    onDateChange(range);
  };

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className="flex items-center bg-white border rounded">
            <div className="flex items-center mr-2 border-r p-2 font-bold whitespace-nowrap">
              {selectedPreset && <span>{selectedPreset}</span>}
            </div>
            <BsCalendar4Week size={16} className="mr-1" />
            <div className="flex items-center mr-2 font-bold">
              {selectedDayRange && selectedDayRange.from && selectedDayRange.to
                ? `${selectedDayRange.from.day}.${selectedDayRange.from.month}.-${selectedDayRange.to.day}.${selectedDayRange.to.month}.`
                : "..."}
            </div>
            <BsChevronDown size={16} className="mr-2" />
          </Popover.Button>
          <Popover.Panel className="absolute z-10 mt-2 w-auto bg-white border border-gray-200 rounded-md shadow-lg flex md:flex-row flex-col">
            <div className="border-b md:border-r md:border-b-0 border-gray-200 p-4 md:w-56">
              {predefinedRanges.map((range) => (
                <div
                  key={range.value}
                  onClick={() => handlePredefinedRangeSelect(range)}
                  className="cursor-pointer hover:bg-gray-200 p-2 rounded"
                >
                  {range.label}
                </div>
              ))}
            </div>
            <div className="w-72">
              <Calendar
                value={selectedDayRange}
                onChange={handleCustomDateSelect}
                colorPrimary="#2E3DFF"
                colorPrimaryLight="#F5F5F5"
                minimumDate={minDateObj}
                shouldHighlightWeekends
              />
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

export default DatePicker;
