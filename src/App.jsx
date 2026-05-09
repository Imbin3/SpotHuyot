import Header from './components/header/header'
import Player from './components/player/player'
import './assets/Main Styles/style.css'
import SearchForm from './components/SearchForm/SearchForm'
import TrackList from './components/TrackList/TrackList'
import { useEffect, useState } from 'react'

function App() {
  const [currentTrack, setCurrentTrack] = useState(null)
  const [query, setQuery] = useState('Travis Scott')
  const [tracks, setTracks] = useState([])
  const [page, setPage] = useState(0)

  const fetchTracks = async (search, pageNumber) => {
    const limit = (pageNumber + 1) * 10

    const res = await fetch(
      `https://itunes.apple.com/search?term=${search}&media=music&limit=${limit}`
    )

    const data = await res.json()

    const start = pageNumber * 10
    const end = start + 10

    return data.results.slice(start, end)
  }

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!query.trim()) return

      const data = await fetchTracks(query, 0)

      setTracks(data)
      setPage(0)
    }, 500)

    return () => clearTimeout(timeout)
  }, [query])

  const changePage = async (newPage) => {
    const data = await fetchTracks(query, page)

    setTracks(data)
    setPage(newPage)
  }


  return (
    <>
      <Header />
      <SearchForm query={query} setQuery={setQuery} />
      <TrackList tracks={tracks} setCurrentTrack={setCurrentTrack} page={page} changePage={changePage} />
      <Player currentTrack={currentTrack} />
    </>
  )
}

export default App

