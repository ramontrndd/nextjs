import React from 'react';
import ResponsiveDrawer from '@/components/dashboard/responsiveDrawer';
import withAuth from '@/middleware/withAuth';



const Dashboard: React.FC = () => {
  return (
    <ResponsiveDrawer>
    
    </ResponsiveDrawer>
  );
};

export default withAuth(Dashboard);
