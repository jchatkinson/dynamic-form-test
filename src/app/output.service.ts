import { Injectable } from '@angular/core';
import { UNIT_CONVERSIONS as conv } from './calc.service';

@Injectable({
  providedIn: 'root'
})
export class OutputService {
  constructor() { }

  getOutput(type, i): CalcResult {
    // get the form values and calculation type, then return the desired result, calculation string, and explanatory notes.
    console.log(i);
    let myoutput = '';
    let mynotes = '';

    switch (type) {
      case 0:
        const Vc = Math.round(i.phiC * i.beta * Math.sqrt(i.fc * conv.ksi_MPa) * conv.MPa_ksi * i.bw * i.dv * 100) / 100;
        myoutput = `
          <p>Concrete contribution, Vc:</p>
          <p>Vc = ϕ<sub>c</sub> λ β √f<sub>c</sub> b d<sub>v</sub></p>
          <p>Vc = ${i.phiC} * ${i.lambda} * ${i.beta} * √${Math.round(i.fc * conv.ksi_MPa * 10) / 10} / ${conv.ksi_MPa} * ${i.bw} * ${i.dv}</p>
          <p>Vc = ${Vc} kip</p>`;
        mynotes = `
          For f'c < 60 MPa and fy < 400MPa, theta can usually be taken as 35°.

          If minimum transverse reinforcement is provided, β can be 0.18.

          If no transverse reinforcement is provided, β can be 230 / (1000+dv).

          The values of Beta and Theta can be taken as 0.21 and 42° respectively for the following member types:
            -Slabs or footings thinner than 350mm
            -Footings than span out less than 2 times dv from the wall/column face
            -Beams thinner than 250mm
            -Beams cast with slabs where the depth is less than 550mm or one-half the web width`;
        break;

      case 1:
        const Tr = i.phiS * i.fy * i.As;
        const alpha = Math.max(0.67, 0.85 - 0.0015 * i.fc * conv.ksi_MPa);
        const beta = Math.max(0.67, 0.97 - 0.0025 * i.fc * conv.ksi_MPa);
        const a = Tr / (i.phiC * alpha * i.fc * i.bw);
        const Mr = Tr * (i.d - a / 2);
        myoutput = `
        <p>Equivalent stress block factors:</p>
        <p>α1 = 0.85 - 0.0015 fc [cl. 10.1.7]</p>
        <p>α1 = 0.85 - 0.0015 * ${Math.round(i.fc * conv.ksi_MPa * 10) / 10}</p>
        <p>α1 = ${alpha}</p>
        <span></span>
        <p>β1 = 0.97 - 0.0015 fc [cl. 10.1.7]</p>
        <p>β1 = 0.97 - 0.0015 fc [cl. 10.1.7]</p>
        <p>β1 = ${beta} [cl. 10.1.7]</p>
        `

        break;
      default:
        break;
    }

    const result: CalcResult = { output: myoutput, notes: mynotes };
    return result;
  }
}

export interface CalcResult {
  output: string;
  notes: string;
}
