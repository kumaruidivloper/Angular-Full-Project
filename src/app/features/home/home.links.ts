import { HomeLink } from './home.model';

export const homeLinks: HomeLink[] = [
  {
    text: 'Test Overview',
    icon: 'fa fa-pencil-square-o',
    route: ['test'],
    iconColor: '#900'
  },
  {
    text: 'Procedure Overview',
    icon: 'fa fa-sitemap',
    route: ['procedure'],
    iconColor: '#c63'
  },
  {
    text: 'Sequence Overview',
    icon: 'fa fa-cubes',
    route: ['sequence'],
    iconColor: '#33c'
  },
  {
    text: 'Routine Overview',
    icon: 'fa fa-road',
    route: ['routine'],
    iconColor: '#333'
  },
  {
    text: 'Test Case-Step Overview',
    icon: 'fa fa-check-square',
    route: ['test-case-step'],
    iconColor: '#393'
  },
  {
    text: 'Test Progress',
    icon: 'fa fa-road',
    route: ['test-progress'],
    iconColor: '#393'
  }
];

