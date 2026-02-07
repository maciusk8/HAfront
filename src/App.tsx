
import './App.css';
import { useAuth } from './hooks/useAuth';

// --- KONFIGURACJA ---
const HA_WS_URL = import.meta.env.VITE_HA_WS_URL;
const HA_TOKEN = import.meta.env.VITE_HA_TOKEN;

function App() {
  const { status, error, lastMessage } = useAuth(HA_TOKEN, HA_WS_URL);

  return (
    <>
      <h1>Home Assistant Frontend</h1>
      <p><strong>Status:</strong> {status}</p>

      {error && <p style={{ color: 'red' }}>Błąd: {error}</p>}

      {status === 'authenticating' && (
        <p>Trwa uwierzytelnianie...</p>
      )}

      {status === 'authenticated' && (
        <p style={{ color: 'green' }}>Połączono i uwierzytelnianiono!</p>
      )}

      {status === 'auth_failed' && (
        <p style={{ color: 'red' }}>uwierzytelnienie nie powiodła się</p>
      )}

      {lastMessage && (
        <details>
          <summary>Ostatnia wiadomość</summary>
          <pre>{JSON.stringify(lastMessage, null, 2)}</pre>
        </details>
      )}
    </>
  );
}

export default App;