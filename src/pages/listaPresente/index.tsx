import { useEffect, useState } from "react";
import { ItemListaType } from "../type";
import axios from "axios";
import { useCookie } from "../../hooks";
import { PresenteItem } from "../../components";

export function ListaPresentePage() {
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
          return <PresenteItem data={item} key={item.id}/>
        })}
      </div>
    </main>
  );
}

