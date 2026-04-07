import { ThemeContext } from '../../../../context api/AllContext';
import React, { useContext, useMemo } from 'react';
import Layout from '../../../../components/layout/Layout';
import DashboardTab from '../DashboardTabView/DashboardTab';
import ScrollToTopButton from '../../../../components/Scroll top/ScrollToTopButoon';
import { useNavigate } from 'react-router-dom';
import DashboardView from './components/DashboardView';

function Dashboard() {
  const { mode } = useContext(ThemeContext);
  const isDark = mode === 'dark';
  const navigate = useNavigate();

  // 👉 TAB UNIFIED INSTANCE: Locked to prevent reconciliation
  const memoTabs = useMemo(() => <DashboardTab />, []);

  return (
    <Layout>
      <DashboardView
        isDark={isDark}
        navigate={navigate}
      >
        {memoTabs}
      </DashboardView>
      <ScrollToTopButton />
    </Layout>
  );
}

const MemoizedDashboard = React.memo(Dashboard);
MemoizedDashboard.displayName = 'Dashboard';
export default MemoizedDashboard;
