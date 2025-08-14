import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from '../pokemon/entities/pokemon.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({});
    return { message: 'Seed ejecutado correctamente. Colección limpiada.' };
  }

  async capturePokemon(data: {
    pokeId: number;
    name: string;
    height: number;
    weight: number;
    ability: string;
    image: string;
  }) {
    let pokemon = await this.pokemonModel.findOne({ pokeId: data.pokeId });
    if (!pokemon) {
      pokemon = new this.pokemonModel({ ...data, captured: true });
      await pokemon.save();
    } else {
      pokemon.captured = true;
      await pokemon.save();
    }
    return { success: true, pokeId: data.pokeId, name: data.name };
  }

  async getCapturedPokemons() {
    const pokemons = await this.pokemonModel.find({ captured: true });
    return pokemons.map(p => ({
      pokeId: p.pokeId,
      name: p.name,
      height: p.height,
      weight: p.weight,
      ability: p.ability,
      image: p.image,
      captured: p.captured,
    }));
  }

  async getPokemonById(pokeId: number) {
    return this.pokemonModel.findOne({ pokeId });
  }
}