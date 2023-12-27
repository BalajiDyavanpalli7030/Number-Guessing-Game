import getFormValues from "./getFormValues";
import guessSound from '../Sound/guess_sound.mp3'


const useSignIn = () => {

  const handleSubmit = (urlProp,onSuccess,checkIsEmpty) => (e) => {
    new Audio(guessSound).play();
    e.preventDefault();
    const { isEmpty, data } = getFormValues(e.currentTarget);
    
    if (isEmpty) {
      checkIsEmpty('Please Enter All Values')
      return;
    }
    
    fetch('http://127.0.0.1:5000/'+urlProp,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    })
    .then(response=>response.json())
    .then(data_=>{
      const Id  = data_?.Id
      const  name = data_?.name
      const isUser = data_?.isUser
      const isPassword = data_?.isPassword
      const message = data_?.message
      const status = data_?.status

      console.log(Id, name, isUser, isPassword,message, status)
      
      if (urlProp==='sign_user'){
        if (isUser===false || isPassword===false ){
          checkIsEmpty("Invalid Email Address or Password")
          return
        }
        onSuccess(data,Id,name)
        e.currentTarget.reset();
      }
      if (urlProp === 'add_user'){
        if (status==='success'){
          // e.currentTarget.reset();
          checkIsEmpty(message,true)
        }else{
          checkIsEmpty(message)
        }
      }
    })
    .catch(error => checkIsEmpty('Server Error'));
    
  }

  return { handleSubmit };
}

export default useSignIn;
