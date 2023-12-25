import React, { useState,useRef, useEffect}  from "react";
import PopUp from "./pop-up";
import '../style.css'
import useCheckguess from "./check-guess";
import { useNavigate } from 'react-router-dom';
import guessSound from '../Sound/guess_sound.mp3'
import winSound from '../Sound/win_sound.mp3';

export default function Game({userSignInDetails,setUserSignInDetails}) {
    const navigate = useNavigate();
    const [guessingNum, setGuessingNum] = useState('')
    const [message, setMessage] = useState('')
    const [winning, setwinning] = useState(false)
    const [showPopUp, setShowPopUp] = useState(false);
    const [checkguess] = useCheckguess()
    const inpRef = useRef()
    const { Id } = userSignInDetails;  
    const { name } = userSignInDetails;  
   
    const audioRef = useRef(null);

    const playAudio = () => {
      audioRef.current.play();
    }
  
    const pauseAudio = () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset the audio to the beginning
    }
    

    const playGuessSound = () => {
      new Audio(guessSound).play();
    };

    function exitFullScreen() {
      if (document.fullscreenElement){

        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
  }
}
    const resetUserCredentials = () => {
      playGuessSound();
      setUserSignInDetails(null);
      exitFullScreen();
      navigate('/');
    };

    useEffect(()=>{
      if  (hideGame){
        inpRef.current.focus()
      } 
    })
  
  
  const handleGuess = ()=>{
    playGuessSound()
    
      const {message,winning} = checkguess(guessingNum,Id,name)
      setMessage(message)
      setwinning(winning)
      setGuessingNum('')
      setShowPopUp(true);
      if (winning){
        playAudio()
      }
    }

    function handleKeyUp(e) {
      if (e.key === 'Enter' && !showPopUp) {
          e.preventDefault();
          playGuessSound()
          handleGuess();
      }
  }
  function handleGuessAgain() {
    playGuessSound();
    if (winning){
      pauseAudio()
    }
    setMessage('');
    setShowPopUp(false);
  }

  const [hideGame,setHideGame] = useState(false)
  const [hideHistory,setHideHistory] = useState(false)
  const element = document.documentElement;

  function startGame(){
    playGuessSound();
    setHideGame('hidden')
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { /* Safari */
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) { /* IE11 */
  element.msRequestFullscreen();
}
}



const [userHistoryData,setUserHistoryData] = useState(null)

  const fetchUserHistory = async () => {
    playGuessSound();
    if (hideHistory){
      setHideHistory(!hideHistory)
      return
    }
    try {
      const response = await fetch(`http://127.0.0.1:5000/user_history/${Id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUserHistoryData(data)
      setHideHistory(!hideHistory)
    } catch (error) {
      console.error('Error fetching user history:', error);
    }
  };



    return <>
    <div className="mainContainer">
        <div id={"opening"} className={`popup ${hideGame}`}>
            <h1 className="mainContainer-h1">Welcome {name}</h1>
            <button onClick={startGame}>Play Game</button>
        </div>
        {/* {hideGame && <Container/>} */}
        {hideGame &&(<div className="container">
            <h1>Number Guessing Game </h1>
            <input type="number" id="number" value={guessingNum} ref={inpRef} onKeyUp={handleKeyUp} onChange={(e)=> setGuessingNum(e.target.value) } disabled={showPopUp} autoFocus/>
            <button type="button" onClick={handleGuess}>Guess</button>
            <audio ref={audioRef} src={winSound} />
          </div>)
          }     
      
          {showPopUp  &&  <PopUp message={message} onGuessAgain={handleGuessAgain} winning={winning}/>}
          {/* {showPopUp  &&  <Confetti/>} */}
          {hideGame && (<div className="navbar">
                            {/* <a onClick={startGame}>Go Home</a> */}
                            <button href="userHistory" onClick={fetchUserHistory} >Game History</button>

                            <button href="userHistory" onClick={resetUserCredentials} >Quit Game</button>
                        </div>
          //  <button className="history-btn" onClick={fetchUserHistory}>Go Home</button>
            // <button className="history-btn" onClick={fetchUserHistory}>Game History</button>
            
            )}
          {hideHistory &&
          <><div id='userHistory' className="history-container container">
            {userHistoryData.length === 0 && <h1>Play Your Game</h1> }
            {userHistoryData.map((item) => (
              <h4 className="guess-count" key={item.id}>{`Guess Count: ${item.guessed_count}`}</h4>
              ))} 
              <button className="history-btn flex-item" onClick={fetchUserHistory}>Close History</button>
              </div>
            
              </>
          }
          
    </div>
    </>
  }