import Image from 'next/image';

import { cn } from '@/lib/cn';

import icBrowser from './assets/ic-browser.svg';
import icInstagram from './assets/ic-instagram.svg';
import styles from './portofolio-type-item.module.css';

interface PortofolioTypeItemProps {
  name: string;
  subtitle: string;
  href: string;
  hrefType?: 'ig' | 'website' | '';
  className?: string;
}

function PortofolioTypeItem({
  name,
  subtitle,
  href,
  hrefType = 'ig',
  className,
}: PortofolioTypeItemProps) {
  const icon = hrefType === 'website' ? icBrowser : hrefType === 'ig' ? icInstagram : null;
  const ariaLabel =
    hrefType === 'website'
      ? `Open ${name} website`
      : hrefType === 'ig'
        ? `Open ${name} on Instagram`
        : undefined;

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.text}>
        <p className={styles.name}>{name}</p>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      {icon ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          aria-label={ariaLabel}
        >
          <Image src={icon} alt="" width={67} height={67} unoptimized className="size-full" />
        </a>
      ) : null}
    </div>
  );
}

export default PortofolioTypeItem;
