import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      // @ts-ignore
      inputRef.current.focus()
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.code === "KeyK" && (e.metaKey || e.ctrlKey)) {
        setShowPopup(prev => !prev);
      }
      if (e.code == "Escape") {
        setShowPopup(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [showPopup])

  if (!showPopup) return null;

  return (
    <div className="search-popup">
      <div className="search-header">
        <span className="search-text">Search YouTube</span>
        <span className="search-shortcut">Esc</span>
      </div>

      <input
        ref={inputRef}
        type="text"
        className="input-search"
        placeholder="Search videos, channels, playlists..."
        autoComplete="off"
        spellCheck={false}
        value={input}
        onChange={(e) => {
          setInput(e.currentTarget.value);
        }}
        onKeyDown={(e) => {
          if (e.code != "Enter") return;
          setShowPopup(false);

          const query = input.trim().replace(" ", "+")
          window.location.href = `https://www.youtube.com/results?search_query=${query}`
        }}
      />
    </div>
  )
}

export default App;
