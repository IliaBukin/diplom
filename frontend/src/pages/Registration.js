import '../styles/Login.css'
import { useNavigate } from 'react-router-dom';

function Registration() {

  let navigate = useNavigate();

  function register(e){
    e.preventDefault();
    if (e.target.password.value==e.target.passwordrepeat.value)
    {
      let formData = e.target;
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      const body = {
        login: formData.login.value,
        password: formData.password.value
      }
      const options = {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(body)
      }
      
      fetch(`http://127.0.0.1:4000/register`, options)
      .then(res=>{
        console.log(res)
        if (res.status==200){
          navigate("/login")
        }
      })
      .catch(res=>{
        console.error(res)
      })
    } 
    else 
    {
      alert ("password confirmation is error")
    }
  }
  return (
    <div className="login">
        <form className='loginForm' onSubmit={register}>
            <h1>Registration</h1>
            <label>login</label>
            <input name='login' type="text"></input>
            <label>password</label>
            <input name='password' type='password'></input>
            <label>repeat password</label>
            <input name='passwordrepeat' type='password'></input>
            <button className='submit' type='submit'>Submit</button>
        </form>
    </div>
  );
}

export default Registration;