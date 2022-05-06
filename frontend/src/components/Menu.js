import '../styles/Main.css';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Menu() {
    
    const [cookies, setCookie, removeCookie] = useCookies(['login']);

    function logout() {
        removeCookie('login')
    }

  return (
        <div className='menu'>
            <h1>Menu</h1>
            <Link className='menubutton' to="/">-&gt; Transcribator</Link>
            <Link className='menubutton' to="/patients">-&gt; Журнал учета телемедицинских консультаций</Link>
            <span className='menubutton' onClick={logout}>-&gt; Logout</span>
        </div>
  );
}

export default Menu;