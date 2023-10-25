export default function BaguetteTip({ char, name, example }) {
  return (
    <div className="group grid grid-cols-[1fr_6fr] items-baseline gap-2 pb-2">
      <div className="font-mono text-lg text-slate-400 dark:text-slate-500">
        {char}
      </div>
      <div className="font-text text-lg text-slate-700 dark:text-slate-400">
        {name}
      </div>
      <div className="absolute right-0 top-0 hidden font-mono text-lg text-slate-400 group-hover:block dark:text-slate-500">
        {example}
      </div>
    </div>
  );
}
