import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OutputService {

  constructor() { }

  getOutput(formValues): CalcResult {
    // get the form values and calculation type, then return the desired result, calculation string, and explanatory notes.
    const Vc = Math.round(0.65 * 0.18 * Math.sqrt(formValues.fc) * formValues.bw * formValues.h * 10) / 10;
    const myoutput = `
    <p>Concrete contribution, Vc:</p>
    <p>Vc = ϕ<sub>c</sub> λ β √f<sub>c</sub> b d<sub>v</sub></p>
    <p>Vc = 0.65 * 1.0 * 0.18 * √${formValues.fc} * ${formValues.bw} * ${formValues.h}</p>
    <p>Vc = ${Vc} kip</p>`;
    const mynotes = `β assumed to be 0.18.\nλ assumed to be 1.0 (normal-weight concrete)`;
    const result: CalcResult = {output: myoutput, notes: mynotes};
    return result;
  }
}

export interface CalcResult {
  output: string;
  notes: string;
}
