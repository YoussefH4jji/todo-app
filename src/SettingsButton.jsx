import { IoIosSettings } from "react-icons/io";
import { useContext } from "react";
import SettingsContext from "./SettingsContext";

export default function SettingsButton(){
    const settingsInfo = useContext(SettingsContext)
    return(
        <section className="settings-button">
            <div>
                <button className="btn settings-btn" onClick={()=> settingsInfo.setShowSettings(true)}><IoIosSettings/> Settings</button>
            </div>
        </section>
    )
}
