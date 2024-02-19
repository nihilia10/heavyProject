import { Component } from "@angular/core";
import { NihiliaSectionComponent } from "./nihilia-section.component";
import { FeaturesSectionComponent } from "./features-section.component";

@Component({
    selector: 'nihilia-dapp-homepage',
    template: `
        <nihilia-section></nihilia-section>
        <features-section></features-section>
    `,
    standalone: true,
    imports: [NihiliaSectionComponent, FeaturesSectionComponent]
})

export class HomePageComponent {}