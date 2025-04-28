import { MovieModel, MovieGenre } from './movie.model';

export interface OrderModel
  extends Omit<MovieModel, 'director' | 'movieActors' | 'movieGenres'> {
  room: string;
  dateProjection: string;
  id: number;
  count: number;
  pricePerItem: number;
  status: 'ordered' | 'paid' | 'canceled';
  rating: null | boolean;
}
