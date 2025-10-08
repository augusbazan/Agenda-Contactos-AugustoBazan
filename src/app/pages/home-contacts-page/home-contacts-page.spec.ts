import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeContactsPage } from './home-contacts-page';

describe('HomeContactsPage', () => {
  let component: HomeContactsPage;
  let fixture: ComponentFixture<HomeContactsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeContactsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeContactsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
