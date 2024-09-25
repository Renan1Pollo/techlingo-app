import { CommonModule } from '@angular/common';
import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';


@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,NgxMaskDirective, NgxMaskPipe],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent implements OnInit, OnChanges, DoCheck {
  @Input() form!: FormGroup;
  @Input() label: string = '';
  @Input() controlName: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() currency: boolean = false;
  @Input() disabled: boolean = false;
  @Input() maxlength: any;
  @Input() minlength: any;
  @Input() asteriskRequired: boolean = true;
  @Input() mask: string = '';

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (this.currency) {
        let currencyField = document.getElementById(this.controlName);
      }
    }
  }

  ngDoCheck(): void {}
}
