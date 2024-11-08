import { Component } from '@angular/core';
import { iUser } from '../../interfaces/iuser';
import { AuthService } from '../../auth/auth.service';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-write-story',
  templateUrl: './write-story.component.html',
  styleUrl: './write-story.component.scss',
})
export class WriteStoryComponent {
  user!: iUser;
  constructor(
    private authSvc: AuthService,
    private fb: NonNullableFormBuilder
  ) {
    this.validateForm = this.fb.group({
      title: ['', [Validators.required]],

      genere: ['', [Validators.required]],

      description: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.authSvc.user$.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }
  validateForm: FormGroup<{
    title: FormControl<string>;
    genere: FormControl<string>;

    description: FormControl<string>;
  }>;

  submitForm(): void {
    console.log('submit', this.validateForm.value);
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
  }
}
