import React, { useState } from "react";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

export function CadastroPage() {
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
      .min(4, "Mínimo 4 caracteres")
      .max(20, "Máximo 20 caracteres")
      .optional(),
    status: z.boolean().optional(), // Adicionado para validar o campo status
  });

  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const token = await axios.post("http://127.0.0.1:8000/auth/jwt/create", {
        'username': 'admin',
        'password': 'admin'
      });

      const { access, refresh } = token.data;

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      const response = await axios.post("http://127.0.0.1:8000/api/v1/add/usuario/",
        {
          username: data.nome,
          email: data.email,
          password: data.password, 
          status: data.status || false,
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      console.log(`Usuário criado ${access}`);

      // Redireciona após cadastro bem-sucedido
      navigate("/");

    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      setError("Erro ao cadastrar. Verifique seus dados e tente novamente.");
    }
  };

  return (
    <main className="sm:bg-desktop_clean bg-mobile_clean bg-100% bg-no-repeat bg-center min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center bg-escuro rounded-[2rem] drop-shadow-2xl gap-[4rem] w-[22rem] h-[42rem] sm:w-[30rem]"
      >
        <h1 className="text-[2.5rem] font-bold mt-[-3rem] text-gray-300">
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

          <input
            className="bg-jumbo rounded-[0.6rem] h-13 pl-3 pt-3 pb-3 duration-300 text-white outline-none w-[80%] sm:w-[70%] hover:bg-jumboHover"
            type="email"
            {...register("email")}
            placeholder="Email"
            required
          />

          <input
            className="bg-jumbo rounded-[0.6rem] h-13 pl-3 pt-3 pb-3 duration-300 text-white outline-none w-[80%] sm:w-[70%] hover:bg-jumboHover"
            type="password"
            {...register("password")}
            placeholder="Senha"
            required
          />

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
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </main>
  );
}
