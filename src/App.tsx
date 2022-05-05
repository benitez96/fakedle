import {Footer} from './components/footer/Footer';
import { Game } from './components/game/Game';
import {Header} from './components/header/Header';
import './input.css';

export const App = () => {

  return (
    <div className="dark:bg-zinc-900 transition-colors duration-300">
      <div className="container flex flex-col justify-between h-screen mx-auto">
        <Header />

        <Game />

        <Footer />
        
      </div>
    </div>
  )
}

export default App
