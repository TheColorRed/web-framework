function $(selector: any) {
    return new Webby(selector);
}

class Webby {

    protected selector: string;
    protected selection: any[] = [];
    protected element: HTMLElement;

    public constructor(selector: any) {
        if (typeof selector == 'string') {
            let items = document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
            for (let i = 0; i < items.length; i++) {
                this.selection.push($(items[i]));
            }
        } else {
            this.selection.push(selector);
            this.element = selector;
        }
    }

    private get(item: Webby = null): HTMLElement {
        let i = item === null ? this : item;
        if (i instanceof HTMLElement) {
            return i;
        } else if (i.element instanceof HTMLElement) {
            return i.element;
        } else if (i.selection[0] instanceof HTMLElement) {
            return this.selection[0];
        } else if (i.selection[0].element instanceof HTMLElement) {
            return this.selection[0].element;
        }
    }

    public each(callback: (item: Webby) => void): Webby {
        this.selection.forEach(item => {
            callback(item);
        });
        return this;
    }

    public load(callback: (event: Event) => void): Webby {
        this.each(item => {
            this.get(item).addEventListener('load', event => {
                callback(event);
            });
        });
        return this;
    }

    public ready(callback: (event: Event) => void): Webby {
        this.each(item => {
            if (item instanceof Document) {
                item.addEventListener('DOMContentLoaded', event => {
                    callback(event);
                });
            }
        });
        return this;
    }

    public before(html: string): Webby {
        return this.each(item => { this.get(item).insertAdjacentHTML('beforebegin', html); });
    }

    public after(html: string): Webby {
        return this.each(item => { this.get(item).insertAdjacentHTML('afterend', html); });
    }

    public prepend(html: string): Webby {
        return this.each(item => { this.get(item).insertAdjacentHTML('afterbegin', html); });
    }

    public append(html: string): Webby {
        return this.each(item => { this.get(item).insertAdjacentHTML('beforeend', html); });
    }

    public html(html: string): Webby {
        return this.each(item => { this.get(item).innerHTML = html; });
    }

    public text(text: string): Webby {
        return this.each(item => { this.get(item).innerText = text; });
    }

    public addClass(classes: string): Webby {
        let c = classes.split(' ');
        return this.each(item => { for (let i of c) { this.get(item).classList.add(i); } });
    }

    public removeClass(classes: string): Webby {
        let c = classes.split(' ');
        return this.each(item => { for (let i of c) { this.get(item).classList.remove(i); } });
    }

    public toggleClass(classes: string): Webby {
        let c = classes.split(' ');
        return this.each(item => { for (let i of c) { this.get(item).classList.toggle(i); } });
    }

    public hasClass(c: string): boolean {
        let hc: boolean = false;
        this.each(item => {
            if (hc) return;
            if (this.get(item).classList.contains(c)) { hc = true };
        });
        return hc;
    }

    public attr(key: string, value: string = ''): Webby | string {
        if (arguments.length == 1) {
            return this.get(this).getAttribute(key);
        }
        return this.each(item => { this.get(item).setAttribute(key, value); });
    }

    public removeAttr(key: string): Webby {
        return this.each(item => { this.get(item).removeAttribute(key); });
    }

    public css(key: string | any, value: string): Webby {
        if (typeof key == 'object' && arguments.length == 1) {
            return this.each(item => { for (let i in key) { this.get(item).style[i] = key[i]; } });
        }
        return this.each(item => { this.get(item).style[key] = value; });
    }

    public find(key: string) {
        let newList: Webby[] = [];
        this.each(item => {
            let items = this.get(item).querySelectorAll(key) as NodeListOf<HTMLElement>;
            for (let i = 0; i < items.length; i++) {
                newList.push($(items[i]));
            }
        });
        this.selection = newList;
        return this;
    }

    public empty(): Webby {
        return this.each(item => { this.get(item).innerHTML = ''; });
    }

    public truncate() {
        return this.each(item => { this.get(item).innerText = ''; });
    }

    public val(value: string): Webby | string {
        if (arguments.length == 1) {
            return this.each(item => { (this.get(item) as HTMLInputElement).value = value; });
        } else {
            return (this.get() as HTMLInputElement).value;
        }
    }

    public disable(): Webby {
        return this.each(item => { this.get(item).setAttribute('disabled', ''); });
    }

}