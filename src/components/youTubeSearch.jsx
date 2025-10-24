import { useState } from 'react';
import youtubeService from '../services/youtubeService';
import './YouTubeSearch.css';

const YouTubeSearch = ({ isOpen, onClose, onSearchResults }) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const results = await youtubeService.searchMusic(query, 20);
      setSearchResults(results);
      onSearchResults?.(results);
    } catch (err) {
      setError('Search error occurred. Please check your YouTube API key.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatViewCount = (viewCount) => {
    const count = parseInt(viewCount);
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  if (!isOpen) return null;

  return (
    <div className="youtube-search-modal">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="youtube-search">
        <div className="search-header">
          <h2>🎵 Music Search</h2>
          <button onClick={onClose} className="close-button">✕</button>
        </div>

      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for songs, artists, genres..."
            className="search-input"
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={loading || !query.trim()}
          >
            {loading ? '⟳' : '🔍'}
          </button>
        </div>
      </form>

      {error && (
        <div className="error">
          <p>{error}</p>
          <button onClick={() => setError(null)}>닫기</button>
        </div>
      )}

      {searchResults && (
        <div className="search-results">
          <div className="results-header">
            <h3>
              Search results for "{query}" ({searchResults.items?.length || 0} items)
            </h3>
            <button 
              onClick={() => setSearchResults(null)}
              className="clear-results"
            >
              ✕
            </button>
          </div>

          <div className="results-list">
            {searchResults.items?.map((item, index) => (
              <div key={item.id.videoId} className="result-item">
                <div className="video-thumbnail">
                  <img 
                    src={youtubeService.getThumbnailUrl(item.snippet.thumbnails)} 
                    alt={item.snippet.title}
                    className="thumbnail-image"
                  />
                  <div className="video-duration">
                  </div>
                </div>
                
                <div className="video-info">
                  <h4 className="video-title">{item.snippet.title}</h4>
                  <p className="video-channel">{item.snippet.channelTitle}</p>
                  <p className="video-description">{item.snippet.description}</p>
                  <div className="video-stats">
                    <span className="video-views">
                      {formatViewCount(item.statistics?.viewCount || 0)} 조회
                    </span>
                    <span className="video-date">
                      {new Date(item.snippet.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="video-actions">
                  <button 
                    onClick={() => handleVideoSelect(item)}
                    className="play-button"
                    title="Play"
                  >
                    ▶
                  </button>
                  <a 
                    href={youtubeService.getVideoUrl(item.id.videoId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="youtube-link"
                  >
                    Watch on YouTube
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedVideo && (
        <div className="video-player-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{selectedVideo.snippet.title}</h3>
              <button 
                onClick={() => setSelectedVideo(null)}
                className="close-button"
              >
                ✕
              </button>
            </div>
            <div className="video-embed">
              <iframe
                src={youtubeService.getEmbedUrl(selectedVideo.id.videoId)}
                title={selectedVideo.snippet.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-details">
              <p><strong>Channel:</strong> {selectedVideo.snippet.channelTitle}</p>
              <p><strong>Description:</strong> {selectedVideo.snippet.description}</p>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default YouTubeSearch;
