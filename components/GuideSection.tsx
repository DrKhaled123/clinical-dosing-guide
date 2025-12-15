import React from 'react';
import { ContentBlock, ContentType, CrClStage, DynamicTableData, ReferenceEntry, DrugEntry, DDIEntry } from '../types';
import { DynamicTable } from './DynamicTable';
import { CrClStagesTable } from './CrClStagesTable';
import { ReferenceSection } from './ReferenceSection';

interface GuideSectionProps {
  block: ContentBlock;
}

export const GuideSection: React.FC<GuideSectionProps> = ({ block }) => {
  const { type, level, content, id } = block;

  switch (type) {
    case ContentType.HEADING:
      const HeadingTag = `h${level}` as React.ElementType;
      return React.createElement(
        HeadingTag,
        {
          id: id,
          className: `font-bold mt-8 mb-4 pb-2 border-b-2 border-purple-500 ${level === 1 ? 'text-3xl text-blue-700 dark:text-blue-400' : level === 2 ? 'text-2xl text-blue-600 dark:text-blue-500' : 'text-xl text-blue-500 dark:text-blue-600'}`
        },
        content as string
      );
    case ContentType.PARAGRAPH:
      // Render content directly as React.ReactNode allows for mixed strings and JSX
      return <p className="leading-relaxed mb-4 text-gray-700 dark:text-gray-300">{content as React.ReactNode}</p>;
    case ContentType.TABLE:
      return (
        <div className="mb-6">
          <DynamicTable data={content as DynamicTableData} />
        </div>
      );
    case ContentType.CRCL_STAGES_TABLE:
      return (
        <div className="mb-6">
          <CrClStagesTable stages={content as CrClStage[]} />
        </div>
      );
    case ContentType.REFERENCES:
      return (
        <div className="mb-6">
          <ReferenceSection entries={content as ReferenceEntry[]} />
        </div>
      );
    case ContentType.DRUG_LIST: // Handled in App.tsx, return null here
    case ContentType.DDI_LIST: // Handled in App.tsx, return null here
      return null;
    default:
      return null;
  }
};