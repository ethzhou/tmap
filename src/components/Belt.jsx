import ColorSchemeIcon from "./ColorSchemeIcon";

export default function Belt() {
  return (
    <>
      <div className="sticky top-4 flex gap-4">
        <div className="absolute right-4">
          <ColorSchemeIcon />
        </div>
      </div>
    </>
  );
}