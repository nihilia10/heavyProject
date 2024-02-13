import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatAnchor } from '@angular/material/button';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { computedAsync } from 'ngxtension/computed-async';
import { toSignal } from '@angular/core/rxjs-interop';
import { ShyftApiService } from './services/indexer.services';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { BalanceSectionComponent } from './balance-section.component';
@Component({
  standalone: true,
  imports: [RouterModule, HdWalletMultiButtonComponent, MatAnchor, BalanceSectionComponent],
  selector: 'heavy-project-root',
  template: `
    <header class='py-8 relative bg-yellow-400/85'>
      <h1 class='text-5xl text-center mb-4'> Nihilia10 Dapp </h1>
      <div class='flex justify-center py-8'>
        <hd-wallet-multi-button></hd-wallet-multi-button>
      </div>

      <div class= 'text-2xl px-10 my-4 mx-4 text-center text-white bg-purple-800 rounded-xl'>
        
        @if (account()) {
          <p> <i> Gracias por registrar tu wallet </i> </p>
          <!-- <div class='top-4 left-4 flex w-50  justify-center items-center'>
            <p class='text-xl px-4'> {{account()?.info?.name}} </p>
            <img [src]="account()?.info?.image" class="w-8 h-8" />
            <p class='text-xl px-4'> $ {{account()?.balance}} </p>
          </div> -->
          
          <balance-section [account]="account()"></balance-section>

        }
        @else {
          <p> <i> Aquí verás tu balance de Sillys </i> </p>
        }
      </div>

      <nav>
        <ul class="flex justify-center items-center gap-4">
          <li> <a [routerLink]="['']"mat-flat-button color="warn"> Inicio </a> </li>
          <li> <a [routerLink]="['history']"mat-flat-button color="warn"> Historial </a> </li>
          <li> <a [routerLink]="['settings']"mat-flat-button color="warn"> Settings </a> </li>
        </ul>
      </nav>
    </header>

    <main class='bg-zinc-700'>
      <router-outlet></router-outlet>
    </main>
  `,
})

export class AppComponent {

  private readonly _shyftApiService = inject(ShyftApiService)
  private readonly _walletStore = inject(WalletStore)
  private readonly _publicKey = toSignal(this._walletStore.publicKey$)

  readonly account = computedAsync(
      () => this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
      { requireSync: true}
  );

  title = 'heavy-project';
}