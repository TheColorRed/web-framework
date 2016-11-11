/// <reference path="../../dist/js/main.d.ts"/>

$.select(document).ready(evt => {
    $.select('#btn-1').on('click', event => {
        $.get('ajax/test.json').success(response => {
            $.select('#output-1, #output-2').text($.stringify(response.data)).css('color', 'red').remove();
        });
    });
});

