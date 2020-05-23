import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss']
})
export class CalcComponent {
  form = new FormGroup({});
  model = { email: 'email@gmail.com' };
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
      }
    }
  ];

  header = {
    company: 'ABC Engineering Ltd.',
    designer: 'John Doe',
    date: new Date(),
  };
  calc = {
    title: "Example Calc",
    subtitle: "Using a dynamic form to generate a calc",
    img: "/assets/beam.jpg"
  };
  notes = '';
  solution = '';

  constructor(private fb: FormBuilder) {}

  clearForm() {

  }

  onSubmit() {
    alert('Thanks!');
  }
}
