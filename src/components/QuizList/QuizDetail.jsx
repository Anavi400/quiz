import React, { useState, useEffect } from "react";
import './QuizList'

// Explicacion de la funcion QuizDetail
// Se define la funcion QuizDetail que recibe como parametros el quiz y la funcion onVolver
export const QuizDetail = ({ quiz, onVolver }) => {

    // Se definen las variables para manejar el estado del juego.
    // useState es un hook de react que permite manejar el estado de un componente y se utiliza para guardar datos que pueden cambiar con el tiempo
    // currentQuestion: Indica la pregunta actual
    const [currentQuestion, setCurrentQuestion] = useState(0);
    // inGame: Indica si el juego esta activo
    const [inGame, setInGame] = useState(false);
    // score: Indica la puntuacion actual
    const [score, setScore] = useState(0);
    // quizEnded: Indica si el juego ha terminado
    const [quizEnded, setQuizEnded] = useState(false);
    // showMessage: Indica si se debe mostrar un mensaje
    const [showMessage, setShowMessage] = useState(false);

    // Se definen las variables para manejar el estado del tiempo
    // timeRemaining: Tiempo restante
    const [timeRemaining, setTimeRemaining] = useState(10);
    // timerActive: Indica si el temporizador esta activo
    const [timerActive, setTimerActive] = useState(false);


    // Se definen las variables que contienen el quiz y la pregunta actual
    // preguntas: Contiene el array de preguntas
    const preguntas = quiz.preguntas;
    // currentQuizItem: Contiene la pregunta actual
    const currentQuizItem = preguntas[currentQuestion];

    // Funcion que se ejecuta cuando se presiona el boton de jugar
    const handleStartGame = () => {
        setInGame(true);
        setCurrentQuestion(0);
        setScore(0);
        setQuizEnded(false);
        setTimeRemaining(10); // Reset timer
        setTimerActive(true); // Start timer
    };

    // Funcion que se ejecuta cuando se presiona el boton de una respuesta
    const handleAnswer = (selectedIndex) => {
        // Detener el cronómetro mientras se procesa la respuesta
        setTimerActive(false);

        const isCorrect = selectedIndex === currentQuizItem.respuestaCorrecta;

        if (isCorrect) {
            setScore(score + 1);
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 1000);
        }

        setTimeout(() => {
            if (currentQuestion + 1 < preguntas.length) {
                setCurrentQuestion(currentQuestion + 1);
                setTimeRemaining(10); // Reiniciar tiempo para la siguiente pregunta
                setTimerActive(true);  // Reactivar el tiempo
            } else {
                setQuizEnded(true);
                setTimerActive(false);
            }
        }, isCorrect ? 1000 : 0);
    };

    // Lógica del temporizador
    useEffect(() => {
        let interval = null;

        if (inGame && !quizEnded && timerActive && timeRemaining > 0) {
            interval = setInterval(() => {
                setTimeRemaining((prev) => prev - 1);
            }, 1000);
        } else if (timeRemaining === 0 && timerActive) {
            // Si el tiempo se acaba, se cuenta como error y pasa a la siguiente
            handleAnswer(-1);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [inGame, quizEnded, timerActive, timeRemaining]);

    //ESTRUCTURA PARA CUANDO EL JUEGO ESTE ACTIVO
    if (inGame && !quizEnded) {
        // Se muestra la estructura para cuando el juego esta activo
        return (
            // Se muestra el mensaje de respuesta correcta
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

                {/* Se muestra la estructura para cuando el juego esta activo */}
                <div className="detail-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
                        <span className="badge">Pregunta {currentQuestion + 1} de {preguntas.length}</span>
                        <div style={{
                            background: timeRemaining <= 3 ? '#ff4d4d' : 'var(--bg-main)',
                            padding: '5px 15px',
                            borderRadius: '20px',
                            fontWeight: 'bold',
                            border: '2px solid var(--accent-color)',
                            minWidth: '100px',
                            textAlign: 'center'
                        }}>
                            ⏱️ {timeRemaining}s
                        </div>
                        <span className="badge" style={{ background: 'var(--accent-color)', color: '#1e1e1e' }}>Puntos: {score}</span>
                    </div>
                    {/* Se muestra la pregunta actual */}
                    <h2 style={{ marginBottom: '30px' }}>{currentQuizItem.enunciado}</h2>
                    {/* Se muestran las opciones de respuesta */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {/* Se itera sobre las opciones de respuesta */}
                        {currentQuizItem.opciones.map((opcion, index) => (
                            // Se muestra el boton de respuesta
                            <button
                                // Se define la clave del boton
                                key={index}
                                // Se define la clase del boton
                                className="btn-play"
                                // Se define la funcion que se ejecuta cuando se presiona el boton, aqui se pasa el indice de la opcion seleccionada 
                                onClick={() => handleAnswer(index)}
                            >
                                {/* Se muestra la opcion de respuesta */}
                                {opcion}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    //ESTRUCTURA PARA CUANDO EL JUEGO TERMINA
    if (quizEnded) {
        // Se calcula el porcentaje de respuestas correctas
        // preguntas.length: Numero total de preguntas
        const percentage = (score / preguntas.length) * 100;
        // Se define la funcion que devuelve un mensaje segun el porcentaje
        const getMessage = () => {
            // Se define el mensaje segun el porcentaje
            if (percentage === 100) return "¡Perfecto! 🎉";
            if (percentage >= 70) return "¡Muy bien! 👏";
            if (percentage >= 50) return "¡Buen intento! 👍";
            return "Sigue practicando 💪";
        };

        // Se muestra la estructura para cuando el juego termina
        return (
            // Se muestra el contenedor del quiz
            <div className="quiz-detail-container">
                // Se muestra la tarjeta del quiz
                <div className="detail-card" style={{ textAlign: 'center' }}>
                    // Se muestra el mensaje de felicitacion
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{getMessage()}</h1>
                    // Se muestra el mensaje de quiz completado
                    <h2 style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>Quiz Completado</h2>
                    // Se muestra la estructura para cuando el juego termina
                    <div style={{
                        background: 'var(--bg-main)',
                        padding: '30px',
                        borderRadius: '15px',
                        marginBottom: '30px'
                    }}>
                        {/* Se muestra la puntuacion actual y el numero total de preguntas */}
                        <p style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--accent-color)', margin: '0' }}>
                            {score}/{preguntas.length}
                        </p>
                        {/* Se muestra el mensaje de respuestas correctas */}
                        <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>Respuestas correctas</p>
                    </div>
                    {/* Se muestra la estructura para cuando el juego termina */}
                    <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                        {/* Se muestra el boton de jugar de nuevo */}
                        <button className="btn-play" onClick={handleStartGame}>Jugar de Nuevo</button>
                        {/* Se muestra el boton de ver detalles */}
                        <button className="btn-play" onClick={() => setInGame(false)}>Ver Detalles</button>
                        {/* Se muestra el boton de volver */}
                        <button className="btn-black" onClick={onVolver}>Volver</button>
                    </div>
                </div>
            </div>
        )
    }

    // ESTRUCTURA PARA CUANDO EL JUEGO NO ESTA ACTIVO
    return (
        // Se muestra el contenedor del quiz
        <div className="quiz-detail-container">
            {/* Se muestra el boton de volver */}
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