'use strict';

webBaseModule.directive('defaultDirective', function () {
    return {
        restrict: 'A', // A - attributes, E - elements
        templateUrl: '../Scripts/Angular/app/views/directives/defaultDir.html',
        scope: {
            search: '='
        },
        replace: true,
        priority: 0,
        link: function (scope, element, attrs) {
            attrs.$observe('link', function (newVal, oldVal) {
            });

            attrs.$set('link', '124');
        },
    }
});