import { useNavigate } from 'react-router';
import useKeyPress from '../hooks/useKeyPress';

export default function HomePage() {
  const navigate = useNavigate();

  useKeyPress(['l'], () => {
    navigate('/learn');
  });
  useKeyPress(['p'], () => {
    navigate('/practice');
  });

  return <h1>Home</h1>;
}