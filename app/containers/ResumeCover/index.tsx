import Divider from '@/components/Divider';
import ResumePhoto from './components/ResumePhoto';

export default function ResumeCover() {
  return (
    <section className="relative z-(--zphoto) flex w-full shrink-0 flex-col desktop:max-w-294 desktop:min-w-258 desktop:grow-0 desktop:py-14 desktop:pl-36">
      <div className="relative flex h-full max-h-270 flex-col desktop:grow-0 desktop:pr-12 desktop:pl-10">
        <Divider className="hidden shrink-0 desktop:block" color="brand-brown" />
        <ResumePhoto greeting="hi, i'm" firstName="Stefanny" lastName="kusuma" />
      </div>
    </section>
  );
}
