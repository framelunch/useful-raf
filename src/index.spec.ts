import { create } from './index';

describe('useful-raf', () => {
  describe('isRunning', () => {
    it('will be return false when raf never started', async () => {
      const raf = create(() => 'blank function');
      expect(raf.isRunning()).toBeFalsy();
    });

    it('will be return true when raf started', async () => {
      const raf = create(() => 'blank function');
      raf.start();
      expect(raf.isRunning()).toBeTruthy();
    });

    it('will be return false when raf stopped', async () => {
      const raf = create(() => 'blank function');
      raf.start();
      raf.stop();
      expect(raf.isRunning()).toBeFalsy();
    });
  });

  describe('start', () => {
    it('will be ok when animation was not start', () => {
      const raf = create(() => 'blank function');
      expect(() => raf.start()).not.toThrow();
    });

    it('throw error when animation already started', () => {
      const raf = create(() => 'blank function');
      raf.start();
      expect(() => raf.start()).toThrowError(Error);
    });

    it('will be exec argument function', async () => {
      let count = 0;
      const raf = create(() => (count += 1));
      raf.start();
      await wait(200);
      expect(count).not.toBe(0);
    });
  });

  describe('stop', () => {
    it('will be ok when animation was start', () => {
      const raf = create(() => 'blank function');
      raf.start();
      expect(() => raf.stop()).not.toThrow();
    });

    it('throw error when animation not start', () => {
      const raf = create(() => 'blank function');
      expect(() => raf.stop()).toThrowError(Error);
    });

    it('will be stop argument function', async () => {
      let count = 0;
      const raf = create(() => (count += 1));
      raf.start();
      await wait(200);
      const preStopCount = count;
      raf.stop();
      await wait(200);
      expect(preStopCount).toBe(count);
    });
  });
});

function wait(msec: number): Promise<{}> {
  return new Promise(resolve => setTimeout(resolve, msec));
}
