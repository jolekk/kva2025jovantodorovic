import axios from 'axios';

const client = axios.create({
  baseURL: 'https://movie.pequla.com/api',
  headers: {
    Accept: 'application/json',
    'X-Client-Name': 'KVA/2025',
  },
  validateStatus: (status: number) => {
    return status === 200;
  },
});

export class MovieService {
  static async getMovies(
    search: string = '',
    actor: string = '',
    genre: string = '',
    director: string = '',
    runtime: string = ''
  ) {
    return client.request({
      url: '/movie',
      method: 'GET',
      params: {
        search: search,
        actor: actor,
        genre: genre,
        director: director,
        runtime: runtime,
      },
    });
  }

  static async getGenre() {
    return client.request({
      url: '/genre',
      method: 'GET',
      params: {},
    });
  }
  static async getActor() {
    return client.request({
      url: '/actor',
      method: 'GET',
      params: {},
    });
  }
  
  static async getRunTime() {
    return client.request({
      url: '/movie/runtime',
      method: 'GET',
      params: {},
    });
  }
  
  static async getDirector() {
    return client.request({
      url: '/director',
      method: 'GET',
      params: {},
    });
  }

  static async getDirectorById(id: number) {
    return client.get(`/director/${id}`);
  }
  static async getGenreById(id: number) {
    return client.get(`/genre/${id}`);
  }
  static async getMovieById(id: number) {
    return client.get(`/movie/${id}`);
  }
  static async getActorById(id: number) {
    return client.get(`/actor/${id}`);
  }

}
