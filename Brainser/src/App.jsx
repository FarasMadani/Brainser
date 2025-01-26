import React, { useState, useRef } from "react";
import Tesseract from "tesseract.js";
import Navbar from "./Components/Navbar";

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [providedText, setProvidedText] = useState("");
  const [spokenText, setSpokenText] = useState("");
  const [errors, setErrors] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState("1"); // Default value is "1"
  const [showModal, setShowModal] = useState(false);
  const [showTextInput, setShowTextInput] = useState(false); // Control visibility of text input
  const recognitionRef = useRef(null); // Store the recognition instance

  const languageOptions = {
    en: { ocr: "eng", speech: "en-US" },
    ar: { ocr: "ara", speech: "ar-SA" },
    // Add more languages here if needed
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setUploadedImage(file);

    Tesseract.recognize(file, languageOptions[language]?.ocr || "eng")
      .then(({ data: { text } }) => {
        setExtractedText(text.toLowerCase());
      })
      .catch((error) => {
        console.error("OCR error:", error);
      });
  };

  // Handle PDF upload
  const handlePDFUpload = (event) => {
    const file = event.target.files[0];
    // Add logic to handle PDF upload and text extraction
  };

  // Handle text input
  const handleTextInput = (event) => {
    setExtractedText(event.target.value.toLowerCase());
  };

  // Handle speech recognition
  const startSpeechRecognition = () => {
    if (
      !("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
    ) {
      alert(
        "Speech Recognition is not supported in your browser. Please use Google Chrome."
      );
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = languageOptions[language]?.speech || "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const spoken = Array.from(event.results)
        .map((result) => result[0].transcript.toLowerCase())
        .join(" ");
      setSpokenText(spoken);

      // Compare provided text and spoken text
      const errors = compareText(providedText.toLowerCase(), spoken);
      setErrors(errors);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      if (isListening) {
        recognition.start(); // Restart recognition if it's still listening
      }
    };

    recognition.start();
    recognitionRef.current = recognition; // Store the recognition instance
  };

  // Stop speech recognition
  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop(); // Manually stop the microphone
      setIsListening(false); // Update listening status
    }
  };

  // Compare text for errors
  const compareText = (provided, spoken) => {
    const providedWords = provided.split(" ");
    const spokenWords = spoken.split(" ");
    const mistakes = [];

    // Compare each word in provided text with spoken text
    providedWords.forEach((word, index) => {
      if (word !== spokenWords[index]) {
        mistakes.push(index); // Store the index of the mistake
      }
    });

    return mistakes;
  };

  // Highlight incorrect words
  const getHighlightedText = (text, errors) => {
    const words = text.split(" ");
    return words.map((word, index) => {
      return (
        <span
          key={index}
          style={{
            backgroundColor: errors.includes(index) ? "red" : "transparent",
            color: errors.includes(index) ? "white" : "black",
            padding: "0 2px",
          }}
        >
          {word}
        </span>
      );
    });
  };

  return (
    <div className="m-2 p-2">
      <Navbar />
      <div className="LangSelector text-center my-10 space-x-3">
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Upload Text
        </button>
        <select
          className="select select-secondary"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option disabled value="1">
            Pick A language
          </option>
          <option value="en">English</option>
          <option value="ar">Arabic</option>
          {/* Add more language options here if needed */}
        </select>
      </div>

      <div>
        {uploadedImage && (
          <p>
            Extracted Text: <pre>{extractedText}</pre>
          </p>
        )}
      </div>

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Select File Type</h3>
            <div className="modal-action">
              <label className="btn" htmlFor="image-upload">
                Image
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    handleImageUpload(e);
                    setShowModal(false);
                    setShowTextInput(false); // Hide text input
                  }}
                  className="hidden"
                />
              </label>
              <label className="btn" htmlFor="pdf-upload">
                PDF
                <input
                  id="pdf-upload"
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => {
                    handlePDFUpload(e);
                    setShowModal(false);
                    setShowTextInput(false); // Hide text input
                  }}
                  className="hidden"
                />
              </label>
              <button
                className="btn"
                onClick={() => {
                  setShowTextInput(true); // Show text input
                  setShowModal(false);
                }}
              >
                Text Input
              </button>
              <button className="btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showTextInput && (
        <div>
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Type or paste text here..."
            rows="4"
            value={providedText}
            onChange={(e) => setProvidedText(e.target.value.toLowerCase())}
          />
        </div>
      )}

      <div className="btn btn-outline">
        {!isListening ? (
          <button onClick={startSpeechRecognition}>Start Listening</button>
        ) : (
          <button onClick={stopSpeechRecognition}>Stop Listening</button>
        )}
      </div>

      <div className="stats stats-vertical lg:stats-horizontal shadow">
        <div className="stat">
          <div className="stat-title">Spoken Words:</div>
          <div className="stat-value">{spokenText}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Highlighted Mistakes:</div>
          <div className="stat-value">{getHighlightedText(providedText, errors)}</div>
        </div>

      </div>
    </div>
  );
}

export default App;
