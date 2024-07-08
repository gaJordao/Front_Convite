import axios from "axios";
import { useCookie } from "../hooks";
import { jwtDecode } from "jwt-decode";

type AuthUsuariotype = {

};

type ResponseType = {
  access: string
  refresh: string
}


interface AuthProvider {
  usuario: null | AuthUsuariotype;
  mensagem: null | string;
  authToken: null | string;
  signin(username: string, password: string): Promise<void>;
  signout(): Promise<void>;
}

const Backend_API: string = import.meta.env.VITE_BACKEND_URL;

// AuthProvider onde valida o login do usuário e faz o Logout

export const AuthProvider: AuthProvider = {
  usuario: null,
  mensagem: null,
  authToken: null,
  async signin(username: string, password: string) {
    const { setCookie } = useCookie();

    await axios
      .post(`${Backend_API}/auth/jwt/create`, {
        username,
        password
      })
      .then((response) => {
        if (response.status === 200) {
          const data: ResponseType = response.data

          AuthProvider.usuario = jwtDecode(data.access)
          AuthProvider.authToken = data.access
          setCookie("access_token", data.access, 200)
          setCookie("refresh_token", data.refresh, 200);
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.error('Erro ao fazer login:', error);
        AuthProvider.mensagem = 'Erro ao fazer login. Verifique suas credenciais e tente novamente.'
      })
  },

  async signout() {
    const { deleteAllCookies } = useCookie();
    await new Promise((r) => setTimeout(r, 500)); // Fake delay
    deleteAllCookies();

    window.location.href = "/login";
  },
};
