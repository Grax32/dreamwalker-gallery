(() => {
  const data = document.querySelector('#films-data');
  const grid = document.querySelector('#film-grid');
  const search = document.querySelector('#film-search');
  const genre = document.querySelector('#film-genre');
  const count = document.querySelector('#film-count');
  const modal = document.querySelector('#film-modal');

  if (!data || !grid || !search || !genre || !count || !modal) return;

  const films = JSON.parse(data.textContent);
  const cards = [...grid.querySelectorAll('.film-card')];
  const closeButton = document.querySelector('#film-modal-close');
  let lastFocusedCard = null;

  [...new Set(films.flatMap((film) => film.genres))].sort().forEach((name) => {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    genre.appendChild(option);
  });

  function filterFilms() {
    const query = search.value.trim().toLowerCase();
    let visible = 0;

    cards.forEach((card) => {
      const cardGenres = card.dataset.genres.split('|');
      const matchesGenre = !genre.value || cardGenres.includes(genre.value);
      const haystack = `${card.dataset.title} ${card.dataset.subtitle} ${card.dataset.synopsis} ${cardGenres.join(' ')}`.toLowerCase();
      const matchesQuery = !query || haystack.includes(query);
      card.hidden = !(matchesGenre && matchesQuery);
      if (!card.hidden) visible += 1;
    });

    count.textContent = visible;
    let empty = grid.querySelector('.films-empty');
    if (!visible && !empty) {
      empty = document.createElement('p');
      empty.className = 'films-empty';
      empty.textContent = 'No films match that search.';
      grid.appendChild(empty);
    } else if (visible && empty) {
      empty.remove();
    }
  }

  function openFilm(index, card) {
    const film = films[index];
    if (!film) return;
    lastFocusedCard = card;
    document.querySelector('#film-modal-poster').src = `/films/${film.poster}`;
    document.querySelector('#film-modal-poster').alt = `${film.title} poster`;
    document.querySelector('#film-modal-genre').textContent = film.genres.join(' · ');
    document.querySelector('#film-modal-title').textContent = film.title;
    const subtitle = document.querySelector('#film-modal-subtitle');
    subtitle.textContent = film.subtitle || '';
    subtitle.hidden = !film.subtitle;
    document.querySelector('#film-modal-meta').textContent = `${film.year} · ${film.runtime}`;
    document.querySelector('#film-modal-synopsis').textContent = film.synopsis;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    closeButton.focus();
  }

  function closeFilm() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lastFocusedCard) lastFocusedCard.focus();
  }

  cards.forEach((card) => {
    const open = () => openFilm(Number(card.dataset.filmIndex), card);
    card.addEventListener('click', open);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open();
      }
    });
  });

  search.addEventListener('input', filterFilms);
  genre.addEventListener('change', filterFilms);
  closeButton.addEventListener('click', closeFilm);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeFilm();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) closeFilm();
  });
})();
