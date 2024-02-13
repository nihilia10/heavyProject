import { Component, Input } from "@angular/core";
import { Balance } from "./services/indexer.services";

@Component({
    selector: 'balance-section',
    template: `
    <section class='px-4 py-32 '>
        <div class='top-4 left-4 flex w-50 justify-center items-center'>
            <img [src]="account?.info?.image" class="w-8 h-8" />
            <p class='text-xl px-4'> {{account?.info?.name}}: </p>
            <p class='text-xl px-4'> $ {{account?.balance}} </p>
        </div>
    </section>
    `,
    standalone: true,
})

export class BalanceSectionComponent {
    @Input() account!: Balance | null;
}
