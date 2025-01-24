import React, { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [providedText, setProvidedText] = useState('');
  const [spokenText, setSpokenText] = useState('');
  const [errors, setErrors] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState('en'); // Default language is English
  const recognitionRef = useRef(null);  // Store the recognition instance

  const languageOptions = {
    en: { ocr: 'eng', speech: 'en-US' },
    ar: { ocr: 'ara', speech: 'ar-SA' },
    // Add more languages here if needed
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setUploadedImage(file);

    Tesseract.recognize(file, languageOptions[language].ocr)
      .then(({ data: { text } }) => {
        setExtractedText(text.toLowerCase());
      })
      .catch((error) => {
        console.error('OCR error:', error);
      });
  };

  // Handle speech recognition
  const startSpeechRecognition = () => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      alert('Speech Recognition is not supported in your browser. Please use Google Chrome.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = languageOptions[language].speech;
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const spoken = Array.from(event.results)
        .map((result) => result[0].transcript.toLowerCase())
        .join(' ');
      setSpokenText(spoken);

      // Compare provided text and spoken text
      const errors = compareText(providedText.toLowerCase(), spoken);
      setErrors(errors);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
      if (isListening) {
        recognition.start();  // Restart recognition if it's still listening
      }
    };

    recognition.start();
    recognitionRef.current = recognition;  // Store the recognition instance
  };

  // Stop speech recognition
  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();  // Manually stop the microphone
      setIsListening(false);  // Update listening status
    }
  };

  // Compare text for errors
  const compareText = (provided, spoken) => {
    const providedWords = provided.split(' ');
    const spokenWords = spoken.split(' ');
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
    const words = text.split(' ');
    return words.map((word, index) => {
      return (
        <span
          key={index}
          style={{
            backgroundColor: errors.includes(index) ? 'red' : 'transparent',
            color: errors.includes(index) ? 'white' : 'black',
            padding: '0 2px',
          }}
        >
          {word}
        </span>
      );
    });
  };

  return (
    <div className="artboard phone-1">
      <h1>Reading Helper App</h1>

      <div style={{ marginBottom: '20px' }}>
        <label>
          Select Language:
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="ar">Arabic</option>
            {/* Add more language options here if needed */}
          </select>
        </label>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>
          Upload Text Image:
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>
        {uploadedImage && (
          <p>Extracted Text: <pre>{extractedText}</pre></p>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>
          Input Text for Reading:
          <textarea
            rows="4"
            style={{ width: '100%' }}
            value={providedText}
            onChange={(e) => setProvidedText(e.target.value.toLowerCase())}
          />
        </label>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={startSpeechRecognition} disabled={isListening}>
          {isListening ? 'Listening...' : 'Start Reading'}
        </button>
        <button onClick={stopSpeechRecognition} disabled={!isListening}>
          Stop Listening
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Reading Results:</h2>
        <p>Spoken Text: <pre>{spokenText}</pre></p>
        <div>
          <h3>Highlighted Mistakes:</h3>
          <p>{getHighlightedText(providedText, errors)}</p>
        </div>
      </div>
    </div>
  );
}

export default App;