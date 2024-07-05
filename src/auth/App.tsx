import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
import { ErrorPage, HomePage, LayoutPage, ListaPage } from "../pages";
import { LoginPage } from "../pages/login";
import { CadastroPage } from "../pages/cadastro";

const router = createBrowserRouter([
  {
    id: "login",
    path: "/login",
    // action: loginAction,
    // loader: loginLoader,
    Component: LoginPage,
    errorElement: <ErrorPage />,
  },
  {
    id: "cadastrar",
    path: "/cadastrar",
    // action: loginAction,
    // loader: loginLoader,
    Component: CadastroPage,
    errorElement: <ErrorPage />,
  },
  {
    path: "/logout",
    async action() {
      // await AuthProvider.signout();
      return redirect("/");
    },
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
        path: "/lista",
        Component: ListaPage,
        // loader: protectedLoader,
        errorElement: <ErrorPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export function App() {
  return <RouterProvider router={router} fallbackElement={<p>Carregando...</p>} />;
}
