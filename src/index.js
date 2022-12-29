const { Notify } = require('notiflix');
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { render } from './render';
import { refs } from './refs';
import { RequestPixabay } from './request';

// ######## loader ########

const loaderEl = document.querySelector('.preloader-loader');
const percentsEl = document.querySelector('.percents');

function addLoader(data) {
  console.log(data.length);
  let i = 0;

  data.forEach(file => {
    i++;
    console.log(file);

    // percentsEl.innerHTML = ((100 / data.length) * i).toFixed(0);
    percentsEl.innerHTML = ((i * 100) / data.length).toFixed(0);
  });
}

function showLoader() {
  return loaderEl.classList.remove('loader-invisible');
}

function hideLoader() {
  return loaderEl.classList.add('loader-invisible');
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
  showLoader();

  try {
    const { data } = await reqestPixabau.reqest();

    addLoader(data.hits);
    if (data.hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      hideLoader();
      refs.btnEl.classList.add('btn-invisible');
      return;
    }

    Notify.info(`Hooray! We found ${data.totalHits} images.`);

    render(data.hits);

    console.log(data.hits.length);
    lightbox.refresh();
    hideLoader();
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
