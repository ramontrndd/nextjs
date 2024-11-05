"use client"
import RegisterForm from "../../pages/auth/registerForm";
import LoginForm from "../../pages/auth/loginForm";
import { useState } from "react";

const Page = () => {
  const [mostrarLogin, setMostrarLogin] = useState(true);

  return (
    <div>
      {mostrarLogin ? (
        <>
          <LoginForm />
          <p>
            Não tem uma conta?{" "}
            <button onClick={() => setMostrarLogin(false)}>Cadastre-se</button>
          </p>
        </>
      ) : (
        <>
          <RegisterForm />
          <p>
            Já tem uma conta?{" "}
            <button onClick={() => setMostrarLogin(true)}>Faça login</button>
          </p>
        </>
      )}
    </div>
  );
};

export default Page;

