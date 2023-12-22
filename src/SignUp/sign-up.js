// import {useEffect,useState} from 'react';
// import handleSubmit from '../form-functions/getSignInUp';
import { useNavigate } from 'react-router-dom';
import useSignIn from '../form-functions/getSignInUp';
import guessSound from '../Sound/guess_sound.mp3'
import {useState} from 'react';
import MessageComponent from '../form-functions/messageComponent';

export default function SignUp(){
    const navigate = useNavigate()
    const { handleSubmit } = useSignIn();
    const [isEmpty, setIsEmpty] = useState(false);
    const [isAccountCreated, setIsAccountCreated] = useState(false);
    const [message,setMessage] = useState('')

    const checkIsEmpty = (msg,isAccountCreated) => {
        setIsEmpty(!isEmpty)
        setMessage(msg)
        setIsAccountCreated(isAccountCreated)
       }

    return <>
    <div className='signIn-container'>
        <form className='form'  onSubmit={handleSubmit('add_user','',checkIsEmpty)}>
            <h1>Enter Name </h1>
            <label>Name</label>
            <input 
            type='text'
            name='name'
            placeholder='name' 
            autoFocus   
            />
            <label>Email</label>
            <input 
            type='email'
            name='email'
            onChange={(e) => e.target.value = e.target.value.toLowerCase()} 
            
            placeholder='email'    
            />
            <label>Password</label>
            <input 
            type='password'
            name='password'
            placeholder='password'    
            />
        <button type="submit">Submit</button>
        </form>

        <button type="button" onClick={()=> {navigate('/signin'); new Audio(guessSound).play()}}>Sign In Here</button>
        </div>
        {isEmpty && <MessageComponent message={message} checkIsEmpty= {checkIsEmpty} isAccountCreated={isAccountCreated} />}
     </>
}