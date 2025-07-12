import { useRouteError } from "react-router-dom";
import classes from "./index.module.css";

const Error = () => {
  const error = useRouteError();
  return (
    <main className={classes.main}>
      <img src="/not-found.png" alt="" />
      <div>
        <header className={classes.header}>{error.status}</header>
        <h3>{error.message || error.statusText || "An Error occurred!"}</h3>
      </div>
    </main>
  );
};
export default Error;
