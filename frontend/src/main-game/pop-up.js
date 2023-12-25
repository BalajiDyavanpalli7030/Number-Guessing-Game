// // src/main-game/PopUp.js
import React, { useEffect} from 'react';
import Confetti from "../Confetti";

// const Overlay = (props) => <div className={`overlay ${props.hidden}`}></div>

const PopUp = ({ message, onGuessAgain, winning }) => {
 
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === ' ' || event.key === 'Spacebar') {
        event.preventDefault(); // Prevent the default behavior of the Enter key
        onGuessAgain();
      }
    };

    window.addEventListener('keyup', handleKeyDown);

    return () => {
      window.removeEventListener('keyup', handleKeyDown);
    };
  }, [onGuessAgain]);

  return (<>

    <div className={`overlay ${winning?'bg':'' }` }></div>
    {/* <Confetti/> */}
    {winning  &&  <Confetti/>}

    <div className="popup">
      <p>{message}</p>
      <button onClick={onGuessAgain}>Guess Again</button>
    </div>
  </>
  );
};

export default PopUp;
