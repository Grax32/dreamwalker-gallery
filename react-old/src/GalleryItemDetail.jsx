import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import galleryData from './galleryData';

const GalleryItemDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const item = galleryData.find(item => item.slug === slug);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    // measure header to offset the fixed detail view below it
    const header = document.querySelector('header');
    const h = header ? header.getBoundingClientRect().height : 0;
    setHeaderHeight(h);
    window.scrollTo(0, 0);
    // recalc on resize
    const onResize = () => setHeaderHeight(header ? header.getBoundingClientRect().height : (document.querySelector('header')?.getBoundingClientRect().height || 0));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [slug]);

  if (!item) {
    return <div>Item not found</div>;
  }

  const currentIndex = galleryData.findIndex(item => item.slug === slug);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < galleryData.length - 1;
  const prevItem = hasPrev ? galleryData[currentIndex - 1] : null;
  const nextItem = hasNext ? galleryData[currentIndex + 1] : null;

  return (
    <div style={{
      position: 'fixed',
      top: headerHeight,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#0b0b14',
      color: '#e0d7f5',
      fontFamily: "'Segoe UI', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      boxSizing: 'border-box',
      padding: '2rem',
      overflow: 'auto',
      zIndex: 50
    }}>
      <div style={{width: '100%', maxWidth: '1280px', textAlign: 'center'}}>
        <img
          src={item.src}
          alt={item.caption}
          style={{width: '100%', maxWidth: '900px', height: 'auto', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.6)', display: 'block', margin: '0 auto'}}
        />
        <h2 style={{color: '#d1b3ff', marginTop: '1rem'}}>{item.caption}</h2>
        <div style={{marginTop: '2rem'}}>
          {hasPrev ? (
            <button onClick={() => navigate(`/display/${prevItem.slug}`)} style={{background: '#d1b3ff', color: '#0b0b14', border: 'none', padding: '0.5rem 1rem', borderRadius: '5px', cursor: 'pointer', marginRight: '1rem'}}>
              {prevItem.caption}
            </button>
          ) : (
            <a href="/" style={{color: '#d1b3ff', textDecoration: 'none', marginRight: '1rem', display: 'inline-block', padding: '0.5rem 1rem', border: '1px solid #d1b3ff', borderRadius: '5px'}}>
              Back to Gallery
            </a>
          )}
          {hasNext ? (
            <button onClick={() => navigate(`/display/${nextItem.slug}`)} style={{background: '#d1b3ff', color: '#0b0b14', border: 'none', padding: '0.5rem 1rem', borderRadius: '5px', cursor: 'pointer'}}>
              {nextItem.caption}
            </button>
          ) : (
            <a href="/" style={{color: '#d1b3ff', textDecoration: 'none', display: 'inline-block', padding: '0.5rem 1rem', border: '1px solid #d1b3ff', borderRadius: '5px'}}>
              Back to Gallery
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryItemDetail;
