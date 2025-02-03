import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.css";

const ErrorPage = () => {
  return (
    <div className={styles.errorPage}>
      <div className={styles.content}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.errorMessage}>Página no encontrada</h2>
        <p className={styles.description}>
          Lo sentimos, la página que estás buscando no existe.
        </p>
        <Link to="/" className={styles.homeLink}>
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
