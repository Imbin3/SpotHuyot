import { useEffect, useRef, useState } from "react"
import './styles/Player.css'

const Player = ({ currentTrack }) => {
    const audioRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(1)


    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const onTimeUpdate = () => {
            setCurrentTime(audio.currentTime)
        }

        const onLoadedMetadata = () => {
            setDuration(audio.duration)
        }

        const handleEnded = () => {
            setIsPlaying(false)
        }

        audio.addEventListener("timeupdate", onTimeUpdate)
        audio.addEventListener("loadedmetadata", onLoadedMetadata)
        audio.addEventListener('ended', handleEnded)

        return () => {
            audio.removeEventListener("ended", handleEnded)
            audio.removeEventListener("timeupdate", onTimeUpdate)
            audio.removeEventListener("loadedmetadata", onLoadedMetadata)
        }
    }, [currentTrack])

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume
        }
    }, [volume])

    const setPlay = () => {
        if (!audioRef.current) return

        if (isPlaying) {
            audioRef.current.pause()
            setIsPlaying(false)
        } else {
            audioRef.current.play()
            setIsPlaying(true)
        }
    }

    useEffect(() => {
        if (!currentTrack?.previewUrl) return

        audioRef.current.load()
        audioRef.current.play()
        setIsPlaying(true)
    }, [currentTrack])

    if (!currentTrack) return (
        <div className="container player-noTrack player">Выбери трек</div>
    )

    return (
        <>
            <div className="player container">
                <div className="player__info">
                    <div className="player__info-img-wrapper">
                        <img src={currentTrack.artworkUrl100 || ''} alt="" className="player__info-img" />
                    </div>
                    <div className="player__info-text">
                        <h2 className="player__track-name">{currentTrack.trackName || ''}</h2>
                        <p className="player__artist-name">{currentTrack.artistName || ''}</p>
                    </div>
                </div>
                <div className="player__controls">
                    <button className="player__controls-play" onClick={setPlay}>{isPlaying ?

                        <svg width="40px" height="40px" viewBox="-1 0 8 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round"></g><g id="SVGRepo_iconCarrier"> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-227.000000, -3765.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M172,3605 C171.448,3605 171,3605.448 171,3606 L171,3612 C171,3612.552 171.448,3613 172,3613 C172.552,3613 173,3612.552 173,3612 L173,3606 C173,3605.448 172.552,3605 172,3605 M177,3606 L177,3612 C177,3612.552 176.552,3613 176,3613 C175.448,3613 175,3612.552 175,3612 L175,3606 C175,3605.448 175.448,3605 176,3605 C176.552,3605 177,3605.448 177,3606" id="pause-[#1006]"> </path> </g> </g> </g> </g></svg>
                        :
                        <svg width="40px" height="40px" viewBox="-3 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none"> <g id="Icon-Set-Filled" transform="translate(-419.000000, -571.000000)" fill="#000000"> <path d="M440.415,583.554 L421.418,571.311 C420.291,570.704 419,570.767 419,572.946 L419,597.054 C419,599.046 420.385,599.36 421.418,598.689 L440.415,586.446 C441.197,585.647 441.197,584.353 440.415,583.554" id="play"> </path> </g> </g> </g></svg>
                    }</button>
                    <div className="player__controls-inputs">
                        <input
                        type="range"
                        className="player__controls-time"
                        min={0}
                        max={duration || 0}
                        value={currentTime}
                        onChange={(e) => {
                            audioRef.current.currentTime = e.target.value
                            setCurrentTime(e.target.value)
                        }} />
                    <input
                        className="player__controls-volume"
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                    />
                    </div>
                    

                </div>

                <audio ref={audioRef} src={currentTrack?.previewUrl}></audio>
            </div>
        </>
    )
}

export default Player