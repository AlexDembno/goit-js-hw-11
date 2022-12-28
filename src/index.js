const { Notify } = require('notiflix');
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { render } from './render';
import { refs } from './refs';
import { RequestPixabay } from './request';

// ######## loader ########
const loaderEl = document.querySelector('.loader');
function addLoader() {
  return loaderEl.classList.add('loader-run');
}

function hideLoader() {
  loaderEl.classList.remove('loader-run');
}

// ######## loader ########

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

const reqestPixabau = new RequestPixabay();

refs.formEl.addEventListener('submit', getUser);
refs.btnEl.addEventListener('click', loadMore);

async function getUser(event) {
  event.preventDefault();
  clearMarkup();

  reqestPixabau.query = event.currentTarget.elements.searchQuery.value;
  reqestPixabau.resetPage();
  if (reqestPixabau.query === '') {
    Notify.info('Enter search');
    return;
  }
  addLoader();

  try {
    const { data } = await reqestPixabau.reqest();
    if (data.hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      refs.btnEl.classList.add('btn-invisible');
      return;
    }
    hideLoader();
    Notify.info(`Hooray! We found ${data.totalHits} images.`);

    render(data.hits);
    lightbox.refresh();
    if (reqestPixabau.page < Math.ceil(data.totalHits / 40)) {
      refs.btnEl.classList.remove('btn-invisible');
    } else {
      refs.btnEl.classList.add('btn-invisible');
    }
  } catch (error) {
    console.error(error);
  }
}

async function loadMore(event) {
  event.preventDefault();
  reqestPixabau.incrementPage();

  try {
    const { data } = await reqestPixabau.reqest();
    render(data.hits);
    lightbox.refresh();
    pageScrolling();
    if (reqestPixabau.page < Math.ceil(data.totalHits / 40)) {
      refs.btnEl.classList.remove('btn-invisible');
    } else {
      refs.btnEl.classList.add('btn-invisible');
    }
  } catch (error) {
    console.error(error);
    Notify.info("We're sorry, but you've reached the end of search results.");
    refs.btnEl.classList.add('btn-invisible');
  }
}

function clearMarkup() {
  refs.divEl.innerHTML = '';
}

function pageScrolling() {
  const { height: cardHeight } =
    refs.divEl.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
