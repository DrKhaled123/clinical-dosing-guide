import React from 'react';
import { DDIEntry } from '../types';

interface DDIBoxProps {
  ddi: DDIEntry;
}

export const DDIBox: React.FC<DDIBoxProps> = ({ ddi }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 border-purple-500 dark:border-purple-700 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-lg font-bold text-purple-800 dark:text-purple-300 mb-3">
        Drug-Drug Interaction: {ddi.exampleDDI}
      </h3>

      <div className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
        {ddi.drugImpacted && (
          <p>
            <strong className="text-blue-600 dark:text-blue-300">Drug(s) Impacted:</strong> {ddi.drugImpacted}
          </p>
        )}
        {ddi.clinicalConsequence && (
          <p>
            <strong className="text-red-600 dark:text-red-400">Clinical Consequence:</strong> {ddi.clinicalConsequence}
          </p>
        )}
        {ddi.applicationGuidance && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-md border border-blue-400 dark:border-blue-700">
            <strong className="text-blue-700 dark:text-blue-300 block mb-1">Application / Guidance:</strong>
            <p>{ddi.applicationGuidance}</p>
          </div>
        )}
      </div>
    </div>
  );
};