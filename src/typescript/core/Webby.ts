class Webby {

    protected selector: string;

    public select(selector: any): DOMWebby {
        return new DOMWebby().select(selector);
    }

    public http(options: { url: string, method?: HttpMethod, data?: {}, options?: {} }): HttpRequest {
        return Http.send(options);
    }

    public get(url: string, options: {} = {}): HttpRequest {
        return this.http({ url: url, method: HttpMethod.Get, options: options });
    }

    public post(url: string, data: {} = {}, options: {} = {}): HttpRequest {
        return this.http({ url: url, method: HttpMethod.Post, data: data, options: options });
    }

    public stringify(obj, prefix?: string) {
        let str: string[] = [], p;
        for (p in obj) {
            if (obj.hasOwnProperty(p)) {
                let k: string = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
                str.push((v !== null && typeof v === "object") ?
                    this.stringify(v, k) :
                    encodeURIComponent(k) + "=" + encodeURIComponent(v));
            }
        }
        return str.join("&");
    }

    public unstringify(str: string) {
        return (str).replace(/(^\?)/, '').split("&").map(function (n) { return n = n.split("="), this[n[0]] = n[1], this }.bind({}))[0];
    }

    public boolify(value: string): boolean {
        if (value == 'true' || value == '1') {
            return true;
        } else if (value == 'false' || value == '0') {
            return false;
        }
        return false;
    }

}