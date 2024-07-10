import axios from "axios";
import { useState } from "react";
import { useCookie } from "../hooks";

type CadastrarPresente = {
  nome: string;
  imagemUrl: string;
  descricao: string;
  valor: number;
  qtdPessoa: number;
};

export function CadastroPresente() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { getCookie } = useCookie();
  const cookieToken = getCookie("access_token");
  const [error, setError] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [imagemUrl, setImageUrl] = useState<string>("");
  const [valor, setValor] = useState<number>(1);
  const [qtdPessoa, setQtdPessoa] = useState<number>(1);

  async function handleCadastrarPresente() {
    const data: CadastrarPresente = {
      nome,
      descricao,
      imagemUrl,
      valor,
      qtdPessoa,
    };

    await axios
      .post(`${backendUrl}/api/v1/add/item/`, data, {
        headers: {
          Authorization: `Bearer ${cookieToken}`,
        },
      })
      .then((response) => {
        if (response) {
          setError("");
          setNome("");
          setDescricao("")
          setImageUrl("")
          setValor(0)
          setQtdPessoa(1)
        }
      })
      .catch((error) => {
        error && setError("Não foi possivel cadastrar presente!");
      });
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-3/4">
        <label
          htmlFor="acompanhante-cadastro"
          className="block text-sm font-medium text-gray-900 dark:text-white"
        >
          Nome do presente
        </label>
        <div className="flex">
          <input
            type="text"
            id="nome"
            onChange={(e) => setNome(e.target.value)}
            value={nome}
            className="rounded-none rounded-e-lg block flex-1 min-w-0 w-full text-sm p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focusring-blue-500 focusborder-blue-500"
            placeholder="Nome"
            required
          />
        </div>
      </div>

      <div className="w-3/4">
        <label
          htmlFor="acompanhante-cadastro"
          className="block text-sm font-medium text-gray-900 dark:text-white"
        >
          Descrição
        </label>
        <div className="flex">
          <textarea
            id="descricao"
            onChange={(e) => setDescricao(e.target.value)}
            value={descricao}
            className="rounded-none rounded-e-lg block flex-1 min-w-0 w-full text-sm p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focusring-blue-500 focusborder-blue-500"
            placeholder="descricao"
            required
          />
        </div>
      </div>

      <div className="w-3/4">
        <label
          htmlFor="acompanhante-cadastro"
          className="block text-sm font-medium text-gray-900 dark:text-white"
        >
          Imagem URL
        </label>
        <div className="flex">
          <input
            type="url"
            id="imagemUrl"
            onChange={(e) => setImageUrl(e.target.value)}
            value={imagemUrl}
            className="rounded-none rounded-e-lg block flex-1 min-w-0 w-full text-sm p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focusring-blue-500 focusborder-blue-500"
            placeholder="Imagem URL"
            required
          />
        </div>
      </div>

      <div className="w-3/4">
        <label
          htmlFor="acompanhante-cadastro"
          className="block text-sm font-medium text-gray-900 dark:text-white"
        >
          Valor do Presente
        </label>
        <div className="flex">
          <input
            type="number"
            id="valor"
            onChange={(e) => setValor(Number(e.target.value))}
            value={valor}
            className="rounded-none rounded-e-lg block flex-1 min-w-0 w-full text-sm p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focusring-blue-500 focusborder-blue-500"
            placeholder="Valor do presente"
            min={1}
            required
          />
        </div>
      </div>

      <div className="w-3/4">
        <label
          htmlFor="acompanhante-cadastro"
          className="block text-sm font-medium text-gray-900 dark:text-white"
        >
          Quantidade de pessoas
        </label>
        <div className="flex">
          <input
            type="number"
            id="qtdPessoa"
            onChange={(e) => setQtdPessoa(Number(e.target.value))}
            value={qtdPessoa}
            className="rounded-none rounded-e-lg block flex-1 min-w-0 w-full text-sm p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focusring-blue-500 focusborder-blue-500"
            placeholder="Quantidade de pessoas"
            min={1}
            required
          />
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="button"
        onClick={handleCadastrarPresente}
        className="bg-cinza-claro hover:bg-gray-600 text-white font-bold py-2 px-4 rounded w-[80%]  sm:w-[70%] focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 transition-colors duration-300"
      >
        Cadastrar presente
      </button>
    </div>
  );
}
