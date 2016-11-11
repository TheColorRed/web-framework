// Initialize the material items
$.select(document).ready(event => {
    // Create a textbox from a group
    $.select('.txt-group.thm-material:empty').each(item => {
        let id = item.attr('id') || '';
        item.html(`<input type="text" id="${id}-input" required><span class="bar" id="${id}-bar"></span><label id="${id}-label" for="${id}-input">${item.attr('aria-label')}</label>`);
    });
    // Create a checkbox from a group
    $.select('.chk-group.thm-material:empty').each(item => {
        let id = item.attr('id') || '';
        let name = item.attr('data-name') || '';
        let checked = $.boolify(<string>item.attr('data-checked')) ? 'checked' : '';
        let disabled = $.boolify(<string>item.attr('data-disabled')) ? 'disabled' : '';
        item.html(`<input type="checkbox" ${checked} ${disabled} name="${name}" id="${id}-chk"><label for="${id}-chk">${item.attr('aria-label')}</label>`);
    });
    // Create a radio from a group
    $.select('.rdo-group.thm-material:empty').each(item => {
        let id = item.attr('id') || '';
        let name = item.attr('data-name') || '';
        let checked = $.boolify(<string>item.attr('data-checked')) ? 'checked' : '';
        let disabled = $.boolify(<string>item.attr('data-disabled')) ? 'disabled' : '';
        item.html(`<input type="radio" ${checked} ${disabled} name="${name}" id="${id}-chk"><label for="${id}-chk">${item.attr('aria-label')}</label>`);
    });
});