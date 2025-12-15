import React from 'react';
import { DynamicTableData, RowCell } from '../types';

interface DynamicTableProps {
  data: DynamicTableData;
}

export const DynamicTable: React.FC<DynamicTableProps> = ({ data }) => {
  const { columns, rows, tableClassName, headerRowClassName, bodyRowClassName, cellClassName } = data;

  return (
    <div className="overflow-x-auto shadow-md rounded-lg border border-gray-400 dark:border-gray-700">
      <table className={`min-w-full divide-y divide-gray-300 dark:divide-gray-700 ${tableClassName || 'bg-gray-100 dark:bg-gray-800'}`}>
        <thead className={`bg-blue-100 dark:bg-blue-900 ${headerRowClassName}`}>
          <tr>
            {columns.map((col, colIndex) => (
              <th
                key={col.key}
                scope="col"
                className={`px-4 py-3 text-left text-xs font-semibold text-blue-800 dark:text-blue-200 uppercase tracking-wider ${col.className || ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={`divide-y divide-gray-200 dark:divide-gray-700 ${bodyRowClassName || ''}`}>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={`${rowIndex % 2 === 0 ? 'bg-gray-100 dark:bg-gray-800' : 'bg-gray-200 dark:bg-gray-900'} hover:bg-gray-300 dark:hover:bg-gray-700`}>
              {row.map((cell: RowCell, cellIndex: number) => (
                <td
                  key={cellIndex}
                  colSpan={cell.colSpan}
                  rowSpan={cell.rowSpan}
                  className={`px-4 py-2 whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200 ${cellClassName || ''} ${cell.className || ''}`}
                >
                  {/* Handle React.ReactNode content, including arrays */}
                  {Array.isArray(cell.value) ? (
                    (cell.value as React.ReactNode[]).map((part, partIndex) => (
                      <React.Fragment key={partIndex}>{part}</React.Fragment>
                    ))
                  ) : (
                    cell.value
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};