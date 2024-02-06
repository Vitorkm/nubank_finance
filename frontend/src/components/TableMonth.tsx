'use client'
import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "./Charts/TimeExpenses";

interface TableProps {
  amount: number;
  category: string;
  post_date: string;
  title: string;
  id: string;
}

export default function App() {
  const { data, isLoading } = useQuery({
    queryKey: ["timeExpenses"],
    queryFn: getExpenses,
  });

  const formatValue = (value: string | number, columKey: string) => { 
    if (columKey === "post_date") {
      return value.split("-").reverse().join("/");
    }
    if (columKey === "amount") {
      return value / 100;
    }
    return value;
  }




  return (
    <Table
      isHeaderSticky
      aria-label="Table clientside pagination"
      classNames={{
        base: "max-h-[520px]",
        table: "min-h-[450px]",
        wrapper: "bg-neutral-900 shadown-none",
        th: "bg-purple-900 text-bold",
      }}
    >
      <TableHeader>
        <TableColumn key="title">From</TableColumn>
        <TableColumn key="category">Category</TableColumn>
        <TableColumn key="post_date">Date</TableColumn>
        <TableColumn key="amount">Price</TableColumn>
      </TableHeader>
      <TableBody
        items={data?.bill?.line_items || []}
        isLoading={isLoading}
        loadingContent={<Spinner className="text-purple-200" color="secondary" label="Loading..." />}
      >
        {(item: TableProps) => (
          <TableRow key={item?.id}>
            {(columnKey) => <TableCell>{formatValue(getKeyValue(item, columnKey), String(columnKey))}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
