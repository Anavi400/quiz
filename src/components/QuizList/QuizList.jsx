import React, { useState, useEffect } from 'react'
import './QuizList.css'
import { QuizDetail } from './QuizDetail';

// Explicacion de todo el codigo

// Array de objetos que contiene los quizzes 
export const quizLibrary = [
    {
        id: 1,
        titulo: "React Básico",
        dificultad: "Fácil",
        preguntas: [
            {
                id: 101,
                enunciado: "¿Qué comando se usa para crear un nuevo proyecto con Vite?",
                opciones: ["npm create vite@latest", "npx install react", "npm new-react"],
                respuestaCorrecta: 0 // Índice de la opción correcta
            },
            {
                id: 102,
                enunciado: "¿Qué es un componente en React?",
                opciones: ["Una base de datos", "Una función que retorna HTML/JSX", "Un archivo CSS"],
                respuestaCorrecta: 1
            }
        ]
    },
    {
        id: 2,
        titulo: "Manejo de Estado",
        dificultad: "Intermedio",
        preguntas: [
            {
                id: 201,
                enunciado: "¿Cuál hook se usa para manejar el estado local?",
                opciones: ["useEffect", "useContext", "useState"],
                respuestaCorrecta: 2
            },
            {
                id: 202,
                enunciado: "¿El estado en React es mutable (se puede cambiar directamente)?",
                opciones: ["Sí", "No, debe usarse la función set correspondiente"],
                respuestaCorrecta: 1
            }
        ]
    },
    {
        id: 3,
        titulo: "Master en Hooks",
        dificultad: "Avanzado",
        preguntas: [
            {
                id: 301,
                enunciado: "¿Cuándo se ejecuta useEffect si el array de dependencias está vacío []?",
                opciones: ["En cada render", "Solo una vez al montar el componente", "Nunca"],
                respuestaCorrecta: 1
            }
        ]
    }
];


// Componente que muestra la lista de quizzes
export const QuizList = () => {

    // Estados
    const [time, setTime] = useState(0);
    const [timeOut, setTimeOut] = useState(10);

    // Funcion que se ejecuta cuando se presiona el boton de un quiz
    const handleButtonPress = (quiz) => {
        setQuizSelected(quiz);
    };

    // Hook que se ejecuta cuando el componente se monta
    useEffect(() => {
        // Si el tiempo es mayor o igual al tiempo limite, se detiene el temporizador
        if (time >= timeOut) return;

        // Se inicia un temporizador que se ejecuta cada segundo
        const timer = setInterval(() => {
            // Se incrementa el tiempo en 1
            setTime(prevTime => prevTime + 1);
        }, 1000);

        // Se detiene el temporizador cuando el componente se desmonta
        return () => clearInterval(timer);
        // Condicion para que el temporizador se ejecute solo cuando el tiempo es menor al tiempo limite
    }, [time, timeOut]);


    // Estado para guardar el quiz seleccionado
    const [quizSelected, setQuizSelected] = useState(null);

    // Logica para mostrar el detalle del quiz seleccionado
    // Si hay un quiz seleccionado, se muestra el detalle del quiz
    // Si no hay un quiz seleccionado, se muestra la lista de quizzes
    if (quizSelected) {
        // Se muestra el detalle del quiz seleccionado
        return (
            // Se pasa el quiz seleccionado y la funcion para volver
            <QuizDetail
                // quiz es el quiz seleccionado
                quiz={quizSelected}
                // onVolver es una funcion que se ejecuta cuando se presiona el boton de volver
                onVolver={() => setQuizSelected(null)}
            />
        )
    }

    // Estructura para mostrar la lista de quizzes
    return (
        // Se muestra la lista de quizzes
        <div className='quiz-container'>
            <h1 className='quiz-title'>Quizzes</h1>
            <p>Tiempo: {time}</p>
            <div className='quiz-grid'>
                {
                    // Se recorre la lista de quizzes
                    // quizLibrary.map es una funcion que recorre la lista de quizzes
                    quizLibrary.map(quiz => (
                        // Se muestra cada quiz
                        <div key={quiz.id} className='quiz-card'>
                            {/* Se muestra la dificultad del quiz */}
                            <div className={`badge ${quiz.dificultad.toLowerCase()}`}>
                                {quiz.dificultad}
                            </div>
                            {/* Se muestra el titulo del quiz */}
                            <h3>{quiz.titulo}</h3>
                            {/* Se muestra la cantidad de preguntas */}
                            <p>Preguntas:</p>
                            {/* Se recorre la lista de preguntas */}
                            {quiz.preguntas.map(preguntas => (
                                // Se muestra cada pregunta
                                <div key={preguntas.id} className='quiz-card'>
                                    <p>{preguntas.enunciado}</p>
                                </div>
                            ))}
                            {/* Se muestra el boton de jugar */}
                            <button
                                className='btn-play'
                                // Se ejecuta la funcion handleButtonPress cuando se presiona el boton
                                onClick={() => handleButtonPress(quiz)}
                            >
                                Jugar
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

