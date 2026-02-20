import React, { useState } from 'react'
import './QuizList.css'
import { QuizDetail } from './QuizDetail';

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

export const QuizList = () => {
    const handleButtonPress = (quiz) => {
        setQuizSelected(quiz);
    };

    const [quizSelected, setQuizSelected] = useState(null);

    if(quizSelected) {
        return (
            <QuizDetail 
                quiz={quizSelected}
                onVolver={() => setQuizSelected(null)}
            />
        )
    } 

    return (
        <div className ='quiz-container'>
            <h1 className ='quiz-title'>Quizzes</h1>
                <div className='quiz-grid'>
                    {
                        quizLibrary.map(quiz => (
                            <div key = {quiz.id} className='quiz-card'>
                                <div className = {`badge ${quiz.dificultad.toLowerCase()}`}>
                                    {quiz.dificultad}
                                </div>
                                <h3>{quiz.titulo}</h3>
                                <p>Preguntas:</p>
                                {quiz.preguntas.map(preguntas => (
                                    <div key={preguntas.id} className='quiz-card'>
                                        <p>{preguntas.enunciado}</p>
                                    </div>
                                ))}
                                <button
                                    className='btn-play'
                                    onClick={ () => handleButtonPress(quiz) }
                                >

                                </button>
                            </div>
                        ))
                    }
                </div>
        </div>
    );
}

