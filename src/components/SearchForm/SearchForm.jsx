import { useState } from 'react'
import './styles/SearchForm.css'

const SearchForm = ({ query, setQuery }) => {

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className="container">
            <form className="search-form" onSubmit={handleSubmit}>
                <input
                    type="search"
                    className="search-form__input"
                    placeholder="Поиск..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} />
            </form>
        </div>
    )
}
export default SearchForm