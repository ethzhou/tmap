import { Link, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LearnRoutes from './routes/LearnRoutes';
import PracticeRoutes from './routes/PracticeRoutes';
import SheetMusicTest from './components/practice/exercises/SheetMusicTest';

export default function App () {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/learn'>Learn</Link>
          </li>
          <li>
            <Link to='/practice'>Practice</Link>
          </li>
          <li>
            <Link to='/sheet-music-test'>Sheet Music Test</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path='' element={<HomePage />} />
        <Route path='learn/*' element={<LearnRoutes />} />
        <Route path='practice/*' element={<PracticeRoutes />} />
        <Route path='sheet-music-test' element={<SheetMusicTest />} />
        <Route path='*' element={<p>jajaja not a page</p>} />
      </Routes>
    </>
  );
}