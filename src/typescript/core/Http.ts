enum HttpMethod { Get, Post, Put, Delete };

class Http {

    public static send(options) {
        return new HttpRequest(options);
    }

}

class HttpRequestHeaders {

}
class HttpHeaders {
    public headers: HttpHeader[] = [];
    public add(key: string, value: string) {
        this.headers.push(new HttpHeader(key, value));
    }
    public find(...key: string[]): HttpHeader | HttpHeader[] {
        let headers: HttpHeader[] = [];
        for (let h of this.headers) {
            if (key.indexOf(h.key.toLowerCase()) > -1) {
                headers.push(h);
            }
        }
        return headers.length <= 1 ? headers[0] || null : headers;
    }
    public static parse(data: string): HttpHeaders {
        let items = data.split(/\n/g);
        let headers = new HttpHeaders;
        items.forEach(item => {
            let i = item.split(/:/);
            if (i.length == 2) {
                headers.add(i[0].trim(), i[1].trim());
            }
        })
        return headers;
    }
}
class HttpHeader {
    public key: string;
    public value: string;
    public constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }
}

class HttpResponse {

    public request: HttpRequest;
    public code: number;
    public data: {};
    public headers: HttpHeaders;

}

class HttpRequest extends Webby {

    private _success: Function;
    private _error: Function;
    private _fail: Function;
    private _complete: Function;
    private _options: { url: string, method?: HttpMethod, data?: {} };

    public constructor(options) {
        super();
        this._options = options;
        this.sendRequest();
    }

    public success(callback: (response: HttpResponse, request: HttpRequest) => void): this {
        this._success = callback;
        return this;
    }

    public error(callback: (response: HttpResponse, request: HttpRequest) => void): this {
        this._error = callback;
        return this;
    }

    public fail(callback: (request: HttpRequest) => void): this {
        this._fail = callback;
        return this;
    }

    public complete(callback: (response: HttpResponse, request: HttpRequest) => void): this {
        this._complete = callback;
        return this;
    }

    private sendRequest() {
        let req = new XMLHttpRequest;
        try {
            req.addEventListener('readystatechange', evt => {
                if (req.readyState == 4) {
                    let resp = new HttpResponse;
                    resp.headers = HttpHeaders.parse(req.getAllResponseHeaders());
                    resp.code = req.status;
                    try {
                        resp.data = JSON.parse(req.responseText);
                    } catch (e) {
                        resp.data = req.responseText;
                    }
                    if (req.status == 200 && typeof this._success == 'function') {
                        this._success(resp, this);
                    } else if (typeof this._error == 'function') {
                        this._error(resp, this);
                    }
                    if (typeof this._complete == 'function') {
                        this._complete(resp, this);
                    }
                }
            });
            if (!this._options.method) {
                this._options.method = HttpMethod.Get;
            }
            req.open(this._options.method == HttpMethod.Get ? 'get' : 'post', this._options.url)
            req.send(this._options.method == HttpMethod.Post ? this.stringify(this._options.data) : '');
        } catch (e) {
            this._fail(this);
        }
    }

}