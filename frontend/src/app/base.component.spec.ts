import { TestBed } from '@angular/core/testing';
import { BaseComponent } from './base.component';
class MyComponent extends BaseComponent {
  constructor() {
    super();
  }
}
describe('BaseComponent', () => {
  let myComponent: MyComponent;
  beforeEach(() => {
    myComponent = new MyComponent();
  });

  it('trackby Index', () => {
    const trackedIndex = myComponent.trackByIndex(1, undefined);
    expect(trackedIndex).toBe(1);
  });
});
