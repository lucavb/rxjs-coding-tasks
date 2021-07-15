import { exhaustMap, from, interval, map, Observable, of, switchMap, throwError } from 'rxjs';
import { CatBreed, Commit } from './interfaces';
import axios from 'axios';

export const getCommit = (): Observable<Commit> =>
    from(axios('http://whatthecommit.com/index.json')).pipe(map((resp): Commit => resp.data));

export const getCommitStream = (time: number): Observable<Commit> => interval(time).pipe(exhaustMap(getCommit));

export const getCommitUnstable = (time: number, failureRate = 10): Observable<Commit> =>
    getCommitStream(time).pipe(
        switchMap((commit) => {
            const sum = Array.from(commit.hash)
                .map((char) => char.charCodeAt(0))
                .reduce((previous, charCode) => previous + charCode);

            if (sum % failureRate === 0) {
                return throwError(() => new Error('Unable to obtain commit'));
            }
            return of(commit);
        }),
    );

export const searchBreedsByName = (name: string): Observable<CatBreed[]> =>
    from(axios(`https://api.thecatapi.com/v1/breeds/search?q=${name}`)).pipe(map((resp): CatBreed[] => resp.data));

export const findOriginByBreedName = (name: string): Observable<string | undefined> =>
    searchBreedsByName(name).pipe(map((breeds) => (breeds.length > 0 ? breeds[0].origin : undefined)));
