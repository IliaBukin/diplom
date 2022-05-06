import '../styles/Patients.css';
import { useState } from 'react';
import Menu from '../components/Menu';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function NewPatient() {

    const [cookies, setCookie, removeCookie] = useCookies(['login']);
    let navigate = useNavigate();

    function addPatient(e){
        e.preventDefault();
        let formData = e.target;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        const body = {
            doctor: cookies.login,
            fio: formData.fio.value,
            email: formData.email.value,
            number: formData.number.value
        }
        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        }
        fetch(`http://127.0.0.1:4000/addpatient`, options)
        .then(res=>{
            console.log(res)
            if (res.status==200) {
                navigate("/patients")
            }
        })
        .catch(res=>{
            console.error(res)
        })
    }

    return (
        <div className='main'>
            <Menu />
            <div className='content'>
                <h1>Новый пациент</h1>
                <form className='addPatient' onSubmit={addPatient}>
                    <label>ФИО: </label>
                    <input name='fio' type="text"></input>
                    <label>Email: </label>
                    <input name='email' type="email"></input>
                    <label>Номер: </label>
                    <input name='number' type="text"></input>
                    <button className='submit' type='submit'>Добавить</button>
                </form>
            </div>
        </div>
    );
}

export default NewPatient;