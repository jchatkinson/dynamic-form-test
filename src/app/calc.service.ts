import { Injectable, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Injectable({
  providedIn: 'root'
})
export class CalcService {
  fields = [
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

  constructor() { }

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
      title: 'Test Form',
      subtitle: 'Example dynamic form',
      image: './assets/beam.jpg',
      fields: this.fields,
      model: {},
      output: 'a*b = c',
      notes: 'some notes'
    }];

    return of(calcs[0]);
  }
}

export interface ICalc {
  title: string;
  subtitle: string;
  image: string;
  fields: FormlyFieldConfig[];
  model: Object
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