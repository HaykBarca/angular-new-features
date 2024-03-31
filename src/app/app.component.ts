import { Component, computed, effect, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  dogName = signal('Shiba Inu');
  dogBreed = signal('Dog Breed');
  computed = computed(() => `Computed ${this.dogName()}: ${this.dogBreed()}`);

  constructor(private readonly fb: FormBuilder) {
    effect(() => console.log(`Effect: ${this.computed()}`));
  }

  exampleForm = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    address: this.fb.group({
      street: [''],
    }),
  });

  getAddress(): string | null {
    return this.exampleForm.getRawValue().address.street;
  }
}
