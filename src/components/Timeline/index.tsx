interface TimelineItem {
  title: string
  subtitle?: string
  description?: string
  date?: string
}

interface TimelineProps {
  items?: TimelineItem[]
  className?: string
}

function Timeline({ className }: TimelineProps) {
  return (
    <div className={className}>
      <div className="relative">
        {/* Vertical line on mobile, horizontal on tablet */}
        <div className="bg-brand-dark tablet:left-0 tablet:right-0 tablet:top-[11px] tablet:h-0.5 tablet:w-full tablet:bottom-auto absolute top-0 bottom-0 left-[11px] w-0.5" />

        {/* Timeline items */}
        <div className="tablet:flex tablet:flex-row relative">
          <div className="tablet:mb-0 tablet:flex-1 tablet:flex tablet:flex-col relative mb-6 last:mb-0">
            {/* Circle marker */}
            <div className="tablet:relative tablet:top-auto tablet:left-auto tablet:self-start tablet:mb-4 absolute top-0.5 left-0">
              <div className="bg-brand-dark h-6 w-6 rounded-full" />
            </div>

            {/* Content */}
            <div className="tablet:ml-0 tablet:flex tablet:flex-col tablet:flex-1 ml-10">
              <p className="text-brand-dark text-portofolio-subtitle mb-1 font-bold">2019</p>
              <h3 className="text-brand-dark text-portofolio-body mb-1 font-bold">
                UPH
              </h3>
              <p className="text-brand-dark text-portofolio-body mb-1">
                Visual Communication Design
              </p>
            </div>
          </div>

          <div className="tablet:mb-0 tablet:flex-1 tablet:flex tablet:flex-col relative mb-6 last:mb-0">
            {/* Circle marker */}
            <div className="tablet:relative tablet:top-auto tablet:left-auto tablet:self-start tablet:mb-4 absolute top-0.5 left-0">
              <div className="bg-brand-dark h-6 w-6 rounded-full" />
            </div>

            {/* Content */}
            <div className="tablet:ml-0 tablet:flex tablet:flex-col tablet:flex-1 ml-10">
              <div>
                <p className="text-brand-dark text-portofolio-subtitle mb-1 font-bold">
                  2021
                </p>
                <h3 className="text-brand-dark text-portofolio-body mb-1 font-bold">
                  Typolog 2021 & Expanded
                </h3>

                <p className="text-brand-dark mb-1 font-medium">
                  Head design committee
                </p>

                <br />

                <h3 className="text-brand-dark text-portofolio-body mb-1 font-bold">
                  Bank Rakyat Indonesia ‘Simpedes’
                </h3>
                <p className="text-brand-dark mb-1 font-medium">
                  Part of Designer ‘Si Kreatif’ Team
                </p>
              </div>
            </div>
          </div>

          <div className="tablet:mb-0 tablet:flex-1 tablet:flex tablet:flex-col relative mb-6 last:mb-0">
            {/* Circle marker */}
            <div className="tablet:relative tablet:top-auto tablet:left-auto tablet:self-start tablet:mb-4 absolute top-0.5 left-0">
              <div className="bg-brand-dark h-6 w-6 rounded-full" />
            </div>

            {/* Content */}
            <div className="tablet:ml-0 tablet:flex tablet:flex-col tablet:flex-1 ml-10">
              <div>
                <p className="text-brand-dark text-portofolio-subtitle mb-1 font-bold">
                  2022
                </p>

                <h3 className="text-brand-dark text-portofolio-body mb-1 font-bold">
                  Typolog 2022
                </h3>
                <p className="text-brand-dark mb-1 font-medium">
                  Head design committee
                </p>

                <br />

                <h3 className="text-brand-dark text-portofolio-body mb-1 font-bold">
                  BEDA’KAN by ADGI Batch 11
                </h3>
                <p className="text-brand-dark mb-1 font-medium">
                  Designer of Onde-Onde Gandoem Njonja Moeda
                </p>

                <br />

                <h3 className="text-brand-dark text-portofolio-body mb-1 font-bold">
                  Student Lecturer
                </h3>
                <p className="text-brand-dark mb-1 font-medium">
                  Publication Design & Branding Class
                </p>

                <br />

                <h3 className="text-brand-dark text-portofolio-body mb-1 font-bold">
                  Internship
                </h3>
                <p className="text-brand-dark tablet:mt-auto mb-1 font-medium">
                  Brand Designer at Egghead Branding Agency
                </p>
              </div>
            </div>
          </div>

          <div className="tablet:mb-0 tablet:flex-1 tablet:flex tablet:flex-col relative mb-6 last:mb-0">
            {/* Circle marker */}
            <div className="tablet:relative tablet:top-auto tablet:left-auto tablet:self-start tablet:mb-4 absolute top-0.5 left-0">
              <div className="bg-brand-dark h-6 w-6 rounded-full" />
            </div>

            {/* Content */}
            <div className="tablet:ml-0 tablet:flex tablet:flex-col tablet:flex-1 ml-10">
              <p className="text-brand-dark text-portofolio-subtitle mb-1 font-bold">
                2023 - present
              </p>
              <h3 className="text-brand-dark text-portofolio-body mb-1 font-bold">
                Full Time
              </h3>

              <p className="text-brand-dark mb-1 font-medium">
                Graphic Designer at DNArtworks Agency
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Timeline
