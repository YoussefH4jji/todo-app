import ReactSlider from 'react-slider'
import { useContext } from 'react'
import { GrReturn } from "react-icons/gr";

import SettingsContext from './SettingsContext'
export default function Settings(){
    const settingsInfos = useContext(SettingsContext)
    return(
        <section className="settings-section">
            <label>Work Minutes:{settingsInfos.workMinutes}:00</label>
            <ReactSlider
            className='slider work'
            thumbClassName='thumb'
            trackClassName='track'
            value={settingsInfos.workMinutes}
            min={1}
            max={120}
            onChange={newValue => settingsInfos.setWorkMinutes(newValue)}
            />
            <label>Break Minutes:{settingsInfos.breakMinutes}:00</label>
            <ReactSlider
            className='slider break'
            thumbClassName='thumb'
            trackClassName='track'
            value={settingsInfos.breakMinutes}
            min={1}
            max={120}
            onChange={newValue=> settingsInfos.setBreakMinutes(newValue)}
            />
            <button className='btn return-btn'onClick={()=> settingsInfos.setShowSettings(false)}>
                <GrReturn/>
                Return
            </button>
        </section>

    )
}