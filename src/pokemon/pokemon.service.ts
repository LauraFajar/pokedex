import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import axios from 'axios';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    const pokemon = new this.pokemonModel(createPokemonDto);
    return pokemon.save();
  }

  async findAll(): Promise<Pokemon[]> {
    return this.pokemonModel.find();
  }

  async findOne(term: string): Promise<Pokemon> {
  let pokemon: Pokemon | null = null;

  // 1. Si es un ObjectId válido
  if (isValidObjectId(term)) {
    pokemon = await this.pokemonModel.findById(term);
    if (pokemon) return pokemon;
  }

  // 2. Si es un nombre (string)
  pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() });
  if (pokemon) return pokemon;

  // 3. Si es un número (pokeId)
  const pokeId = Number(term);
  if (!isNaN(pokeId)) {
    pokemon = await this.pokemonModel.findOne({ pokeId });
    if (pokemon) return pokemon;
  }

  // 4. Si no encuentra nada
  throw new NotFoundException(`Pokemon with identifier "${term}" not found`);
}

  async getFromExternalAPI(term: string) {
    try {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${term}`);
      return {
        name: data.name,
        pokeId: data.id,
        height: data.height,
        weight: data.weight,
        image: data.sprites.front_default,
        ability: data.abilities[0]?.ability?.name || 'Unknown',
        color: 'default',
      };
    } catch (error) {
      throw new NotFoundException(`Pokemon ${term} not found in external API`);
    }
  }

  async update(id: number, updateDto: UpdatePokemonDto): Promise<Pokemon> {
    const pokemon = await this.pokemonModel.findOneAndUpdate({ pokeId: id }, updateDto, { new: true });

    if (!pokemon) {
      throw new NotFoundException(`Pokemon with ID ${id} not found`);
    }

    return pokemon;
  }

  async remove(id: string): Promise<void> {
    const result = await this.pokemonModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException(`Pokemon with ID ${id} not found`);
    }
  }
}

