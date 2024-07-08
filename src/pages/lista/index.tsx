import { useEffect, useState } from "react";
import { ItemListaType } from "../type";
import axios from "axios";
import { useCookie } from "../../hooks";

export function ListaPage() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { getCookie } = useCookie();
  const cookieToken = getCookie("access_token");
  const [dataItem, setDataItem] = useState<ItemListaType[]>([]);

  async function handleGetListaItem() {
    await axios
      .get(`${backendUrl}/api/v1/lista/itens/`, {
        headers: {
          Authorization: `Bearer ${cookieToken}`,
        },
      })
      .then((response) => {
        const data: ItemListaType[] = response.data;
        setDataItem(data);
      })
      .catch((error) => {
        console.error("Não foi possivel encontrar lista de itens", error);
      })
      .finally(() => {
        console.log("Final da busca de itens");
      });
  }

  useEffect(() => {
    handleGetListaItem();
  }, []);

  return (
    <main className="h-[600px] overflow-auto">
      <div className="flex flex-col items-center justify-center m-5 text-3xl gap-2">
        <h1 className="text-3xl text-ellipsis text-balance font-semibold leading-tight  font-cantora">
          Lista de Presentes
        </h1>

        <hr className="w-1/3 h-2"/>
      </div>

      <div className="grid max-sm:grid-cols-1 grid-cols-3 gap-4 px-4">
        {dataItem.map((item) => {
          return (
            <div
              key={item.id}
              className="max-w-md mx-auto bg-[#1f2336] rounded-xl shadow-md overflow-hidden md:max-w-2xl"
            >
              <div className="md:flex">
                <div className="md:shrink-0 m-auto">
                  <img
                    className="max-h-48 w-full object-contain md:h-full md:w-48 m-auto"
                    src={item.imagemUrl}
                    alt={item.descricao}
                  />
                </div>
                <div className="p-4 flex flex-col justify-between gap-4">
                  <div className="flex flex-col">
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    Descrição
                  </div>
                  <p className="block mt-1 text-lg leading-tight font-medium text-slate-300 hover:underline">
                    {item.descricao}
                  </p>
                  <div className="mt-2 text-white">
                    <strong>Valor do presente: </strong>
                    <span>
                      {item.valor.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </div>
                  </div>

                  <button className="mt-2 bg-cinza-claro hover:bg-[#505057] p-3 rounded-md text-lg font-medium text-ellipsis">
                      Presentear
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
