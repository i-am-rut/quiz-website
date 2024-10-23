import { useEffect, useState } from 'react';
import '../styles/QuestionSubmitted.css'
import { decode } from 'html-entities';
import { FaCheck } from 'react-icons/fa';

const QuestionSubmitted = ({ question, id, selectedOption, score, isSubmitted }) => {
    const [shuffleOptions, setShuffleOptions] = useState([])
    
    
    useEffect(() => {
        const shuffledOptions = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5)
        setShuffleOptions(shuffledOptions)
    },[question])


    return (
      <div className='question-option-container'>
        <h3 className="question-statement">{question.id + ') '}{decode(question.question)}{selectedOption === question.correct_answer ? <FaCheck /> : "  ❌"}</h3>
        <div>
          {shuffleOptions.map((option, index) => (
            <button key={index} className={`option-button ${option === question.correct_answer ? 'correct-option' : ''}
            ${option === selectedOption && selectedOption !== question.correct_answer ? 'wrong-option' : ''}`}
            disabled={!!selectedOption}>
              {decode(option)}
            </button>
          ))}
        </div>
      </div>
    );
  };

export default QuestionSubmitted