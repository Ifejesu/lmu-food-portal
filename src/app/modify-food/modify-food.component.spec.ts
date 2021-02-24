import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyFoodComponent } from './modify-food.component';

describe('ModifyFoodComponent', () => {
  let component: ModifyFoodComponent;
  let fixture: ComponentFixture<ModifyFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyFoodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
