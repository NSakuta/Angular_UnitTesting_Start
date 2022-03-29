import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { AlertButtonComponent } from './alert-button.component';
import { MessageService } from './messageService';

describe('AlertButtonComponent', () => {
  let component: AlertButtonComponent;
  let fixture: ComponentFixture<AlertButtonComponent>;
  let de: DebugElement;

  let serviceStub: any;

  beforeEach(async () => {

    serviceStub = {
      getMessage: () => of('quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto')
    };

    await TestBed.configureTestingModule({
      declarations: [ AlertButtonComponent ],
      providers: [{ provide: MessageService, useValue: serviceStub}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertButtonComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* it('should have a message with `warn`', () => {
    expect(component.content).toContain('warn');
  }) */
  
  it('should have a message greater than 2', () => {
    expect(component.severity).toBeGreaterThan(2);
  })

  it('should have an H1 tag of `Alert Button`', () => {
    expect(de.query(By.css('h1')).nativeElement.innerText).toBe('Alert Button');
  })

  it('should toggle the message boolean', () => {
    expect(component.hideContent).toBeTruthy();
    component.toggle();
    expect(component.hideContent).toBeFalsy();
  })

  it('should toggle the message asynchronously', fakeAsync(() => {
    expect(component.hideContent).toBeTruthy();
    component.toggleAsync();
    tick(501);
    expect(component.hideContent).toBeFalsy();
  }))

  it('should have message content defined from an observable', () => {
    component.content.subscribe(content => {
      expect(content).toBeDefined();
      expect(content).toBe('quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto')
    })
  })


});


