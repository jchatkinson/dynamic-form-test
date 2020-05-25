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
  calc = new ICalc();
  formGroup: FormGroup;
  // notes: string;
  // output: string;
  form = new FormGroup({});
  // model = { };
  // fields: FormlyFieldConfig[] = [];

  solution = '';

  constructor(private calcService: CalcService) {}

  ngOnInit() {
    this.calcService.getCalc('').subscribe(c => {
      console.log(c);
      if (c.model === null) {
        c.model = {};
      }
      this.calc = c;
    });
    this.calcService.getHeader().subscribe(h => this.header = h);
  }

  onSubmit() {
    if (this.form.valid) {
      this.calcService.getSolution(this.calc.calcmethod, this.calc.model).subscribe(r => {
        console.log(r);
        this.calc.output = r.result;
      })     
    }
  }

  saveCalc() {
    console.log("user accounts not implemented, yet");
  }

  clearForm() {
    this.calc.model = {};
  }
}
