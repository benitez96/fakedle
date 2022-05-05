import { memo } from 'react';

interface Props {
  children: JSX.Element;
  isPresent: boolean;
  isCorrect: boolean;
}

export const Field = memo(({ children: letter, isPresent, isCorrect }: Props) => {
  return (
    <div 
      className={`${ isPresent ? 'bg-amber-300' : '' } ${ isCorrect ? 'bg-green-500' : '' } flex content-center justify-center w-12 h-12 m-2 border-2 border-slate-400 p-2 dark:text-white font-semibold`}
    >
      {letter}
    </div>
  )
})
