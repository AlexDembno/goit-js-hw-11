const { Notify } = require('notiflix');
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import { render } from './render';
import { refs } from './refs';

let searchText = '';
const KEY = '31934328-4f49ab69ab8cdfa2acbd8f5df';
const baseUrl = `https://pixabay.com/api/?key=${KEY}`;
let PAGE = 1;

refs.formEl.addEventListener('submit', getUser);
refs.btnEl.addEventListener('click', loadMore);

async function getUser(event) {
  event.preventDefault();
  clearMarkup();
  searchText = event.currentTarget.elements.searchQuery.value;
  if (searchText === '') {
    Notify.info('Enter search');
    return;
  }

  try {
    const { data } = await axios.get(
      `${baseUrl}&q=${searchText}&image_type=photo&orientation=horizontal&safesearch=true&page=${PAGE}&per_page=40`
    );

    if (data.hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      refs.btnEl.classList.add('btn-invisible');
      return;
    }
    Notify.info(`Hooray! We found ${data.totalHits} images.`);
    console.log(data);
    const image = data.hits;
    render(image);
    lightbox.refresh();
  } catch (error) {
    console.error(error);
  }
  refs.btnEl.classList.remove('btn-invisible');
}

async function loadMore(event) {
  event.preventDefault();
  PAGE += 1;

  try {
    const { data } = await axios.get(
      `${baseUrl}&q=${searchText}&image_type=photo&orientation=horizontal&safesearch=true&page=${PAGE}&per_page=40`
    );
    const image = data.hits;
    render(image);
    lightbox.refresh();
    qwer();
  } catch (error) {
    console.error(error);
    Notify.info("We're sorry, but you've reached the end of search results.");
    refs.btnEl.classList.add('btn-invisible');
  }
}

function clearMarkup() {
  refs.divEl.innerHTML = '';
}

function qwer() {
  const { height: cardHeight } =
    refs.divEl.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

var lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
