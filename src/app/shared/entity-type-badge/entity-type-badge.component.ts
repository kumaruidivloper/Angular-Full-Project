import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { EntityType, EntityTypeBadgeLabel } from './entity-type-badge.model';

@Component({
  selector: 'tm-entity-type-badge',
  templateUrl: './entity-type-badge.component.html',
  styleUrls: ['./entity-type-badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityTypeBadgeComponent implements OnInit {
  @Input() type: EntityType;

  public Types = EntityType;
  public Labels = EntityTypeBadgeLabel;

  constructor() { }

  ngOnInit() {
  }

}
