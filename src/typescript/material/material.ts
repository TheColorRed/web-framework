// Initialize the material items
$.select(document).ready(event => {
    $.select('.txt-group.thm-material:empty').each(item => {
        let id = item.attr('id');
        item.html(`<input type="text" id="${id}-input" required><span class="bar" id="${id}-bar"></span><label id="${id}-label" for="${id}-input">${item.attr('label')}</label>`);
    });
});