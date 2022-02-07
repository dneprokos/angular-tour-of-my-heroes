import { Injectable } from '@angular/core';
import { Hero } from './models/hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {  
  constructor(private http: HttpClient, private messageService: MessageService) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private heroesUrl = 'api/heroes';

//#region Public methods

/** GET heroes from the server */
getHeroes(): Observable<Hero[]> {
  return this.http.get<Hero[]>(this.heroesUrl)
  .pipe(
    tap((): void => this.log('fetched heroes')),
    catchError(this.handleError<Hero[]>('getHeroes', []))
  );
}

/** GET hero by id. Will 404 if id not found */
getHero(id: number): Observable<Hero> {
  const url = `${this.heroesUrl}/${id}`;
  return this.http.get<Hero>(url).pipe(
    tap((): void => this.log(`fetched hero id=${id}`)),
    catchError(this.handleError<Hero>(`getHero id=${id}`))
  );
}

/** PUT: update the hero on the server */
updateHero(hero: Hero): Observable<unknown> {
  return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
    tap((): void => this.log(`updated hero id=${hero.id}`)),
    catchError(this.handleError<unknown>('updateHero'))
  );
}

/** POST: add a new hero to the server */
addHero(hero: Hero): Observable<Hero> {
  return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
    tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
    catchError(this.handleError<Hero>('addHero'))
  );
}

/** DELETE: delete the hero from the server */
deleteHero(id: number): Observable<Hero> {
  const url = `${this.heroesUrl}/${id}`;

  return this.http.delete<Hero>(url, this.httpOptions).pipe(
    tap((): void => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
  );
}

/* GET heroes whose name contains search term */
searchHeroes(term: string): Observable<Hero[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
    tap(x => x.length ?
       this.log(`found heroes matching "${term}"`) :
       this.log(`no heroes matching "${term}"`)),
    catchError(this.handleError<Hero[]>('searchHeroes', []))
  );
}

//#endregion

//#region Private methods

private log(message: string) {
  this.messageService.add(`HeroService: ${message}`);
}
private handleError<T>(operation = 'operation', result?: T) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (error: any): Observable<T> => {
  
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
  
    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);
  
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

//#endregion
  
}
