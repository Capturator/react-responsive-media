// __tests__/main-test.js

describe('ResponsiveContainer', function () {
    var container;
    beforeEach(function () {
        container = require('../ResponsiveContainer');
    });

    afterEach(function () {
        container = null;
    });

    it('should be an object', function () {
        expect(container).toBeDefined();
    });
});
