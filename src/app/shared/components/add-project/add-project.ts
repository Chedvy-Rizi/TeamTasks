import { Component, inject, output } from '@angular/core';
import { ProjectsService } from '../../../core/service/projects-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-project',
  imports: [],
  templateUrl: './add-project.html',
  styleUrl: './add-project.css',
})
export class AddProject {
  private projectService = inject(ProjectsService);

  private fb = inject(FormBuilder);
  projectForm: FormGroup;

  projectAdded = output<void>();

  constructor() {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      const formData = this.projectForm.value;
      this.projectService.addProject(formData).subscribe(() => {
        this.projectAdded.emit();
      });
    } else {
      this.projectForm.markAllAsTouched();
    }
  }
}