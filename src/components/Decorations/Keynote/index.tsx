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
      <svg
        className="keynote"
        width="26"
        height="28"
        viewBox="0 0 26 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.2496 7.92224C22.4836 8.9583 25.7809 10.414 22.429 13.9713C20.4435 14.202 22.0684 11.92 21.5508 11.2693C20.2609 10.0624 18.2012 10.6681 17.5974 8.7633C15.8637 12.1181 14.3725 16.3733 12.0202 19.3312C9.29372 22.7603 -0.178813 21.8416 0.760687 18.4389C1.70019 15.0363 7.89183 15.3966 9.65661 17.8948L10.3576 17.933C12.0912 13.7954 14.3301 9.26455 17.0197 5.64844C19.4967 2.31727 20.0526 5.42595 19.2513 7.91957L19.2496 7.92224Z"
          fill="#321000"
        />
      </svg>
    </div>
  )
}

export default Keynote
