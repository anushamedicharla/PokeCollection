import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../shared/pokemon';
import { PokemonService } from '../shared/pokemon.service';

@Component({
  selector: "pk-list",
  moduleId: module.id,
  templateUrl: 'list-pokemons.template.html'
})

export class ListPokemonsComponent implements OnInit {
  pokemon: Pokemon[];
  errorMessage: string;
  
  constructor(private _pokeService: PokemonService){}

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
          error => this.errorMessage
        )
  }

  deletePokemon(pokemon: Pokemon) {
    this._pokeService.deletePokemon(pokemon)
        .subscribe(
          //() => {},
          () => this.deletePokemonFromList(pokemon),
          error => this.errorMessage,
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
}