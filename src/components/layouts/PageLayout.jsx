export default function PageLayout({ children }) {
  return (
    <>
      <div className="my-20 flex justify-center">
        <div className="flex w-[48rem] flex-col justify-start gap-1">
          {children}
        </div>
      </div>
    </>
  );
}
