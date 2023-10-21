import { useEffect, useRef, useState } from "react";

export default function CharByCharField({
  length,
  doClearOnSubmit,
  submitEventType,
  autoFocus,
}) {
  function handleMouseMoveLightPos(event) {
    const target = event.currentTarget;

    const rect = target.getBoundingClientRect();
    const relativeX = event.clientX - rect.x;

    target.style.setProperty("--light-x", `${relativeX}px`);
  }

  const divRef = useRef();
  const [fields, setFields] = useState(() =>
    Array(length)
      .fill()
      .map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          onKeyDown={handleInputKeyDown}
          onMouseMove={handleMouseMoveLightPos}
          onChange={handleInputChange}
          // className="border-px m-0 aspect-square rounded-sm border-solid border-slate-500 bg-transparent text-center font-comic text-3xl text-slate-800 outline-0 dark:border-slate-400 dark:text-slate-200"
          className="char-field m-0 aspect-square border-0 border-b-2 border-dashed border-slate-500 bg-transparent p-0 text-center font-comic text-5xl text-slate-800 outline-0 hover:border-orange-400 focus:border-solid focus:border-slate-800 dark:border-slate-400 dark:text-slate-200 dark:hover:border-blue-400 dark:focus:border-slate-200"
          autoFocus={index === 0}
        />
      )),
  );

  useEffect(() => {
    divRef.current.style[
      "grid-template-columns"
    ] = `repeat(${2}, minmax(0, 1fr))`;
    divRef.current.style.width = `${5.5 * length - 0.5} rem`;
  }, []);

  function getString() {
    return [...divRef.current.children]
      .map(inputElement => inputElement.value)
      .join("");
  }

  function submit(keyDownEvent) {
    const submitEvent = new CustomEvent(submitEventType, {
      detail: {
        text: getString(),
        keyDownEvent,
      },
    });
    document.dispatchEvent(submitEvent);
    // console.log(`${submitEventType} event dispatched`)

    if (doClearOnSubmit) {
      [...divRef.current.children].forEach(element => {
        element.value = "";
      });
      divRef.current.firstChild.focus();
    }
  }

  function handleInputKeyDown(event) {
    // Pressing Enter
    if (event.key === "Enter") {
      submit(event);

      return;
    }

    // Pressing Escape
    if (event.key === "Escape") {
      [...divRef.current.children].forEach(element => {
        element.value = "";
      });
      divRef.current.firstChild.focus();

      return;
    }

    // Pressing Backspace
    if (event.target.value.length === 0 && event.key === "Backspace") {
      event.preventDefault();
      event.target.previousElementSibling?.focus();

      return;
    }

    // Before continuing, check that nothing is selected
    if (document.getSelection()?.type === "Range") return;

    // Typing in a field where there is already a character
    if (event.target.value.length === 1 && event.key.length === 1) {
      event.preventDefault();
      if (event.target.nextElementSibling) {
        event.target.nextElementSibling.focus();
        event.target.nextElementSibling.value = event.key;
        event.target.nextElementSibling.nextElementSibling?.focus();
      }

      return;
    }
  }

  function handleInputChange(event) {
    // Some deletion
    if (event.target.value.length === 0) {
      event.target.previousElementSibling?.focus();

      return;
    }

    // New character
    if (event.target.value.length === 1) {
      event.target.nextElementSibling?.focus();

      return;
    }
  }

  // useEffect(() => {
  //   if (autoFocus) {
  //     divRef.current.firstChild.focus();
  //   }
  // }, []);

  return (
    <>
      <div className="relative">
        {/* grid-template-columns set above in useEffect */}
        <div ref={divRef} className="relative grid w-40 gap-2">
          {/* Do not put more elements under this div. The selection of previous/next sibling does not check whether the input field is the last one. */}
          {fields}
        </div>
        <button
          onClick={submit}
          className="group absolute -right-10 top-8 flex aspect-square cursor-pointer select-none flex-col items-start justify-center border-none bg-transparent"
        >
          <div className="text-3xl leading-none text-slate-600 dark:text-slate-500">
            ↜
          </div>
          <div className="pointer-events-none absolute -bottom-2 font-comic text-xs text-slate-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:text-slate-500">
            submit
          </div>
        </button>
      </div>
    </>
  );
}
