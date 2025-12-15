import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-950 text-gray-300 dark:text-gray-400 p-6 mt-12 text-center text-sm">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Clinical Drug Dosing Guide. All rights reserved.</p>
        <p className="mt-2">Disclaimer: This guide is for informational purposes only and does not constitute medical advice. Consult a healthcare professional for specific medical guidance.</p>
      </div>
    </footer>
  );
};