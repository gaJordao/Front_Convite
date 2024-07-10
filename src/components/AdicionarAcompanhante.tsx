import axios from "axios";
import { useState } from "react";
import { useCookie } from "../hooks";
import { DecodedTokenType } from "../pages";
import { jwtDecode } from "jwt-decode";

type CadastrarAcompanhanteType = {
  nome: string;
  idUsuario: React.Key;
};

export function AdicionarAcompanhante() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { getCookie } = useCookie();
  const cookieToken = getCookie("access_token");
  const [error, setError] = useState<string>("");
  const [nome, setNome] = useState<string>("");

  async function handleCadastrarAcompanhante() {
    if (!nome) {
      setError("Nome para acompanhante inválido!");
    } else {
      const decodedToken: DecodedTokenType = jwtDecode(cookieToken);

      const data: CadastrarAcompanhanteType = {
        nome,
        idUsuario: decodedToken.user_id,
      };

      await axios
        .post(`${backendUrl}/api/v1/acompanhantes/add/`, data, {
          headers: {
            Authorization: `Bearer ${cookieToken}`,
          },
        })
        .then((response) => {
          if (response) {
            setError("");
            setNome("");
          }
        })
        .catch((error) => {
          error && setError("Não foi possivel adicionar acompanhante!");
        });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-[2rem]">
      <div className="w-3/4">
        <label
          htmlFor="acompanhante-cadastro"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Acompanhante
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm border border-e-0  rounded-s-md bg-gray-600 text-gray-400 border-gray-600">
            <svg
              className="w-4 h-4 text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
          </span>
          <input
            type="text"
            id="acompanhante-cadastro"
            onChange={(e) => setNome(e.target.value)}
            value={nome}
            className="rounded-none rounded-e-lg block flex-1 min-w-0 w-full text-sm p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focusring-blue-500 focusborder-blue-500"
            placeholder="Acompanhante"
          />
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="button"
        onClick={handleCadastrarAcompanhante}
        className="bg-cinza-claro hover:bg-gray-600 text-white font-bold py-2 px-4 rounded w-[80%]  sm:w-[70%] focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 transition-colors duration-300"
      >
        Adicionar acompanhante
      </button>
    </div>
  );
}
