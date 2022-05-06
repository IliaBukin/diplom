import { Link } from 'react-router-dom';
import '../styles/Login.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [cookies, setCookie] = useCookies(['login']);
  let navigate = useNavigate();

  function login(e){
    e.preventDefault();
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
    fetch(`http://127.0.0.1:4000/login`, options)
    .then(response=>
      response.json().then(res=>{      
        if (res.status==200) {
          setCookie("login",res.content)
          navigate("/")
        }
        else{
          alert("Login or password are not correct")
        }
      }
    ))
    .catch(res=>{
      console.error(res)
    })
  }

  return (
    <div className="login">
        <form onSubmit={login} className='loginForm'>
            <h1>Login</h1>
            <label>login</label>
            <input name='login' type="text"></input>
            <label>password</label>
            <input name='password' type='password'></input>
            <button className='submit' type='submit'>Login</button>
            <Link to="/registration">Registration</Link>
        </form>
    </div>
  );
}

export default Login;