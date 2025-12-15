import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="fixed w-full bg-blue-700 dark:bg-blue-900 text-gray-100 shadow-md z-20">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span role="img" aria-label="Stethoscope" className="text-2xl">🩺</span>
          <h1 className="text-xl sm:text-2xl font-bold">Clinical Dosing Guide</h1>
        </div>
        <div className="hidden sm:block">
          <p className="text-sm opacity-90">Navigate drug modifications in organ impairment</p>
        </div>
      </nav>
    </header>
  );
};