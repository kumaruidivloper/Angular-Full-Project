import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityTypeBadgeComponent } from './entity-type-badge.component';

describe('EntityTypeBadgeComponent', () => {
  let component: EntityTypeBadgeComponent;
  let fixture: ComponentFixture<EntityTypeBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityTypeBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityTypeBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
