import { useState } from "react";

export default function CharByCharField({length}) {
  const [fields, setFields] = useState(() => {
    let i = 0;
    return Array(length).fill().map((_, index) =>
      <input key={index} type="text" maxLength={1}
        onKeyDown={handleInputKeyDown}
        onChange={handleInputChange}
      />
    );
  });

  function handleInputKeyDown(event) {
    // console.log("keydown", event.key, event.target.value.length);

    // Pressing Backspace 
    if (event.target.value.length === 0 && event.key === "Backspace") {
      event.preventDefault();
      event.target.previousElementSibling?.focus();
      return;
    }

    // Check that nothing is selected before continuing
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

  function getString() {
    return chars.join("");
  }

  return (
    <>
      <div>
        {fields}
      </div>
    </>
  )
}