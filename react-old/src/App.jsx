import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import GalleryHeader from './GalleryHeader';
import GalleryFooter from './GalleryFooter';
import DreamwalkerGallery from './DreamwalkerGallery';
import GalleryItemDetail from './GalleryItemDetail';

function AppContent() {
  const location = useLocation();
  const isDetail = location.pathname.startsWith('/display/');

  return (
    <>
      <GalleryHeader />

      {isDetail ? (
        // full-bleed detail view (fills viewport width)
        <GalleryItemDetail />
      ) : (
        // centered site container for the main gallery
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '2rem'}}>
          <Routes>
            <Route path="/" element={<DreamwalkerGallery />} />
          </Routes>
          <GalleryFooter />
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/display/:slug" element={<AppContent />} />
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </Router>
  );
}

export default App;
