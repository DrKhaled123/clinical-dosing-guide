import React from 'react';
import { ReferenceEntry } from '../types';

interface ReferenceSectionProps {
  entries: ReferenceEntry[];
}

export const ReferenceSection: React.FC<ReferenceSectionProps> = ({ entries }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-400 dark:border-gray-700">
      {entries.map((entry, index) => (
        <div key={index} className="mb-4 last:mb-0">
          <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">{entry.category}</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
            {entry.items.map((item, itemIndex) => (
              <li key={itemIndex} className="ml-4">
                {Array.isArray(item) ? (
                  (item as React.ReactNode[]).map((part, partIndex) => (
                    <React.Fragment key={partIndex}>{part}</React.Fragment>
                  ))
                ) : (
                  item
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};