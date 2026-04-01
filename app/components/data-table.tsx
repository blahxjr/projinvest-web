import React from "react";

type DataColumn<T> = {
  key: string;
  header: string;
  cell: (row: T) => React.ReactNode;
  className?: string;
};

type DataTableProps<T extends { id: string }> = {
  columns: DataColumn<T>[];
  data: T[];
  emptyText?: string;
  tableClassName?: string;
  wrapperClassName?: string;
};

export function DataTable<T extends { id: string }>({
  columns,
  data,
  emptyText = "Nenhum registro encontrado.",
  tableClassName = "modern-table",
  wrapperClassName = "table-wrapper",
}: DataTableProps<T>) {
  return (
    <div className={wrapperClassName}>
      <table className={tableClassName}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className={column.className ?? ""}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-6 text-slate-400">
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row.id}>
                {columns.map((column) => (
                  <td key={`${row.id}-${column.key}`} className={column.className ?? ""}>
                    {column.cell(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
