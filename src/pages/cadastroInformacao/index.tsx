import { AdicionarAcompanhante, AdicionarComida } from "../../components";
import { CadastroPresente } from "../../components/CadastroPresente";

type ActionType = "cadastro-acompanhante" | "cadastro-presente" | "comida-tipica";

type TituloMensage = {
  [key in ActionType]?: string;
};

const titulo: TituloMensage = {
  "cadastro-acompanhante": "Cadastro de acompanhante",
  "comida-tipica": "Cadastro de comida tipica",
  "cadastro-presente": "Cadastrar presente",
};

const getStatusMensage = (action: ActionType): string => titulo[action] || "";

interface CadastroInformacaoProps {
  action: ActionType;
}

export function CadastroInformacao({ action }: CadastroInformacaoProps) {
  return (
    <main className="sm:bg-desktop_clean bg-mobile_clean bg-100% bg-no-repeat bg-center min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-[4rem] bg-escuro rounded-[2rem] drop-shadow-2xl text-wrap  w-[22rem] h-[42rem] sm:w-[27rem]">
        <h1 className="text-[2.5rem] text-center font-bold mt-[3rem] text-gray-300 font-cantora px-4">
          {getStatusMensage(action)}
        </h1>

        <div>
          {action === "cadastro-acompanhante" && <AdicionarAcompanhante />}
          {action === "comida-tipica" && <AdicionarComida />}
          {action === "cadastro-presente" && <CadastroPresente />}
        </div>
      </div>
    </main>
  );
}
