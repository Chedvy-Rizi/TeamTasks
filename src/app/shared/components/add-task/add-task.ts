import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TasksService } from '../../../core/service/tasks-service';
import { ProjectsService } from '../../../core/service/projects-service';

@Component({
  selector: 'app-add-task',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css',
})
export class AddTask {
  private taskService = inject(TasksService);
  private fb = inject(FormBuilder);
  taskForm: FormGroup;

  private projectsService = inject(ProjectsService);
  projects = this.projectsService.projects$;

  taskSave = output<void>();

  constructor() {
    this.taskForm = this.fb.group({
      projectId: [null, Validators.required],
      title: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(){
    this.projectsService.getProjects().subscribe();
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;
      this.taskService.addTask(formData).subscribe(() => {
        this.taskSave.emit();
      });
    } else {
      this.taskForm.markAllAsTouched();
    }
  }

}
