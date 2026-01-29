import { Component, inject } from '@angular/core';
import { TeamsService } from '../../core/service/teams-service';
import { TaemCard } from '../../shared/components/taem-card/taem-card';
import { AddTeam } from "../../shared/components/add-team/add-team";
import { AddMember } from '../../shared/components/add-member/add-member';

@Component({
  selector: 'app-teams',
  imports: [TaemCard, AddTeam, AddMember],
  templateUrl: './teams.html',
  styleUrl: './teams.css',
})
export class Teams {
  private taemsService = inject(TeamsService);
  teams = this.taemsService.teams$;

  ngOnInit() {
    this.taemsService.getTeams().subscribe();
  }

  addTeam(teamName: string) {
    this.taemsService.addTeam(teamName).subscribe();
  }

  addMemmber(userId: number, teamId: number) {
    this.taemsService.addMemberToTeam(teamId, { userId, role: 'member' }).subscribe();
  }
}
