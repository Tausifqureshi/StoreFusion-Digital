import { ThemeContext } from '../../../../context/AllContext';
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

export default React.memo(Dashboard);

