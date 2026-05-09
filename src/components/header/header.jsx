import Nav from "../Nav/Nav"
import './styles/Header.css'

const Header = () => {
    const navLinks = [
        {url: 'https://open.spotify.com/', title: 'Spotify'},
        {url: 'https://music.yandex.uz/', title: 'Я.Музыка'},
        {url: 'https://google.com', title: 'ГульГуль'}
    ]

    return (
        <>
            <header className="header">
                <div className="header__inner container">
                    <Nav  links={navLinks}/>
                </div>
            </header>
        </>
    )
}
export default Header