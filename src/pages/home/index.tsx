import { useState } from "react";
import { ConfeteComponent } from "../../components";
import { NavLink, useNavigate } from "react-router-dom";
import { useCookie } from "../../hooks";

export function HomePage() {
  const {getCookie, deleteAllCookies} = useCookie()
  const cookieToken = getCookie("access_token")
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  function handleParticiar() {
    setIsVisible(true);

    setTimeout(() => {
      if (!cookieToken) {
        navigate("/login");
      }
    }, 4000);
  }

  return (
    <main className="sm:bg-convite_desktop bg-convite_mobile bg-100% bg-no-repeat bg-center min-h-screen w-full text-white font-cantora">
      <div className="flex justify-center items-center h-screen">
        <div className="z-20">
          {isVisible && <ConfeteComponent isVisible={isVisible} />}
        </div>

        <div className="sm:flex-1"></div>

        <div className="sm:flex-1 flex flex-col justify-center items-center text-center h-full gap-4">
          <h1 className="text-6xl text-wrap font-medium text-ellipsis font-tropika">
            Chá de Casa nova
          </h1>
          <span className="text-4xl font-thin text-ellipsis text-wrap font-tropika">
            Isabela e Pablo
          </span>

          <p className="w-[80%] text-xl font-normal">
            É com grande alegria que convidamos você para o nosso Chá de Casa
            Nova. Sua presença tornará este momento ainda mais especial!
          </p>

          <div className="text-xl">
            <span>20 de Julho</span>
            <hr />
            <span>Sábado Às 14h</span>
          </div>

          {!cookieToken && (
            <button
              className="bg-blue-400 w-60 rounded-md text-center p-3 text-xl font-semibold font-cantora"
              onClick={handleParticiar}
            >
              {isVisible ? "Confetes!" : "Quero Participar!"}
            </button>
          )}

          {cookieToken && (
            <div className="flex flex-col flex-wrap gap-4">
              <NavLink
                to={"/presente"}
                className="bg-blue-400 w-60 rounded-md text-center p-3 text-xl font-semibold font-cantora"
              >
                Lista de Presentes
              </NavLink>

              <NavLink
                to={"/cad/acompanhante"}
                className="bg-blue-400 w-60 rounded-md text-center p-3 text-xl font-semibold font-cantora"
                onClick={handleParticiar}
              >
                Acompanhantes
              </NavLink>

              <NavLink
                to={"/cad/comida"}
                className="bg-blue-400 w-60 rounded-md text-center p-3 text-xl font-semibold font-cantora"
                onClick={handleParticiar}
              >
                Comida Típica
              </NavLink>

              <button
                className="bg-blue-400 w-60 rounded-md text-center p-3 text-xl font-semibold font-cantora"
                onClick={() => {
                  deleteAllCookies()

                  window.location.reload()
                }}
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}