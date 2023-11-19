export default function FigureExample({
  caption,
  children,
  doHideCaption,
  doShowTryMessage,
}) {
  return (
    <>
      <figure className="group relative flex flex-col items-center">
        {children}
        <figcaption
          className={`text-xl font-bold ${
            doHideCaption
              ? "font-redacted group-hover:font-comic"
              : "font-comic"
          }`}
        >
          {caption}
        </figcaption>
        {doShowTryMessage ? (
          <div className="pointer-events-none absolute -left-12 top-0 -z-50 -rotate-12 select-none font-hand text-4xl text-slate-300 dark:text-slate-700">
            try
          </div>
        ) : null}
      </figure>
    </>
  );
}
