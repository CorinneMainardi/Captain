import { Component, Input } from '@angular/core';
import { iStoria } from '../../interfaces/istoria';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrl: './shared.component.scss',
})
export class SharedComponent {
  @Input() storia!: Partial<iStoria>;
}
