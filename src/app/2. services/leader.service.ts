import { Injectable } from '@angular/core';
import { Leader } from '../3. Shared/leader';
import { Leaders } from '../3. Shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Leader[] {
    return Leaders;
  }
  getLeader(id: string): Leader {
    return Leaders.filter((leader) => (leader.id === id))[0];
  }
  getFeaturedLeader(): Leader {
    return Leaders.filter((leader) => leader.featured )[0];
  }
}
