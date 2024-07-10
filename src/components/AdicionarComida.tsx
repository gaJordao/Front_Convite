import axios from "axios";
import { useState } from "react";
import { useCookie } from "../hooks";
import { DecodedTokenType } from "../pages";
import { jwtDecode } from "jwt-decode";

type CadastrarComidaType = {
  nome: string;
  idUsuario: React.Key;
};

export function AdicionarComida() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { getCookie } = useCookie();
  const cookieToken = getCookie("access_token");
  const [error, setError] = useState<string>("");
  const [nome, setNome] = useState<string>("");

  async function handleCadastrarComida() {
    if (!nome) {
      setError("Nome para comida inválida!");
    } else {
      const decodedToken: DecodedTokenType = jwtDecode(cookieToken);

      const data: CadastrarComidaType = {
        nome,
        idUsuario: decodedToken.user_id,
      };

      await axios
        .post(`${backendUrl}/api/v1/comida/tipica/add/`, data, {
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
          error && setError("Não foi possivel adicionar Comida tipica!");
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
          Comida tipica
        </label>
        <div className="flex">
          <input
            type="text"
            id="comida-tipica"
            onChange={(e) => setNome(e.target.value)}
            value={nome}
            className="rounded-none rounded-e-lg block flex-1 min-w-0 w-full text-sm p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focusring-blue-500 focusborder-blue-500"
            placeholder="Comida Tipica"
          />
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="button"
        onClick={handleCadastrarComida}
        className="bg-cinza-claro hover:bg-gray-600 text-white font-bold py-2 px-4 rounded w-[80%]  sm:w-[70%] focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 transition-colors duration-300"
      >
        Adicionar comida típica
      </button>
    </div>
  );
}
