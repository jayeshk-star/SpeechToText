import React from 'react'
import { useState, useEffect } from 'react'
import './Text.css'

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'

const Text = () => {
  const [Listing, setListing] = useState(false)
  const [note, setNote] = useState(null)
  const [savedNotes, setSavedNotes] = useState([])

  useEffect(() => {
    handleListen()
  }, [Listing])

  const handleListen = () => {
    if (Listing) {
      mic.start()
      mic.onend = () => {
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {}
    }
    mic.onstart = () => {
      console.log('you start caption')
    }

    mic.onresult = event => {
      let transcript = Array.from(event.results)

        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      //   console.log(transcript)
      transcript = transcript.charAt(0).toUpperCase() + transcript.slice(1)

      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note])
    setNote('')
  }
  return (
    <>
      <h1>Voice Notes</h1>
      <div className='container'>
        <div className='box'>
          <h2>Makes Notes</h2>
          <div className="Caption">
          {Listing ? <span>STOP Caption</span> : <span>START Caption</span>}
          </div>
          <div className="btn_div">
          <button onClick={handleSaveNote} disabled={!note}>
            Save Note
          </button>
          <button onClick={() => setListing(prevState => !prevState)}>
            Start/Stop
          </button>
          </div>
        
        </div>
        <div className='box1'>
          <p>{note}</p>
        </div>
        <div className='box1'>
          <h2>Notes</h2>
          {savedNotes.map((n, index) => (
            <li key={index}>{n}</li>
          ))}
        </div>
      </div>
    </>
  )
}

export default Text
