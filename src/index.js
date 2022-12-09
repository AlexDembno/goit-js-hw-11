const { Notify } = require('notiflix');
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const refs = {
  formEl: document.querySelector('.search-form'),
  inputEl: document.querySelector('.search-form_input'),
  divEl: document.querySelector('.gallery'),
  btnEl: document.querySelector('.load-more'),
};

const KEY = '31934328-4f49ab69ab8cdfa2acbd8f5df';
const baseUrl = `https://pixabay.com/api/?key=${KEY}`;

let PAGE = 1;

refs.formEl.addEventListener('submit', getUser);

async function getUser(event) {
  event.preventDefault();
  console.log(event.target.elements.searchQuery.value);
  const searchText = event.currentTarget.elements.searchQuery.value;

  try {
    const { data } = await axios.get(
      `${baseUrl}&q=${searchText}&image_type=photo&orientation=horizontal&safesearch=true&page=${PAGE}&per_page=40`
    );
    const image = data.hits;
    render(image);
  } catch (error) {
    console.error(error);
  }
}

refs.btnEl.addEventListener('click', loadMore);

async function loadMore(event) {
  refs.inputEl.addEventListener('input', async () => {
    console.log(refs.inputEl.value);
    event.preventDefault();
    PAGE += 1;
    console.log(event.target.elements.searchQuery.value);
    const searchText = input.value;

    try {
      const { data } = await axios.get(
        `${baseUrl}&q=${searchText}&image_type=photo&orientation=horizontal&safesearch=true&page=${PAGE}&per_page=40`
      );
      const image = data.hits;
      render(image);
    } catch (error) {
      console.error(error);
    }
  });

  // try {
  //   const { data } = await axios.get(
  //     `${baseUrl}&q=${searchText}&image_type=photo&orientation=horizontal&safesearch=true&page=${PAGE}&per_page=40`
  //   );
  //   const image = data.hits;
  //   render(image);
  // } catch (error) {
  //   console.error(error);
  // }
}

function render(image) {
  const markup = image
    .map(
      ({
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
  <img class="gallery-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>${likes}&ensp;likes</b>
    </p>
    <p class="info-item">
      <b>${views}&ensp;Views</b>
    </p>
    <p class="info-item">
      <b>${comments}&ensp;Comments</b>
    </p>
    <p class="info-item">
      <b>${downloads}&ensp;Downloads</b>
    </p>
  </div>
</div>`
    )
    .join('');
  refs.divEl.insertAdjacentHTML('afterbegin', markup);
}
