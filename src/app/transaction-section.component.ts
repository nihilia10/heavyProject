import { Component, Pipe, PipeTransform, inject } from "@angular/core";
import { DatePipe, DecimalPipe } from "@angular/common";
import { computedAsync } from 'ngxtension/computed-async';
import { toSignal } from '@angular/core/rxjs-interop';
import { ShyftApiService } from './services/indexer.services';
import { WalletStore } from '@heavy-duty/wallet-adapter';

@Pipe({
    name: 'truncate',
    standalone: true
})
export class TruncatePipe implements PipeTransform {
    transform(value: string, limit = 25, completeWords = false, ellipsis = '...') {
      if (completeWords) {
        limit = value.substr(0, limit).lastIndexOf(' ');
      }
      return value.length > limit ? value.substr(0, limit) + ellipsis : value;
    }
}


@Component({
    selector: 'transaction-section',
    template: `
    <section class='px-4 py-40 bg-green-800 text-center text-white rounded-xl border-yellow-400 border-4'>
        @if (history()) {
            <div>
                <p class="text-4xl mb-12"> <i> Tu historial: </i> </p>
            </div>           
            <div class='flex w-50 justify-center items-center'>
                <table class="table-fixed border-spacing-1 border border-black">
                    <thead>
                        <tr>
                            <th class="border border-slate-700">id</th>
                            <th class="border border-slate-700">Time</th>
                            <th class="border border-slate-700">From</th>
                            <th class="border border-slate-700">To</th>
                            <th class="border border-slate-700">Amount</th>
                            <th class="border border-slate-700">Currency</th> 
                        </tr>
                    </thead>
                    <tbody>
                        @for (item of history(); track $index) {
                            <tr>
                                <td class="border border-slate-700">{{$index}}</td>
                                <td class="border border-slate-700">{{item.timestamp | date: 'short'}}</td>
                                <td class="border border-slate-700">{{item.actions[0].info.sender | truncate:10}}</td>
                                <td class="border border-slate-700">{{item.actions[0].info.receiver | truncate:10}}</td>
                                <td class="border border-slate-700">$ {{item.actions[0].info.amount.toPrecision(10) }}</td>
                                <td class="border border-slate-700">{{item.type | truncate:3}}</td>
                            </tr>
                        }
                    </tbody>
                </table>
                
            </div>
        }
        @else {
            <p class="text-2xl"> <i> Aquí verás tus transacciones  </i> </p>
        }
    </section>
    `,
    imports: [TruncatePipe, DatePipe, DecimalPipe],
    standalone: true,
})

export class TransactionSectionComponent {
    private readonly _shyftApiService = inject(ShyftApiService)
    private readonly _walletStore = inject(WalletStore)
    private readonly _publicKey = toSignal(this._walletStore.publicKey$)
  
    readonly history = computedAsync(
        () => this._shyftApiService.getTransactionHistory(this._publicKey()?.toBase58()),
        { requireSync: true}
    );
  
    title = 'balance-section';
}


