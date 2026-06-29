import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes';

const antTheme = {
  token: {
    colorPrimary: '#2563eb',
    borderRadius: 10,
    fontFamily: "'DM Sans', sans-serif",
    colorBgContainer: '#ffffff',
    colorBorder: '#e2e8f0',
    controlHeight: 38,
  },
  components: {
    Button: { borderRadius: 10, fontWeight: 500 },
    Input: { borderRadius: 10 },
    Select: { borderRadius: 10 },
    Modal: { borderRadius: 20 },
  },
};

const App: React.FC = () => (
  <ConfigProvider theme={antTheme}>
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  </ConfigProvider>
);

export default App;
