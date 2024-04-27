import { Component, ViewChild, TemplateRef, NgModule } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <button nz-button nzType="primary" (click)="show('100%')">Показать дровер во всю высоту</button>

    <br>
    <br>

    
    <button nz-button nzType="primary" (click)="show('')">Показать дровер с высотой 378px</button>
    

    <ng-template #tpl>

      <form [formGroup]="fg" nz-form nzLayout="vertical">
        <nz-form-item>
          <nz-form-label>Способ оплаты</nz-form-label>
          <nz-form-control [nzErrorTip]="errorTpl">
            <input formControlName="type" nz-input> 
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label>Сумма</nz-form-label>
          <nz-form-control [nzErrorTip]="errorTpl">
            <input formControlName="amount" nz-input> 
          </nz-form-control>
        </nz-form-item>

        <nz-alert *ngIf="showAlert" nzType="error" style="margin-bottom: 16px" nzMessage="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad animi, assumenda blanditiis debitis dignissimos distinctio eos facilis in iusto libero magni minus nulla odit provident recusandae reprehenderit sequi ut voluptates."></nz-alert>

        <nz-alert *ngIf="showAlert" nzType="error" style="margin-bottom: 16px" nzMessage="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad animi, assumenda blanditiis debitis dignissimos distinctio eos facilis in iusto libero magni minus nulla odit provident recusandae reprehenderit sequi ut voluptates."></nz-alert>

        <nz-alert *ngIf="showAlert" nzType="error" style="margin-bottom: 16px" nzMessage="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad animi, assumenda blanditiis debitis dignissimos distinctio eos facilis in iusto libero magni minus nulla odit provident recusandae reprehenderit sequi ut voluptates."></nz-alert>

        <nz-alert *ngIf="showAlert" nzType="error" style="margin-bottom: 16px" nzMessage="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad animi, assumenda blanditiis debitis dignissimos distinctio eos facilis in iusto libero magni minus nulla odit provident recusandae reprehenderit sequi ut voluptates."></nz-alert>

        <nz-alert *ngIf="showAlert" nzType="error" style="margin-bottom: 16px" nzMessage="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad animi, assumenda blanditiis debitis dignissimos distinctio eos facilis in iusto libero magni minus nulla odit provident recusandae reprehenderit sequi ut voluptates."></nz-alert>

        <button style="margin-bottom: 8px" type="button" nz-button nzType="primary" nzBlock (click)="showFieldErrors()">Показать ошибки у полей </button>

        <button type="button" nz-button nzType="primary" nzBlock (click)="showFormErrors()">Показать общую ошибку формы</button>


        <ng-template #errorTpl let-control>
              <ng-container *ngIf="control.hasError('required')"
                >Required</ng-container
              >
            </ng-template>
      </form>
    </ng-template>
`,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzDrawerModule,
    NzInputModule,
    NzFormModule,
    NzButtonModule,
    NzSpaceModule,
    NzAlertModule,
  ],
})
export class App {
  @ViewChild('tpl') tpl?: TemplateRef<any>;
  name = 'Angular';

  showAlert = false;
  fg = this.fb.group({
    type: ['', [Validators.required]],
    amount: ['', [Validators.required]],
  });

  show(h: string) {
    const opt = {
      nzPlacement: 'bottom',
      nzTitle: 'Пополнение баланса',
      nzContent: this.tpl,
      ...(h ? { nzHeight: h } : {}),
    } as const;

    const ref = this.drawer.create(opt);

    ref.afterClose.subscribe({
      next: () => {
        this.showAlert = false;
        Object.values(this.fg.controls).forEach((c) => {
          c.markAsPristine();
          c.updateValueAndValidity({ onlySelf: true });
        });
      },
    });
  }

  showFieldErrors() {
    Object.values(this.fg.controls).forEach((c) => {
      c.markAsDirty();
      c.updateValueAndValidity({ onlySelf: true });
    });
  }

  showFormErrors() {
    this.showAlert = true;
  }

  constructor(private drawer: NzDrawerService, private fb: FormBuilder) {}
}

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, App],
  bootstrap: [App],
})
class AppModule {}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
});
