import ErrorPage from "./ErrorPage/ErrorPage.tsx";
import Type from "./Type/Type.tsx";

const routes = [
  {
    path: "/",
    element: <Type />,
    errorElement: <ErrorPage />,
  },
];

export default routes;
