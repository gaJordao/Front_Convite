import { CadastroUsuario } from "../../components";


export function CadastroPage() {
  return (
    <main className="sm:bg-desktop_clean bg-mobile_clean bg-100% bg-no-repeat bg-center min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-[4rem] bg-escuro rounded-[2rem] drop-shadow-2xl  w-[22rem] h-[42rem] sm:w-[30rem]">
        <h1 className="text-[2.5rem] text-center font-bold mt-[3rem] text-gray-300 font-cantora">
          Cadastro
        </h1>
          <CadastroUsuario />
      </div>
    </main>
  );
}