import { cn } from '@/lib/cn';

interface TimelineEntry {
  title: string;
  description: string;
}

interface TimelineColumnData {
  date: string;
  entries: TimelineEntry[];
}

interface TimelineListProps {
  className?: string;
}

/** Module-level static data — avoids recreating arrays/objects each render. */
const TIMELINE_COLUMNS: TimelineColumnData[] = [
  {
    date: '2019',
    entries: [
      {
        title: 'UPH',
        description: 'Visual Communication Design',
      },
    ],
  },
  {
    date: '2021',
    entries: [
      {
        title: 'Typolog 2021 & Expanded',
        description: 'Head design committee',
      },
      {
        title: 'Bank Rakyat Indonesia ‘Simpedes’',
        description: 'Part of Designer ‘Si Kreatif’ Team',
      },
    ],
  },
  {
    date: '2022',
    entries: [
      {
        title: 'Typolog 2022',
        description: 'Head design committee',
      },
      {
        title: 'BEDA’KAN by ADGI Batch 11',
        description: 'Designer of Onde-Onde Gandoem Njonja Moeda',
      },
      {
        title: 'Student Lecturer',
        description: 'Publication Design & Branding Class',
      },
      {
        title: 'Internship',
        description: 'Brand Designer at Egghead Branding Agency',
      },
    ],
  },
  {
    date: '2023 - present',
    entries: [
      {
        title: 'Full Time',
        description: 'Graphic Designer at DNArtworks Agency',
      },
    ],
  },
];

const COLUMN_CLASS =
  'tablet:mb-0 tablet:mr-6 tablet:flex-1 tablet:flex tablet:flex-col tablet:last:mr-0 relative mb-6 last:mb-0';
const CONTENT_CLASS = 'tablet:ml-0 tablet:flex tablet:flex-col tablet:flex-1 ml-10';
const DATE_CLASS = cn(
  'text-brand-dark',
  'mb-2 text-[14px] font-bold tablet:text-portofolio-subtitle',
  'desktop:mb-[calc(44/1920*100vh)] desktop:timeline-h-960:mb-[calc(44/2440*100vh)] desktop:timeline-h-1080:mb-[calc(44/1080*100vh)]',
);
const TITLE_CLASS = cn(
  'text-brand-dark',
  'text-portofolio-body',
  'mb-1 font-bold',
  'desktop:mb-[calc(24/1920*100vh)] desktop:timeline-h-960:mb-[calc(24/2440*100vh)] desktop:timeline-h-1080:mb-[calc(24/1080*100vh)] desktop:text-[22px]',
);
const DESCRIPTION_CLASS = cn(
  'text-brand-dark mb-1 font-regular text-portofolio-body',
  'desktop:mb-[calc(48/1920*100vh)] desktop:timeline-h-960:mb-[calc(48/2440*100vh)] desktop:timeline-h-1080:mb-[calc(48/1080*100vh)]',
);

/** Hoisted static JSX (rendering-hoist-jsx). */
const timelineAxis = (
  <div
    aria-hidden
    className="absolute inset-y-0 left-2.75 w-0.5 bg-brand-dark tablet:inset-x-0 tablet:top-2.75 tablet:bottom-auto tablet:h-0.5 tablet:w-full desktop:-inset-x-24 desktop:w-auto"
  />
);

/** Module-level child (rerender-no-inline-components). */
function TimelineMarker() {
  return (
    <div
      aria-hidden
      className="absolute top-0 left-0 tablet:relative tablet:top-auto tablet:left-auto tablet:mb-4 tablet:self-start desktop:mb-[calc(54/1920*100vh)] desktop:timeline-h-1080:mb-[calc(54/1080*100vh)]"
    >
      <div className="size-6 rounded-full bg-brand-dark" />
    </div>
  );
}

function TimelineColumn({ date, entries }: TimelineColumnData) {
  return (
    <div className={COLUMN_CLASS}>
      <TimelineMarker />
      <div className={CONTENT_CLASS}>
        <p className={DATE_CLASS}>{date}</p>

        <ul className="flex flex-col gap-5 desktop:gap-0 desktop:[&>li:last-child>p]:mb-0">
          {entries.map((entry) => (
            <li key={entry.title}>
              <h3 className={TITLE_CLASS}>{entry.title}</h3>
              <p className={DESCRIPTION_CLASS}>{entry.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Hoisted static JSX (rendering-hoist-jsx). */
const timelineList = (
  <div className="relative">
    {timelineAxis}
    <div className="relative tablet:flex tablet:flex-row">
      {TIMELINE_COLUMNS.map((column) => (
        <TimelineColumn key={column.date} date={column.date} entries={column.entries} />
      ))}
    </div>
  </div>
);

export default function TimelineList({ className }: TimelineListProps) {
  return <div className={cn(className)}>{timelineList}</div>;
}
