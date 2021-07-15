import { exhaustMap, from, interval, map, Observable, of, switchMap, throwError } from 'rxjs';
import { Commit } from './interfaces';
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
