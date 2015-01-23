/*global require*/
'use strict';

require.config({
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap'
    }
});

require([
    'backbone', 'parallax', 'wordTransition',
], function (Backbone, Parallax, wordTransition) {
    Backbone.history.start();

    new Parallax().start();

    wordTransition(document.getElementsByClassName('main-text--word')[0], ['develop', 'deploy', 'design', 'construct', 'build', 'make',  'fix', 'style', 'improve']);
});
