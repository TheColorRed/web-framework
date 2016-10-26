class Webby {

    protected selector: string;

    public select(selector: any): DOMWebby {
        return new DOMWebby().select(selector);
    }

    public get() {

    }

}