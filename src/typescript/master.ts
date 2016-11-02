let $ = new Webby;

$.get('/').success(response => {
    console.log(response);
}).error(response => {
    console.log(response);
}).fail(err => {
    console.log('failed');
});


// function $(selector: string | Window | Document | HTMLElement) {
//     return new DOMWebby(selector);
// }

// $.get();