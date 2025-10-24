import { useState } from "react";
import "./Carousel.css";

const Carousel = ({ isEditing = false }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const albumData = [
        { id: 1, title: "Song 1", artist: "Artist 1", cover: null },
        { id: 2, title: "Song 2", artist: "Artist 2", cover: null },
        { id: 3, title: "Song 3", artist: "Artist 3", cover: null },
        { id: 4, title: "Song 4", artist: "Artist 4", cover: null },
        { id: 5, title: "Song 5", artist: "Artist 5", cover: null },
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === albumData.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? albumData.length - 1 : prevIndex - 1
        );
    };

    const getVisibleAlbums = () => {
        const visible = [];
        const total = albumData.length;

        for (let i = -2; i <= 2; i++) {
            const index = (currentIndex + i + total) % total;
            visible.push({
                ...albumData[index],
                position: i,
                isCenter: i === 0,
            });
        }

        return visible;
    };

    const visibleAlbums = getVisibleAlbums();
    const currentAlbum = albumData[currentIndex];

    return (
        <div className='carousel-container'>
            <div className='carousel'>
                <div className='carousel-track'>
                    {visibleAlbums.map((album, index) => (
                        <div
                            key={`${album.id}-${index}`}
                            className={`album-cover ${
                                album.isCenter ? "center" : "side"
                            }`}
                        >
                            {isEditing && (
                                <button className='album-delete'>X</button>
                            )}
                            {album.cover ? (
                                <img src={album.cover} alt={album.title} />
                            ) : (
                                <div className='placeholder-cover'>
                                    <span>{album.title}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className='work-stage'>
                <button className='carousel-btn prev-btn' onClick={prevSlide}>
                    ‹
                </button>
                <div className='current-track-info'>
                    <h3 className='track-title'>{currentAlbum.title}</h3>
                    <p className='track-artist'>{currentAlbum.artist}</p>
                </div>
                <button className='carousel-btn next-btn' onClick={nextSlide}>
                    ›
                </button>
            </div>
        </div>
    );
};

export default Carousel;
