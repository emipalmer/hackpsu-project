import ReactDOM from 'react-dom';
import About from './components/About';
import './styles.css';

function App() {
  return (
    <>
      <About />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('index'));
// const container = ;
// const root = createRoot(container);
// root.render(<About />);
