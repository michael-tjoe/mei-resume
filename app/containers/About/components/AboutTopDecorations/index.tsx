import { DesktopOnly } from '@/components/DesktopOnly';
import { MobileOnly } from '@/components/MobileOnly';
import Flower from '../Flower';

/** Hoisted static JSX (rendering-hoist-jsx). */
const aboutTopDecorations = (
  <>
    <MobileOnly>
      <Flower className="top-11 left-[78.75%] h-10.75 w-11 duration-300 ease-out tablet:top-[40%] tablet:left-[90%]" />
    </MobileOnly>
    <DesktopOnly>
      <Flower className="top-[4vh] left-27.5 aspect-[115.75/108.73] w-[calc(115.75/534*100%)] duration-300 ease-out group-hover:aspect-65/67 group-hover:w-[calc(65/1695*100%)] group-hover:translate-x-100 group-hover:translate-y-[-2vh]" />
    </DesktopOnly>
  </>
);

export default function AboutTopDecorations() {
  return aboutTopDecorations;
}
