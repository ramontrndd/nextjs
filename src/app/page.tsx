// src/app/page.tsx
"use client";

import { useState } from "react";
import RegisterForm from "@/components/auth/registerForm";
import LoginForm from "@/components/auth/loginForm";
import { Button, Slide } from "@mui/material";

const Page = () => {
  const [mostrarLogin, setMostrarLogin] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-8 sm:m-8">
      <div className="p-8 bg-white rounded-lg shadow-lg max-w-md w-full">
        <Slide direction="down" in={mostrarLogin} mountOnEnter unmountOnExit timeout={500}>
          <div style={{ display: mostrarLogin ? 'block' : 'none' }}>
            <LoginForm />
            <div className="flex flex-col items-center p-3">
              <p>
                Não tem uma conta?{" "}  
              </p>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setMostrarLogin(false)}
                className="font-bold"
              >
                Cadastre-se
              </Button>
            </div>
          </div>
        </Slide>
        <Slide direction="down" in={!mostrarLogin} mountOnEnter unmountOnExit timeout={500}>
          <div style={{ display: !mostrarLogin ? 'block' : 'none' }}>
            <RegisterForm />
            <div className="flex flex-col items-center p-3">
              <p className="mt-4 text-center">
                Já tem uma conta?{" "}
              </p>
              <Button
                variant="text"
                color="primary"
                onClick={() => setMostrarLogin(true)}
                className="font-bold"
              >
                Faça login
              </Button>
            </div>
          </div>
        </Slide>
      </div>
    </div>
  );
};

export default Page;