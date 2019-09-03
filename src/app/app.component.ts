import { Component, OnInit } from '@angular/core';
import { DynamicFormModel, DynamicFormService } from '@ng-dynamic-forms/core';
import { MY_FORM_MODEL } from './dynamic-form.model';
import { FormGroup } from '@angular/forms';
import { OutputService } from './output.service';
import { CalcService, ICalc } from './calc.service';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dynamic-forms';
  header: any;
  calc: ICalc;
  formModel: DynamicFormModel;
  formGroup: FormGroup;
  notes: string;
  output: string;

  constructor(private formService: DynamicFormService, private outputService: OutputService, private calcService: CalcService) {}

  ngOnInit() {
    this.calcService.getCalc('shear design').subscribe(c => {
      this.calc = c;
      this.output = c.output;
      this.formModel = c.input;
      this.formGroup = this.formService.createFormGroup(this.formModel);
    });
    this.calcService.getHeader().subscribe(h => this.header = h);
  }

  onSubmit() {
    // console.log(this.formGroup);
    const values = this.formGroup.value;
    const result = this.outputService.getOutput(1, values);
    this.output = result.output;
    this.notes = result.notes;
  }

  onClear() {
    this.formGroup.reset();
    this.notes = '';
    this.output = '<p>Click submit to proceed...</p>';
  }
  saveCalc() {
    console.log("user accounts not implemented, yet");
  }
}
