import { Component, inject, OnInit } from '@angular/core';
import { TeamsService } from '../../core/service/teams-service';
import { TaemCard } from '../../shared/components/taem-card/taem-card';
import { AddTeam } from "../../shared/components/add-team/add-team";
import { AddMember } from '../../shared/components/add-member/add-member';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-teams',
  standalone: true, 
  imports: [TaemCard, MatIcon],
  templateUrl: './teams.html',
  styleUrl: './teams.css',
})
export class Teams  {
  private teamsService = inject(TeamsService); 
  private dialog = inject(MatDialog);
  
  teams = this.teamsService.teams$;

  ngOnInit() {
    this.teamsService.getTeams().subscribe();
  }

  addTeam(teamName: string) {
    this.teamsService.addTeam(teamName).subscribe({
      next: () => console.log('Team added!'),
      error: (err) => console.error('Error adding team', err)
    });
  }

  addMemmber(userId: number, teamId: number) {
    this.teamsService.addMemberToTeam(teamId, { userId, role: 'member' }).subscribe({
      next: () => {
        this.teamsService.getTeams().subscribe(); 
      },
      error: (err) => console.error('Error adding member', err)
    });
  }

  openAddTeamDialog() {
    const dialogRef = this.dialog.open(AddTeam, {
      width: '400px', 
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addTeam(result);
      }
    });
  }

  openAddMemberDialog(teamId: number) {
    
    const dialogRef = this.dialog.open(AddMember, {
      width: '380px',
      data: { teamId } 
    });

    dialogRef.afterClosed().subscribe((userId) => {
      if (userId) {
        this.addMemmber(Number(userId), teamId);
      }
    });
  }
}