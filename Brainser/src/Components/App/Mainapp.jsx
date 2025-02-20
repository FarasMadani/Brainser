import React, { useState, useRef, useEffect } from "react";
import Tesseract from "tesseract.js";
import SideNavbar from "./SideNavbar";
import BottomNavbar from "./BottomNav";
import Background from "./Background";
import Navbar from "../Home/Navbar";
import MicrophoneVisualizer from "../App/Conditions/MicroVis"; // Import the new component
import * as pdfjsLib from "pdfjs-dist";

function MainApp() {
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
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false); // New state to track history pop-up

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(savedHistory);
  }, []);

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
  const handlePDFUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async function () {
      const typedArray = new Uint8Array(this.result);
      const pdf = await pdfjsLib.getDocument(typedArray).promise;
      let textContent = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const text = await page.getTextContent();
        text.items.forEach((item) => {
          textContent += item.str + " ";
        });
      }

      setExtractedText(textContent.toLowerCase());
    };

    reader.readAsArrayBuffer(file);
  };

  // Handle text input
  const handleTextInput = (event) => {
    const inputText = event.target.value;
    const sanitizedText = inputText
      .replace(/[^a-zA-Z0-9\s.,\u0600-\u06FF]/g, "") // Allow Arabic characters and spaces
      .replace(/[\u0610-\u061A\u064B-\u065F\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED]/g, "") // Remove Arabic diacritics (harakat)
      .trim();
    setProvidedText(sanitizedText.toLowerCase());
    setErrorMessage(""); // Clear error message when typing
  };

  // Handle speech recognition
  const startSpeechRecognition = () => {
    if (providedText.trim() === "") {
      return setErrorMessage("Select A Language To Continue");
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
            errors.includes(index)
              ? "bg-red-500 rounded-md text-white"
              : "bg-transparent"
          } px-1`}
          style={{ direction: language === "ar" ? "rtl" : "ltr", textAlign: language === "ar" ? "right" : "left" }} // Adjust text direction and alignment for Arabic
        >
          {word}
        </span>
      );
    });
  };

  const saveResultToHistory = (result) => {
    const updatedHistory = [...history, result];
    setHistory(updatedHistory);
    localStorage.setItem("history", JSON.stringify(updatedHistory));
  };

  const removeHistoryItem = (index) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    setHistory(updatedHistory);
    localStorage.setItem("history", JSON.stringify(updatedHistory));
  };

  // Handle check result button click
  const handleCheckResult = () => {
    if (providedText.trim() === "") {
      setErrorMessage("Must insert text");
      return;
    }
    setShowResults(true);
    saveResultToHistory({ providedText, spokenText, errors });
  };

  // Handle go back button click
  const handleGoBack = () => {
    setShowResults(false);
  };

  return (
    <>
      <Navbar />
      <Background />
      <div className="flex justify-center items-start mt-10">
        <SideNavbar
          handleImageUpload={handleImageUpload}
          handlePDFUpload={handlePDFUpload}
        />
        <div className="App card bg-white w-96 mx-2 p-5 shadow-lg border-4 border-gray-400">
          {!showResults && (
            <div className="LangSelector text-center my-3 space-x-3">
              <select
                className="select select-primary"
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
                Text:{" "}
                <pre className="stat-value text-sm flex flex-wrap overflow-y-auto whitespace-normal max-h-24">
                  {extractedText}
                </pre>
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
          {isListening && <MicrophoneVisualizer />} {/* Add the visualizer */}
            {!showResults && (
              <div className="btn btn-outline mt-3 mb-3 ">
                {!isListening ? (
                  <button onClick={startSpeechRecognition}>
                    Start Listening
                  </button>
                ) : (
                  <button onClick={stopSpeechRecognition}>
                    Stop Listening
                  </button>
                )}
              </div>
            )}

            {!isListening && !showResults && (
              <button className="btn btn-outline" onClick={handleCheckResult}>
                Check Result
              </button>
            )}

            {showResults && (
              <>
                <div className="mx">
                  <div className="stats-vertical">
                    <div className="stat">
                      <div className="stat-title text-center text-lg m-2 underline bg-gray-400 rounded-lg">
                        Spoken Words
                      </div>
                      <div className="stat-value text-sm flex flex-wrap overflow-y-auto whitespace-normal max-h-48">
                        {spokenText}
                      </div>
                    </div>
                  </div>

                  <div className="stat">
                    <div className="stat-title text-center text-lg m-2 underline bg-gray-400 rounded-lg">
                      Highlighted Mistakes
                    </div>
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
     <BottomNavbar history={history} showHistory={showHistory} setShowHistory={setShowHistory} removeHistoryItem={removeHistoryItem} />
    </>
  );
}

export default MainApp;