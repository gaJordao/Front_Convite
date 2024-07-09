import { NavLink } from "react-router-dom";
import { DecodedTokenType, ItemListaType } from "../pages";
import { useCookie } from "../hooks";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface PresenteItemProps {
  data: ItemListaType;
}

export function PresenteItem ({data}: PresenteItemProps) {
    const {getCookie} = useCookie()
    const cookieToken = getCookie("access_token")

    const [decodedToken, setDecodedToken] = useState<DecodedTokenType>()

    function handleDecodedToken() {
      const decoded: DecodedTokenType = jwtDecode(cookieToken)

      setDecodedToken(decoded)
    }

    // const valorTotalDoado = data.doacoes.reduce((prev, curr) => {
    //   return prev + curr.valor
    // }, 0)

    const novoValor = data.valor  / data.qtdPessoa

    const filterDoacao = data.doacoes.filter((item) => item.usuario.id === decodedToken?.user_id)

    useEffect(() => {
      if(cookieToken)
        handleDecodedToken();
    }, [cookieToken])

    return (
      <div
        key={data.id}
        className={`
          max-w-md mx-auto bg-[#1f2336] rounded-xl shadow-md overflow-hidden md:max-w-2xl
          ${data.qtdPessoa === data.doacoes.length && "hidden"} ${filterDoacao.length > 0 && "hidden"}
          `}
      >
        <div className="md:flex">
          <div className="md:shrink-0 m-auto">
            <img
              className="max-h-48 w-full object-contain md:h-full md:w-48 m-auto"
              src={data.imagemUrl}
              alt={data.descricao}
            />
          </div>
          <div className="p-4 flex flex-col justify-between gap-4">
            <div className="flex flex-col">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {data.nome}
              </div>
              <p className="block mt-1 text-lg leading-tight font-medium text-slate-300 hover:underline">
                {data.descricao}
              </p>
              <div className="mt-2 text-white">
                <strong>Valor do presente: </strong>
                <span>
                  {novoValor.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}{" "}
                  - {data.doacoes.length}
                </span>
              </div>
            </div>

            <NavLink
              to={`${data.id}`}
              className=" bg-cinza-claro hover:bg-[#505057] p-3 mt-2 rounded-md text-lg text-center font-medium text-ellipsis w-full"
            >
              Presentear
            </NavLink>
          </div>
        </div>
      </div>
    );
}