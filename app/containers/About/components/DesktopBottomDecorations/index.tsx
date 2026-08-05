import { DesktopOnly } from '@/components/DesktopOnly';
import Flower from '../Flower';

/** Hoisted static JSX (rendering-hoist-jsx). DesktopOnly owns the viewport gate. */
const desktopBottomDecorations = (
  <>
    <Flower
      variant="alt"
      className="top-about-title-translate left-90.75 aspect-94/88 w-[calc(94/534*100%)] group-hover:aspect-63/58 group-hover:w-[calc(63/1695*100%)] group-hover:translate-x-91.25 group-hover:-translate-y-about-title-translate"
    />

    <Flower
      variant="alt"
      className="top-[30vh] left-32.75 aspect-66/62 w-[calc(66/534*100%)] group-hover:aspect-66/58 group-hover:translate-x-62.25 group-hover:-translate-y-[calc(var(--spacing-about-title-translate))] group-hover:scale-[calc(534/1695)]"
    />
  </>
);

export default function DesktopBottomDecorations() {
  return <DesktopOnly>{desktopBottomDecorations}</DesktopOnly>;
}
