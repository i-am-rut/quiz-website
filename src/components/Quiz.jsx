import { useState, useEffect } from "react";
import {ref, get} from "firebase/database"
import { db } from "../firebase";
import Question from "./Question";
import { decode } from "html-entities";
import QuestionSubmitted from "./QuestionSubmitted";
import '../styles/Quiz.css'

const Quiz = ({ quizConfig, onStartQuiz }) => {
    const [quizData, setQuizData] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [selectedOptions, setSelectedOptions] = useState({})
    const [score, setScore] = useState(0)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const questionsPerPage = isSubmitted ? 50 : 5
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const quizRef = ref(db, 'quizzes/-O9unMjPvdGYV05MCQOp')
                const snapshot = await get(quizRef)

                if(snapshot.exists()) {
                    const data = snapshot.val()
                    const quizData = data.filter(item => decode(item.category) === quizConfig.topic && item.difficulty === quizConfig.difficulty)
                    const idLessData = quizData.sort(() => Math.random() -0.5).slice(0, quizConfig.numQuestions)
                    const configData = idLessData.map((item, index) => ({
                        ...item,
                        id: index + 1
                    }))
                    setQuizData(configData)
                }
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }
        
        
        fetchData()
        
    },[quizConfig])

    const nextPage = () => {
        setCurrentPage((prevCurrentPage) => prevCurrentPage + 1)
    }

    const pervPage = () => {
        setCurrentPage((prevCurrentPage) => prevCurrentPage - 1)
    }

    const handleOptionSelect = (questionId, selectedOption) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [questionId]: selectedOption,
        }))
    }
    
    const handleOnSubmit = () => {
        setIsSubmitted(true)
        setCurrentPage(0)
    }
    const handleTitleClick = () => {
        onStartQuiz(null)
    }

    const handleOnStartNewQuiz = () => {
        onStartQuiz(null)
    }

    const paginatedQuestions = quizData.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage)
    

    return (
        <div>
            <div className="navbar">
                <h1 className="website-title" onClick={handleTitleClick}>Quizzer</h1>
                <div className="quiz-config">
                    <p className="user-name"><span>Username :</span> {quizConfig.userName}</p>
                    <p className="quiz-topic"><span>Topic :</span> {decode(quizConfig.topic)}</p>
                    <p className="quiz-difficulty"><span>Difficulty :</span>  {quizConfig.difficulty}</p>
                </div>
            </div>
            <div className="quiz-container">
                <div className="wish-score-container">
                    {!isSubmitted? 
                        <p className="wish-text">All the best !</p> :
                        <p className="score-text">{`Your score is ${score}/${quizData.length}`}</p>
                    }
                </div>
                { isSubmitted? (
                    paginatedQuestions.map((question) => (
                        <QuestionSubmitted 
                            key={question.id} 
                            id={question.id} 
                            question={question} 
                            selectedOption = {selectedOptions[question.id]}
                            score={score}
                            isSubmitted={isSubmitted}
                            onStartQuiz={onStartQuiz}
                        />
                    ))) : (paginatedQuestions.map((question) => (
                        <Question 
                            key={question.id} 
                            id={question.id} 
                            question={question} 
                            selectedOption = {selectedOptions[question.id]}
                            onOptionSelect={handleOptionSelect}
                            onScoreChange={setScore}
                            score={score}
                            isSubmitted={isSubmitted}
                        />
                    )))
                }
                <div className="prev-next-submit-but-row">
                    {currentPage > 0 && <button className="prev-page-but" onClick={pervPage}>Previous</button>}
                    {currentPage < Math.ceil(quizData.length / questionsPerPage) - 1 ? (
                        <button className="next-page-but" onClick={nextPage}>Next</button> 
                    ) : (isSubmitted ?  
                            <>
                                <button onClick={handleOnStartNewQuiz} className="start-new-quiz-but">Start new quiz</button>
                                <p className="score-text-bottom">{`Your score is ${score}/${quizData.length}`}</p>
                            </> : 
                                <button onClick={handleOnSubmit} className="submit-but">Submit & Check answers</button> 
                    )}
                </div>
            </div>
            
        </div>
    )

}

export default Quiz

