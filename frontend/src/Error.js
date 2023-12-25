import { useNavigate } from 'react-router-dom';
const Error = () => {
    const navigate = useNavigate()
  return (
    <section className='container'>
      <h1>Error, Please Sign In</h1>
      <br></br>
      <br></br>
      <br></br>
      <button type="button" onClick={()=> navigate('/')}>Go Home</button>
    </section>
  );
};
export default Error;
