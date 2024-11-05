"use client";

import { useState } from "react";
import RegisterForm from "@/components/auth/registerForm";
import LoginForm from "@/components/auth/loginForm";
import { Button, Slide } from "@mui/material";

const Page = () => {
  const [mostrarLogin, setMostrarLogin] = useState(true);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg max-w-md w-full">
        <Slide direction="left" in={mostrarLogin} mountOnEnter unmountOnExit timeout={500}>
          <div style={{ display: mostrarLogin ? 'block' : 'none' }}>
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
        <Slide direction="right" in={!mostrarLogin} mountOnEnter unmountOnExit timeout={500}>
          <div style={{ display: !mostrarLogin ? 'block' : 'none' }}>
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
      </div>
    </div>
  );
};

export default Page;