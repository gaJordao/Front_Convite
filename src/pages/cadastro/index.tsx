import React, { useState, useEffect } from "react";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

interface FormData {
  nome: string;
  email?: string;
  password?: string;
  status?: boolean;
}

export function CadastroPage() {
  const schema = z.object({
    nome: z.string().max(60, "Máximo 60 caracteres").optional(),
    email: z.string().email("Email inválido").min(5, "Mínimo 5 caracteres").max(50, "Máximo 50 caracteres").optional(),
    password: z.string().min(8, "Mínimo 8 caracteres").max(20, "Máximo 20 caracteres").optional(),
    status: z.boolean().optional(),
  });

  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null); // State para armazenar o token de acesso
  const [usuarios, setUsuarios] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const tokenResponse = await axios.post<{ access: string }>(
          "https://gajordao.pythonanywhere.com/auth/jwt/create",
          {
            username: "admin",
            password: "admin",
          }
        );

        const { access } = tokenResponse.data;
        localStorage.setItem("access_token", access);
        setAccessToken(access);
      } catch (error) {
        console.error("Erro ao obter token:", error);
        setError("Erro ao carregar usuários. Tente novamente mais tarde.");
      }
    };

    fetchAccessToken();
  }, []);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        if (accessToken) {
          const response = await axios.get<any[]>(
            "https://gajordao.pythonanywhere.com/api/v1/usuarios/",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          setUsuarios(response.data);
        }
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
        setError("Erro ao carregar usuários. Tente novamente mais tarde.");
      }
    };

    fetchUsuarios();
  }, [accessToken]); // Executa sempre que o accessToken for alterado

  const onSubmit = async (data: FormData) => {
    try {
      const usernameExists = usuarios.some((user) => user.username === data.nome);
  
      if (usernameExists) {
        setError("Nome de usuário já está em uso. Por favor, escolha outro.");
        return;
      }
  
      const createUserResponse = await axios.post(
        "https://gajordao.pythonanywhere.com/api/v1/add/usuario/",
        {
          username: data.nome,
          email: data.email,
          password: data.password,
          status: data.status || false,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      console.log("Usuário criado:", createUserResponse.data);
      navigate("/");
  
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Aqui você pode acessar os detalhes da resposta de erro do backend
        const { data } = error.response;
        // Exemplo de tratamento específico para mensagens de erro de senha
        if (data.password) {
          setError("Erro ao cadastrar: " + data.password.join(". "));
        } else {
          setError("Erro ao cadastrar. Verifique seus dados e tente novamente.");
        }
      } else {
        console.error("Erro ao cadastrar:", error);
        setError("Erro ao cadastrar. Verifique seus dados e tente novamente.");
      }
    }
  };
  

  return (
    <main className="sm:bg-desktop_clean bg-mobile_clean bg-100% bg-no-repeat bg-center min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center bg-escuro rounded-[2rem] drop-shadow-2xl gap-[4rem] w-[22rem] h-[42rem] sm:w-[30rem]"
      >
        <h1 className="text-[2.5rem] font-bold mt-[-3rem] text-gray-300 font-cantora">
          Cadastro
        </h1>

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
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          <div className="flex items-center w-[80%] sm:w-[70%] rounded-[0.6rem] duration-300 text-white">
            <input
              className="mr-3 outline-none"
              type="checkbox"
              {...register("status")}
              id="opcao"
            />
            <label htmlFor="opcao">Vou comparecer</label>
          </div>
        </div>

        <div className=" flex flex-col items-center gap-4 w-[100%]">
          <button
            type="submit"
            className="bg-cinza-claro hover:bg-gray-600 text-white font-bold py-2 px-4 rounded w-[80%]  sm:w-[70%] focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 transition-colors duration-300"
          >
            Cadastrar
          </button>
        </div>
        <div className="text-center">
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </form>
    </main>
  );
}
