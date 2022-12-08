const { Notify } = require('notiflix');
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('.search-form');

const KEY = '';

const baseUrl = `https://pixabay.com/api/?key=${KEY}`;

formEl.addEventListener('submit', event => {
  event.preventDefault();
  console.log(event.currentTarget.elements.searchQuery.value);
  const searchText = event.currentTarget.elements.searchQuery.value;

  `&q=${searchText}&image_type=photo&orientation=horizontal&safesearch=true`;
});

const sample = `<div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>`;
