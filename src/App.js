import { AuthButton, getToken } from "zpi-auth-lib";
import React from "react";

function App() {
  const getCode = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    return params.get("code");
  };

  const isCode = (code) => code !== null;

  const code = getCode();
  const host = "localhost:8080";
  const clientId = "1";
  const [token, setToken] = React.useState(null);

  return (
    <>
      {isCode(code) ? (
        <>
          <button
            onClick={() => (window.location.href = window.location.origin)}
          >
            Home
          </button>
          <div>Auth code: {code}</div>
          <div>
            <button onClick={() => setToken(getToken(host, code, clientId))}>
              Get tokens
            </button>
          </div>
          <div>Token: {token}</div>
        </>
      ) : (
        <AuthButton clientId={clientId} host={host} />
      )}
    </>
  );
}

export default App;
