import { IMenuItem } from './main-menu.i';

export class MainMenuSettings {
  public static menuItems: IMenuItem[] = [
    { name: 'MENU.TEST', link: '/test' },
    { name: 'MENU.PROCEDURE', link: '/procedure' },
    { name: 'MENU.SEQUENCE', link: '/sequence' },
    { name: 'MENU.ROUTINE', link: '/routine' },
    { name: 'MENU.TESTCASESTEP', link: '/test-case-step' },
    { name: 'MENU.TESTPROGRESS', link: '/test-progress' }
  ];
}
