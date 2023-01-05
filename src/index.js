import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { render } from './render';
import { refs } from './refs';
import { RequestPixabay } from './request';
import { Preloader } from './preloader';
import { Notiflix } from './notiflix';

// ######## loader ########

const loader = new Preloader();

// ######## loader ########

// ######## notiflix ########

const showNotiflix = new Notiflix();

// ######## notiflix ########

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
    showNotiflix.showStart();
    return;
  }
  loader.showLoader();

  try {
    const { data } = await reqestPixabau.reqest();

    loader.addLoader(data.hits);
    if (data.hits.length === 0) {
      showNotiflix.showFailure();
      loader.hideLoader();
      refs.btnEl.classList.add('btn-invisible');
      return;
    }

    showNotiflix.showInfo(data);

    render(data.hits);

    console.log(data.hits.length);
    lightbox.refresh();
    loader.hideLoader();
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
      showNotiflix.showEnd();
    }
  } catch (error) {
    console.error(error);

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
