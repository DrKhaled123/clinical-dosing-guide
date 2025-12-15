import React, { useState } from 'react';
import { DrugEntry } from '../types';
import { DynamicTable } from './DynamicTable'; // Re-use for CrCl adjustments table

interface DrugCardProps {
  drug: DrugEntry;
}

export const DrugCard: React.FC<DrugCardProps> = ({ drug }) => {
  const [showCrClAdjustments, setShowCrClAdjustments] = useState(false);

  // Determine the guide name for cross-referencing
  const getGuideName = (guide: 'hepatic' | 'renal') => {
    return guide === 'hepatic' ? 'Hepatic Impairment Guide' : 'Renal Impairment Guide';
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-400 dark:border-gray-700 border-l-4 border-purple-500 dark:border-purple-700 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-3">
        {drug.name}
      </h3>

      <div className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
        {drug.indication && (
          <p>
            <strong className="text-blue-600 dark:text-blue-300">Indication(s):</strong> {drug.indication}
          </p>
        )}
        {drug.normalDoses && (
          <p>
            <strong className="text-blue-600 dark:text-blue-300">Normal Doses:</strong> {drug.normalDoses}
          </p>
        )}
        {drug.contraindications && (
          <p>
            <strong className="text-red-600 dark:text-red-400">Contraindications:</strong> {drug.contraindications}
          </p>
        )}
        {drug.keyModificationPrinciple && (
          <p>
            <strong className="text-blue-600 dark:text-blue-300">Modification Principle:</strong> {drug.keyModificationPrinciple}
          </p>
        )}
        {drug.risks && (
          <p>
            <strong className="text-purple-600 dark:text-purple-400">Key Risks:</strong> {drug.risks}
          </p>
        )}
        {drug.notes && (
          <p>
            <strong className="text-blue-600 dark:text-blue-300">Notes:</strong> {drug.notes}
          </p>
        )}
        {drug.europeanTradeNames && (
          <p>
            <strong className="text-gray-600 dark:text-gray-400">Trade Names (EU/Global):</strong> {drug.europeanTradeNames}
          </p>
        )}
        {drug.arabicTradeNames && (
          <p>
            <strong className="text-gray-600 dark:text-gray-400">Trade Names (Arabic/ME):</strong> {drug.arabicTradeNames}
          </p>
        )}

        {/* Renal specific detailed adjustments */}
        {drug.crClAdjustments && drug.crClAdjustments.length > 0 && (
          <div className="mt-4">
            <button
              onClick={() => setShowCrClAdjustments(!showCrClAdjustments)}
              className="w-full text-left py-2 px-4 rounded-md bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors duration-200 flex justify-between items-center text-sm font-medium"
              aria-expanded={showCrClAdjustments}
            >
              <span>Detailed Renal Adjustments</span>
              <span>{showCrClAdjustments ? '▲' : '▼'}</span>
            </button>
            {showCrClAdjustments && (
              <div className="mt-3">
                <DynamicTable
                  data={{
                    columns: [
                      { key: 'crClRange', header: 'CrCl Range (mL/min)', className: 'w-1/3' },
                      { key: 'doseAdjustmentPrinciple', header: 'Adjustment Principle', className: 'w-2/3' },
                    ],
                    rows: drug.crClAdjustments.map(adj => [
                      { value: adj.crClRange },
                      { value: adj.doseAdjustmentPrinciple },
                    ]),
                  }}
                />
              </div>
            )}
          </div>
        )}

        {/* Cross-reference to related guide (smart answer) */}
        {drug.relatedGuide && (
          <div className="mt-4 text-xs text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950 p-2 rounded-md border border-purple-500 dark:border-purple-700">
            <p className="font-semibold">See also:</p>
            <p>
              This drug is also detailed in the{' '}
              <a href={`#${drug.relatedDrugId}`} className="underline hover:text-purple-800 dark:hover:text-purple-200">
                {getGuideName(drug.relatedGuide)}
              </a>{' '}
              for its {drug.relatedGuide === 'hepatic' ? 'hepatic considerations' : 'renal considerations'}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};