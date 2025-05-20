import React, { useState, useRef } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import styles from './search.module.css';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const navigate = useNavigate();
    const timeoutRef = useRef();

    // Fetch suggestions from API
    const fetchSuggestions = async (q) => {
        if (!q) {
            setSuggestions([]);
            return;
        }
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/search-suggestions/?q=${encodeURIComponent(q)}`);
            if (res.ok) {
                const data = await res.json();
                // Combine all types into one array, add a 'type' field for clarity
                const all = [
                    ...(data.products || []),
                    ...(data.categories || []),
                    ...(data.brands || [])
                ];
                setSuggestions(all);
            } else {
                setSuggestions([]);
            }
        } catch {
            setSuggestions([]);
        }
    };

    // Handle input change
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        setShowSuggestions(true);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            fetchSuggestions(value);
        }, 200);
    };

    // Handle suggestion click
    const handleSuggestionClick = (slug, type, name) => {
        setShowSuggestions(false);
        setSearchQuery('');
        

        
        switch (type) {
            case 'brand':
                navigate(`/brand_${slug}`);
                break;
            case 'category':
                navigate(`/${slug}`);
                break;
            case 'product':
                navigate(`/all_${name.slice(0, 3)}`);
                break;
            default:
                console.warn('Unknown type:', type);
                navigate('/electronics');
                break;
        }
    };

    // Handle search submit
    const handleSubmit = (e) => {
        e.preventDefault();
        setShowSuggestions(false);
        if (searchQuery.trim()) {
            navigate(`/all_${searchQuery.trim()}`);
        }
    };

    // Hide suggestions on blur (with delay to allow click)
    const handleBlur = () => {
        setTimeout(() => setShowSuggestions(false), 150);
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setSuggestions([]);
        setShowSuggestions(false);
    };

    return (
        <div className={styles.searchWrapper}>
            <form className={styles.header__searchForm} onSubmit={handleSubmit} autoComplete="off">
                <span className={styles.header__searchIcon}>
                    <FaSearch size={18} color="#888" />
                </span>
                <input
                    type="text"
                    className={styles.header__searchInput}
                    placeholder="Search products, brands and categories"
                    aria-label="Search products, brands and categories"
                    value={searchQuery}
                    onChange={handleInputChange}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={handleBlur}
                />
                {searchQuery && (
                    <button 
                        type="button" 
                        className={styles.header__clearBtn}
                        onClick={handleClearSearch}
                        aria-label="Clear search"
                    >
                        <FaTimes size={14} color="#888" />
                    </button>
                )}
            </form>
            <button 
                className={styles.header__searchBtn} 
                onClick={handleSubmit}
                type="button"
            >
                Search
            </button>
            {showSuggestions && suggestions.length > 0 && (
                <ul className={styles.suggestionsDropdown}>
                    {suggestions.map((item) => (
                        <li
                            key={item.id}
                            className={
                                styles.suggestionItem +
                                (item.type === 'brand' ? ' ' + styles['suggestionItem'] + ' brand' : '')
                            }
                            tabIndex={0}
                            onClick={() => handleSuggestionClick(item.slug, item.type, item.name)}
                            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleSuggestionClick(item.slug, item.type, item.name)}
                        >
                            {item.type === 'brand' && item.image && (
                                <img src={item.image} alt={item.name} />
                            )}
                            {item.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchBar;