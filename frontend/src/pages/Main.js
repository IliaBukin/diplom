import '../styles/Main.css';
import { useState } from 'react';
import DictateButton from 'react-dictate-button';
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
import { Link } from 'react-router-dom';
import Menu from '../components/Menu';

function Main() {
  const [record, setRecord] = useState(RecordState.NONE);  

  function handleDictate(e) {
    console.log("dictate",e.result.transcript)
  }
  
  function handleProgress(e) {
    console.log("progress",e)
  }

  const start = () => {
    setRecord(RecordState.START)
  }
 
  const stop = () => {
    setRecord(RecordState.STOP)
  }
 
  //audioData contains blob and blobUrl
  const onStop = (audioData) => {
    console.log('audioData', audioData)
  }

  return (
    <div className='main'>
        <Menu />
        <div className='content'>
            <h1>Files</h1>
            <DictateButton
              className="my-dictate-button"
              grammar="#JSGF V1.0; grammar medicine; public <medicine> = Отоларингология | Аберрация | Экзофтальмотерапия | Аутолизосома ;"
              lang="ru-RU"
              onDictate={handleDictate}
              onProgress={handleProgress}
            >
              Start/stop
            </DictateButton>
            <AudioReactRecorder state={record} onStop={onStop} />
 
            <button onClick={start}>Start</button>
            <button onClick={stop}>Stop</button>
        </div>
    </div>
  );
}

export default Main;