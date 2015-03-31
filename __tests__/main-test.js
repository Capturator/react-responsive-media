// __tests__/main-test.js
jest.dontMock('../src/responsive-container.js');

describe('ResponsiveContainer', function () {
    var container;
    beforeEach(function () {
        container = require('../src/responsive-container.js');
    });

    afterEach(function () {
        container = null;
    });

    it('should be an object', function () {
        expect(container).toBeDefined();
    });
});
