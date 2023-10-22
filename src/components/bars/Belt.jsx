export default function Belt() {
  return (
    <>
      <div className="pointer-events-none fixed bottom-0 z-[9999] w-full">
        <div className="flex items-center gap-1 px-8 py-4 mix-blend-multiply dark:mix-blend-screen">
          <div className="flex-auto"></div>
          <div className="flex gap-1 [&>*]:pointer-events-auto">
            <div className="pointer-events-none select-none font-hand text-xs text-slate-200 dark:text-slate-800">
              ethzhou
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
