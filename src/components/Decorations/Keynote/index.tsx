import icKeynote from './assets/ic-keynote.svg'

interface KeynoteProps {
  className?: string
}

function Keynote({ className = '' }: KeynoteProps) {
  return (
    <div className={className} aria-hidden="true">
      <style>{`
        @keyframes keynote-rotate {
          0%, 100% { transform: rotate(0); }
          50% { transform: rotate(-22.04deg); }
        }

        .keynote {
          transform-origin: center center;
          animation: keynote-rotate 1000ms ease-in infinite;
        }
      `}</style>

      <div
        className={`keynote flex h-[28px] w-[26px] desktop:h-[62px] desktop:w-[57px] ${className}`}
      >
        <img
          className="block h-full w-full object-contain"
          src={icKeynote}
          alt=""
        />
      </div>
    </div>
  )
}

export default Keynote
