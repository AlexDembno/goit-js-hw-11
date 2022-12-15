import axios from 'axios';

const KEY = '31934328-4f49ab69ab8cdfa2acbd8f5df';
const baseUrl = `https://pixabay.com/api/?key=${KEY}`;

export class RequestPixabay {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  reqest() {
    console.log(this);
    const data = axios.get(
      `${baseUrl}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
    );
    return data;
  }
}
