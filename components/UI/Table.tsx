import React, { useEffect } from "react";
import QueryString from "qs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import moment from "moment";
import { useTranslation } from "next-i18next";
import { api, sendErrorReport } from "../../../context/UserContext";
import { Collection } from "../../types/derivedPayload.types";
import { TableQuery } from "./SimpleList";

interface TableProps {
  tableQuery: TableQuery;
  setTableQuery: React.Dispatch<React.SetStateAction<TableQuery>>;
  columns: ColumnDef<any, any>[];
  collection: Collection;
  loader: boolean;
}

interface FetchedData {
  docs: any[];
  page: number;
  limit: number;
  totalDocs: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  updatedAt?: string;
  status?: string;
}

export default function Table({
  tableQuery,
  setTableQuery,
  columns,
  collection,
  loader,
}: TableProps): JSX.Element {
  const queryClient = useQueryClient();
  const { t } = useTranslation("common");

  async function fetchData(
    query: TableQuery,
    collection: Collection
  ): Promise<FetchedData> {
    try {
      const res = await api.get(
        `/api/${collection.toString()}?${QueryString.stringify(query)}`
      );
      return res.data;
    } catch (error) {
      sendErrorReport("Table - Fetching data failed", error);
      console.log("Table - Fetching data failed", error);
      return {
        docs: [],
        page: 1,
        limit: 20,
        totalDocs: 0,
        hasNextPage: false,
        hasPrevPage: false,
      };
    }
  }

  const {
    data: fetchedData,
    status,
    fetchStatus,
    isLoading,
  } = useQuery({
    queryKey: [collection, tableQuery],
    queryFn: async () => {
      const data = await fetchData(tableQuery, collection);
      if (data.hasNextPage) {
        queryClient.prefetchQuery({
          queryKey: [collection, { ...tableQuery, page: data.page + 1 }],
          queryFn: () =>
            fetchData({ ...tableQuery, page: data.page + 1 }, collection),
        });
      }
      return data;
    },
    placeholderData: (previousData) => previousData,
  });

  useEffect(() => {
    //invalidate query when loader changes
    queryClient.invalidateQueries({ queryKey: [collection, tableQuery] });
  }, [loader, collection, queryClient, tableQuery]);

  const table = useReactTable({
    data: fetchedData?.docs || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
  });

  return (
    <div className="flex-shrink flex flex-col overflow-y-auto">
      <div className="flex-shrink overflow-y-auto flex-col flex">
        <table className="min-w-full divide-y divide-gray-300 border-t border-t-gray-300 flex-shrink">
          <thead className="sticky">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={`column-${index}`}
                  scope="col"
                  className="py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  {column.header?.toString()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 flex-shrink h-full overflow-y-auto">
            {table.getRowModel().rows.map((row) => {
              const isOlderThan30Min = row.original.updatedAt
                ? moment().diff(moment(row.original.updatedAt), "minutes") > 30
                : false;
              return (
                <tr
                  key={row.id}
                  className={`${
                    isOlderThan30Min && row.original.status === "pending"
                      ? "bg-red-100"
                      : ""
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {!isLoading && fetchedData?.docs?.length > 0 ? (
        <div className="flex gap-4 items-center mt-6">
          <span>
            {fetchedData.limit * (fetchedData.page - 1) + 1}-
            {fetchedData.limit * fetchedData.page > fetchedData.totalDocs
              ? fetchedData.totalDocs
              : fetchedData.limit * fetchedData.page}{" "}
            {t("SimpleList.results", { num: fetchedData.totalDocs })}
          </span>
          <button
            onClick={() =>
              setTableQuery({
                ...tableQuery,
                page: fetchedData.page - 1,
              })
            }
            disabled={!fetchedData.hasPrevPage}
            className="disabled:opacity-50 btn-secondary-outline"
          >
            {t("SimpleList.back")}
          </button>
          <button
            onClick={() =>
              setTableQuery({
                ...tableQuery,
                page: fetchedData.page + 1,
              })
            }
            disabled={!fetchedData.hasNextPage}
            className="disabled:opacity-50 btn-secondary-outline"
          >
            {t("SimpleList.next")}
          </button>
        </div>
      ) : null}
    </div>
  );
}
