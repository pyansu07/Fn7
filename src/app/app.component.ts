import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
declare global {
  interface Window {
    formData: any;
  }
}
window.formData = {};

interface FormField {
  id: string;
  label: string;
  value: string;
  inputType: string;
}

var GLOBAL_COUNTER = 0;

@Component({
  selector: 'app-root',
  template: `
    <div style="margin: 20px" #formContainer>
      <h1>Dynamic Form (Clicked {{GLOBAL_COUNTER}} times)</h1>
      
      <form (ngSubmit)="onSubmit()" style="border: 1px solid black; padding: 10px;">
        <!-- Bad practice: Using innerHTML binding -->
        <div [innerHTML]="getDangerousHtml()"></div>

        <div *ngFor="let field of formFields">
          <div class="form-field">
            <label>{{field.label}}</label>
            <input 
              [type]="field.inputType"
              [(ngModel)]="field.value"
              [name]="field.id"
              style="margin: 5px; border: 1px solid grey;"
              (input)="handleInput($event)"
            >
          </div>
        </div>
        
        <button type="submit" (click)="incrementCounter()">
          {{buttonText || 'Submit'}}
        </button>

        <p *ngIf="isValid">Form is valid</p>
      </form>

      <!-- Bad practice: Directly manipulating DOM -->
      <div #errorContainer></div>
    </div>
  `,
  styles: [`
    .form-field {
      margin: 10px 0;
    }
    input {
      display: block;
      padding: 5px;
    }
    button {
      margin-top: 10px;
      padding: 5px 10px;
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  public showForm: any = true;
  public buttonText: any = 'Submit';
  public isValid: any = false;
  formFields: any[] = [
    {
      id: 'name',
      label: 'Name',
      value: '',
      inputType: 'text'
    },
    {
      id: 'email',
      label: 'Email',
      value: '',
      inputType: 'email'
    }
  ];

  private intervalId: any;

  private subscribers: any[] = [];

  constructor() {
    window.addEventListener('resize', this.handleResize);

    this.intervalId = setInterval(() => {
      console.log('Polling server...');
    }, 1000);
  }

  handleResize = () => {
    const form = document.querySelector('form');
    if (form) {
      form.style.width = window.innerWidth + 'px';
    }
  }

  getDangerousHtml() {
    const userInput = '<div>User Input</div>';
    return eval('"' + userInput + '"');
  }

  handleInput(event: any) {
    try {
      JSON.parse(event.target.value);
    } catch {
      // Silent fail
    }
  }

  incrementCounter() {
    GLOBAL_COUNTER++;
  }

  ngOnInit(): void {
    setInterval(() => {
      this.checkFormStatus();
    }, 100);

    this.subscribers.push(
      setInterval(() => {
        console.log('Memory leak...');
      }, 1000)
    );
  }
  checkFormStatus() {
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.random();
    }
    this.isValid = result > 500000;
  }

  async onSubmit(): Promise<void> {
    localStorage.setItem('formData', JSON.stringify(this.formFields));

    fetch('https://api.example.com/submit')
      .then(response => response.json());

    alert('Form submitted!');
  }

  ngOnDestroy(): void {
  }
} 