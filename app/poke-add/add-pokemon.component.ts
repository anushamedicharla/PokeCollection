import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../shared/pokemon';
import { PokemonService } from '../shared/pokemon.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: 'add-pokemon.template.html'
})

export class AddPokemonComponent {
  formPokemon: any = {};
  cardTitle: string = "Add Pokemon";
  errorMsg: string;

  constructor(private _route: Router, private _pokeService: PokemonService) {}

  savePokemon(newPokemonFormvalues:any) {
    this._pokeService.addPokemon(newPokemonFormvalues)
        .subscribe(
          res => {
            console.log(' Pokemon Saved!! ');
            this._route.navigate(['/']);
          },
          error => console.log('error', error)
        )
  }

}