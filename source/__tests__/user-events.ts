import {isPixelEvent} from '../user-events';

describe('user-events', () => {
  describe('isPixelEvent', () => {
    it('works', () => {
      expect(isPixelEvent({account: 'jsengchallange'})).toBe(true);
      expect(isPixelEvent({account: 'jsengchallange', labels: '_fp.event.PageView,_fp.event.Homepage'})).toBe(true);
    });
  });
});
