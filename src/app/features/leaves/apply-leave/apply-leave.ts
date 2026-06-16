// apply-leave.component.ts

import { CommonModule } from '@angular/common';

import {
  Component,
  OnInit,
  signal,
} from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  faBolt,
  faCalendarDays,
  faCircleInfo,
  faPaperPlane,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

function dateRangeValidator(
  group: AbstractControl,
): ValidationErrors | null {

  const start =
    group.get('startDate')?.value;

  const end =
    group.get('endDate')?.value;

  if (!start || !end) {
    return null;
  }

  return new Date(start) <= new Date(end)
    ? null
    : { range: true };
}

@Component({
  selector: 'app-apply-leave',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  templateUrl:
    './apply-leave.html',
  styleUrl:
    './apply-leave.scss',
})
export class ApplyLeave
  implements OnInit {

  form!: FormGroup;

  submitting = signal(false);

  faCalendarDays =
    faCalendarDays;

  faPaperPlane =
    faPaperPlane;

  faCircleInfo =
    faCircleInfo;

  faBolt = faBolt;

  faXmark = faXmark;

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group(
      {
        type: [
          'Leave',
          Validators.required,
        ],

        leaveType: [
          'Casual',
        ],

        startDate: [
          '2026-05-29',
          Validators.required,
        ],

        endDate: [
          '2026-05-29',
          Validators.required,
        ],

        halfDay: [false],

        halfDaySlot: [
          'First half',
        ],

        reason: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(200),
          ],
        ],
      },
      {
        validators:
          dateRangeValidator,
      },
    );
  }

  get days(): number {

    const start =
      this.form.get('startDate')
        ?.value;

    const end =
      this.form.get('endDate')
        ?.value;

    if (!start || !end) {
      return 0;
    }

    const ms =
      new Date(end).getTime() -
      new Date(start).getTime();

    const total =
      Math.round(ms / 86400000) + 1;

    if (total <= 0) {
      return 0;
    }

    return this.form.get('halfDay')
      ?.value && total === 1
      ? 0.5
      : total;
  }

  submit(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    this.submitting.set(true);

    setTimeout(() => {

      this.submitting.set(false);

      console.log(this.form.value);

      alert(
        'Request submitted 🎉',
      );

    }, 1500);
  }

  cancel(): void {

    this.form.reset({
      type: 'Leave',
      leaveType: 'Casual',
      startDate: '2026-05-29',
      endDate: '2026-05-29',
      halfDay: false,
      halfDaySlot: 'First half',
      reason: '',
    });
  }

  
}