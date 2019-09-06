import { Injectable, Input } from '@angular/core';
import { DynamicFormModel, DynamicFormService } from '@ng-dynamic-forms/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalcService {

  constructor(private formService: DynamicFormService) { }

  getHeader(): Observable<IHeader> {
    const header = {
      company: 'ABC Engineering Ltd.',
      project: '50154-01',
      designer: 'John Doe',
      date: new Date(),
    };
    return of(header);
  }

  getCalc(name: string): Observable<ICalc> {
    const calcs = [{
      title: 'One-Way Shear Capacity of Reinforced Concrete Members',
      subtitle: 'Calculated as per CSA A23.3-14 cl. 11',
      image: './assets/beam.jpg',
      input: this.formService.fromJSON(formShearDesign),
      output: '<p>Vc = ϕ<sub>c</sub> λ β √f<sub>c</sub> b d<sub>v</sub></p><p>Click submit to proceed...</p>',
      notes: ''
    }, {
      title: 'Flexural Capacity of Reinforced Concrete Members',
      subtitle: 'Calculated as per CSA A23.3-14 cl. 10',
      image: '',
      input: this.formService.fromJSON(formFlexureDesign),
      output: '<p>Vc = ϕ<sub>c</sub> λ β √f<sub>c</sub> b d<sub>v</sub></p><p>Click submit to proceed...</p>',
      notes: ''
    }];

    return of(calcs[1]);
  }
}

export interface ICalc {
  title: string;
  subtitle: string;
  image: string;
  input: DynamicFormModel;
  output: string;
  notes: string;
}

export interface IHeader {
  company: string;
  designer: string;
  date: Date;
}

export const UNIT_CONVERSIONS = {
  MPa_ksi: 145.0377 / 1000,
  MPa_psi: 145.0377,
  ksi_MPa: 6.894757,
  psi_MPa: 0.006894757,
  in_mm: 25.4,
  mm_in: 1 / 25.4,
};

const formShearDesign = JSON.stringify([{
  type: 'INPUT',
  inputType: 'number',
  id: 'fc',
  label: 'Concrete Strength',
  prefix: 'f<sub>c</sub> = ',
  suffix: 'ksi',
  value: 5.0,
  min: 0,
  max: 20,
  required: true
},{
  type: 'INPUT',
  inputType: 'number',
  id: 'bw',
  label: 'Width',
  prefix: 'b<sub>w</sub> = ',
  suffix: 'in',
  value: 24,
  min: 0,
  required: true
},{
  type: 'INPUT',
  inputType: 'number',
  id: 'dv',
  label: 'shear depth',
  prefix: 'd<sub>v</sub> = ',
  suffix: 'in',
  value: 36,
  min: 0,
  required: true
},{
  type: 'INPUT',
  inputType: 'number',
  id: 'beta',
  label: 'Beta',
  prefix: 'β = ',
  value: 0.18,
  min: 0,
  required: true
},{
  type: 'INPUT',
  inputType: 'number',
  id: 'lambda',
  label: 'Concrete density factor',
  prefix: 'λ = ',
  value: 1.0,
  min: 0,
  required: true
},{
  type: 'INPUT',
  inputType: 'number',
  id: 'phiC',
  label: 'Concrete material factor',
  prefix: 'ϕ<sub>c</sub> = ',
  value: 0.65,
  min: 0,
  required: true
}]);

const formFlexureDesign = JSON.stringify([{
  type: 'INPUT',
  inputType: 'number',
  id: 'fc',
  label: 'Concrete Strength',
  prefix: 'f<sub>c</sub> = ',
  suffix: 'ksi',
  value: 5.0,
  min: 0,
  required: true
},{
  type: 'INPUT',
  inputType: 'number',
  id: 'fy',
  label: 'Reinforcing Yield Strength',
  prefix: 'f<sub>y</sub> = ',
  suffix: 'ksi',
  value: 58.0,
  min: 0,
  required: true
},{
  type: 'INPUT',
  inputType: 'number',
  id: 'bw',
  label: 'Width',
  prefix: 'b<sub>w</sub> = ',
  suffix: 'in',
  value: 24,
  min: 0,
  required: true
},{
  type: 'INPUT',
  inputType: 'number',
  id: 'd',
  label: 'flexural depth',
  prefix: 'd = ',
  suffix: 'in',
  value: 36,
  min: 0,
  required: true
},{
  type: 'INPUT',
  inputType: 'number',
  id: 'phiC',
  label: 'Concrete Material Factor',
  prefix: 'ϕ<sub>c</sub> = ',
  value: 0.65,
  min: 0,
  required: true
},{
  type: 'INPUT',
  inputType: 'number',
  id: 'phiS',
  label: 'Steel Material Factor',
  prefix: 'ϕ<sub>s</sub> = ',
  value: 0.85,
  min: 0,
  required: true
},{
  type: 'INPUT',
  inputType: 'number',
  id: 'As',
  label: 'Flexural Steel',
  prefix: 'A<sub>s</sub> = ',
  suffix: 'in<sup>2</sup>',
  value: 2.325,
  min: 0,
  required: true
}]);

const formBeam1 = JSON.stringify([{
  type: 'INPUT',
  inputType: 'number',
  id: 'L',
  label: 'Beam Length',
  prefix: 'L = ',
  suffix: 'in',
  value: 120,
  min: 0,
  required: true
}, {
  type: 'INPUT',
  inputType: 'number',
  id: 'w',
  label: 'Load',
  prefix: 'w = ',
  suffix: 'lb/in',
  value: 5,
  required: true
}]);

const formBeam2 = JSON.stringify([{
  type: 'INPUT',
  inputType: 'number',
  id: 'L',
  label: 'Beam Length',
  prefix: 'L = ',
  suffix: 'in',
  value: 120,
  min: 0,
  required: true
}, {
  type: 'INPUT',
  inputType: 'number',
  id: 'w',
  label: 'Load',
  prefix: 'w = ',
  suffix: 'lb/in',
  value: 5,
  required: true
}, {
  type: 'INPUT',
  inputType: 'number',
  id: 'b',
  label: 'Length of Load',
  prefix: 'b = ',
  suffix: 'in',
  value: 10,
  required: true,
  min: 0
}]);
