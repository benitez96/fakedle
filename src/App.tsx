import { useState } from 'react';
import './input.css';

export const App = () => {
  const answer = "PEPITO";
  const [turn, setTurn] = useState(6);
  const [words, setWords] = useState<string[][]>(
    Array.from({ length: 6 }, () => Array(answer.length).fill('P'))
  );

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center">FAKEDLE</h1>

      <div className="flex flex-col">
        {
          words.map( (word, wordIndex) => (
            <div className="flex flex-row content-center justify-center" key={wordIndex}>
              {
                word.map( (letter: string, letterIndex: number) => {
                  const isCorrect = 
                    letter &&
                    wordIndex < turn && // verificamos que el turno haya terminado
                    letter === answer[letterIndex]

                  const isPresent =
                    letter &&
                    wordIndex < turn &&
                    letter !== answer[letterIndex] &&
                    answer.includes(letter)

                  return (
                    <div 
                      key={letterIndex}
                      className={`${ isPresent ? 'bg-amber-300' : '' } ${ isCorrect ? 'bg-green-500' : '' } flex content-center justify-center w-12 h-12 m-2 border-2 border-slate-400 p-2`}
                    >
                      {letter}
                    </div>
                    )
                })
               

              }
            </div>

          ) )

        }
      </div>
      
    </div>
  )
}

export default App
