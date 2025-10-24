import { useState } from "react";
import Player from "./components/player";
import Carousel from "./components/carousel";
import Header from "./components/header";
import "./app.css";

function App() {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div>
            <Header />
            <main>
                <h1>October Playlist</h1>
                <section>
                    <Carousel isEditing={isEditing} />
                </section>

                <section>
                    <Player />
                </section>
                
                <button onClick={toggleEdit} className='edit-button'>
                    {isEditing ? "Done" : "Edit"}
                </button>
            </main>
        </div>
    );
}

export default App;
