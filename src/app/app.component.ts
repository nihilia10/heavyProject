import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatAnchor } from '@angular/material/button';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { computedAsync } from 'ngxtension/computed-async';
import { toSignal } from '@angular/core/rxjs-interop';
import { ShyftApiService } from './services/indexer.services';
@Component({
  standalone: true,
  imports: [RouterModule, HdWalletMultiButtonComponent, MatAnchor],
  selector: 'heavy-project-root',
  template: `
    <header class='py-8 relative'>
      <h1 class='text-5xl text-center mb-4'> Nihilia10 Dapp </h1>
      <div class='flex justify-center py-8'>
        <hd-wallet-multi-button></hd-wallet-multi-button>
      </div>

      @if (account()) {
        <p class='left-4 text-xl'> Gracias por registrar tu wallet </p>
        <div class=' top-4 left-4 flex w-50 justify-center items-center'>
          <p class='text-xl px-4'> {{account()?.info?.name}} </p>
          <img [src]="account()?.info?.image" class="w-8 h-8" />
          <p class='text-xl px-4'> $ {{account()?.balance}} </p>
        </div>
      }

      <nav>
        <ul>
          <li> <a [routerLink]=""] mat-raised-button> Inicio </a>  </li>
        </ul>
      </nav>
    </header>
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