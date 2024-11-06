import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthComponent: React.FC = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = Cookies.get('token');
      if (!token) {
        // Armazena a mensagem de alerta no localStorage
        localStorage.setItem('authMessage', 'Você precisa fazer login para acessar esta página.');
        router.push('/');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;