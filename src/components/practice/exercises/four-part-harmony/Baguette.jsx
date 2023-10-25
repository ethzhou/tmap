import { useEffect, useRef, useState } from "react";

export default function Baguette({ defaultPlaceholder }) {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    document.addEventListener("tipmouseenter", handleTipMouseEnter);

    return () => {
      document.removeEventListener("tipmouseenter", handleTipMouseEnter);
    };
  }, []);

  function handleTipMouseEnter(event) {
    setPlaceholder(() => event.detail.example);
  }

  function handleKeyDown(event) {
    // Submission
    if (event.key === "Enter") {
      submit();

      return;
    }

    if (event.key === "Tab") {
      if (inputRef.current.value === "") {
        if (placeholder !== "") {
          event.preventDefault();
        }

        inputRef.current.value = placeholder;
      }

      return;
    }

    // Other
    document.dispatchEvent(
      new CustomEvent("baguettekeydown", {
        detail: {
          inputString: inputRef.current.value,
          event: event,
        },
      }),
    );
  }

  function submit(event) {
    document.dispatchEvent(
      new CustomEvent("baguettesubmit", {
        detail: {
          inputString: inputRef.current.value,
        },
      }),
    );

    inputRef.current.value = "";
    setPlaceholder(() => "");
  }

  return (
    <div id="baguette-magique" className="group relative mb-5 flex gap-0.5">
      <label className="mr-1 font-text text-4xl text-slate-500 group-focus-within:text-slate-700 group-[:has(input:not(:placeholder-shown))]:text-slate-700 dark:text-slate-600 dark:group-focus-within:text-slate-400 dark:group-[:has(input:not(:placeholder-shown))]:text-slate-400">
        &gt;
      </label>
      <input
        ref={inputRef}
        type="text"
        onKeyDown={handleKeyDown}
        onMouseEnter={event => event.target.focus()}
        autoFocus
        // If ever the placeholder text should be removed, use " " rather than "" so that :placeholder-shown selects as intended.
        placeholder={
          placeholder ? `⇥  ${placeholder}` : defaultPlaceholder || " "
        }
        className="m-0 flex-auto border-0 border-b-2 border-dashed border-slate-500 bg-transparent p-0 px-1 text-end font-mono text-3xl text-slate-600 outline-0 placeholder:text-slate-300 placeholder:transition-all placeholder:duration-75 hover:border-orange-400 focus-visible:border-solid focus-visible:border-slate-600 dark:border-slate-600 dark:text-slate-400 dark:placeholder:text-slate-700 dark:hover:border-sky-300 dark:focus-visible:border-slate-400"
      />
      <button
        onClick={submit}
        className="group/submit-button relative bottom-0.5 flex aspect-square cursor-pointer select-none flex-col items-start justify-center border-none bg-transparent"
      >
        <div className="text-3xl leading-none text-slate-600 dark:text-slate-500">
          ↜
        </div>
        <div className="pointer-events-none absolute -bottom-1 font-comic text-[0.60rem] text-slate-600 opacity-0 transition-opacity duration-200 group-hover/submit-button:opacity-100 dark:text-slate-500">
          submit
        </div>
      </button>
    </div>
  );
}
