import { useRef, useState } from "react";

export default function CharByCharField({length, doClearOnSubmit, submitEventType}) {
  const divRef = useRef();
  const [fields, setFields] = useState(() => Array(length).fill().map(
    (_, index) =>
      <input key={index} type="text" maxLength={1}
        onKeyDown={handleInputKeyDown}
        onChange={handleInputChange}
      />
  ));

  function getString() {
    return [...divRef.current.children].map(inputElement => inputElement.value).join("");
  }

  function handleInputKeyDown(event) {
    // Pressing Enter
    if (event.key === "Enter") {
      const enterPressed = new CustomEvent(submitEventType, {
        detail: {
          text: getString(),
        },
      });
      document.dispatchEvent(enterPressed);
      // console.log(`${submitEventType} event dispatched`)

      if (doClearOnSubmit) {
        [...divRef.current.children].forEach(element => {
          element.value = "";
        });
        divRef.current.children[0].focus();
      }
      return;
    }

    // Pressing Backspace 
    if (event.target.value.length === 0 && event.key === "Backspace") {
      event.preventDefault();
      event.target.previousElementSibling?.focus();
      return;
    }

    // Before continuing, check that nothing is selected
    if (document.getSelection()?.type === "Range")
      return;

    // Typing in a field where there is already a character
    if (event.target.value.length === 1 && event.key.length === 1){
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
      <div ref={divRef}>
        {fields}
      </div>
    </>
  )
}