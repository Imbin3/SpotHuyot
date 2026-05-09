import logo from '../../assets/spot.svg'

const Nav = ({ links }) => {
    return (
        <nav className="header__nav nav">
            <a href="#" className="header__nav-logo--link">
                <img src={logo} alt="" className="header__nav-logo nav__logo" />
            </a>
            <ul className="header__nav-list nav__list">
                {links.map((link, idx) => (
                    <li className="header__nav-item nav__item" key={idx}>
                        <a href={link.url} className="header__nav-link nav__link">{link.title}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
export default Nav