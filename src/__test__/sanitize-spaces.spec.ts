import { sanitizeSpaces } from '../sanitize-spaces';
import { expect } from 'chai';

describe('sanitizeSpaces', () => {
  it('sanitize 1', () => {
    const result = sanitizeSpaces('  ls     -lah     /tmp  ');
    expect(result)
      .to.equal('ls -lah /tmp');
  });

  it('does not modify anyting else but spaces', () => {
    const expected = 'node --version --parem=$HOME +3213 sadsdas=312+3';
    const result = sanitizeSpaces(expected);
    expect(result)
      .to.equal(expected);
  });
});
