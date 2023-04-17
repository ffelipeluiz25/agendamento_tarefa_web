import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

    private api_url: string;

    constructor(private httpClient: HttpClient) {
        this.api_url = environment.api_url;
    }

    public get(endpoint: string, data: any = null, blockUI: boolean = false, progressBar: boolean = false) {
        const headers = this.getHeaders(blockUI, progressBar);
        return this.httpClient.get<any>(this.api_url + endpoint, { params: data, headers: headers });
    }

    public post(endpoint: string, data: any, blockUI: boolean = false, progressBar: boolean = false) {
        const headers = this.getHeaders(blockUI, progressBar);
        return this.httpClient.post<any>(this.api_url + endpoint, data, { headers: headers });
    }

    public put(endpoint: string, data: any, blockUI: boolean = false, progressBar: boolean = false) {
        const headers = this.getHeaders(blockUI, progressBar);
        return this.httpClient.put<any>(this.api_url + endpoint, data, { headers: headers });
    }

    public delete(endpoint: string, data: any, blockUI: boolean = false, progressBar: boolean = false) {
        const headers = this.getHeaders(blockUI, progressBar);
        return this.httpClient.delete<any>(this.api_url + endpoint, { params: data, headers: headers });
    }

    public getHeaders(blockUI: boolean, progressBar: boolean) {
        const headers: any = {};
        if (blockUI) {
            headers.use_block_ui = 'true';
        }
        if (progressBar) {
            headers.use_progress_bar = 'true';
        }
        return new HttpHeaders(headers);
    }
}