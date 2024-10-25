import { useState, useEffect } from "react"
import { ref, get } from "firebase/database"
import { db } from "../firebase"
import '../styles/StartPage.css'
import { decode } from "html-entities"

const StartPage = ({ onStartQuiz }) => {
    const [userName, setUserName] = useState('');
    const [topic, setTopic] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [numQuestions, setNumQuestions] = useState(5);
    const [availableQuestions, setAvailableQuestions] = useState([]);
     

    const [topics, setTopics] = useState([])
    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const quizRef = ref(db, 'quizzes/-O9unMjPvdGYV05MCQOp')
                const snapshot = await get(quizRef)

                if(snapshot.exists()) {
                    const data = snapshot.val()
                    const quizArray = Object.values(data);  
                    setAvailableQuestions(quizArray);
                    const uniqueTopics = [...new Set(data.map(item  => decode(item.category)))]
                    setTopics(uniqueTopics)  
                }
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }

        fetchTopics()
    },[])

    const filteredQuestions = availableQuestions.filter((item) => decode(item.category) === topic && item.difficulty === difficulty)

    const maxQuesNum = Array.from(filteredQuestions, (_, index) => index + 1)

    const handleStartQuiz = () => {
        if (userName && topic && difficulty && numQuestions) {
          // Pass the selected values back to the parent component (Quiz.js)
            onStartQuiz({userName, topic, difficulty, numQuestions})
        } else {
          alert('Please fill in all fields!');
        }
    };


    return (
        <div className="trial">
            <div className="start-page-container">
                <h1 className="website-start-page-title">Quizzer</h1>
                <label htmlFor="userName-input" className="lable-userName">
                    Enter Name:
                </label>
                <input
                    type="text"
                    id="userName-input"
                    className="input-userName"
                    value={userName}
                    placeholder="Name"
                    onChange={(e) => setUserName(e.target.value)}
                />

                <label htmlFor="topic-select" className="lable-topic">
                    Select Topic:
                </label>
                <select 
                    id="topic-select"
                    className="select-topic"
                    value={topic} 
                    onChange={(e) => setTopic(e.target.value)}
                >
                <option value="">--Choose a Topic--</option>
                {topics.map((topic) => (
                    <option key={topic} value={topic}>
                    {topic}
                    </option>
                ))}
                </select>

                <label htmlFor="difficulty-select" className="lable-difficulty">
                    Difficulty:
                </label>
                <select 
                    value={difficulty} 
                    onChange={(e) => setDifficulty(e.target.value)}
                    id="difficulty-select"
                    className="select-difficulty"
                >
                    <option value="">--Choose Difficulty--</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

                {(topic && difficulty)? 
                <>
                    <label htmlFor="numQuestions-select" className="lable-numQuestions">
                        Number of Questions:
                    </label>
                    <select 
                        value={numQuestions} 
                        onChange={(e) => setNumQuestions(e.target.value)}
                        id="numQuestions-select"
                        className="select-numQuestions"
                    >
                        <option value="">--Choose Number of Questions--</option>
                        {maxQuesNum.map((number) => (
                            <option key={number} value={number}>
                            {number}
                            </option>
                        )
                        )}
                    </select>
                </> : null}

                <button className="start-quiz-but" onClick={handleStartQuiz}>Start Quiz</button>
            </div>
        </div>
    )
}

export default StartPage

