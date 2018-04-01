import { Component, Input, ViewChild } from "@angular/core";
import { Pokemon } from '../shared/pokemon';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'poke-details',
    templateUrl: 'pokemon-modal.template.html'
})
export class PokemonModalComponent {
    @Input() pokeDetails: Pokemon;
    @ViewChild('childModal') public childModal: ModalDirective;

    show() {
        this.childModal.show();
    }

    hide() {
        this.childModal.hide();
    }

}