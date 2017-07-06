import { HRPage } from './app.po';

describe('hr App', () => {
  let page: HRPage;

  beforeEach(() => {
    page = new HRPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
