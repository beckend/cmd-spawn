/* tslint:disable: mocha-no-side-effect-code */
/* tslint:disable: chai-vague-errors */
/**
 * Main lib tests
 */
import {
  cmdSpawn,
} from '../index';
import * as cp from 'child_process';
import { expect } from 'chai';
import { isPromise } from '../is-promise';
import * as path from 'path';

const PATH_FIXTURES = path.join(__dirname, 'fixtures');
const isWin = process.platform === 'win32';

describe('buffered-spawn', () => {
  describe('api', () => {
    it('returns promise with undefined resolved, unbuffered, gives child proccess access', async () => {
      // shell should add a newline char
      const p = cmdSpawn('echo');
      expect(isPromise(p))
        .to.be.true;
      // And is a bluebird one
      expect(isPromise(p.timeout))
        .to.exist;

      // Exposes child process
      expect(p.cp)
        .to.be.an.instanceof((cp as any).ChildProcess);

      const result = await p;
      expect(result)
        .to.be.undefined;
    });

    it('runs unbufferd just fine', (done: jest.DoneCallback) => {
      const p = cmdSpawn(`node ${PATH_FIXTURES}/simple`);

      p.cp.on('data', (data: Buffer) => {
        expect(data)
          .to.be.an.instanceOf(Buffer);
      });

      p.cp.on('close', (code: number, signal: string | null) => {
        expect(code)
          .to.equal(0);
        expect(signal)
          .to.be.null;
        done();
      });
    });

    it('can buffer with correct params, buffered', async () => {
      const p = cmdSpawn('echo $TEST_ENV_CMD', {
        spawnOpts: {
          shell: true,
          env: {
            TEST_ENV_CMD: 'ok',
          },
        },
        buffer: true,
      });
      const result = await p;
      if (result) {
        expect(result.stdout)
          // Auto adds \n with shell
          .to.equal('ok\n');
        expect(result.stderr)
          .to.equal('');
      }
    });

    it('spawn node app 1 buffered', async () => {
      const p = cmdSpawn(`${PATH_FIXTURES}/hello`, {
        spawnOpts: {
          stdio: ['pipe', 'ignore', 'ignore'],
        },
        buffer: true,
      });
      const result = await p;
      // Ignored stdout and stderr
      expect(result)
        .to.deep.equal({
          stdout: '',
          stderr: '',
        });
    });
  });

  it('spawn node app 2, buffered', async () => {
    const p = cmdSpawn(`node ${PATH_FIXTURES}/echo foo --bar --help=me`, {
      buffer: true,
    });
    const result = await p;
    expect(result)
      .to.deep.equal({
        stdout: 'foo\n--bar\n--help=me',
        stderr: '',
      });
  });

  it('spawn node app 3, buffered', async () => {
    const p = cmdSpawn(`node ${PATH_FIXTURES}/simple`, {
      buffer: true,
    });
    const result = await p;
    expect(result)
      .to.deep.equal({
        stdout: 'i am being printed on stdout',
        stderr: 'i am being printed on stderr',
      });
  });

  it('should allow node\'s spawn\'s stdout to be ignored & inherited', async () => {
    const p = cmdSpawn('node simple', {
      spawnOpts: {
        cwd: `${PATH_FIXTURES}`,
        stdio: ['pipe', 'ignore', 'pipe'],
      },
      buffer: true,
    });
    const result = await p;
    expect(result)
      .to.deep.equal({
        stdout: '',
        stderr: 'i am being printed on stderr',
      });
  });

  it('should allow node\'s spawn\'s stdout to be ignored & inherited', async () => {
    const p = cmdSpawn('node simple', {
      spawnOpts: {
        cwd: `${PATH_FIXTURES}`,
        stdio: ['pipe', 'pipe', 'ignore'],
      },
      buffer: true,
    });
    const result = await p;
    expect(result)
      .to.deep.equal({
        stdout: 'i am being printed on stdout',
        stderr: '',
      });
  });

  it('should expand using PATH_EXT properly', async () => {
    if (!isWin) {
      return;
    }
    // Should expand to foo.bat
    const p = cmdSpawn(`${PATH_FIXTURES}/foo`, { buffer: true });
    const result = await p;
    if (result) {
      expect(result.stdout.trim()).to.equal('foo');
    }

    // Fail when no crossSpawn
    const p2 = cmdSpawn(`${PATH_FIXTURES}/foo`, { buffer: true, crossSpawn: false });
    try {
      await p2;
    } catch (er) {
      expect(er).to.be.an.instanceOf(Error);
      expect(er.code).to.be('ENOENT');
    }
  });

  it('should handle multibyte properly', async () => {
    const p = cmdSpawn(`node ${PATH_FIXTURES}/multibyte`, { buffer: true});
    const result = await p;
    if (result) {
      expect(result.stdout).to.equal('こんにちは');
      expect(result.stderr).to.equal('こんにちは');
    }
  });

  it('should fail on error code != 0 and still give stdout/stderr', async () => {
    const p = cmdSpawn(`node ${PATH_FIXTURES}/fail`, { buffer: true});
    try {
      await p;
    } catch (er) {
      expect(er).to.be.an.instanceOf(Error);
      expect(er.status).to.equal(25);
      expect(er.stdout).to.equal('stdout fail');
      expect(er.stderr).to.equal('stderr fail');
      expect(er.details).to.equal(er.stderr);
      expect(er.signal).to.be.null;
    }
  });
});
