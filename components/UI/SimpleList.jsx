import DatePicker from '@/components/DatePicker'
import React, { useState } from 'react'
import Table from './Table';

export default function SimpleList({children, columns, collection, loader, standardQuery}) {

  const [tableQuery, setTableQuery] = useState({ page: 1, limit: 20, where: standardQuery });

  const handleDateChange = (e) => {
    console.log(e);
    if (!e) {
      // Filter query object to remove date filters
      const newQuery = { ...tableQuery };
      newQuery.where.and = newQuery.where.and.filter((item) => {
        return item.createdAt === undefined;
      });

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
      <Table loader={loader} tableQuery={tableQuery} setTableQuery={setTableQuery} columns={columns} collection={collection}></Table>
    </div>
  )
}
