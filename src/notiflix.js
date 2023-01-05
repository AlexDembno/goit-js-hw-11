const { Notify } = require('notiflix');

export class Notiflix {
  showStart() {
    return Notify.warning('Enter search');
  }

  showSuccess() {
    return Notify.success('You have successfully registered');
  }
  showInfo(data) {
    return Notify.info(`Hooray! We found ${data.totalHits} images.`);
  }
  showFailure() {
    return Notify.failure(
      'Sorry, there are no films matching your search query. Please try again.'
    );
  }
  showEnd() {
    return Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
}
