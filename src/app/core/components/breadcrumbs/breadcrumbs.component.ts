import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Breadcrumb } from './breadcrumb.model';
import 'rxjs/add/operator/filter';


@Component({
  selector: 'tm-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  encapsulation: ViewEncapsulation.None
})

export class BreadcrumbsComponent implements OnInit {

  public breadcrumbs: Breadcrumb[];

  public constructor(private activatedRoute: ActivatedRoute) {
  }

  private getBreadcrumbs(): Breadcrumb[] {
    let breadcrumbs: Breadcrumb[] = [];
    let currentRoute = this.activatedRoute.snapshot;

    while (currentRoute !== null) {
      if (currentRoute.routeConfig
        && currentRoute.routeConfig.data
        && currentRoute.routeConfig.data.breadcrumb) {

        breadcrumbs = [
          {
            route:  this.getUrl(currentRoute),
            label: currentRoute.routeConfig.data.breadcrumb
          },
          ...breadcrumbs
        ];
      }

      currentRoute = currentRoute.parent;
    }
    return breadcrumbs;
  }

  private getUrl(currentRoute: ActivatedRouteSnapshot): string {
    return '/' + currentRoute.url.map(segment => segment.path).join('/');
  }

  public ngOnInit() {
    this.breadcrumbs = this.getBreadcrumbs();
  }
}
