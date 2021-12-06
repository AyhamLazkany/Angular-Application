import { Injectable } from '@angular/core';
import { Leader } from '../3. Shared/leader';
import { Leaders } from '../3. Shared/leaders';
import { of , Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  // Simulate server latency with 2 second delay
  getLeaders(): Observable<Leader[]> {
    return of(Leaders).pipe(delay(2000));
  }
  getLeader(id: string): Observable<Leader> {
    return of(Leaders.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));
  }
  getFeaturedLeader(): Observable<Leader> {
    return of(Leaders.filter((leader) => leader.featured )[0]).pipe(delay(2000));
  }
}
