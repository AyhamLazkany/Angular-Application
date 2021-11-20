import { Injectable } from '@angular/core';
import { Leader } from '../3. Shared/leader';
import { Leaders } from '../3. Shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  // Simulate server latency with 2 second delay
  getLeaders(): Promise<Leader[]> {
    return new Promise (
      resolve => {
        setTimeout(() => resolve(Leaders) , 2000)
      }
    );
  }
  getLeader(id: string): Promise<Leader> {
    return new Promise (
      resolve => {
        setTimeout(() => resolve(Leaders.filter((leader) => (leader.id === id))[0]) , 2000)
      }
    );
  }
  getFeaturedLeader(): Promise<Leader> {
    return new Promise(
      resolve => {
        setTimeout(() => resolve(Leaders.filter((leader) => leader.featured )[0]), 2000)
      }
    );
  }
}
