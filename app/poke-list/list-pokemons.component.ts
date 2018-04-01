import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Pokemon } from '../shared/pokemon';
import { PokemonService } from '../shared/pokemon.service';
import { ModalDirective } from 'ng2-bootstrap';
import { PokemonModalComponent } from './pokemon-modal.component';

@Component({
  selector: "pk-list",
  moduleId: module.id,
  templateUrl: 'list-pokemons.template.html',
  styles: [`
    :host >>> .tooltip-inner {
      background-color: #FF7768;
      color: #fff;
    }

    :host >>> .tooltip .tooltip-arrow {
      border-bottom-color: #FF768;
    }
    `
  ]
})

export class ListPokemonsComponent implements OnInit {
  pokemon: Pokemon[];
  errorMessage: string;
  @ViewChild('childModal') public childModal: PokemonModalComponent;

  // Modal Properties
  pokeDetails: Pokemon;
  
  constructor(private _pokeService: PokemonService,
              private _viewContainerRef: ViewContainerRef){}

  ngOnInit() {
    //Get all pokemons
    this.getPokemons();
  }

  getPokemons(){
    this._pokeService.getPokemons()
        .subscribe(
          (pokemon: Pokemon[]) => {
            this.pokemon = pokemon;
          },
          error => this.errorMessage = <any> error
        )
  }

  deletePokemon(pokemon: Pokemon) {
    this._pokeService.deletePokemon(pokemon)
        .subscribe(
          //() => {},
          () => this.deletePokemonFromList(pokemon),
          error => this.errorMessage = <any> error,
          () => {
            //this.getPokemons();
          }
        );
  }

  private deletePokemonFromList(pokemon: Pokemon) {
    let index = this.pokemon.indexOf(pokemon, 0);
    if(index > -1){
      this.pokemon.splice(index, 1);
    }
  }

  viewSinglePokemon(id: number) {
    this._pokeService.getPokemonDetails(id)
        .subscribe(
          (pokemon: Pokemon) => {
            this.pokeDetails = pokemon;
            this.childModal.show();
          },
          error => this.errorMessage = <any> error
        );
  }
}