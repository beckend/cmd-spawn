/* tslint:disable: chai-vague-errors */
import { parseCmd } from '../parse-cmd';
import { expect } from 'chai';

describe('api', () => {
  it('parse cmd only sanitizes spaces', () => {
    const result = parseCmd({
      cmd: '  ls   -lah    /tmp   ',
    });
    expect(result.cmd)
      .to.equal('ls');
    expect(result.cmdArgs)
      .to.deep.equal(['-lah', '/tmp']);
  });

  it('parse does not handle pipe or arrows', () => {
    const result = parseCmd({
      cmd: ' ls    -lah   /tmp  |  grep  test > /dev/null',
    });
    expect(result.cmd)
      .to.equal('ls');
    expect(result.cmdArgs)
      .to.deep.equal(['-lah', '/tmp', '|', 'grep', 'test', '>', '/dev/null']);
  });
});
