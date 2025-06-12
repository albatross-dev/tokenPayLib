import React, { useState } from "react";
import { BsChevronDown, BsFileEarmarkArrowDown } from "react-icons/bs";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { Calendar } from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { useTranslation } from "next-i18next";
import moment from "moment";
import LoadingButton, { LoadingButtonStates } from "../UI/LoadingButton";

export interface DayObject {
  year: number;
  month: number;
  day: number;
}

export interface DateRange {
  from: DayObject | null;
  to: DayObject | null;
}

interface ExportPopoverProps {
  minDate: DayObject;
  setData: (dateRange: DateRange) => Promise<any[]>;
  wantedKeys: string[];
  keyNames: Record<string, string>;
}

export default function ExportPopover({
  minDate,
  setData,
  wantedKeys,
  keyNames,
}: ExportPopoverProps) {
  const [selectedDayRange, setSelectedDayRange] = useState<DateRange>({
    from: null,
    to: null,
  });
  const { t } = useTranslation("common");

  const today = {
    year: moment().year(),
    month: moment().month() + 1,
    day: moment().date(),
  };

  const [loadingButtonState, setLoadingButtonState] =
    useState<LoadingButtonStates>("normal");
  const [loadingButtonActive, setLoadingButtonActive] =
    useState<boolean>(false);

  const handleDataExport = async (): Promise<void> => {
    if (loadingButtonState !== "normal") return;

    setLoadingButtonState("processing");

    try {
      const sales = await setData(selectedDayRange);

      // Convert sales data to CSV and trigger download
      const csvData = convertToCSV(sales, wantedKeys, keyNames);
      triggerDownload(selectedDayRange, csvData);

      setLoadingButtonState("success");

      setTimeout(() => {
        setLoadingButtonState("normal");
      }, 5000);
    } catch (error) {
      console.log("error", error);
      setLoadingButtonState("error");
      setTimeout(() => {
        setLoadingButtonState("normal");
      }, 5000);
    }
  };

  const handleDateChange = (range: DateRange): void => {
    setSelectedDayRange(range);
    if (range.from && range.to) {
      setLoadingButtonActive(true);
    } else {
      setLoadingButtonActive(false);
    }
  };

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <PopoverButton
            className={` px-3 py-2 gap-2 flex items-center bg-white border ${
              open && " border-uhuBlue ring-0 outline-0"
            } rounded`}
          >
            <BsFileEarmarkArrowDown /> {t("ExportPopover.export")}{" "}
            <BsChevronDown />
          </PopoverButton>
          <Transition
            as={React.Fragment}
            // ... (rest of the transition code)
          >
            <PopoverPanel className="absolute z-10 mt-2 w-[22rem] max-w-sm px-4 sm:px-0">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative bg-white p-4 flex flex-col gap-1">
                  <Calendar
                    value={selectedDayRange}
                    onChange={handleDateChange}
                    colorPrimary="#2E3DFF"
                    colorPrimaryLight="#F5F5F5"
                    minimumDate={minDate}
                    maximumDate={today}
                    shouldHighlightWeekends
                  />
                  <LoadingButton
                    isLoading={loadingButtonState}
                    onClick={handleDataExport}
                    active={loadingButtonActive}
                    fullWidth={true}
                    showSuccessColor={true}
                  >
                    {loadingButtonState === "success"
                      ? t("ExportPopover.success")
                      : t("ExportPopover.export")}
                  </LoadingButton>
                </div>
              </div>
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

function convertToCSV(
  arr: any[],
  wantedKeys: string[],
  keyNames: Record<string, string>
): string {
  if (arr.length === 0) return "";

  // Helper function to get nested object values
  const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  // Process the data
  const processedData = arr.map((obj) => {
    const newObj: Record<string, any> = {};

    // Only include wanted keys
    wantedKeys.forEach((key) => {
      if (key.includes(".")) {
        // Handle nested keys
        const value = getNestedValue(obj, key);
        if (value !== undefined) {
          newObj[key] = value;
        }
      } else {
        // Handle top-level keys
        if (obj[key] !== undefined) {
          newObj[key] = obj[key];
        }
      }
    });

    return newObj;
  });

  // Convert to CSV
  const csv = [wantedKeys.map((key) => keyNames[key]).join(";")]; // header
  for (const row of processedData) {
    const values = wantedKeys.map((key) => {
      const value = row[key];
      return value !== undefined ? value : "";
    });
    csv.push(values.join(";"));
  }

  return csv.join("\n");
}

function triggerDownload(selectedDayRange: DateRange, csvData: string): void {
  if (!selectedDayRange.from || !selectedDayRange.to) return;

  const blob = new Blob([csvData], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `Transactions ${selectedDayRange.from.day}-${selectedDayRange.from.month}-${selectedDayRange.from.year} - ${selectedDayRange.to.day}-${selectedDayRange.to.month}-${selectedDayRange.to.year}.csv`;
  a.click();
}
