const navLinkStyle = {
  margin: '0 1rem',
  color: '#e0d7f5',
  textDecoration: 'none',
  fontWeight: 500,
  transition: 'color 0.3s',
};

const GalleryHeader = () => (
  <header style={{
    background: 'linear-gradient(to right, #1a0033, #32004d)',
    padding: '1.5rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  }}>
    <h1 style={{fontSize: '1.5rem', color: '#d1b3ff', letterSpacing: '2px', margin: 0}}>The DreamWalker Gallery</h1>
    <nav>
      <a href="/" style={navLinkStyle}>Home</a>
    </nav>
  </header>
);

export default GalleryHeader;
