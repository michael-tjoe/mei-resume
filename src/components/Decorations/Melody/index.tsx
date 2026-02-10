import icMelody from './assets/ic-melody.svg'

interface SwooshProps {
  className?: string
}

function Swoosh({ className = '' }: SwooshProps) {
  return (
    <div className={className} aria-hidden="true">
      <style>{`
        @keyframes melody-rotate {
          0%, 100% { transform: rotate(0); }
          50% { transform: rotate(30deg); }
        }

        .melody {
          transform-origin: center center;
          animation: melody-rotate 1000ms ease-in infinite;
        }
      `}</style>

      <div
        className={`melody flex h-[29px] w-[34px] desktop:h-[75px] desktop:w-[64px] ${className}`}
      >
        <img
          className="block h-full w-full object-contain"
          src={icMelody}
          alt=""
        />
      </div>
    </div>
  )
}

export default Swoosh
