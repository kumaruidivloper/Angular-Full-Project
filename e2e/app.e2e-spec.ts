import { TmpPage } from './app.po';

describe('tmp App', () => {
  let page: TmpPage;

  beforeEach(() => {
    page = new TmpPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
