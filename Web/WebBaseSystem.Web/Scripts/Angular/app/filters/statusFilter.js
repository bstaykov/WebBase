﻿'use strict';

webBaseModule.filter('statusFilter', function () {
    return function (input) {
        switch (input) {
            case '1': return 'sold'; break;
            case '2': return 'unreleased'; break;
            case '3': return 'can be ordered'; break;
            default: return 'sold'; break;
        }
    }
});