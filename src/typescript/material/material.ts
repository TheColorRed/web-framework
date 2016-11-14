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

    $.select('.sel-group.thm-material').each(item => {
        let items = $.select(item).find('select > option');
        let selected = $.select(item).find('select > option[selected]').last();
        let select = $.select(item).find('select');
        let options: string[] = [];
        items.each(item => {
            options.push(`<span data-id="${item.val()}" class="${!item.matches(selected) ? 'hidden' : ''}">${item.text()}</span>`);
        });
        item.append(`<span data-name>${options.join('')}</span>`);

        item.find('span[data-name]').on('click', event => {
            alert('here')
        });

        $.select(item).find('select').on('change', event => {
            console.log('here');
        });
    });
});