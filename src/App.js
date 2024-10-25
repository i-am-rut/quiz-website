import { useState } from 'react'
import './App.css';
import StartPage from './components/StartPage';
import Quiz from './components/Quiz'

function App() {

  const [quizConfig, setQuizConfig] = useState(null)
  
  
  const startQuiz = (config) => {
    setQuizConfig(config)
  }
  document.getElementById('year').textContent = new Date().getFullYear();

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
        <p>© <span id="year"></span> Quizzer Web. All rights reserved.</p>
        <p>Made with ❤️ for curious minds.</p>
      </footer>
    </div>
  );
}

export default App;