import React from "react";
import { TFunction } from "next-i18next";
import { ColumnDef } from '@tanstack/react-table';
import moment from "moment";
import AddressDisplay from "../UI/AddressDisplay";

export const getSendCryptoColumns = (tAccount: TFunction): ColumnDef<any, any>[] => [
  {
    accessorKey: "amount",
    header: tAccount("sendCrypto.table.amount"),
    cell: (props) => <div className="table-cell ">{props.getValue()}</div>,
  },
  {
    accessorKey: "currencyName",
    header: tAccount("sendCrypto.table.currency"),
    cell: (props) => <div className="table-cell ">{props.getValue()}</div>,
  },
  {
    accessorKey: "receivingWallet",
    header: tAccount("sendCrypto.table.receiver"),
    cell: (props) => (
        <div className="table-cell ">
          <AddressDisplay value={props.getValue()} />
        </div>
      ),
  },
  {
    accessorKey: "sendingWallet",
    header: tAccount("sendCrypto.table.sender"),
    cell: (props) => (
        <div className="table-cell ">
          <AddressDisplay value={props.getValue()} />
        </div>
      ),
  },
  {
    accessorKey: "transactionHash",
    header: tAccount("sendCrypto.table.hash"),
    cell: (props) => (
        <div className="table-cell ">
          <AddressDisplay value={props.getValue()} />
        </div>
      ),
  },
  {
    accessorKey: "createdAt",
    header: tAccount("sendCrypto.table.date"),
    cell: (props) => (
        <div className="table-cell whitespace-nowrap">
          {moment(props.getValue()).format("DD.MM.YYYY, HH:mm")}
        </div>
      ),
  },
]; 