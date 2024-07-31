import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluginsDetailComponent } from './plugins-detail.component';

describe('PluginsDetailComponent', () => {
  let component: PluginsDetailComponent;
  let fixture: ComponentFixture<PluginsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PluginsDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PluginsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
