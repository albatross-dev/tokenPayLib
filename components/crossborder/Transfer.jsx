import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/UserContext";
import moment from "moment";
import ExportPopover from "./ExportPopover";
import { useTranslation } from "react-i18next";
import TransactionModal from "./TransactionModal";
import { BsArrowUpRight } from "react-icons/bs";
import TypePopover from "./TypePopover";
import AddressDisplay from "@/tokenPayLib/components/UI/AddressDisplay";
import SimpleList from "@/tokenPayLib/components/UI/SimpleList";

export default function Transfer() {
  const { user, setUser } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransactionData, setSelectedTransactionData] = useState(null);

  const { t } = useTranslation("common");

  const [paymentsTableQuery, setPaymentsTableQuery] = useState({});


  // Function to open the modal with the payment's data
  const openModalWithTransactionData = (transactionData) => {
    setSelectedTransactionData(transactionData);
    setIsModalOpen(true);
  };

  const columns = [
    {
      accessorKey: "transactionHash",
      header: "Informationen",
      cell: (props) => {
        return (
          <BsArrowUpRight
            onClick={() => openModalWithTransactionData(props.row.original)}
            className="w-4 h-4 mr-2 ml-2 cursor-pointer"
          ></BsArrowUpRight>
        );
      },
    },
    {
      accessorKey: "amount",
      header: "Betrag",
      cell: (props) => {
        return (
          <div className="table-cell font-bold">
            {props.row.original.type === "Withdraw" && "-"}
            {props.row.original.shredCount
              ? props.getValue() *
                (props.row.original.shardList.length
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
      header: "Währung",
      cell: (props) => {
        return <div className="table-cell uppercase">{props.getValue()}</div>;
      },
    },
    {
      accessorKey: "type",
      header: "Typ",
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
      header: "Emfpänger",
      cell: (props) => {
        return (
          <div className="table-cell ">
            {props.getValue() ? (
              <AddressDisplay value={props.getValue()}></AddressDisplay>
            ) : (
              "-"
            )}
          </div>
        );
      },
    },

    {
      accessorKey: "createdAt",
      header: "Datum",
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
        ></TransactionModal>
        <SimpleList standardQuery={paymentsTableQuery} collection={"fiatTransaction"} columns={columns}>
          <ExportPopover
            minDate={moment(user?.createdAt).format("YYYY-MM-DD")}
          ></ExportPopover>
            <TypePopover
              onSelect={(type)=>{
                console.log("TypePopover",type)
                if(type === 'all'){
                  setPaymentsTableQuery({});
                }else{
                  setPaymentsTableQuery({
                    type: {
                      equals: type,
                    },
                  });
                }
              }}
            ></TypePopover>
        </SimpleList>
      </div>
    </>
  );
}
