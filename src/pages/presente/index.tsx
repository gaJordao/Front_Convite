import { CaretLeft } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useCookie } from "../../hooks";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { DecodedTokenType, ItemListaType, QrcodeResponseType } from "../type";
import { QRCode } from "react-qrcode-logo";
import { jwtDecode } from "jwt-decode";


export function PresentePage() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { id } = useParams();

  const { getCookie } = useCookie();

  const navigate = useNavigate();
  const cookieToken = getCookie("access_token");
  const [dataPresente, setDataPresente] = useState<ItemListaType>();
  const [dataQrcodePix, setDataQrcodePix] = useState<QrcodeResponseType>();

  async function handleGetItem() {
    await axios
      .get(`${backendUrl}/api/v1/item/${id}`, {
        headers: {
          Authorization: `Bearer ${cookieToken}`,
        },
      })
      .then((res) => {
        const data: ItemListaType = res.data;

        setDataPresente(data);
      })
      .catch((error) => {
        console.error("Não foi possivel buscar presente", error);
      });
  }

  async function handleGetQrcodePix() {
    if (dataPresente) {

  const novoValor = dataPresente.valor / dataPresente.qtdPessoa

      const valor = novoValor
        .toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
        .replace(/\./g, "")
        .replace(",", ".");

      await axios
        .get(`${backendUrl}/api/v1/pagamento/pix`, {
          params: {
            nome: "ISABELA MANCINI DA SILVA",
            chavepix: "isabelamancini903@gmail.com",
            valor: `${valor}`,
            cidade: "SUMARE",
            descricao: "CONVITE",
          },
          headers: {
            Authorization: `Bearer ${cookieToken}`,
          },
        })
        .then((res) => {
          const data: QrcodeResponseType = res.data;

          setDataQrcodePix(data);
        })
        .catch((error) => {
          console.error("Não foi possivel buscar chave copia e cola", error);
        });
    }
  }

  async function handleConfirmarPagamento() {
    const usuarioToken: DecodedTokenType = jwtDecode(cookieToken);

    if (dataPresente) {

    const data = {
      idUsuario: usuarioToken.user_id,
      idItem: Number(id),
      comprovanteUrl: "Comprovante a ser enviado para isa",
      valor: dataPresente.valor / dataPresente.qtdPessoa,
    };

    await axios
      .post(`${backendUrl}/api/v1/doar/`, data, {
        headers: {
          Authorization: `Bearer ${cookieToken}`,
        },
      })
      .then((res) => {
        if (res.data) {
          alert("Pagamento confirmado!");

          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Erro ao confirmar pagamento", error);
      });
    }
  }

  useEffect(() => {
    handleGetItem();
  }, [id]);

  useEffect(() => {
    handleGetQrcodePix();
  }, [dataPresente]);

  if (dataPresente)
    return (
      <main className="flex justify-center items-center">
        <section className="py-8 b md:py-16  antialiased">
          <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
              <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
                <img className="w-full" src={dataPresente.imagemUrl} alt="" />
              </div>

              <div className="mt-6 sm:mt-8 lg:mt-0">
                <h1 className="text-xl font-semibold sm:text-2xl text-white">
                  {dataPresente.nome}
                </h1>
                <p className="mt-6 text-gray-400 break-words text-start">
                  {dataPresente.descricao}
                </p>
                <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                  <p className="text-2xl font-extrabold  sm:text-3xl text-white">
                    {(dataPresente.valor / dataPresente.qtdPessoa).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>

                <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                  <button
                    title=""
                    className="flex items-center justify-center py-2.5 px-5 gap-2 text-sm font-medium focus:outline-none rounded-lg border  focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700"
                    role="button"
                    onClick={handleConfirmarPagamento}
                  >
                    Confirmar Pagamento
                  </button>

                  <a
                    href="/presente"
                    title=""
                    className="text-white mt-4 sm:mt-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  focus:outline-none flex items-center justify-center"
                    role="button"
                  >
                    <CaretLeft size={24} />
                    Lista de Presentes
                  </a>
                </div>

                <hr className="my-6 md:my-8 border-gray-200" />

                {dataQrcodePix && (
                  <>
                    <div className="flex flex-col justify-center items-center">
                      <QRCode
                        value={dataQrcodePix.payload}
                        logoPadding={5}
                        id={"qrcode"}
                      />
                    </div>

                    <p
                      onClick={() =>
                        navigator.clipboard.writeText(dataQrcodePix.payload)
                      }
                      className="mt-6 text-gray-400 break-words text-center"
                    >
                      {dataQrcodePix.payload}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    );
}
