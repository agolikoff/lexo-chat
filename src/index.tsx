import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "./store";
import { AntLayer, App } from "./app";
import "./assets/scss/main.scss";
import { GoogleOAuthProvider } from "@react-oauth/google";

console.log("process.env.NODE_ENV", process.env.REACT_APP_GOOGLE_CLIENT_ID);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID ?? ""}>
    <Provider store={store}>
      <AntLayer>
        <App />
      </AntLayer>
    </Provider>
  </GoogleOAuthProvider>,
);
