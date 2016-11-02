enum HttpMethod { Get, Post, Put, Delete };

class Http {

    public static send(options) {
        return new HttpRequest(options);
    }

}

class HttpResponseData { }
class HttpResponseHeaders { }

class HttpResponse {

    public code: number;
    public data: {};
    public headers: {};

}

class HttpRequest {

    private _success: Function;
    private _error: Function;
    private _fail: Function;
    private _complete: Function;
    private _options: { url: string, method?: HttpMethod };

    public constructor(options) {
        this._options = options;
        this.sendRequest();
    }

    public success(callback: (response: HttpResponse) => void): this {
        this._success = callback;
        return this;
    }

    public error(callback: (response: HttpResponse) => void): this {
        this._fail = callback;
        return this;
    }

    public fail(callback: Function): this {
        this._error = callback;
        return this;
    }

    public complete(callback: (response: HttpResponse) => void): this {
        this._complete = callback;
        return this;
    }

    private sendRequest() {
        let req = new XMLHttpRequest;
        try {
            req.addEventListener('readystatechange', evt => {
                if (req.readyState == 4) {
                    let resp = new HttpResponse;
                    resp.headers = req.getAllResponseHeaders();
                    try {
                        resp.data = JSON.parse(req.responseText);
                    } catch (e) {
                        resp.data = req.responseText;
                    }
                    if (req.status == 200 && typeof this._success == 'function') {
                        this._success(resp);
                    } else if (typeof this._error == 'function') {
                        this._error(resp);
                    }
                    if (typeof this._complete == 'function') {
                        this._complete(resp);
                    }
                }
            });
            if (!this._options.method) {
                this._options.method = HttpMethod.Get;
            }
            req.open(this._options.method.toString(), this._options.url)
            req.send();
        } catch (e) {
            this._fail();
        }
    }

}