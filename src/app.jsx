import { useState } from "react";
import Player from "./components/Player";
import Carousel from "./components/Carousel";
import Header from "./components/Header";
import "./App.css";

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
