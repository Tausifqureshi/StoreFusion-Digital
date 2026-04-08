import { ThemeContext } from '../../../../context api/AllContext';
import React, { useContext, useMemo } from 'react';
import DashboardTab from '../DashboardTabView/DashboardTab';
import { useNavigate } from 'react-router-dom';
import DashboardView from './components/DashboardView';

function Dashboard() {
  const { mode } = useContext(ThemeContext);
  const isDark = mode === 'dark';
  const navigate = useNavigate();

  // 👉 TAB UNIFIED INSTANCE: Locked to prevent reconciliation
  const memoTabs = useMemo(() => <DashboardTab />, []);

  return (
    <>
      <DashboardView
        isDark={isDark}
        navigate={navigate}
      >
        {memoTabs}
      </DashboardView>
    </>
  );
}

const MemoizedDashboard = React.memo(Dashboard, () => true); // Top-level route component shouldn't receive props that change its render.
MemoizedDashboard.displayName = 'Dashboard';
export default MemoizedDashboard;

