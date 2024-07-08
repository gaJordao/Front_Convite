import { LoaderFunctionArgs, RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
import { ErrorPage, HomePage, LayoutPage, ListaPage, LoginPage } from "../pages";
import { CadastroPage } from "../pages/cadastro";
import { useCookie } from "../hooks";
import { AuthProvider } from "./Auth";

const router = createBrowserRouter([
  {
    id: "login",
    path: "/login",
    loader: loginLoader,
    Component: LoginPage,
    errorElement: <ErrorPage />,
  },
  {
    path: "/logout",
    async action() {
      await AuthProvider.signout();
      return redirect("/");
    },
  },
  {
    id: "cadastrar",
    path: "/cadastrar",
    loader: loginLoader,
    Component: CadastroPage,
    errorElement: <ErrorPage />,
  },
  {
    id: "root",
    path: "/",
    loader() {
      return { usuario: "Luis" };
    },
    Component: LayoutPage,
    children: [
      {
        path: "/",
        Component: HomePage,
        // loader: protectedLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "/presente",
        Component: ListaPage,
        loader: protectedLoader,
        errorElement: <ErrorPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export function App() {
  return <RouterProvider router={router} fallbackElement={<p>Carregando...</p>} />;
}

async function loginLoader() {
  const {getCookie} = useCookie()
  const cookieToken = getCookie("access_token")

  if (cookieToken) {
    window.location.href = "/";
  }
  return null;
}

// Loader: protectedLoader  Proteje qualquer rota
// Se a rota não tiver esse loader qualquer usuário pode acessar a aba ( Mesmo sem fazer o login )

function protectedLoader({ request }: LoaderFunctionArgs) {
  const {getCookie} = useCookie()
  const cookieToken = getCookie("access_token")

  if (!cookieToken) {
    let params = new URLSearchParams();
    params.set("", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  return null;
}