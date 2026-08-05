import AboutPoints from '../AboutPoints';
import DesktopSummaryPreview from '../DesktopSummary';

const aboutSummary = (
  <div className="relative desktop:min-h-72.5">
    <DesktopSummaryPreview />
    <AboutPoints />
  </div>
);

export default function AboutSummary() {
  return aboutSummary;
}
