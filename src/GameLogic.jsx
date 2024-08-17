import { useState } from 'react';
import './CardGrid.css';
import Card from './Card';
import { images } from './CardImages';
import mario from './assets/mario.mp3';
import click from './assets/click.mp3';
import win from './assets/win.wav';
function GameLogic(){
    const [moves, setMoves] = useState(3);
    const [flippedIndecies, setFlippedIndecies] = useState([]);
    const [matchedIndecies, setMatchedIndecies] = useState([]);
    const [lost, setLost] = useState(0);
    if(matchedIndecies.length === images.length){
        const winSound = new Audio(win);
        console.log("Yay");
        winSound.play();
    }
    const clickHandler = (e) => {
        const soundClick = new Audio(click);
        soundClick.play();
        e.currentTarget.classList.toggle("rotater");
        const cardId = e.currentTarget.className;

        const newFlippedIndecies = [...flippedIndecies, cardId];
        setFlippedIndecies(newFlippedIndecies);
        // Check if two cards are flipped
        if (newFlippedIndecies.length === 2) {
            let [firstCardID, secondCardID] = newFlippedIndecies;

            if (firstCardID === secondCardID) {
                setMatchedIndecies(prev => [...prev, firstCardID, secondCardID]);
                setFlippedIndecies([]); // Reset flipped indices after a match
            } else {
                setMoves(moves - 1);
                setTimeout(() => {
                    document.getElementsByClassName(firstCardID)[0].classList.remove("rotater");
                    document.getElementsByClassName(secondCardID)[0].classList.remove("rotater");
                    setFlippedIndecies([]); // Reset flipped indices after a mismatch
                }, 1000);
            }
            // Check if moves are exhausted
            if (moves - 1 === 0) {
                console.log("Game over");
                setLost(lost+1);
                setMatchedIndecies([]);
                const soundLose = new Audio(mario); // Create a new Audio object
                soundLose.play(); // Play the sound
                setTimeout(() => {
                    document.querySelectorAll(".rotater").forEach(card => {
                        card.classList.remove("rotater");
                    });
                    setMoves(3);
                }, 1000);
            }
        }

    };
    console.log("Matched length:" + matchedIndecies.length)
    console.log("Images length"+images.length);
    return (
        <>
        <h1 style={{textAlign:"Center"}}>You lost {lost} time(s)</h1>
            <h1 style={{ textAlign: 'center' }}>Available attempts: <span>{moves}</span></h1>
            <div className='card-container'>
                {images.map((element, index) => (
                    <Card key={index} index={element.name} imgSrc={element.src} imgName={element.name} onClick={clickHandler} />
                ))}
            </div>
        </>
    );
}
export default GameLogic