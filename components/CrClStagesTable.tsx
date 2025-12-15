import React from 'react';
import { CrClStage } from '../types';

interface CrClStagesTableProps {
  stages: CrClStage[];
}

export const CrClStagesTable: React.FC<CrClStagesTableProps> = ({ stages }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg border border-gray-400 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700 bg-gray-100 dark:bg-gray-800">
        <thead className="bg-blue-100 dark:bg-blue-900">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-blue-800 dark:text-blue-200 uppercase tracking-wider">
              Kidney Function Stage
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-blue-800 dark:text-blue-200 uppercase tracking-wider">
              CrCl / eGFR (mL/min)
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-blue-800 dark:text-blue-200 uppercase tracking-wider">
              Adjustment Principle
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {stages.map((stage, index) => (
            <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100 dark:bg-gray-800' : 'bg-gray-200 dark:bg-gray-900'} hover:bg-gray-300 dark:hover:bg-gray-700`}>
              <td className="px-4 py-2 whitespace-pre-wrap text-sm font-medium text-gray-900 dark:text-gray-100">
                {stage.stage}
              </td>
              <td className="px-4 py-2 whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200">
                {stage.crClRange}
              </td>
              <td className="px-4 py-2 whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200">
                {stage.adjustmentPrinciple}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};