import { Component, OnInit } from '@angular/core';
import { Leader } from '../3. Shared/leader';
import { LeaderService } from '../2. services/leader.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leaders!: Leader[];

  constructor(private leaderSevice: LeaderService) { }

  ngOnInit(): void {
    this.leaderSevice.getLeaders().then((leaders) => (this.leaders = leaders));
  }

}
