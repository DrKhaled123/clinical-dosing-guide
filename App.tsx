import React, { useState } from 'react';
import { GuidePage, ContentType, DrugEntry, DDIEntry } from './types';
import { HEPATIC_IMPAIRMENT_GUIDE, RENAL_IMPAIRMENT_GUIDE } from './constants';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { GuideSection } from './components/GuideSection';
import { DrugCard } from './components/DrugCard';
import { DDIBox } from './components/DDIBox';

enum ActiveGuide {
  HEPATIC = 'hepatic',
  RENAL = 'renal',
}

function App() {
  const [activeGuide, setActiveGuide] = useState<ActiveGuide>(ActiveGuide.HEPATIC);

  const renderGuide = (guide: GuidePage) => (
    <div className="space-y-6">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700 dark:text-blue-400 mb-6 text-center">{guide.title}</h1>
      <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-8">{guide.intro}</p>
      {guide.blocks.map((block, index) => {
        if (block.type === ContentType.DRUG_LIST) {
          return (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(block.content as DrugEntry[]).map((drug, drugIndex) => (
                <DrugCard key={drug.id || drugIndex} drug={drug} />
              ))}
            </div>
          );
        } else if (block.type === ContentType.DDI_LIST) {
          return (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(block.content as DDIEntry[]).map((ddi, ddiIndex) => (
                <DDIBox key={ddi.id || ddiIndex} ddi={ddi} />
              ))}
            </div>
          );
        }
        return <GuideSection key={index} block={block} />;
      })}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8 pt-24 bg-gray-200 dark:bg-gray-950">
        <div className="flex justify-center mb-8 sticky top-16 bg-gray-200 dark:bg-gray-950 z-10 py-4 border-b border-gray-400 dark:border-gray-700">
          <button
            onClick={() => setActiveGuide(ActiveGuide.HEPATIC)}
            className={`px-6 py-3 text-lg font-semibold rounded-l-lg transition-all duration-300
              ${activeGuide === ActiveGuide.HEPATIC
                ? 'bg-purple-600 text-gray-100 shadow-lg' // Active: Purple background, light gray text
                : 'bg-gray-300 text-gray-700 hover:bg-purple-600 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-purple-800'
              }`}
          >
            Hepatic Impairment
          </button>
          <button
            onClick={() => setActiveGuide(ActiveGuide.RENAL)}
            className={`px-6 py-3 text-lg font-semibold rounded-r-lg transition-all duration-300
              ${activeGuide === ActiveGuide.RENAL
                ? 'bg-purple-600 text-gray-100 shadow-lg' // Active: Purple background, light gray text
                : 'bg-gray-300 text-gray-700 hover:bg-purple-600 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-purple-800'
              }`}
          >
            Renal Impairment
          </button>
        </div>

        {activeGuide === ActiveGuide.HEPATIC && renderGuide(HEPATIC_IMPAIRMENT_GUIDE)}
        {activeGuide === ActiveGuide.RENAL && renderGuide(RENAL_IMPAIRMENT_GUIDE)}
      </main>
      <Footer />
    </div>
  );
}

export default App;