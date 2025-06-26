import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/UserContext";
import moment from "moment";
import ExportPopover, { DateRange } from "../Modules/ExportPopover";
import { useTranslation } from "next-i18next";
import TransactionModal from "./TransactionModal";
import { BsArrowUpRight } from "react-icons/bs";
import TypePopover from "./TypePopover";
import AddressDisplay from "../UI/AddressDisplay";
import SimpleList from "../UI/SimpleList";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { FiatTransaction } from "../../types/payload-types";
import qs from "qs";
import { api } from "../../../context/UserContext";

interface TableQuery {
  type?: {
    equals: string;
  };
}

export default function Transfer() {
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTransactionData, setSelectedTransactionData] = useState<FiatTransaction | null>(null);
  const [paymentsTableQuery, setPaymentsTableQuery] = useState<TableQuery>({});

  const { t } = useTranslation("common");
  const { t: tCrossborder } = useTranslation("crossborder");

  const columns: ColumnDef<any, any>[] = [
    {
      accessorKey: "transactionHash",
      header: tCrossborder("transfer.information"),
      cell: (props) => {
        return (
          <Link href={`/transaction/${props.row.original.id}`}>
            <BsArrowUpRight className="w-4 h-4 mr-2 ml-2 cursor-pointer" />
          </Link>
        );
      },
    },
    {
      accessorKey: "amount",
      header: tCrossborder("transfer.amount"),
      cell: (props) => {
        return (
          <div className="table-cell font-bold">
            {props.row.original.type === "Withdraw" && "-"}
            {props.row.original.shredCount
              ? props.getValue() *
                (props.row.original.shardList?.length
                  ? props.row.original.shardList.length / props.row.original.shredCount
                  : 0)
              : props.getValue()}
          </div>
        );
      },
    },
    {
      accessorKey: "currencyName",
      header: tCrossborder("transfer.currency"),
      cell: (props) => {
        return <div className="table-cell uppercase">{props.getValue()}</div>;
      },
    },
    {
      accessorKey: "type",
      header: tCrossborder("transfer.type"),
      cell: (props) => {
        return (
          <div className="table-cell">
            <span className="bg-uhuBlue rounded-full px-2 text-white font-bold">{t(props.getValue())}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "toAccountIdentifier",
      header: tCrossborder("transfer.receiver"),
      cell: (props) => {
        return <div className="table-cell">{props.getValue() ? <AddressDisplay value={props.getValue()} /> : "-"}</div>;
      },
    },
    {
      accessorKey: "createdAt",
      header: tCrossborder("transfer.date"),
      cell: (props) => {
        return (
          <div className="table-cell whitespace-nowrap">{moment(props.getValue()).format("DD.MM.YYYY, HH:mm")}</div>
        );
      },
    },
  ];

  async function getTransferData(dateRange: DateRange): Promise<any[]> {
    if (!dateRange.from || !dateRange.to) {
      throw new Error("Date range is incomplete");
    }

    let from = new Date(dateRange.from.year, dateRange.from.month - 1, dateRange.from.day);

    // Creating a completely new date object for "to"
    let to = new Date(dateRange.to.year, dateRange.to.month - 1, dateRange.to.day);
    let adjustedTo = new Date(to);
    adjustedTo.setDate(adjustedTo.getDate() + 1);

    console.log("setData called", from, adjustedTo);

    // Build queries for today and yesterday
    const query = {
      and: [
        { createdAt: { greater_than_equal: from.toISOString() } },
        { createdAt: { less_than: adjustedTo.toISOString() } },
      ],
    };

    let rangeQuery = qs.stringify({ where: query }, { addQueryPrefix: true });

    // Fetch data
    const response = await api.get<{ docs: any[] }>(`/api/fiatTransaction${rangeQuery}`);

    return response.data.docs;
  }

  const wantedKeys = ["createdAt", "amount", "currencyName", "type", "toAccountIdentifier", "status"];

  const keyNames = {
    createdAt: tCrossborder("transfer.date"),
    amount: tCrossborder("transfer.amount"),
    currencyName: tCrossborder("transfer.currency"),
    type: tCrossborder("transfer.type"),
    toAccountIdentifier: tCrossborder("transfer.receiver"),
    status: tCrossborder("transfer.status"),
  };

  return (
    <div className="px-4 h-full flex-1 ">
      <TransactionModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        transactionData={selectedTransactionData}
      />
      <SimpleList standardQuery={paymentsTableQuery} collection="fiatTransaction" columns={columns} loader={false}>
        <ExportPopover
          setData={getTransferData}
          minDate={{
            year: moment(user?.createdAt).year(),
            month: moment(user?.createdAt).month(),
            day: moment(user?.createdAt).date(),
          }}
          keyNames={keyNames}
          wantedKeys={wantedKeys}
        />
        <TypePopover
          onSelect={(type: string) => {
            if (type === "all") {
              setPaymentsTableQuery({});
            } else {
              setPaymentsTableQuery({
                type: {
                  equals: type,
                },
              });
            }
          }}
        />
      </SimpleList>
    </div>
  );
}
