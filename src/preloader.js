export class Preloader {
  static refs = {
    loaderEl: document.querySelector('.preloader-loader'),
    percentsEl: document.querySelector('.percents'),
  };
  showLoader() {
    return Preloader.refs.loaderEl.classList.remove('loader-invisible');
  }

  addLoader(data) {
    console.log(data.length);
    let i = 0;

    data.forEach(file => {
      i++;
      console.log(file);

      // percentsEl.innerHTML = ((100 / data.length) * i).toFixed(0);
      Preloader.refs.percentsEl.innerHTML = ((i * 100) / data.length).toFixed(
        0
      );
    });
  }

  hideLoader() {
    return Preloader.refs.loaderEl.classList.add('loader-invisible');
  }
}
