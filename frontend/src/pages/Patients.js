import '../styles/Patients.css';
import { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Patients() {
    
    const [cookies, setCookie] = useCookies(['login']);
    const [patients,setPatients] = useState([])

    function getPatients(){
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        const body = {
            doctor: cookies.login
        }
        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        }

        fetch(`http://127.0.0.1:4000/getpatients`, options)
            .then(response=>
                response.json().then(res=>{      
                  if (res.status==200) {
                      setPatients(res.content)
                  }
                }
              ))
            .catch(res=>{
                console.error(res)
            })
    }

    useEffect(()=>{
        getPatients()
    },[])
    
    function deletePatient(id){
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        const body = {
            id
        }
        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        }

        fetch(`http://127.0.0.1:4000/deletepatient`, options)
            .then(response=>
                response.json().then(res=>{      
                  if (res.status==200) {
                      getPatients()
                  }
                }
              ))
            .catch(res=>{
                console.error(res)
            })
    }

    return (
        <div className='main'>
            <Menu />
            <div className='content'>
                <h1>Пациенты</h1>
                <Link to='/newpatient'>
                    <button className='add'>
                        Добавить нового пациента
                    </button>
                </Link>
                <table cellPadding={10} cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>ФИО</th>
                            <th>Email</th>
                            <th>Номер</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map(
                            patient => (
                                <tr key={patient.id} className='patient'>
                                    <td>{patient.fio}</td>
                                    <td>{patient.email}</td>
                                    <td>{patient.number}</td>
                                    <td className='buttonsPatient'>
                                        <Link to={`/consultpatient?id=${patient.id}`}>
                                            <button className='edit'>
                                                Консультация
                                            </button>
                                        </Link>
                                        <Link to={`/editpatient?id=${patient.id}&fio=${patient.fio}&email=${patient.email}&number=${patient.number}`}>
                                            <button className='edit'>
                                                Редактировать
                                            </button>
                                        </Link>
                                        <button className='delete' onClick={()=>deletePatient(patient.id)}>
                                            Удалить
                                        </button>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Patients;