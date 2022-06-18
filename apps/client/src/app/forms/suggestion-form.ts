import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

const formBuilder = new FormBuilder();
const getForm = () =>
  formBuilder.group({
    title: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      },
    ],
    category: [
      '',
      {
        validators: [Validators.required],
      },
    ],
    feedback: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(500),
        ],
      },
    ],
  });

export class SuggestionForm extends FormGroup {
  constructor() {
    super(getForm().controls);
  }

  get title(): AbstractControl {
    return this.get('title') as AbstractControl;
  }

  get category(): AbstractControl {
    return this.get('category') as AbstractControl;
  }

  get feedback(): AbstractControl {
    return this.get('feedback') as AbstractControl;
  }
}
