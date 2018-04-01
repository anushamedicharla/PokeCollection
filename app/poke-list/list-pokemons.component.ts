import { Component, OnInit, ViewChild } from '@angular/core';
import { Pokemon } from '../shared/pokemon';
import { PokemonService } from '../shared/pokemon.service';
import { ModalDirective } from 'ng2-bootstrap';

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
  @ViewChild('childModal') public childModal: ModalDirective;

  // Modal Properties
  selectedPokemonLoaded: boolean = false;
  pokeDetails: Pokemon;
  
  constructor(private _pokeService: PokemonService){}

  ngOnInit() {
    //Get all pokemons
    this.getPokemons();
  }
  
  public hideChildModal() {
    this.childModal.hide();
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
            this.selectedPokemonLoaded = true;
            this.childModal.show();
          },
          error => this.errorMessage = <any> error
        );
  }
}