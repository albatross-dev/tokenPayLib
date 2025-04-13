import React from "react";
import AddressDisplay from "../UI/AddressDisplay";
import { TFunction } from "next-i18next";
import { ColumnDef } from '@tanstack/react-table';
import moment from "moment";

export const getSendCryptoColumns = (tAccount: TFunction): ColumnDef<any, any>[] => [
  {
    accessorKey: "amount",
    header: tAccount("sendCrypto.table.amount"),
    cell: (props) => {
      return <div className="table-cell ">{props.getValue()}</div>;
    },
  },
  {
    accessorKey: "currencyName",
    header: tAccount("sendCrypto.table.currency"),
    cell: (props) => {
      return <div className="table-cell ">{props.getValue()}</div>;
    },
  },
  {
    accessorKey: "receivingWallet",
    header: tAccount("sendCrypto.table.receiver"),
    cell: (props) => {
      return (
        <div className="table-cell ">
          <AddressDisplay value={props.getValue()}></AddressDisplay>
        </div>
      );
    },
  },
  {
    accessorKey: "sendingWallet",
    header: tAccount("sendCrypto.table.sender"),
    cell: (props) => {
      return (
        <div className="table-cell ">
          <AddressDisplay value={props.getValue()}></AddressDisplay>
        </div>
      );
    },
  },
  {
    accessorKey: "transactionHash",
    header: tAccount("sendCrypto.table.hash"),
    cell: (props) => {
      return (
        <div className="table-cell ">
          <AddressDisplay value={props.getValue()}></AddressDisplay>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: tAccount("sendCrypto.table.date"),
    cell: (props) => {
      return (
        <div className="table-cell whitespace-nowrap">
          {moment(props.getValue()).format("DD.MM.YYYY, HH:mm")}
        </div>
      );
    },
  },
]; 