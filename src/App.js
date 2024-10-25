import { useState } from 'react'
import './App.css';
import StartPage from './components/StartPage';
import Quiz from './components/Quiz'

function App() {

  const [quizConfig, setQuizConfig] = useState(null)
  
  
  const startQuiz = (config) => {
    setQuizConfig(config)
  }

  return (
    <div className="App">
      {
        quizConfig? 
          <Quiz 
            quizConfig={quizConfig}
            onStartQuiz={startQuiz}
          /> :
          <StartPage onStartQuiz={startQuiz} />
      }
      <footer>
        <p>©2024 Quizzer Web. All rights reserved.</p>
        <p>Made with ❤️ for curious minds. 
          ( <a href="https://github.com/i-am-rut/quiz-website" target='_blank' rel="noopener noreferrer">Creator</a> )
        </p>
      </footer>
    </div>
  );
}

export default App;