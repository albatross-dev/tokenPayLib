import DatePicker, { DateRange } from "@/tokenPayLib/components/UI/DatePicker";
import { ColumnDef } from "@tanstack/react-table";
import { ReactNode, useEffect, useState } from "react";
import { Collection } from "../../types/derivedPayload.types";
import Table from "./Table";

interface WhereClause {
  and?: Array<{
    createdAt?: {
      greater_than_equal?: Date;
      less_than_equal?: Date;
    };
  }>;
  [key: string]: any;
}

export interface TableQuery {
  page: number;
  limit: number;
  where: WhereClause;
}

interface SimpleListProps {
  children?: ReactNode;
  columns: ColumnDef<any, any>[];
  collection: Collection;
  loader: boolean;
  standardQuery?: WhereClause;
}

export default function SimpleList({
  children,
  columns,
  collection,
  loader,
  standardQuery,
}: SimpleListProps): JSX.Element {
  const [tableQuery, setTableQuery] = useState<TableQuery>({
    page: 1,
    limit: 20,
    where: standardQuery || {},
  });

  useEffect(() => {
    if (standardQuery) {
      setTableQuery({ ...tableQuery, where: standardQuery });
    }
  }, [standardQuery]);

  const handleDateChange = (e: DateRange | null): void => {
    console.log(e);
    if (!e || e.from === null || e.to === null) {
      // Filter query object to remove date filters
      const newQuery = { ...tableQuery };
      if (newQuery.where.and) {
        newQuery.where.and = newQuery.where.and.filter((item) => item.createdAt === undefined);
      }

      return setTableQuery(newQuery);
    }

    const fromDate = new Date(`${e.from.year}-${e.from.month}-${e.from.day}`);
    const toDate = new Date(`${e.to.year}-${e.to.month}-${e.to.day}`);

    setTableQuery({
      ...tableQuery,
      where: {
        ...tableQuery.where,
        and: [
          {
            createdAt: {
              greater_than_equal: fromDate,
            },
          },
          {
            createdAt: {
              less_than_equal: toDate,
            },
          },
        ],
      },
    });
  };

  return (
    <div>
      <div className="flex flex flex-col md:flex-row items-start gap-2 md:gap-8 mt-8 mb-4 bg-white rounded-md w-full md:max-w-screen-lg">
        <DatePicker onDateChange={handleDateChange} minDate="2021-01-01" />
        {children}
      </div>
      <Table
        loader={loader}
        tableQuery={tableQuery}
        setTableQuery={setTableQuery}
        columns={columns}
        collection={collection}
      />
    </div>
  );
}
