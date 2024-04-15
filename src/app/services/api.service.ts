import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private cache = new Map<string, Observable<any>>();

  constructor(private http: HttpClient) {}

  getRepositories(
    username: string,
    page: number,
    pageSize: number
  ): Observable<any[]> {
    const url = `https://api.github.com/users/${username}/repos?page=${page}&per_page=${pageSize}`;

    if (!this.cache.has(url)) {
      const request = this.http.get<any[]>(url).pipe(
        catchError((error) => {
          // Handle errors
          return of([]);
        }),
        shareReplay(1) // Cache the response and replay for subsequent subscribers
      );

      this.cache.set(url, request);
    }

    // Return cached observable or empty observable if not found in cache
    return this.cache.get(url) || of([]);
  }
}
