import { Component, Input, inject } from "@angular/core";
import { computedAsync } from 'ngxtension/computed-async';
import { toSignal } from '@angular/core/rxjs-interop';
import { ShyftApiService } from './services/indexer.services';
import { WalletStore } from '@heavy-duty/wallet-adapter';

@Component({
    selector: 'balance-section',
    template: `
<section class='px-4 py-40 bg-purple-800 text-2xl text-center text-white rounded-xl border-yellow-400 border-4'>
        @if (account()) {
            <div>
                <p class="text-4xl mb-12"> <i> Tu balance: </i> </p>
            </div>           
            <div class='flex w-50 justify-center items-center'>
                <img [src]="account()?.info?.image" class="w-8 h-8" />
                <p class='text-xl px-4'> {{account()?.info?.name}}: </p>
                <p class='text-xl px-4'> $ {{account()?.balance}} </p>
            </div>
        }
        @else {
            <p> <i> Aquí verás tu balance de Sillys </i> </p>
        }
    </section>
    `,
    standalone: true,
})

export class BalanceSectionComponent {
    private readonly _shyftApiService = inject(ShyftApiService)
    private readonly _walletStore = inject(WalletStore)
    private readonly _publicKey = toSignal(this._walletStore.publicKey$)
  
    readonly account = computedAsync(
        () => this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
        { requireSync: true}
    );
  
    title = 'balance-section';
}
