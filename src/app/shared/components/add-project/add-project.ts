import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProjectsService } from '../../../core/service/projects-service';
import { TeamsService } from '../../../core/service/teams-service';

@Component({
  selector: 'app-add-project-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule
  ],
  templateUrl: './add-project.html',
  styleUrl: './add-project.css'
})
export class AddProject {
  private fb = inject(FormBuilder);
  private projectService = inject(ProjectsService);
  private teamsService = inject(TeamsService);
  private dialogRef = inject(MatDialogRef<AddProject>);

  teams = this.teamsService.teams$;
  projectForm: FormGroup;

  ngOnInit(){
    this.teamsService.getTeams().subscribe();
  }

  constructor() {
    this.projectForm = this.fb.group({
      teamId: [null, Validators.required],
      name: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      this.projectService.addProject(this.projectForm.value).subscribe(() => {
        this.dialogRef.close(true); 
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}