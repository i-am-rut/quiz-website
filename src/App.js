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
    </div>
  );
}

export default App;