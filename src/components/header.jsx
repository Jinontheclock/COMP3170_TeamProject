import { useState, useEffect } from 'react';
import youtubeService from '../services/youtubeService';
import './Header.css';

const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchClosing, setIsSearchClosing] = useState(false);
    const [isMenuClosing, setIsMenuClosing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchError, setSearchError] = useState(null);

    const toggleSearch = () => {
        if (isSearchOpen) {
            setIsSearchClosing(true);
            setTimeout(() => {
                setIsSearchOpen(false);
                setIsSearchClosing(false);
            }, 300);
        } else {
            setIsSearchOpen(true);
            if (isMenuOpen) {
                setIsMenuClosing(true);
                setTimeout(() => {
                    setIsMenuOpen(false);
                    setIsMenuClosing(false);
                }, 300);
            }
        }
    };

    const toggleMenu = () => {
        if (isMenuOpen) {
            setIsMenuClosing(true);
            setTimeout(() => {
                setIsMenuOpen(false);
                setIsMenuClosing(false);
            }, 300);
        } else {
            setIsMenuOpen(true);
            if (isSearchOpen) {
                setIsSearchClosing(true);
                setTimeout(() => {
                    setIsSearchOpen(false);
                    setIsSearchClosing(false);
                }, 300);
            }
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setIsLoading(true);
        setSearchError(null);

        try {
            const results = await youtubeService.searchMusic(searchQuery, 10);
            setSearchResults(results.items || []);
        } catch (error) {
            setSearchError('Search failed. Please try again.');
            console.error('Search error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVideoSelect = (video) => {
        window.open(`https://www.youtube.com/watch?v=${video.id.videoId}`, '_blank');
    };

    return (
        <>
            <header className="header">
                <button className="icon-btn search-btn" onClick={toggleSearch}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                </button>
                <button className="icon-btn menu-btn" onClick={toggleMenu}>
                    ☰
                </button>
            </header>

            {isSearchOpen && (
                <div className={`sidebar search-sidebar frosted-backdrop ${isSearchClosing ? 'closing' : ''}`}>
                    <form onSubmit={handleSearch} className="search-container">
                        <span className="search-icon">🔍</span>
                        <input 
                            type="text" 
                            placeholder="Search for music..." 
                            className="search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>
                    
                    {isLoading && (
                        <div className="loading-message">Searching...</div>
                    )}
                    
                    {searchError && (
                        <div className="error-message">{searchError}</div>
                    )}
                    
                    {searchResults.length > 0 && (
                        <div className="search-results">
                            {searchResults.map((item, index) => (
                                <div key={item.id.videoId} className="search-item" onClick={() => handleVideoSelect(item)}>
                                    <img 
                                        src={item.snippet.thumbnails?.medium?.url || '/default-thumbnail.png'} 
                                        alt={item.snippet.title}
                                        className="album-placeholder"
                                    />
                                    <div className="track-info">
                                        <div className="song-name">{item.snippet.title}</div>
                                        <div className="artist-name">{item.snippet.channelTitle}</div>
                                    </div>
                                    <button 
                                        className="play-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleVideoSelect(item);
                                        }}
                                    >
                                        ▶
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {searchResults.length === 0 && !isLoading && !searchError && (
                        <div className="empty-state">
                            <p>Search for your favorite music</p>
                        </div>
                    )}
                </div>
            )}

            {isMenuOpen && (
                <div className={`sidebar menu-sidebar frosted-backdrop ${isMenuClosing ? 'closing' : ''}`}>
                    <div className="menu-content">
                        <div className="menu-item">Profile</div>
                        <div className="menu-item bold">Bob Ross</div>
                        <div className="menu-item">Spotify Account</div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
