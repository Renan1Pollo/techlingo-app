import { CommonModule } from '@angular/common';
import {
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-selection-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './selection-input.component.html',
  styleUrl: './selection-input.component.scss',
})
export class SelectionInputComponent implements OnInit, OnChanges, DoCheck {
  @Input() form!: FormGroup;
  @Input() label: string = '';
  @Input() controlName: string = '';
  @Input() currency: boolean = false;
  @Input() values!: string[];

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (this.currency) {
        let currencyField = document.getElementById(this.controlName);
      }
    }
  }

  onSelectionChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.form.get(this.controlName)?.setValue(selectedValue);
  }

  ngDoCheck(): void {}
}
