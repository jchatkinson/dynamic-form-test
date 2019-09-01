import { Component } from '@angular/core';
import { DynamicFormModel, DynamicFormService } from '@ng-dynamic-forms/core';
import { MY_FORM_MODEL } from './dynamic-form.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dynamic-forms';
  calc = {
    title: "My Calculation Template",
    subtitle: "My calculation subtitle",
    input: [{
      "type":"INPUT",
      "inputType":"number",
      "id":"fc",
      "label": "Concrete Strength",
      "prefix": "f<sub>c</sub> = ",
      "suffix": "ksi",
      "value": 5.0,
      "min": 0,
      "max":20
    },
    {
      "type":"INPUT",
      "inputType":"number",
      "id":"bw",
      "label": "Width",
      "prefix": "b<sub>w</sub> = ",
      "suffix": "in",
      "value": 24,
      "min": 0
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
    }],
    output: '<p>This is my html output</p><p>It can be multiline</p>',
    notes: []
  };
  formModel: DynamicFormModel = this.formService.fromJSON(this.calc.input);
  formGroup: FormGroup;

  constructor(private formService: DynamicFormService) {}

  ngOnInit() {
    this.formGroup = this.formService.createFormGroup(this.formModel);
  }
}
