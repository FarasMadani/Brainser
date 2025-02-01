import React, { useState, useRef } from "react";
import Tesseract from "tesseract.js";
import SideNavbar from "./Components/SideNavbar";
import BottomNavbar from "./Components/BottomNav";
import "./App.css";

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [providedText, setProvidedText] = useState("");
  const [spokenText, setSpokenText] = useState("");
  const [errors, setErrors] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [showResults, setShowResults] = useState(false); // New state to track if results should be shown
  const [language, setLanguage] = useState("1"); // Default value is "1"
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message
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
    setProvidedText(event.target.value.toLowerCase());
    setErrorMessage(""); // Clear error message when typing
  };

  // Handle speech recognition
  const startSpeechRecognition = () => {
    if (providedText.trim() === "") {
      setErrorMessage("Must insert text");
      return;
    }

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
      recognitionRef.current.onend = null; // Prevent restarting recognition on end
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
          className={`${
            errors.includes(index) ? "bg-red-500 text-white" : "bg-transparent"
          } px-1`}
        >
          {word}
        </span>
      );
    });
  };

  // Handle check result button click
  const handleCheckResult = () => {
    if (providedText.trim() === "") {
      setErrorMessage("Must insert text");
      return;
    }
    setShowResults(true);
  };

  // Handle go back button click
  const handleGoBack = () => {
    setShowResults(false);
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        <div className="flex justify-center items-start mt-10">
          <SideNavbar
            handleImageUpload={handleImageUpload}
            handlePDFUpload={handlePDFUpload}
          />
          <div className="App card bg-base-100 w-full md:w-96 mx-5 p-5 shadow-lg">
            {!showResults && (
              <div className="LangSelector text-center my-3 space-x-3">
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
            )}

            <div>
              {uploadedImage && (
                <p>
                  Extracted Text: <pre>{extractedText}</pre>
                </p>
              )}
            </div>

            {!isListening && !showResults && (
              <div className="my-3 py-3">
                <textarea
                  className="textarea textarea-bordered w-full text-sm"
                  placeholder="Type or paste text here..."
                  rows="4"
                  value={providedText}
                  onChange={handleTextInput}
                />
                {errorMessage && (
                  <p className="text-red-500 mt-2">{errorMessage}</p>
                )}
              </div>
            )}

            <div className="flex flex-col items-center">
              {!showResults && (
                <div className="btn btn-outline mb-5">
                  {!isListening ? (
                    <button onClick={startSpeechRecognition}>
                      Start Listening
                    </button>
                  ) : (
                    <button onClick={stopSpeechRecognition}>Stop Listening</button>
                  )}
                </div>
              )}

              {!isListening && !showResults && (
                <button
                  className="btn btn-outline"
                  onClick={handleCheckResult}
                >
                  Check Result
                </button>
              )}

              {showResults && (
                <>
                  <div className="stats-vertical">
                    <div className="stat">
                      <div className="stat-title text-center">Spoken Words</div>
                      <div className="stat-value text-sm flex flex-wrap overflow-y-auto whitespace-normal max-h-48">
                        {spokenText}
                      </div>
                    </div>

                    <div className="stat">
                      <div className="stat-title text-center">Highlighted Mistakes</div>
                      <div className="stat-value text-sm flex flex-wrap overflow-y-auto whitespace-normal max-h-48">
                        {getHighlightedText(providedText, errors)}
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn btn-secondary mt-5"
                    onClick={handleGoBack}
                  >
                    Go Back
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        {!showResults && <BottomNavbar/>}
      </div>
    </>
  );
}

export default App;