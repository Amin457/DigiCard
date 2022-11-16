/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VenteComponent } from './vente.component';

describe('VenteComponent', () => {
  let component: VenteComponent;
  let fixture: ComponentFixture<VenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
