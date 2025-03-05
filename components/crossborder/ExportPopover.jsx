import React, { useState } from "react";
import { BsChevronDown, BsFileEarmarkArrowDown } from "react-icons/bs";
import { Popover, Transition } from "@headlessui/react";
import { Calendar } from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import buildQuery from "@/utilities/buildQuery";
import { useTranslation } from "next-i18next";
import axios from "axios";
import qs from "qs";

export default function ExportPopover({ minDate }) {
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  });
  const { t } = useTranslation("common");
  const [buttonState, setButtonState] = useState("inactive"); // can be 'inactive', 'active', or 'loading'

  const handleDataExport = async () => {
    if (buttonState !== "active") return;

    setButtonState("loading");
    const sales = await setData(selectedDayRange);

    // Convert sales data to CSV and trigger download
    const csvData = convertToCSV(sales);
    triggerDownload(selectedDayRange, csvData);

    setButtonState("active");
  };

  const handleDateChange = (range) => {
    setSelectedDayRange(range);
    if (range.from && range.to) {
      setButtonState("active");
    } else {
      setButtonState("inactive");
    }
  };

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className={` px-3 py-2 gap-2 flex items-center bg-white border ${open&&" border-uhuBlue ring-0 outline-0"} rounded`}>
            <BsFileEarmarkArrowDown /> {t("ExportPopover.export")} <BsChevronDown />
          </Popover.Button>
          <Transition
            as={React.Fragment}
            // ... (rest of the transition code)
          >
            <Popover.Panel className="absolute z-10 mt-2 w-[22rem] max-w-sm px-4 sm:px-0">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative bg-white p-4">
                  <Calendar
                    value={selectedDayRange}
                    onChange={handleDateChange}
                    colorPrimary="#2E3DFF"
                    colorPrimaryLight="#F5F5F5"
                    minimumDate={minDate}
                    shouldHighlightWeekends
                  />
                  <button
                    className={`mt-4 block w-full text-center py-2 rounded-md ${
                      buttonState === "loading"
                        ? "bg-gray-400"
                        : buttonState === "active"
                        ? "bg-blue-500 text-white"
                        : "bg-blue-200 text-gray-400"
                    }`}
                    onClick={handleDataExport}
                    disabled={buttonState !== "active"}
                  >
                    {buttonState === "loading" ? t("ExportPopover.loading_export") : t("ExportPopover.export")}
                  </button>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

// Assuming setData function is somewhere in your utilities
async function setData(dateRange) {
  let from = new Date(
    dateRange.from.year,
    dateRange.from.month - 1,
    dateRange.from.day
  );

  // Creating a completely new date object for "to"
  let to = new Date(
    dateRange.to.year,
    dateRange.to.month - 1,
    dateRange.to.day
  );
  let adjustedTo = new Date(to);
  adjustedTo.setDate(adjustedTo.getDate() + 1);

  console.log("setData called", from, adjustedTo);

  // Build queries for today and yesterday
  const query = {
    and: [
      { createdAt: { greater_than_equal: from.toISOString() } },
      { createdAt: { less_than: adjustedTo.toISOString() } },
      // optional status filter

    ],
  };

  let rangeQuery = qs.stringify({ where: query }, { addQueryPrefix: true });

  // Fetch data
  const response = await axios.get(`/api/fiatTransaction${rangeQuery}`);

  return response.data.docs;
}

function convertToCSV(arr) {
  // Remove unwanted keys
  const unwantedKeys = [
    "updatedAt",
    "items",
    "vendor",
    "checkoutConfig",
    "companyWebsite",
    "supportWebsite",
    "gdprURL",
    "termsURL",
    "fromUrl",
    "successUrl",
    "logo",
  ];

  // Process the data
  const processedData = arr.map((obj) => {
    unwantedKeys.forEach((key) => {
      delete obj[key];
      if (obj.checkoutConfig) {
        delete obj.checkoutConfig[key];
      }
    });
    return obj;
  });

  // Convert to CSV
  const csv = [Object.keys(processedData[0]).join(";")]; // header
  for (const row of processedData) {
    csv.push(Object.values(row).join(";"));
  }

  return csv.join("\n");
}


function triggerDownload(selectedDayRange,csvData) {
  const blob = new Blob([csvData], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `Transactions ${selectedDayRange.from.day}-${selectedDayRange.from.month}-${selectedDayRange.from.year} - ${selectedDayRange.to.day}-${selectedDayRange.to.month}-${selectedDayRange.to.year}.csv`;
  a.click();
}
