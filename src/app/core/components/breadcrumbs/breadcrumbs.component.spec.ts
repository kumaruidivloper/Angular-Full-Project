import { BreadcrumbsComponent } from './breadcrumbs.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { Breadcrumb } from './breadcrumb.model';

describe('Breadcrumbs', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  const mockActivatedRoute = {
    snapshot: {
      url: [{path: 'test3'}, {path: 'test'}],
      parent: {
        url: [{path: 'test2'}],
        parent: {
          url: [{path: 'test3'}],
          parent: null,
          routeConfig: {
            data: {
              breadcrumb: 'Test3'
            }
          }
        },
        routeConfig: {}
      },
      routeConfig: {
        data: {
          breadcrumb: 'Test'
        }
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BreadcrumbsComponent
      ],
      imports: [RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute}
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(BreadcrumbsComponent, '')
      .createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should define an API', () => {
    fixture.detectChanges();
    expect(component.breadcrumbs).toBeDefined();
  });

  it('should extract breadcrumbs from the activated route', () => {
    fixture.detectChanges();
    const breadcrumbs: Breadcrumb[] = [
      {
        label: 'Test3',
        route: '/test3'
      },
      {
        label: 'Test',
        route: '/test3/test'
      }
    ];

    expect(component.breadcrumbs).toBeTruthy();
    expect(component.breadcrumbs).toEqual(breadcrumbs);
  });


});
