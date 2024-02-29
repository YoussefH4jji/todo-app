import { useRef, useState } from "react"
import { BsSkipForwardCircleFill } from "react-icons/bs";
import { FaCirclePlay } from "react-icons/fa6";
import { FaCirclePause } from "react-icons/fa6";

import { BsSkipBackwardCircleFill } from "react-icons/bs";
import { FaMusic } from "react-icons/fa6";


export default function Music(){

    const [currentMusicDetails, setCurrentMusicDetails] = useState({
        songName:'Silent Reverie',
        songArtist:'Silent Reverie',
        songSrc:'../sounds/SilentReverie.mp3',

    })

    const [audioProgress,setAudioProgress]= useState(60)

    const [isPlaying, setIsPlaying] = useState(false)
    const [musicIndex, setMusicIndex] = useState(0)
    const [musicTotalLength, setMusicTotalLength] = useState("04: 38")
    const [musicCurrentTime, setMusicCurrentTime] = useState("00: 00")

    const currentAudio = useRef()

    function handleMusicProgressBar(e){
       setAudioProgress(e.target.value)
    //    currentAudio.current.currentTime = e.target.value * currentAudio.current.duraiton / 100
        currentAudio.current.currentTime = e.target.value * currentAudio.current.duration / 100
    }

    function handleAudioPlay(){
        if (currentAudio.current.paused){
            currentAudio.current.play();
            setIsPlaying(true)
        }else{
            currentAudio.current.pause();
            setIsPlaying(false)

        }
    }
    const musicApi = [
        {
            songName:'Silent Reverie',
            songArtist:'GOSON, Softy',
            songSrc:'../sounds/SilentReverie.mp3',            
        },
        {
            songName:'Snow Flakes',
            songArtist:'Pandrezz',
            songSrc:'../sounds/Snowflakes.mp3',            
        },
        {
            songName:'Moonflower',
            songArtist:'GOSON, Softy',
            songSrc:'../sounds/Moonflower.mp3',            
        },
        {
            songName:'Winter Evenings',
            songArtist:'xander, Rikard From',
            songSrc:'../sounds/WinterEvenings.mp3',            
        },
    ]
    function handleNextSong(){
         if (musicIndex >= musicApi.length - 1) {
            let setNumber = 0
            setMusicIndex(setNumber)
            updateCurrentMusicInfos(setNumber)
         }else{
            let setNumber = musicIndex + 1
            setMusicIndex(setNumber)
            updateCurrentMusicInfos(setNumber)

         }

    }
    function handlePrevSong(){
        if (musicIndex === 0){
            let setNumber = musicApi.length - 1
            setMusicIndex(setNumber)
            updateCurrentMusicInfos(setNumber)
         }else{
            let setNumber = musicIndex + 1
            setMusicIndex(setNumber)
            updateCurrentMusicInfos(setNumber)

         }

    }
    function updateCurrentMusicInfos(num){
        let musicObj = musicApi[num]
        currentAudio.current.src = musicObj.songSrc
        currentAudio.current.play()

        setCurrentMusicDetails({
            songName: musicObj.songName,
            songArtist: musicObj.songArtist,
            songSrc: musicObj.songSrc        
        })
        setIsPlaying(true)
    }

    function handleAudioUpdate(){
        let minutes = Math.floor(currentAudio.current.duration / 60)
        let seconds = Math.floor(currentAudio.current.duration % 60)
        let musicTotalLength0 = `${minutes <10 ? `0${minutes}` : minutes} : ${seconds <10 ? `0${seconds}` : seconds}`
        
        setMusicTotalLength(musicTotalLength0)

        let currentMin = Math.floor(currentAudio.current.currentTime / 60)
        let currentSec = Math.floor(currentAudio.current.currentTime % 60)
        let musicCurrentT = `${currentMin <10 ? `0${currentMin}` : currentMin} : ${currentSec <10 ? `0${currentSec}` : currentSec}`
        setMusicCurrentTime(musicCurrentT)

        const progress = parseInt((currentAudio.current.currentTime / currentAudio.current.duration) * 100)
        setAudioProgress(isNaN(progress)? 0 : progress)

    }

    return(
        <section className="music-section ">
            <audio src="../sounds/SilentReverie.mp3" ref={currentAudio} onEnded={handleNextSong} onTimeUpdate={handleAudioUpdate}></audio>
            <div className="blackScreen"></div>
            <div className="music-container">
                <p className="musicPlayer"><FaMusic/></p>
                <p className="song-name">{currentMusicDetails.songName}</p>
                <p className="music-artist-name">{currentMusicDetails.songArtist}</p>
                <div className="music-timer-div">
                    <p className="music-current-time">{musicCurrentTime}</p>
                    <p className="music-total-length">{musicTotalLength}</p>
                </div>
                <input 
                type="range" 
                name="music progress bar" 
                className="music-progress-bar" 
                value={audioProgress} 
                onChange={handleMusicProgressBar}
                />
                <div className="music-controllers">
                    <BsSkipBackwardCircleFill className="controlls-icon backward" onClick={handlePrevSong}/>
                    {isPlaying?<FaCirclePause className="controlls-icon play-btn" onClick={handleAudioPlay}/>:<FaCirclePlay className="controlls-icon play-btn" onClick={handleAudioPlay}/>}
                    <BsSkipForwardCircleFill className="controlls-icon forward" onClick={handleNextSong}/>
                </div>

            </div>
        </section>
    )
}