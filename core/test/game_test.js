const assert = require('assert');
const { describe, it } = require('mocha');
const game = require('../game');

describe('MasterMind', () => {
  describe('getRandomElementOfArray', () => {
    it('should return the only element of the array if it has one element.', () => {
      const element = 'Banana';
      const array = Array(element);
      assert.strictEqual(game.getRandomElementOfArray(array), element);
    });

    it('should return undefined when the array is empty.', () => {
      assert.strictEqual(game.getRandomElementOfArray([]), undefined);
    });
  });

  describe('createPattern', () => {
    it('should return a new pattern of 4 same code pegs when code pegs are composed of one element', () => {
      const codePegs = ['RED'];
      const expectedPattern = ['RED', 'RED', 'RED', 'RED'];
      assert.deepStrictEqual(game.createPattern(codePegs), expectedPattern);
    });

    it('should return a pattern of 4 elements when code pegs are composed of at least 4 elements', () => {
      const codePegs = ['RED', 'BLACK', 'WHITE', 'YELLOW', 'GREEN', 'BLUE'];
      const result = game.createPattern(codePegs);
      assert.strictEqual(result.length, 4);
    });
  });

  describe('getFeedback', () => {
    it('should return an empty feedback when none of the guess\'s code pegs is correct', () => {
      const guess = ['RED', 'BLACK', 'BLACK', 'BLUE'];
      const pattern = ['WHITE', 'GREEN', 'YELLOW', 'YELLOW'];
      assert.deepStrictEqual(game.getFeedback(guess, pattern), ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY']);
    });

    it('should return a 4 white key pegs when all guess\'s code pegs exist, but placed in the wrong location', () => {
      const guess = ['RED', 'BLACK', 'BLACK', 'BLUE'];
      const pattern = ['BLACK', 'RED', 'BLUE', 'BLACK'];
      assert.deepStrictEqual(game.getFeedback(guess, pattern), ['WHITE', 'WHITE', 'WHITE', 'WHITE']);
    });

    it('should return a 4 black key pegs when all guess\'s code pegs exist and placed in the right location', () => {
      const guess = ['RED', 'BLACK', 'BLACK', 'BLUE'];
      const pattern = ['RED', 'BLACK', 'BLACK', 'BLUE'];
      assert.deepStrictEqual(game.getFeedback(guess, pattern), ['BLACK', 'BLACK', 'BLACK', 'BLACK']);
    });

    it('should return 1 black key peg and 3 empty keys pegs, when 1 code peg exist in the right place, and the 3 others doesn\'t exist in the pattern', () => {
      const guess = ['RED', 'BLACK', 'BLACK', 'BLUE'];
      const pattern = ['YELLOW', 'WHITE', 'GREEN', 'BLUE'];

      const feedback = game.getFeedback(guess, pattern);

      assert.strictEqual(feedback.filter((element) => element === 'EMPTY').length, 3);
      assert.strictEqual(feedback.filter((element) => element === 'BLACK').length, 1);
    });

    it('should return 1 white key peg and 3 empty keys pegs, when 1 code peg exist in the wrong place, and the 3 others doesn\'t exist in the pattern', () => {
      const guess = ['RED', 'BLACK', 'BLACK', 'BLUE'];
      const pattern = ['BLUE', 'YELLOW', 'WHITE', 'GREEN'];

      const feedback = game.getFeedback(guess, pattern);

      assert.strictEqual(feedback.filter((element) => element === 'EMPTY').length, 3);
      assert.strictEqual(feedback.filter((element) => element === 'WHITE').length, 1);
    });

    it('should return 2 white key pegs and 2 empty key pegs, when 2 code pegs exist but in the wrong place, and the other 2 doesn\'t exist in the pattern', () => {
      const guess = ['RED', 'BLACK', 'BLACK', 'BLUE'];
      const pattern = ['BLUE', 'RED', 'YELLOW', 'WHITE'];

      const feedback = game.getFeedback(guess, pattern);

      assert.strictEqual(feedback.filter((element) => element === 'EMPTY').length, 2);
      assert.strictEqual(feedback.filter((element) => element === 'WHITE').length, 2);
    });

    it('should return 2 black key pegs and 2 empty key pegs, when 2 code pegs exist but in the right place, and the other 2 doesn\'t exist in the pattern', () => {
      const guess = ['RED', 'BLACK', 'BLACK', 'BLUE'];
      const pattern = ['RED', 'YELLOW', 'WHITE', 'BLUE'];

      const feedback = game.getFeedback(guess, pattern);

      assert.strictEqual(feedback.filter((element) => element === 'EMPTY').length, 2);
      assert.strictEqual(feedback.filter((element) => element === 'BLACK').length, 2);
    });

    it('should return 2 black key pegs and 2 white key pegs, when 2 code pegs exist but in the right place, and the other 2 exist but in the wrong place', () => {
      const guess = ['RED', 'BLACK', 'BLACK', 'BLUE'];
      const pattern = ['RED', 'BLUE', 'BLACK', 'BLACK'];

      const feedback = game.getFeedback(guess, pattern);

      assert.strictEqual(feedback.filter((element) => element === 'WHITE').length, 2);
      assert.strictEqual(feedback.filter((element) => element === 'BLACK').length, 2);
    });

    it('should return 2 black key pegs, 1 white key peg and 1 empty peg, when 2 code pegs exist in the right place, 1 exist but in the wrong place and 1 doesn\'t exist', () => {
      const guess = ['RED', 'BLACK', 'BLACK', 'BLUE'];
      const pattern = ['RED', 'BLUE', 'BLACK', 'YELLOW'];

      const feedback = game.getFeedback(guess, pattern);

      assert.strictEqual(feedback.filter((element) => element === 'WHITE').length, 1);
      assert.strictEqual(feedback.filter((element) => element === 'EMPTY').length, 1);
      assert.strictEqual(feedback.filter((element) => element === 'BLACK').length, 2);
    });
  });
});
