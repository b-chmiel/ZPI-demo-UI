import { AuthButton, getToken } from "zpi-auth-lib";
import React, { useEffect } from "react";

function App() {
  const host = process.env.REACT_APP_AUTH_HOST || "localhost:8080";
  const clientId = process.env.REACT_APP_AUTH_CLIENT_ID || "1";
  const [token, setToken] = React.useState("{}");

  const code = (() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    return params.get("code");
  })();

  const isCode = (code) => code !== null;

  const onGetToken = () => {
    setToken(getToken(host, code, clientId));
  };

  const redirectToHome = () => {
    window.location.href = window.location.origin;
  };

  useEffect(() => {
    if (token !== "{}") {
      navigator.clipboard
        .writeText(JSON.parse(token)["access_token"])
        .then(() => {
          alert("Copied token to clipboard");
        });
    }
  }, [token, setToken]);

  return (
    <>
      {isCode(code) ? (
        <>
          <button onClick={redirectToHome}>Home</button>
          <div>Auth code: {code}</div>
          <div>
            <button onClick={onGetToken}>Get token</button>
          </div>
          <div>Token: {JSON.stringify(token)}</div>
        </>
      ) : (
        <AuthButton clientId={clientId} host={host} />
      )}
    </>
  );
}

export default App;
