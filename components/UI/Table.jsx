import React, { useEffect } from "react";
import QueryString from "qs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import moment from "moment";
import { useTranslation } from "next-i18next";
import { sendErrorReport } from "@/context/UserContext";

export default function Table({
  tableQuery,
  setTableQuery,
  columns,
  collection,
  loader,
}) {
  const queryClient = useQueryClient()
  const {t} = useTranslation("common"); 
  
  async function fetchData(query, collection) {
    try {
      const res = await axios(
        `/api/${collection}?${QueryString.stringify(query)}`
      );
      return res.data;
    } catch (error) {
      sendErrorReport("Table - Fetching data failed", error);
      console.log("Table - Fetching data failed", error);
      return {
        docs: [],
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
    placeholderData: (previousData, previousQuery) => previousData,
  });

  useEffect(() => {
    //invalidate query when loader changes
    queryClient.invalidateQueries([collection, tableQuery]);
  }, [loader]);

  const table = useReactTable({
    data: fetchedData?.docs || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
  });

  return (
    <div className="flex-shrink flex flex-col  overflow-y-auto">
      <div className="flex-shrink  overflow-y-auto flex-col flex">
        <table className="min-w-full divide-y divide-gray-300 border-t border-t-gray-300 flex-shrink ">
          <thead className="sticky">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={`column-${index}`}
                  scope="col"
                  className="py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 flex-shrink h-full overflow-y-auto">
            {table.getRowModel().rows.map((row) => {
              const isOlderThan30Min =
                moment().diff(moment(row.original.updatedAt), "minutes") > 30;
              return (
                <tr
                  key={row.id}
                  className={`${
                    isOlderThan30Min && row.original.tatus === "pending"
                      ? "bg-red-100"
                      : ""
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      {...{
                        key: cell.id,
                      }}
                    >
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
            {t("SimpleList.results",{num: fetchedData.totalDocs})}
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
      ) : (
        ""
      )}
    </div>
  );
}
