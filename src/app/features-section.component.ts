import { Component } from "@angular/core";

@Component({
    selector: 'features-section',
    template: `
    <section class='px-4 py-32 bg-yellow-400/85'>
        <p class='text-center text-4xl'>
            Sección de Fetaures
        </p>
    </section>
    `,
    standalone: true,
})

export class FeaturesSectionComponent {}