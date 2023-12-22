import updateGamePlayHistory from './user-history'
import {useState} from 'react'
export default function useCheckguess (){
        const [winningNum,setWinningNum] = useState(Math.floor(Math.random()*100)+1)
        const [guessedCount, setGuessedCount] = useState(1)
        let message;

        function checkguess(guessingNum,Id,name){

            if (!guessingNum){
                return { message: 'Please Enter A Number', winning: false };
            }else if (winningNum===+guessingNum) {
                setWinningNum(Math.floor(Math.random()*100)+1)
                const winningCount = guessedCount
                setGuessedCount(1)
                updateGamePlayHistory(Id, winningCount);
                return { message: `Wow ${name.toUpperCase()} You Won. Number of Guesses is ${winningCount}`, winning: true };
            }else {
                setGuessedCount(count => count+1)
                if (+guessingNum<winningNum){
                    if (winningNum-(+guessingNum)<=5){
                        message = `Number ${+guessingNum} is low`
                    }else{
                        message = `Number ${+guessingNum} is too low`
                    }
                }else{
                    if ((+guessingNum)-winningNum<=5){
                        message = `Number ${+guessingNum} is high`
                    }else{
                        message = `Number ${+guessingNum} is too high`
                    }
                }
                return { message, winning: false };
            }
        }
    return [checkguess]
}