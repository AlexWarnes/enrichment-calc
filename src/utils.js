import {ajax } from 'rxjs/ajax';
import { catchError } from 'rxjs/operators';
const baseURL = "https://api.github.com/search/repositories"
export const getRepos = (limitPerPage = 5, q = '') => {
	const query = q ? `&q=${q}` : '';
	return ajax.getJSON(`${baseURL}?per_page=${limitPerPage}${query}`)
		.pipe(
		// Directs request errors into a subscriber's "error" callback
		catchError(err => {
			console.log('error: ', error);
			return of(error);
		})
	)
}