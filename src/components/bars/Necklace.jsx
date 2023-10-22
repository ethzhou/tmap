import ColorSchemeIcon from "./ColorSchemeIcon";

export default function Necklace() {
  return (
    <>
      <div className="pointer-events-none fixed top-0 z-[9999] w-full">
        <div className="flex items-end gap-1 px-8 py-4 mix-blend-multiply dark:mix-blend-screen">
          <div className="flex-auto"></div>
          <div className="flex gap-1 [&>*]:pointer-events-auto">
            <ColorSchemeIcon />
          </div>
        </div>
      </div>
    </>
  );
}
