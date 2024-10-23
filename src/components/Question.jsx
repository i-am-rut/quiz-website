import { useEffect, useState } from 'react';
import '../styles/Question.css'
import { decode } from 'html-entities';

const Question = ({ question, id, selectedOption, onOptionSelect, onScoreChange, score }) => {
    const [shuffleOptions, setShuffleOptions] = useState([])
    
    
    useEffect(() => {
        const shuffledOptions = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5)
        setShuffleOptions(shuffledOptions)
    },[question])

    const handleOptionClick = (option) => {
        onOptionSelect(id, option)
        if(option === question.correct_answer) {
            onScoreChange(score + 1)
        } 
    }
    

    return (
      <div className='question-option-container'>
        <p id={id} className="question-statement">{question.id + ') '}{decode(question.question)}</p>
        <div>
          {shuffleOptions.map((option, index) => (
            <button key={index} className={`option-but ${selectedOption === option ? 'clicked-option-button' : ''}`} onClick={() => handleOptionClick(option)}
            disabled={!!selectedOption}>
              {decode(option)}
            </button>
          ))}
        </div>
      </div>
    );
  };

export default Question