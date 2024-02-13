import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { map, of } from 'rxjs';
import { environment } from "../environment";

export interface Balance {
    result: {
        balance: number;
        info: {
            image: string;
            name: string;
        }
    };
}

export interface Crypto {
    [ref: string] : string;
}

@Injectable({ providedIn: 'root'})
export class ShyftApiService {
    private readonly _httpClient = inject(HttpClient);
    private readonly _headers = { 'x-api-key': environment.SHYFT_KEY}
    private readonly _mints: Crypto = {
        'RAY': '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
        'Silly': '7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs',
        'USDC': 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        'USDT': 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
        'WBTC': '9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E',
    };

    getAccount(publicKey: string | null | undefined, token:string='RAY') {
        if (!publicKey){
            return of(null);
        }
        console.log(this._headers)

        const url = new URL('https://api.shyft.to/sol/v1/wallet/token_balance');

        url.searchParams.append('network', 'mainnet-beta');
        url.searchParams.append('wallet', publicKey);

        url.searchParams.append('token', this._mints[token]);
        return this._httpClient.get<Balance>(
            url.toString(),
            { headers: this._headers }
        )
        .pipe(map( ({ result }) => result ))
    }
}