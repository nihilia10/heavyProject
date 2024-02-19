import { Component, inject } from "@angular/core";
import { BalanceSectionComponent } from "./balance-section.component";
import { MatGridListModule } from '@angular/material/grid-list';
import { TransactionSectionComponent } from "./transaction-section.component";


@Component({
    selector: 'nihilia-dapp-history',
    imports: [BalanceSectionComponent, MatGridListModule, TransactionSectionComponent],
    template: `
        <section>
                <mat-grid-list cols="2" rowHeight="500px">
                    <mat-grid-tile>
                        <balance-section></balance-section>
                    </mat-grid-tile>
                    <mat-grid-tile>
                        <transaction-section></transaction-section>
                    </mat-grid-tile>
                </mat-grid-list>
        </section>
    `,
    standalone: true,
})
export class WalletPageComponent {}