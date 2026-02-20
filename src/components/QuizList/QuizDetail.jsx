import React, {useState} from "react";
import './QuizList'

export const QuizDetail = ({ quiz, onVolver }) => {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [inGame, setInGame] =  useState(false);
    const [score, setScore] = useState(0);
    const [quizEnded, setQuizEnded] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const preguntas = quiz.preguntas;
    const currentQuizItem = preguntas[currentQuestion];
    
    const handleStartGame = () => {
        setInGame(true);
        setCurrentQuestion(0);
        setScore(0);
        setQuizEnded(false);
    };

    const handleAnswer = (selectedIndex) => {
        const isCorrect = selectedIndex === currentQuizItem.respuestaCorrecta;
        
        if (isCorrect) {
            setScore(score + 1);
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 1000);
        }

        setTimeout(() => {
            if (currentQuestion + 1 < preguntas.length) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                setQuizEnded(true);
            }
        }, isCorrect ? 1000 : 0);
    };

    //ESTRUCTURA PARA CUANDO EL JUEGO ESTE ACTIVO
    if(inGame && !quizEnded){
        return (
            <div className="quiz-detail-container">
                {showMessage && (
                    <div style={{
                        position: 'fixed',
                        top: '20px',
                        right: '20px',
                        background: '#00f1ad',
                        color: '#00392b',
                        padding: '15px 25px',
                        borderRadius: '10px',
                        fontWeight: 'bold',
                        animation: 'fadeIn 0.3s ease-in',
                        zIndex: 1000
                    }}>
                        ¡Correcto! ✓
                    </div>
                )}
                
                <div className="detail-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <span className="badge">Pregunta {currentQuestion + 1} de {preguntas.length}</span>
                        <span className="badge" style={{ background: 'var(--accent-color)', color: '#1e1e1e' }}>Puntos: {score}</span>
                    </div>
                    <h2 style={{ marginBottom: '30px' }}>{currentQuizItem.enunciado}</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {currentQuizItem.opciones.map((opcion, index) => (
                            <button 
                                key={index} 
                                className="btn-play"
                                onClick={() => handleAnswer(index)}
                            >
                                {opcion}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    //ESTRUCTURA PARA CUANDO EL JUEGO TERMINA
    if(quizEnded){
        const percentage = (score / preguntas.length) * 100;
        const getMessage = () => {
            if (percentage === 100) return "¡Perfecto! 🎉";
            if (percentage >= 70) return "¡Muy bien! 👏";
            if (percentage >= 50) return "¡Buen intento! 👍";
            return "Sigue practicando 💪";
        };

        return (
            <div className="quiz-detail-container">
                <div className="detail-card" style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{getMessage()}</h1>
                    <h2 style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>Quiz Completado</h2>
                    <div style={{ 
                        background: 'var(--bg-main)', 
                        padding: '30px', 
                        borderRadius: '15px',
                        marginBottom: '30px'
                    }}>
                        <p style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--accent-color)', margin: '0' }}>
                            {score}/{preguntas.length}
                        </p>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>Respuestas correctas</p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                        <button className="btn-play" onClick={handleStartGame}>Jugar de Nuevo</button>
                        <button className="btn-play" onClick={() => setInGame(false)}>Ver Detalles</button>
                        <button className="btn-black" onClick={onVolver}>Volver</button>
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
                        <li key={pregunta.id}>
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

            <button className="btn-play" onClick={handleStartGame}>
                Iniciar Quiz
            </button>
        </div>
    )
}