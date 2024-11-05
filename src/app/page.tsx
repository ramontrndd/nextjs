"use client";
import RegisterForm from "../../pages/auth/registerForm";
import LoginForm from "../../pages/auth/loginForm";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Slide } from "@mui/material";

const Page = () => {
  const [mostrarLogin, setMostrarLogin] = useState(true);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg max-w-md w-full">
        {mostrarLogin && (
          <Slide direction="left" in={mostrarLogin} mountOnEnter unmountOnExit>
            <div>
              <LoginForm />
              <p className="mt-4 text-center">
                Não tem uma conta?{" "}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setMostrarLogin(false)}
                >
                  Cadastre-se
                </Button>
              </p>
            </div>
          </Slide>
        )}
        {!mostrarLogin && (
          <Slide direction="right" in={!mostrarLogin} mountOnEnter unmountOnExit>
            <div>
              <RegisterForm />
              <p className="mt-4 text-center">
                Já tem uma conta?{" "}
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => setMostrarLogin(true)}
                >
                  Faça login
                </Button>
              </p>
            </div>
          </Slide>
        )}
      </div>
    </div>
  );
};

export default Page;