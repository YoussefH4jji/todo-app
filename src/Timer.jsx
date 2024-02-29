import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaCirclePlay } from "react-icons/fa6";
import { FaCirclePause } from "react-icons/fa6";
import SettingsButton from './SettingsButton';
import { useContext, useState,useEffect, useRef } from 'react';
import SettingsContext from './SettingsContext';
import completeSound from '../public/sounds/completeSound.mp3'
export default function Timer(){
    const settingsInfo = useContext(SettingsContext)
    const [isPaused, setIsPaused] = useState(false)
    const [mode,setMode]= useState("work")
    const [secLeft,setSecLeft] = useState(0)

    const secLeftRef = useRef(secLeft)
    const isPausedRef = useRef(isPaused)
    const modeRef = useRef(mode)

    function timerInit(){
        secLeftRef.current = settingsInfo.workMinutes *60
        setSecLeft(secLeftRef.current)
    }

    function switchMode(){
        const nextMode = modeRef.current === 'work'? 'break':'work'
        const nextSeconds = (nextMode==='work'? settingsInfo.workMinutes:settingsInfo.breakMinutes) *60 
        setMode(nextMode)
        modeRef.current=nextMode

        setSecLeft(nextSeconds)
        secLeftRef.current=nextSeconds

    }

    function tick(){
        secLeftRef.current--
        setSecLeft(secLeftRef.current)
    }

    useEffect(()=>{
        timerInit()
        const interval =setInterval(()=>{
            if (isPausedRef.current){
                return;
            }
            else if (secLeftRef.current === 0){
                switchMode()
                const audio =new Audio(completeSound)
                audio.play()
                return;
            }
            tick()
            },1000)
        return ()=>clearInterval(interval)
    },[settingsInfo])
    
    const totalSecs = mode==='work'? settingsInfo.workMinutes *60 :settingsInfo.breakMinutes *60
    const percentage = Math.round(secLeft / totalSecs *100) 

    const minutes = Math.floor(secLeft/ 60)
    let seconds = secLeft % 60

    if(seconds < 10){
        seconds = "0"+ seconds
    }



    return(
        <section className="timer-section">
            <CircularProgressbar 
            value={percentage} 
            text={`${minutes} : ${seconds}`} 
            styles={buildStyles({            
                textSize: '16px',            
                pathTransitionDuration: 0.5,
                pathColor: mode==='work'?'#119dff':'#8C4BDE',
                textColor: mode==='work'?'white':'#8C4BDE',
                trailColor: '#d6d6d6',
                backgroundColor: '#3e98c7',
              })}
              className='circular-progress-bar'
            />;
            <div className="timer-btns">
                {isPaused?
                <FaCirclePlay className='timer-btns play' onClick={()=>{setIsPaused(false);isPausedRef.current= false}}/>
                :<FaCirclePause className='timer-btns pause'onClick={()=>{setIsPaused(true);isPausedRef.current= true}}/>}

            </div>
            <SettingsButton/>

        </section>
    ) 
}