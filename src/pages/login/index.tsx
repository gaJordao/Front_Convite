import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate} from "react-router-dom";
import { AuthProvider } from "../../auth";

const schema = z.object({
  nome: z.string().max(60, "Máximo 60 caracteres").optional(),
  // email: z.string().email('Email inválido').min(5, 'Mínimo 5 caracteres').max(50, 'Máximo 50 caracteres').optional(),
  password: z
    .string()
    .min(4, "Mínimo 4 caracteres")
    .max(20, "Máximo 20 caracteres")
    .optional(),
});

type FormValuesType = {
  nome: string;
  // email: string;
  password: string;
};

export function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesType>({
    resolver: zodResolver(schema),
  });

  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const onSubmit = async (data: FormValuesType) => {
  if (!data.nome) {
    return AuthProvider.mensagem = "Você deve fornecer um nome de usuário para fazer login"
  }

  try {

    setIsLoggingIn(true)

    await AuthProvider.signin(data.nome, data.password);

    setTimeout(() => {
      setIsLoggingIn(false)
    }, 300)
  } catch (error) {
    return {
      error: "Tentativa de login inválida",
    };
  }

  return navigate("/")

    //   try {
    //     const response = await axios.post(`${backendUrl}/auth/jwt/create`, {
    //       username: data.nome,
    //       // email: data.email,
    //       password: data.password,
    //     }, {
    //       headers: {
    //         'Content-Type': 'application/json',
    //       }
    //     });

    //     if (response.status === 200) {
    //       const data: ResponseType = response.data

    //       setCookie("access_token", data.access, 200)
    //       setCookie("refresh_token", data.refresh, 200);

    //       navigate('/');
    //     }
    //   } catch (error) {
    //     console.error('Erro ao fazer login:', error);
    //     setError('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
    //   }
  };

  return (
    <main className="sm:bg-desktop_clean bg-mobile_clean bg-100% bg-no-repeat bg-center min-h-screen flex items-center justify-center">
      <form
        className="flex flex-col items-center justify-center bg-escuro rounded-[2rem] drop-shadow-2xl gap-[4rem] h-[40rem] w-[22rem] sm:w-[30rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-[2.5rem] font-bold mt-[-3rem] text-gray-300">
          Logar
        </h1>

        <div className="flex flex-col gap-6 items-center w-[100%]">
          <input
            className="bg-jumbo rounded-[0.6rem] h-13 pl-3 pt-3 pb-3 duration-300 text-white outline-none w-[80%] sm:w-[70%] hover:bg-jumboHover"
            type="text"
            {...register("nome")}
            placeholder="Nome"
          />
          {errors.nome && (
            <p className="text-red-500">{errors.nome.message}</p>
          )}

          {/* <input
            className="bg-jumbo rounded-[0.6rem] h-13 pl-3 pt-3 pb-3 duration-300 text-white outline-none w-[80%] sm:w-[70%] hover:bg-jumboHover"
            type="email"
            {...register('email')}
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">{errors?.email.message}</p>} */}

          <input
            className="bg-jumbo rounded-[0.6rem] h-13 pl-3 pt-3 pb-3 duration-300 text-white outline-none w-[80%] sm:w-[70%] hover:bg-jumboHover"
            type="password"
            {...register("password")}
            placeholder="Senha"
          />
          {errors.password && (
            <p className="flex text-center text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex flex-col items-center gap-4 w-[100%]">
          <button
            type="submit"
            className="bg-cinza-claro hover:bg-gray-600 text-white font-bold py-2 px-4 rounded w-[80%] sm:w-[70%] focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 transition-colors duration-300"
          >
            {isLoggingIn ? "Carregando!" : "Entrar"}
          </button>
          <a className="text-white underline" href="/cadastrar">
            Cadastrar
          </a>
          {AuthProvider.mensagem && (
            <p className="text-red-500 mt-4 text-center pl-6 pr-6">{AuthProvider.mensagem}</p>
          )}
        </div>
      </form>
    </main>
  );
}
