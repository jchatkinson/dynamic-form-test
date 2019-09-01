import { Component, OnInit } from '@angular/core';
import { DynamicFormModel, DynamicFormService } from '@ng-dynamic-forms/core';
import { MY_FORM_MODEL } from './dynamic-form.model';
import { FormGroup } from '@angular/forms';
import { OutputService } from './output.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dynamic-forms';
  header = {
    company: 'ABC Engineering Ltd.',
    designer: 'John Doe',
    date: new Date(),
  };
  calc = {
    title: "One-Way Shear Capacity of Reinforced Concrete Members",
    subtitle: "Calculated as per CSA A23.3-14 cl. 11",
    image: './assets/beam.jpg',
    input: [{
      "type":"INPUT",
      "inputType":"number",
      "id":"fc",
      "label": "Concrete Strength",
      "prefix": "f<sub>c</sub> = ",
      "suffix": "ksi",
      "value": 5.0,
      "min": 0,
      "max":20,
      "required": true
    },
    {
      "type":"INPUT",
      "inputType":"number",
      "id":"bw",
      "label": "Width",
      "prefix": "b<sub>w</sub> = ",
      "suffix": "in",
      "value": 24,
      "min": 0,
      "required": true
    },
    {
      "type":"INPUT",
      "inputType":"number",
      "id":"h",
      "label": "depth",
      "prefix": "h = ",
      "suffix": "in",
      "value": 36,
      "min": 0,
      "required": true
    }],
    output: '<p>Click submit to proceed...</p>',
    notes: ''
  };
  formModel: DynamicFormModel = this.formService.fromJSON(this.calc.input);
  formGroup: FormGroup;
  output = this.calc.output;
  notes = this.calc.notes;

  constructor(private formService: DynamicFormService, private outputService: OutputService) {}

  ngOnInit() {
    this.formGroup = this.formService.createFormGroup(this.formModel);
  }

  onSubmit() {
    // console.log(this.formGroup);
    const values = this.formGroup.value;
    const result = this.outputService.getOutput(values);
    this.output = result.output;
    this.notes = result.notes;
  }

  onClear() {
    this.formGroup.reset();
    this.output = 'test';
    this.notes = this.calc.notes;
  }
}
