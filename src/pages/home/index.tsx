import {  useState } from "react";
import { ConfeteComponent } from "../../components";
import { useNavigate } from "react-router-dom";

export function HomePage() {

  const [isVisible, setIsVisible] = useState<boolean>(false)
  const navigate = useNavigate()

  function handleParticiar () {
    setIsVisible(true)

    setTimeout(() => {
      navigate("/lista")
    }, 4000)
  }


  return (
    <main className="sm:bg-convite_desktop bg-convite_mobile bg-100% bg-no-repeat bg-center min-h-screen w-full text-white">
      <div className="flex justify-center items-center h-screen">
        <div className="z-20">{isVisible && <ConfeteComponent isVisible={isVisible}/>}</div>

        <div className="sm:flex-1"></div>

        <div className="sm:flex-1 flex flex-col justify-center items-center text-center h-full gap-4">
          <h1 className="text-6xl text-wrap font-medium text-ellipsis">
            Chá de Casa nova
          </h1>
          <span className="text-4xl font-thin text-ellipsis text-wrap">
            Isabela e Pablo
          </span>

          <p className="w-[80%] text-xl font-normal">
            É com grande alegria que convidamos você para o nosso Chá de Casa
            Nova. Sua presença tornará este momento ainda mais especial!
          </p>

          <div>
            <span>20 de Julho</span>
            <hr />
            <span>Sábado Às 14h</span>
          </div>

          <button className="bg-blue-400 w-60 h-9 rounded-md text-center" onClick={handleParticiar}>
            {isVisible ? "Confetes!" : "Quero Participar!"}
          </button>
        </div>
        
      </div>
    </main>
  );
}
