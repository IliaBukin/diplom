import '../styles/Patients.css';
import { useState } from 'react';
import Menu from '../components/Menu';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate, useSearchParams } from 'react-router-dom';

function EditPatient() {

    const [cookies, setCookie, removeCookie] = useCookies(['login']);
    let navigate = useNavigate();
    const [searchParams] = useSearchParams();

    function editPatient(e){
        e.preventDefault();
        let formData = e.target;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        const body = {
            id:formData.id.value,
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
        fetch(`http://127.0.0.1:4000/editpatient`, options)
        .then(res=>{
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
                <h1>Редактирование пациента</h1>
                <form className='addPatient' onSubmit={editPatient}>
                    <input style={{display:"none"}} name='id' type="text" defaultValue={searchParams.get("id")}></input>
                    <label>ФИО: </label>
                    <input name='fio' type="text" defaultValue={searchParams.get("fio")}></input>
                    <label>Email: </label>
                    <input name='email' type="email" defaultValue={searchParams.get("email")}></input>
                    <label>Номер: </label>
                    <input name='number' type="text" defaultValue={searchParams.get("number")}></input>
                    <button className='submit' type='submit'>Подтвердить</button>
                </form>
            </div>
        </div>
    );
}

export default EditPatient;