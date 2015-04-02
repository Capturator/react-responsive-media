// __tests__/main-test.js
jest.dontMock('../ResponsiveContainer');
jest.dontMock('../lib/breakpoints');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

describe('ResponsiveContainer', function () {
    var ResponsiveContainerComponent;
    beforeEach(function () {
        ResponsiveContainerComponent = require('../ResponsiveContainer');
    });

    afterEach(function () {
        ResponsiveContainerComponent = null;
    });

    it('should be an object', function () {
        expect(ResponsiveContainerComponent).toBeDefined();
    });

    describe(' when rendered as an application Container', function () {
        var container;
        var originalWindowMatchMedia;
        beforeEach(function () {
            originalWindowMatchMedia =  window.matchMedia;
            window.matchMedia = jest.genMockFunction().mockImplementation(function() {
                return { addListener: function(){}};
            });
            var mediaQueries = {'small': 200};
            container = TestUtils.renderIntoDocument(<ResponsiveContainerComponent bp={mediaQueries}><div>{'foo'}</div></ResponsiveContainerComponent>);
        });

        afterEach(function () {
            container = null;
            window.matchMedia = originalWindowMatchMedia;
        });

        it('should be a composite component', function () {
            expect(TestUtils.isCompositeComponent(container)).toBe(true);
        });
    });

});
