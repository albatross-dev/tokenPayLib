import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/UserContext";
import moment from "moment";
import ExportPopover from "./ExportPopover";
import { useTranslation } from "react-i18next";
import TransactionModal from "./TransactionModal";
import { BsArrowUpRight } from "react-icons/bs";
import TypePopover from "./TypePopover";
import AddressDisplay from "../UI/AddressDisplay";
import SimpleList from "../UI/SimpleList";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { FiatTransaction } from "../../types/payload-types";

interface TableQuery {
  type?: {
    equals: string;
  };
}

export default function Transfer() {
  const { user, setUser } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTransactionData, setSelectedTransactionData] =
    useState<FiatTransaction | null>(null);
  const [paymentsTableQuery, setPaymentsTableQuery] = useState<TableQuery>({});

  const { t } = useTranslation("common");
  const { t: tCrossborder } = useTranslation("crossborder");

  const openModalWithTransactionData = (
    transactionData: FiatTransaction
  ): void => {
    setSelectedTransactionData(transactionData);
    setIsModalOpen(true);
  };

  const columns: ColumnDef<any, any>[] = [
    {
      accessorKey: "transactionHash",
      header: tCrossborder("transfer.information"),
      cell: (props) => {
        return (
          <Link href={`/transaction/${props.row.original.id}`}>
            <BsArrowUpRight
              //onClick={() => openModalWithTransactionData(props.row.original)}
              className="w-4 h-4 mr-2 ml-2 cursor-pointer"
            />
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
                  ? props.row.original.shardList.length /
                    props.row.original.shredCount
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
            <span className="bg-uhuBlue rounded-full px-2 text-white font-bold">
              {t(props.getValue())}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "toAccountIdentifier",
      header: tCrossborder("transfer.receiver"),
      cell: (props) => {
        return (
          <div className="table-cell">
            {props.getValue() ? (
              <AddressDisplay value={props.getValue()} />
            ) : (
              "-"
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: tCrossborder("transfer.date"),
      cell: (props) => {
        return (
          <div className="table-cell whitespace-nowrap">
            {moment(props.getValue()).format("DD.MM.YYYY, HH:mm")}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="px-4">
        <TransactionModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          transactionData={selectedTransactionData}
        />
        <SimpleList
          standardQuery={paymentsTableQuery}
          collection="fiatTransaction"
          columns={columns}
          loader={false}
        >
          <ExportPopover
            minDate={{
              year: moment(user?.createdAt).year(),
              month: moment(user?.createdAt).month(),
              day: moment(user?.createdAt).date(),
            }}
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
    </>
  );
}
