import axios from 'axios';

class Api {
    constructor() {
        this._base_path = '/investment';
        this._timeout = 3000;
    }

    _get_http_client() {
        if (!this._http_client) {
            this._http_client = axios.create({
                baseURL: this._base_path,
                timeout: this._timeout,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
        return this._http_client;
    }

    async load(url) {
        return await this._get_http_client().get(url);
    }

    async match(url, data) {
        return await this._get_http_client().post(url, data);
    }
}

export default new Api();
