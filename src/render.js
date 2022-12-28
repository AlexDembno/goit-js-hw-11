import { refs } from './refs';

function hideLoader() {
  loaderEl.classList.remove('loader-run');
}

export function render(image) {
  const markup = image
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
        <a href="${largeImageURL}"
          ><img
            class="gallery-img"
            src="${webformatURL}"
            alt="${tags}"
            loading="lazy"
        /></a>
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
  refs.divEl.insertAdjacentHTML('beforeend', markup);
}
