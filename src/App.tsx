import './App.css';
import Room from './components/Room';
import { useHomeAssistant } from './hooks/useHomeAssistant';
import { useLights } from './hooks/useLights';
import EntityDropdown from './components/EntityDropdown';
export default function App() {
  const { status, error } = useHomeAssistant();
  const { lights } = useLights();


  return (
    <>
      <div className="App">
        <h1>Home Assistant Frontend</h1>
        <p>Status: {status}</p>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      </div>

      <div style={{ margin: '20px 0' }}>
        <h2>Lights</h2>
      </div>
      <EntityDropdown entities={lights} />
      <Room />
    </>
  );
} 