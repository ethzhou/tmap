import ColorSchemeIcon from "./ColorSchemeIcon";

export default function Necklace() {
  return (
    <>
      <div className="sticky top-4 z-[9999] m-4 flex flex-row items-start gap-1 mix-blend-multiply dark:mix-blend-screen">
        <div className="flex-auto"></div>
        <div className="">
          <ColorSchemeIcon />
        </div>
      </div>
    </>
  );
}
