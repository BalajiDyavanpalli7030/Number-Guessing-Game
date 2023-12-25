import { useNavigate } from 'react-router-dom';
import guessSound from './Sound/guess_sound.mp3'

export default function Home(){
    const navigate = useNavigate()

    return <>
    <div className="container">
        <h1>Number Guessing Game</h1>
        <br></br>
        <button type="button" onClick={()=>{navigate('/signin'); new Audio(guessSound).play()} }>Sign In ?</button>
        <br></br>
        <button type="button" onClick={()=> {navigate('/signup'); new Audio(guessSound).play()} }>Sign Up ?</button>
    </div>
    </>
}

