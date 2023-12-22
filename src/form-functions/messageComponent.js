import React from 'react';
import guessSound from '../Sound/guess_sound.mp3'
import { useNavigate } from 'react-router-dom';
const MessageComponent = ({ message,checkIsEmpty,isAccountCreated }) => {
  const navigate = useNavigate()
  function forSignIn(){
    if (isAccountCreated){
      navigate('/signin')
    }
  }
  return (<>
    <div className={`overlay ` }></div>
    <div className="popup">
      <h1>{message}</h1>
      <button onClick={()=>{checkIsEmpty() ;new Audio(guessSound).play();forSignIn()}}>Okay</button>
    </div>
  </>
  );
}

export default MessageComponent;
