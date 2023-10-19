import { useRef, useState } from "react";

export default function CharByCharField({
  length,
  doClearOnSubmit,
  submitEventType,
}) {
  function handleMouseMoveLightPos(event) {
    const target = event.currentTarget;

    for (const field of target.children) {
      const rect = field.getBoundingClientRect();
      const relativeX = event.clientX - rect.x;

      field.style.setProperty("--light-x", `${relativeX}px`);
    }
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
          onChange={handleInputChange}
          // className="border-px m-0 aspect-square rounded-sm border-solid border-slate-500 bg-transparent text-center font-comic text-3xl text-slate-800 outline-0 dark:border-slate-400 dark:text-slate-200"
          className="char-field m-0 aspect-square border-0 border-b-2 border-dashed border-slate-500 bg-transparent text-center font-comic text-5xl text-slate-800 outline-0 hover:border-orange-400 focus:border-solid focus:border-slate-800 dark:border-slate-400 dark:text-slate-200 dark:hover:border-purple-600 dark:focus:border-slate-200"
        />
      )),
  );

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
      divRef.current.children[0].focus();
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
      divRef.current.children[0].focus();

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

  return (
    <>
      <div className="relative">
        <div
          ref={divRef}
          onMouseMove={handleMouseMoveLightPos}
          className="relative grid w-40 grid-cols-2 gap-2"
        >
          {/* Do not put more elements under this div. The selection of previous/next sibling does not check whether the input field is the last one. */}
          {fields}
        </div>
        <button
          onClick={submit}
          className="absolute -right-10 top-8 border-none bg-transparent text-3xl text-slate-500 dark:text-slate-600"
        >
          ↩
        </button>
      </div>
    </>
  );
}
