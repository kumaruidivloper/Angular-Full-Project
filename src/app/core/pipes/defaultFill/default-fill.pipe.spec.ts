import { DefaultFillPipe } from './default-fill.pipe';
describe('Default text Pipe for text placeholder in Table', () => {
  let pipe: DefaultFillPipe;

  beforeEach(() => {
    pipe = new DefaultFillPipe();
  });

  it('Transform null text to default placeholder', () => {
    const value = null;
    expect(pipe.transform(value)).toMatch('--');
  });
  it('Transform empty text to default placeholder', () => {
    const value = '';
    expect(pipe.transform(value)).toMatch('--');
  });
  it('With text value, no default placeholder', () => {
    const value = 'Test';
    expect(pipe.transform(value)).not.toMatch('--');
  });

});
