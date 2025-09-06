import galleryData from './galleryData';
import { useNavigate } from 'react-router-dom';

const DreamwalkerGallery = () => {
  const navigate = useNavigate();
  return (
    <div style={{backgroundColor: '#0b0b14', color: '#e0d7f5', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif"}}>
      <section className="hero" style={{position: 'relative', textAlign: 'center', color: 'white'}}>
        <img
          src={"/reference/art-science-love-garden.png"}
          style={{width: '100%', height: '70vh', objectFit: 'cover', filter: 'brightness(60%)'}}
          alt=""
        />
        <div className="overlay" style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
          <h2 style={{fontSize: '3rem', marginBottom: '1rem', color: '#d1b3ff'}}>The DreamWalker Gallery</h2>
          <p style={{fontSize: '1.2rem', maxWidth: 600, margin: 'auto', color: '#f0eaff'}}>
            Where imagination, digital art, and photography blend into surreal worlds of creativity.
          </p>
        </div>
      </section>

      <section className="gallery" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gridAutoRows: '1fr',
        gridAutoFlow: 'row dense',
        gap: '1rem',
        padding: '2rem',
        alignItems: 'stretch',
      }}>
        {galleryData.slice(0, 4).map((item, index) => (
          <GalleryItem key={index} src={item.src} caption={item.caption} onClick={() => navigate(`/display/${item.slug}`)} />
        ))}
      </section>
    </div>
  );
};

const galleryItemStyle = {
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
};


import { useRef } from 'react';

const galleryImgStyle = {
  width: '100%',
  minHeight: '300px',
  objectFit: 'cover',
  transition: 'transform 0.5s ease',
  display: 'block',
  flex: '1 1 auto',
};
// GalleryItem component with hover scale effect
function GalleryItem({ src, caption, onClick }) {
  const imgRef = useRef(null);
  const handleMouseEnter = () => {
    if (imgRef.current) imgRef.current.style.transform = 'scale(1.1)';
  };
  const handleMouseLeave = () => {
    if (imgRef.current) imgRef.current.style.transform = 'scale(1)';
  };
  return (
    <div className="gallery-item" style={galleryItemStyle} onClick={onClick}>
      <img
        ref={imgRef}
        src={src}
        style={galleryImgStyle}
        alt={caption}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <div className="caption" style={captionStyle}>{caption}</div>
    </div>
  );
}

const captionStyle = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: '1rem',
  background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
  color: '#f0eaff',
  fontSize: '1rem',
};

export default DreamwalkerGallery;
