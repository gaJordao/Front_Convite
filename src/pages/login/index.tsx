import React, { useState } from "react";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  nome: z.string().max(60, 'Máximo 60 caracteres').optional(),
  email: z.string().email('Email inválido').min(5, 'Mínimo 5 caracteres').max(50, 'Máximo 50 caracteres').optional(),
  password: z.string().min(4, 'Mínimo 4 caracteres').max(20, 'Máximo 20 caracteres').optional(),
});

export function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://gajordao.pythonanywhere.com/auth/jwt/create', {
        username: data.nome,
        password: data.password
      });

      console.log(response.data);

      if (response.status === 200) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        navigate('/');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
    }
  };

  return (
    <main className="sm:bg-desktop_clean bg-mobile_clean bg-100% bg-no-repeat bg-center min-h-screen flex items-center justify-center">
      <form
        className="flex flex-col items-center justify-center bg-escuro rounded-[2rem] drop-shadow-2xl gap-[4rem] h-[36rem] w-[22rem] sm:w-[30rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-[2.5rem] font-bold mt-[-3rem] text-gray-300 font-cantora">
          Realizar Login
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
            Logar
          </button>
          <a className="text-white underline" href="/cadastrar">
            Cadastrar
          </a>
          {error && <p className="text-red-500 mt-4 text-center pl-6 pr-6">{error}</p>}
        </div>
      </form>
    </main>
  );
}
