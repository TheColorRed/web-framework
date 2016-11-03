class Webby {

    protected selector: string;

    public select(selector: any): DOMWebby {
        return new DOMWebby().select(selector);
    }

    public http(options: { url: string, method?: HttpMethod, data?: {} }): HttpRequest {
        return Http.send(options);
    }

    public get(url: string): HttpRequest {
        return this.http({ url: url, method: HttpMethod.Get });
    }

    public post(url: string, data: {} = {}): HttpRequest {
        return this.http({ url: url, method: HttpMethod.Post, data: data });
    }

}