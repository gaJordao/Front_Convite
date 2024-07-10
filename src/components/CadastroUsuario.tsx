import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

type FormDataType = {
  nome: string;
  email: string;
  password: string;
  status: boolean;
};

export function CadastroUsuario() {
  const schema = z.object({
    nome: z.string().max(60, "Máximo 60 caracteres").optional(),
    email: z
      .string()
      .email("Email inválido")
      .min(5, "Mínimo 5 caracteres")
      .max(50, "Máximo 50 caracteres")
      .optional(),
    password: z
      .string()
      .min(8, "Mínimo 8 caracteres")
      .max(20, "Máximo 20 caracteres")
      .optional(),
    status: z.boolean().optional(),
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: zodResolver(schema),
  });

  const [error, setError] = useState<string>("");

  const handleCriarUsuario = async (data: FormDataType) => {
    await axios
      .post("http://127.0.0.1:8000/api/v1/add/usuario/", {
        username: data.nome,
        email: data.email,
        password: data.password,
        status: data.status || false,
      })
      .then((response) => {
        if (response) {
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          // Aqui você pode acessar os detalhes da resposta de erro do backend
          const { data } = error.response;
          // Exemplo de tratamento específico para mensagens de erro de senha
          if (data.password) {
            setError("Erro ao cadastrar: " + data.password.join(". "));
          } else {
            setError(
              "Erro ao cadastrar. Verifique seus dados e tente novamente."
            );
          }
        } else {
          console.error("Erro ao cadastrar:", error);
          setError(
            "Erro ao cadastrar. Verifique seus dados e tente novamente."
          );
        }
      });
  };

  return (
    <form
      className="flex flex-col items-center justify-center gap-[4rem]"
      onSubmit={handleSubmit(handleCriarUsuario)}
    >
      <div className="flex flex-col gap-6 items-center w-[100%]">
        <input
          className="bg-jumbo rounded-[0.6rem] h-13 pl-3 pt-3 pb-3 duration-300 text-white outline-none w-[80%] sm:w-[70%] hover:bg-jumboHover"
          type="text"
          {...register("nome")}
          placeholder="Nome"
          required
        />
        {errors.nome && <p className="text-red-500">{errors.nome.message}</p>}

        <input
          className="bg-jumbo rounded-[0.6rem] h-13 pl-3 pt-3 pb-3 duration-300 text-white outline-none w-[80%] sm:w-[70%] hover:bg-jumboHover"
          type="email"
          {...register("email")}
          placeholder="Email"
          required
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          className="bg-jumbo rounded-[0.6rem] h-13 pl-3 pt-3 pb-3 duration-300 text-white outline-none w-[80%] sm:w-[70%] hover:bg-jumboHover"
          type="password"
          {...register("password")}
          placeholder="Senha"
          required
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <div className="flex items-center px-4 border border-gray-200 rounded dark:border-gray-700">
          <input
            type="checkbox"
            {...register("status")}
            id="opcao"
            className="w-4 h-4 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
          />
          <label
            htmlFor="opcao"
            className="w-full py-4 ms-2 text-sm font-medium text-gray-300"
          >
            Confirmar sua prensença
          </label>
        </div>
      </div>

      <div className=" flex flex-col items-center gap-4 w-[100%]">
        <button
          type="submit"
          className="bg-cinza-claro hover:bg-gray-600 text-white font-bold py-2 px-4 rounded w-[80%]  sm:w-[70%] focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 transition-colors duration-300 text-center  "
        >
          Cadastrar
        </button>
      </div>
      <div className="text-center">
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </form>
  );
}
