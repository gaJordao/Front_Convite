import { LoaderFunctionArgs, RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
import { CadastroPage, ErrorPage, HomePage, LayoutPage, ListaPresentePage, LoginPage, PresentePage } from "../pages";
import { useCookie } from "../hooks";
import { AuthProvider } from "./Auth";
import { CadastroInformacao } from "../pages/cadastroInformacao";

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
    id: "cadastro",
    path: "/cad/",
    Component: LayoutPage,
    children: [
      {
        path: "comida",
        loader: protectedLoader,
        element: <CadastroInformacao action="comida-tipica" />,
        errorElement: <ErrorPage />,
      },
      {
        path: "acompanhante",
        loader: protectedLoader,
        element: <CadastroInformacao action="cadastro-acompanhante" />,
        errorElement: <ErrorPage />,
      },
      {
        path: "presente",
        loader: protectedLoader,
        element: <CadastroInformacao action="cadastro-presente" />,
        errorElement: <ErrorPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    id: "root",
    path: "/",
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
        Component: ListaPresentePage,
        loader: protectedLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "/presente/:id",
        Component: PresentePage,
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