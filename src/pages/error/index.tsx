import { Link } from "react-router-dom";
import {  useCookie } from "../../hooks";


export const ErrorPage = () => {
  const {getCookie} = useCookie()
  const cookieToken = getCookie("access_token")

  return (
    <div className=" sm:bg-convite_desktop bg-convite_mobile bg-100% bg-no-repeat bg-center font-cantora w-full h-screen flex flex-col lg:flex-row items-center justify-end space-y-16 lg:space-y-0 space-x-8 2xl:space-x-0">
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center lg:px-2 xl:px-0 text-center">
        <p className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider text-gray-300">
          404
        </p>
        <p className="font-tropika text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider text-gray-300 mt-2">
          Página não encontrada
        </p>
        <p className="text-lg md:text-xl lg:text-2xl text-secondary my-12 text-white">
          Desculpe, a página que você está procurando não pôde ser encontrada.
        </p>
        {!cookieToken && (
          <Link
            to="/login"
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-150"
            title="Voltar ao login"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>Faça ao login</span>
          </Link>
        )}
        {cookieToken && (
          <Link
            to="/"
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-150"
            title="Voltar Home"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>Voltar Home</span>
          </Link>
        )}
      </div>
    </div>
  );
};