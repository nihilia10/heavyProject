import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatAnchor } from '@angular/material/button';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { BalanceSectionComponent } from './balance-section.component';
@Component({
  standalone: true,
  imports: [RouterModule, HdWalletMultiButtonComponent, MatAnchor, BalanceSectionComponent],
  selector: 'heavy-project-root',
  template: `
    <header class='py-8 relative bg-yellow-400/85'>
      <h1 class='text-5xl text-center mt-4'> Nihilia10 Dapp </h1>
      <p class='text-xl text-center mt-4'> Registra tu wallet para conocer tu balance y ver tu historial </p>
      <div class='flex justify-center mb-4'>
        <hd-wallet-multi-button class='py-4'></hd-wallet-multi-button>
      </div>
      <nav>
        <ul class="flex justify-center items-center gap-4">
          <li> <a [routerLink]="['']"mat-flat-button color="warn"> Inicio </a> </li>
          <li> <a [routerLink]="['wallet']"mat-flat-button color="warn"> Tu Billetera </a> </li>
          <li> <a [routerLink]="['settings']"mat-flat-button color="warn"> Settings </a> </li>
        </ul>
      </nav>
    </header>

    <main class='bg-zinc-700'>
      <router-outlet></router-outlet>
    </main>
  `,
})

export class AppComponent {}