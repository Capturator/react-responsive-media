// __tests__/main-test.js
jest.dontMock('../index');

describe('ResponsiveContainer', function () {
    var container;
    beforeEach(function () {
        container = require('../index');
    });

    afterEach(function () {
        container = null;
    });

    it('should be an object', function () {
        expect(container).toBeDefined();
    });
});
