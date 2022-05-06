import '../styles/Patients.css';
import { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate, useSearchParams } from 'react-router-dom';

function ConsultPatient() {

    const [cookies, setCookie, removeCookie] = useCookies(['login']);
    let navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [consult, setConsult] = useState()

    function consultPatient(e){
        e.preventDefault();
        let formData = e.target;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        const body = {
            patient:formData.id.value,
            doctor: cookies.login,
            consultInfo: formData.consultInfo.value
        }
        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        }
        fetch(`http://127.0.0.1:4000/addconsult`, options)
        .then(res=>{
            if (res.status==200) {
                navigate("/patients")
            }
        })
        .catch(res=>{
            console.error(res)
        })
    }

    function getConsult(){
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        const body = {
            patient: searchParams.get("id"),
            doctor: cookies.login,
        }
        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        }
        fetch(`http://127.0.0.1:4000/getconsult`, options)
        .then(response=>
          response.json().then(res=>{      
            if (res.status==200) {
                setConsult(res.content)
            }
          }
        ))
        .catch(res=>{
          console.error(res)
        })
    }

    useEffect(()=>{
        getConsult()
    },[])

    return (
        <div className='main'>
            <Menu />
            <div className='content'>
                <h1>Консультация пациента</h1>
                <form className='consultPatient' onSubmit={consultPatient}>
                    <input style={{display:"none"}} name='id' type="text" defaultValue={searchParams.get("id")}></input>
                    <label>Данные консультации: </label>
                    <textarea name='consultInfo' type="text" defaultValue={consult}></textarea>
                    <button className='submit' type='submit'>Сохранить</button>
                </form>
            </div>
        </div>
    );
}

export default ConsultPatient;