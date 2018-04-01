import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Pokemon } from './pokemon';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw'

@Injectable()
export class PokemonService {
  private pokemonUrl:string = "api/pokemons";

  constructor(private _http: Http) { }

  getPokemons(): Observable<Pokemon[]> {
    return this._http
               .get(this.pokemonUrl)
               .map((res: Response) => <Pokemon[]> res.json().data) // Convert data we get to Pokemon array
               .do(data => console.log(data))
               .catch(this.handleError);
  }

  getPokemonDetails(id:number): Observable<Pokemon> {
    let url = `${this.pokemonUrl}/${id}`;
    return this._http
               .get(url)
               .map((res: Response) => <Pokemon> res.json().data) // Convert data we get to Pokemon
               .do(data => console.log(data))
               .catch(this.handleError);
  }
  
  deletePokemon(pokemon: Pokemon): Observable<Response> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let url = `${this.pokemonUrl}/${pokemon.id}`;

    return this._http.delete(url,options)
                .catch(this.handleError);
  }

  addPokemon(newPokemon: any):Observable<Pokemon> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(newPokemon);
    let url = `${this.pokemonUrl}`;

    return this._http
            .post(this.pokemonUrl, body, options)
            .map((response: Response) => {
              return response.json();
            })
            .do(data => console.log(data))
            .catch(this.handleError);
  }

  private handleError(error: Response){
    let msg = `Error Status Code ${error.status} status ${error.statusText} at ${error.url}`;
    return Observable.throw(msg);
  }

}