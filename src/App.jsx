import './App.css'
import { useRef } from 'react';

function App() {
  const inputRef = useRef(null);
  let lastSavedNumber = '';

  const handleInputChange = (event) => {
    const input = inputRef.current.value;

    const lastSavedDigits = lastSavedNumber.replace(/\D/g, '');
    const digits = input.replace(/\D/g, '').length > 10 ? lastSavedDigits : input.replace(/\D/g, '');

    let formattedNumber = '';
    if (digits.length >= 4) {
      formattedNumber = `(${digits.substring(0, 3)}) `;
      if (digits.length >= 7) {
        formattedNumber += `${digits.substring(3, 6)}-${digits.charAt(6)}`;
        if (digits.length > 7) {
          formattedNumber += digits.substring(7, 10);
        }
      } else {
        formattedNumber += digits.substring(3, digits.length);
      }
    } else {
      formattedNumber = digits;
    }

    const caretPosition = inputRef.current.selectionStart;
    inputRef.current.value = formattedNumber;

    let newCaretPosition = caretPosition + (formattedNumber.length - input.length);

    if (digits === lastSavedDigits) {
      if (input.length < lastSavedNumber.length && caretPosition === 5 && event.nativeEvent.inputType.includes('delete')) {
        if (event.nativeEvent.inputType === 'deleteContentForward') {
          newCaretPosition = 5;
        } else {
          newCaretPosition = 4;
        }
      } else if (caretPosition === 4) {
        newCaretPosition = 4;
      } else if (input.length < lastSavedNumber.length && event.nativeEvent.inputType.includes('delete')) {
        newCaretPosition -= 1;
      }
    } else if (lastSavedDigits.length === 4 && digits.length === 3) {
      if (caretPosition >= 1 && caretPosition <= 4) {
        newCaretPosition = caretPosition - 1;
      }
    } else if (lastSavedDigits.length === 3 && digits.length === 4) {
      if (caretPosition >= 1 && caretPosition <= 3) {
        newCaretPosition = caretPosition + 1;
      }
    } else if (lastSavedDigits.length === 7 && digits.length === 6) {
      if (caretPosition >= 1 && caretPosition <= 3) {
        newCaretPosition = caretPosition;
      } else if (caretPosition >= 6 && caretPosition <= 8) {
        newCaretPosition = caretPosition;
      } else if (lastSavedNumber.length - 1 > input.length) {
        newCaretPosition = caretPosition;
      }
    } else if (lastSavedDigits.length === 6 && digits.length === 7) {
      if (caretPosition >= 2 && caretPosition <= 4) {
        newCaretPosition = caretPosition;
      } else if (caretPosition >= 7 && caretPosition <= 9) {
        newCaretPosition = caretPosition;
      }
    } else if (lastSavedDigits.length >= 4 && digits.length > lastSavedDigits.length) {
      if (caretPosition === 1) {
        newCaretPosition = 2;
      } else if (caretPosition === 5) {
        newCaretPosition = 7;
      } else if (caretPosition === 6) {
        newCaretPosition = 7;
      } else if (lastSavedDigits.length >= 7 && digits.length > lastSavedDigits.length) {
        if (caretPosition === 10) {
          newCaretPosition = 11;
        }
      }
    } else if (lastSavedNumber.length - 1 > input.length) {
      if (digits.length >= 7) {
        newCaretPosition = caretPosition;
      } else if (digits.length < 7 && lastSavedNumber.length >= 7 && digits.length >= 4) {
        if (caretPosition === 0) {
          newCaretPosition = 1;
        } else if (caretPosition >= 1 && caretPosition <= 4) {
          newCaretPosition = caretPosition;
        } else if (caretPosition >= 5 && caretPosition <= 6 && event.nativeEvent.inputType === 'insertText') {
          newCaretPosition = 7;
        } else if (event.nativeEvent.inputType.includes('delete')) {
          newCaretPosition = caretPosition;
          if (caretPosition === 5) {
            newCaretPosition = 6;
          }
        }
      } else if (digits.length < 4 && event.nativeEvent.inputType.includes('delete')) {
        if (input.includes('(') && caretPosition === 1) {
          newCaretPosition = 0;
        } else if (!input.includes('(')) {
          newCaretPosition = 0;
        } else if (input.includes('(') && caretPosition === 2) {
          newCaretPosition = 1;
        }
      } else if (digits.length < 4 && event.nativeEvent.inputType.includes('insert')) {
        if (caretPosition === 1) {
          newCaretPosition = 1;
        } else if (caretPosition === 3) {
          newCaretPosition = 2;
        }
      }
    }

    inputRef.current.setSelectionRange(newCaretPosition, newCaretPosition);
    lastSavedNumber = formattedNumber;
  };

  return (
    <>
      <div className="container text-center">
        <input data-testid="input-box" ref={inputRef} onChange={handleInputChange} type="tel" id="phone" maxLength="14" placeholder="mobile number" autoComplete="off" minLength="14" />
        <div><label htmlFor="phone">(123) 456-7890</label></div>
      </div>
    </>
  )
}

export default App