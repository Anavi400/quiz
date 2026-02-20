import React, {useState} from "react";
import './QuizList'

export const QuizDetail = ({ quiz, onVolver }) => {

    const [currentQuestion, setCurrenteQuestion] = useState(0);
    const [inGame, setInGame] =  useState(false);
    const [score, setScore] = useState(0);
    const [quizEnded, setQuizEnded] = useState(false)

    const preguntas = quiz.preguntas;
    const currentQuizItem = preguntas[currentQuestion];
    
            //ESTRUCTURA PARA CUANDO EL JUEGO ESTE ACTIVO
    if(inGame){
        return (
            <div className="quiz-detail-container">
                <div>
                    <span>Pregunta: {preguntaActual + 1} de {preguntas.lenght}</span>
                </div>
                <div>Puntos: {score}</div>
                <div>
                    <h2>

                    </h2>
                    <div>
                        <button key={index} onClick={() => handleAnswer()}>
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (

        <div className="quiz-detail-container">
            <button className="btn-black" onClick={onVolver}>
                Volver
            </button>

            <div className="detail-card">
                <span className={`badge ${quiz.dificultad.toLowerCase()}`}>
                    {quiz.dificultad}
                </span>
                <h1 className="quiz-tittle">
                    {quiz.titulo}
                </h1>
                <p>
                    Preguntas del quiz:
                </p>
            </div>

            <div className="preguntas-preview">
                <ul>
                    {quiz.preguntas.map(pregunta => (
                        <li key={pregunta.id} className="" onClick={ () => setCurrenteQuestion(pregunta)}>
                            <p>{pregunta.enunciado}</p>
                            <ul>
                                {pregunta.opciones.map((opcion, index) => (
                                    <li key={index}>{opcion}</li>
                                ))}
                            </ul>
                        </li>
                        ))}
                </ul>
            </div>
        </div>
    )
}