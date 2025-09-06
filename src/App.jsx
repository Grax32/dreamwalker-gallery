import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GalleryHeader from './GalleryHeader';
import GalleryFooter from './GalleryFooter';
import DreamwalkerGallery from './DreamwalkerGallery';
import GalleryItemDetail from './GalleryItemDetail';

function App() {
  return (
    <Router>
      <GalleryHeader />
      <Routes>
        <Route path="/" element={<DreamwalkerGallery />} />
        <Route path="/display/:slug" element={<GalleryItemDetail />} />
      </Routes>
      <GalleryFooter />
    </Router>
  );
}

export default App;
