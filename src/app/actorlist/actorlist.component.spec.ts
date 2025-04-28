import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorlistComponent } from './actorlist.component';

describe('ActorlistComponent', () => {
  let component: ActorlistComponent;
  let fixture: ComponentFixture<ActorlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActorlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActorlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
