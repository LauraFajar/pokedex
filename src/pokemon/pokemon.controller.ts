import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post('capture')
  async capturePokemon(@Body() body: {
    pokeId: number;
    name: string;
    height: number;
    weight: number;
    ability: string;
    image: string;
  }) {
    return this.pokemonService.capturePokemon(body);
  }

  @Get('captured')
  async getCapturedPokemons() {
    return this.pokemonService.getCapturedPokemons();
  }

  @Get('by-id')
  async getPokemonById(@Query('pokeId') pokeId: number) {
    return this.pokemonService.getPokemonById(Number(pokeId));
  }
}
