import { Component } from "@angular/core";
import { FeaturesSectionComponent } from "./features-section.component";
import { MatGridListModule } from '@angular/material/grid-list';


@Component({
    selector: 'nihilia-section',
    template: `
    <section class="px-4 py-4 bg-zinc-700">
        <mat-grid-list cols="2" rowHeight="200px">
            <mat-grid-tile>
                <p class="text-center text-5xl text-zinc-400">Wellcome to Nihilia Dapp</p>
            </mat-grid-tile>
        <mat-grid-tile>
            <img src="../assets/nihilia_photo.jpeg">
        </mat-grid-tile>
        </mat-grid-list>
        <!-- 
        </mat-grid-list> -->
    </section>
    `,
    standalone: true,
    imports: [FeaturesSectionComponent, MatGridListModule]
})

export class NihiliaSectionComponent {}