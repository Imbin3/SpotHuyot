import { useEffect, useState } from "react"
import './styles/TrackList.css'

const TrackList = ({ tracks, setCurrentTrack, page, changePage }) => {

    const nextPage = () => {
        changePage(page + 1)
    }

    const prevPage = () => {
        if(page === 0) return

        changePage(page - 1)
    }

    return (
        <>
            <div className="container">
                <ul className="track-list">
                    {tracks.map(track => (
                        <li className="track-list__item" key={track.trackId}>
                            <img src={track.artworkUrl100} alt="" className="track-list__img" />
                            <div className="track-list__item-info">
                                <h3 className="track-list__track-title">{track.trackName}</h3>
                                <p className="track-list__name">{track.artistName}</p>
                                <button className="track-list__preview" onClick={() => setCurrentTrack(track)}>Прослушать</button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="button__wrapper">
                    <button className="prev-list" onClick={prevPage}>
                        <svg fill="#000000" width="40px" height="40px" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M656 852L294 535q-16-14-16-35t16-35l362-317q13-10 28-9t26 11.5 11 27.5v644q0 17-11 27.5T684 861t-28-9z"></path></g></svg>
                    </button>
                    <button className="next-list" onClick={nextPage}>
                    <svg fill="#000000" width="40px" height="40px" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M656 852L294 535q-16-14-16-35t16-35l362-317q13-10 28-9t26 11.5 11 27.5v644q0 17-11 27.5T684 861t-28-9z"></path></g></svg>
                </button>
            </div>

        </div >
        </>
    )
}
export default TrackList