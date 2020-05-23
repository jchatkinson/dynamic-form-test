import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { CalcService, ICalc } from '../calc.service';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss']
})
export class CalcComponent {
  title = 'dynamic-forms';
  header: any;
  calc: ICalc;
  formGroup: FormGroup;
  notes: string;
  output: string;
  form = new FormGroup({});
  model = { };
  fields: FormlyFieldConfig[] = [];

  solution = '';

  constructor(private fb: FormBuilder, private calcService: CalcService) {}

  ngOnInit() {
    this.calcService.getCalc('shear design').subscribe(c => {
      this.calc = c;
      this.fields = c.fields;
      this.model = c.model;
      this.output = c.output;
    });
    this.calcService.getHeader().subscribe(h => this.header = h);
  }

  onSubmit() {
    // console.log(this.formGroup);
  }

  onClear() {
    this.formGroup.reset();
    this.notes = '';
    this.output = '<p>Click submit to proceed...</p>';
  }
  saveCalc() {
    console.log("user accounts not implemented, yet");
  }

  clearForm() {

  }
}
