import { Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import { isStringControl, RankedTester, rankWith } from '@jsonforms/core';

@Component({
    selector: 'app-custom-input',
    template: `
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">
        {{ label }}
        <span class="text-red-500" *ngIf="required">*</span>
      </label>
      <input
        [type]="getInputType()"
        [value]="data || ''"
        (input)="onChange($event)"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        [class.border-red-500]="!isValid"
      />
      <p *ngIf="!isValid" class="text-red-500 text-xs italic">
        {{ error }}
      </p>
    </div>
  `
})
export class CustomInputRenderer extends JsonFormsControl {
    getInputType(): string {
        const path = this.scopedSchema.scope;
        if (path.includes('email')) return 'email';
        if (path.includes('age')) return 'number';
        return 'text';
    }
}

export const customInputTester: RankedTester = rankWith(3, isStringControl); 