import React from 'react';
import ResponsiveDrawer from '@/components/dashboard/responsiveDrawer';
import withAuth from '@/middleware/withAuth';

const Dashboard: React.FC = () => {
  return (
    <ResponsiveDrawer>
      {/* Aqui você pode adicionar conteúdo específico do dashboard */}
    </ResponsiveDrawer>
  );
};

export default withAuth(Dashboard);
