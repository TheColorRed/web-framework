class DOMWebby extends Webby {

    protected elements: DOMWebby[] = [];
    protected element: HTMLElement;

    public el(item: DOMWebby = null): HTMLElement {
        let i: DOMWebby = item === null ? this : item;
        if (i instanceof HTMLElement) {
            return i;
        } else if (i.element instanceof HTMLElement) {
            return i.element;
        } else if (i.elements[0].element instanceof HTMLElement) {
            return i.elements[0].element;
        }
    }

    public each(callback: (item: DOMWebby) => void): this {
        if (this.elements.length > 0) {
            this.elements.forEach(item => {
                callback(item);
            });
        } else if (this.element instanceof HTMLElement) {
            callback(this);
        }
        return this;
    }

    public load(callback: (event: Event) => void): this {
        this.each(item => {
            this.el(item).addEventListener('load', event => {
                callback(event);
            });
        });
        return this;
    }

    public ready(callback: (event: Event) => void): this {
        this.each(item => {
            if (item instanceof Document) {
                item.addEventListener('DOMContentLoaded', event => {
                    callback(event);
                });
            }
        });
        return this;
    }

    public on(evt: string, callback: (event: Event) => void): this {
        return this.each(item => { this.el(item).addEventListener(evt, callback); });
    }

    public select(selector: any): this {
        if (typeof selector == 'string') {
            let items = document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
            for (let i = 0; i < items.length; i++) {
                let w = new DOMWebby;
                w.element = items[i];
                this.elements.push(w);
            }
        } else {
            this.elements.push(selector);
            this.element = selector;
        }
        return this;
    }

    public before(html: string): this {
        return this.each(item => { this.el(item).insertAdjacentHTML('beforebegin', html); });
    }

    public after(html: string): this {
        return this.each(item => { this.el(item).insertAdjacentHTML('afterend', html); });
    }

    public prepend(html: string): this {
        return this.each(item => { this.el(item).insertAdjacentHTML('afterbegin', html); });
    }

    public append(html: string): this {
        return this.each(item => { this.el(item).insertAdjacentHTML('beforeend', html); });
    }

    public html(html: string): this {
        return this.each(item => { this.el(item).innerHTML = html; });
    }

    public text(text: string): this {
        return this.each(item => { this.el(item).innerText = text; });
    }

    public addClass(classes: string): this {
        let c = classes.split(' ');
        return this.each(item => { for (let i of c) { this.el(item).classList.add(i); } });
    }

    public removeClass(classes: string): this {
        let c = classes.split(' ');
        return this.each(item => { for (let i of c) { this.el(item).classList.remove(i); } });
    }

    public toggleClass(classes: string): this {
        let c = classes.split(' ');
        return this.each(item => { for (let i of c) { this.el(item).classList.toggle(i); } });
    }

    public hasClass(c: string): boolean {
        let hc: boolean = false;
        this.each(item => {
            if (hc) return;
            if (this.el(item).classList.contains(c)) { hc = true };
        });
        return hc;
    }

    public attr(key: string, value: string = ''): this | string {
        if (arguments.length == 1) {
            return this.el(this).getAttribute(key);
        }
        return this.each(item => { this.el(item).setAttribute(key, value); });
    }

    public removeAttr(key: string): this {
        return this.each(item => { this.el(item).removeAttribute(key); });
    }

    public css(key: string | any, value: string): this {
        if (typeof key == 'object' && arguments.length == 1) {
            return this.each(item => { for (let i in key) { this.el(item).style[i] = key[i]; } });
        }
        return this.each(item => { this.el(item).style[key] = value; });
    }

    public find(key: string) {
        let newList: DOMWebby[] = [];
        this.each(item => {
            let items = this.el(item).querySelectorAll(key) as NodeListOf<HTMLElement>;
            for (let i = 0; i < items.length; i++) {
                let w = new DOMWebby;
                w.element = items[i];
                newList.push(w);
                // newList.push($(items[i]));
            }
        });
        this.elements = newList;
        return this;
    }

    public remove(): this {
        return this.each(item => { let el = this.el(item); el.parentNode.removeChild(el); });
    }

    public empty(): this {
        return this.each(item => { this.el(item).innerHTML = ''; });
    }

    public truncate() {
        return this.each(item => { this.el(item).innerText = ''; });
    }

    public val(value: string): this | string {
        if (arguments.length == 1) {
            return this.each(item => { (this.el(item) as HTMLInputElement).value = value; });
        } else {
            return (this.el() as HTMLInputElement).value;
        }
    }

    public disable(): this {
        return this.each(item => { this.el(item).setAttribute('disabled', ''); });
    }
}