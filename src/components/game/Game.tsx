import {useCallback, useEffect, useMemo, useState} from "react";
// import Swal from 'sweetalert2'
// import 'sweetalert2/src/sweetalert2.scss';

import {Field} from "./Field";

export const Game = () => {
  const WORDS = ['RUEDA', 'CUERDA', 'VERDE', 'CASILLA', 'ANIMAL', 'TRABAJO']

  const [answer, setAnswer] = useState(WORDS[Math.min(Math.floor(Math.random() * 10), WORDS.length - 1)])
  const [status, setStatus] = useState<'playing' | 'finished'>('playing');
  const [turn, setTurn] = useState<number>(0);
  const [words, setWords] = useState<string[][]>(
    Array.from({ length: 6 }, () => Array(answer.length).fill(''))
  );


  const handleKeyDown = useCallback((e: KeyboardEvent) =>{

    if (status === 'playing') {
      switch ( e.key ) {

        case 'Enter':
          if ( words[turn].some( l => !l ) ) return;


          if ( words[turn].join('') === answer ){
            setStatus('finished');
          }

          setTurn( turn => turn + 1 )

          return;

        case 'Backspace':
          let firstEmptyIndex = words[turn].findIndex(letter => letter === '');

          if (firstEmptyIndex === -1){
            firstEmptyIndex = words[turn].length;
          }

          if (firstEmptyIndex === 0) return

          words[turn][firstEmptyIndex - 1] = '';

          setWords(words.splice(0))

          return;


        default:
          if (e.key.length === 1 && e.key.match(/[a-z]/i)){
          const firstEmptyIndex = words[turn].findIndex(letter => letter === '');
          if (firstEmptyIndex === -1) return;

          words[turn][firstEmptyIndex] = e.key.toUpperCase();

          setWords([...words]);

          return;
        }
      }

    } else if ( e.key === 'Enter' ) {
      // handle reset game
      setAnswer( WORDS[Math.floor(Math.random() * WORDS.length)] )
      setWords( Array.from({ length: 6 }, () => Array(answer.length).fill('')) )
      setTurn(0)
      setStatus('playing')
    }


  }, [status, turn, words]);

  useEffect(() => {
    if (turn + 1 > words.length){
      setStatus('finished')
    }
  } , [turn, setStatus])

  useEffect(() => {
    setWords( Array.from({ length: 6 }, () => Array(answer.length).fill('')) )
  }, [answer])


  useEffect(() =>{
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);

  }, [handleKeyDown]);


  return (
    <div className="flex flex-col justify-between">
      {
        words.map( (word, wordIndex) => (
          <div className="flex flex-row content-center justify-center" key={wordIndex}>
            {
              word.map( (letter: string, letterIndex: number) => {
                const isCorrect: boolean = 
                  !!letter &&
                  wordIndex < turn && // verificamos que el turno haya terminado
                  letter === answer[letterIndex]

                const isPresent: boolean =
                  !!letter &&
                  wordIndex < turn &&
                  letter !== answer[letterIndex] &&
                  answer.includes(letter)

                return (
                  <Field 
                    key={letterIndex}
                    isCorrect={isCorrect} 
                    isPresent={isPresent} 
                  >
                    <p>{letter}</p> 
                  </Field>
                  )
              })
             

            }
          </div>

        ) )

      }
      {
        status == 'finished' && words[turn - 1]?.join('') == answer 
          ?
          (
            <p className="pt-5 text-4xl text-center transition duration-300 dark:text-white">You won!</p>
          )
          : status == 'finished' && words[turn - 1]?.join('') != answer 
          ?
          (
            <p className="pt-5 text-4xl text-center transition duration-300 dark:text-white">You lost!</p>
          )
          : ('')

      }
    </div>
  )
}
