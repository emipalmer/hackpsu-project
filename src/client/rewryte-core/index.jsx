import ReactDOM from 'react-dom';
import Chat from './components/Chat';
import './styles.css';

function App() {
  return (
    <>
      <Chat />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('index'));
