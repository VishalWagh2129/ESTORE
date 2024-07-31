import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluginsAddComponent } from './plugins-add.component';

describe('PluginsAddComponent', () => {
  let component: PluginsAddComponent;
  let fixture: ComponentFixture<PluginsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PluginsAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PluginsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
