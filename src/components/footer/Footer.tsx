import { BsLinkedin, BsGithub } from 'react-icons/bs'

export const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-end px-6 py-4 bg-white dark:bg-zinc-900 sm:flex-row transition duration-300">

        <div className="flex -mx-2">

            <a href="https://www.linkedin.com/in/danielandresbenitez/" target="_blank" className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300" aria-label="Github">
              <BsLinkedin />
            </a>

            <a href="https://github.com/benitez96" target="_blank" className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300" aria-label="Github">
                <BsGithub />
            </a>
        </div>
    </footer>
  )
}
