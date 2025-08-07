import {BadRequestException, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll( paginationDto: PaginationDto) {

    const { limit = 10, offset = 0 } = paginationDto;
    return this.pokemonModel.find()
    .limit( limit )
    .skip( offset )
    .sort({
      no: 1
    })
    .select('-__v');
  }

  async findOne(id: string): Promise<Pokemon> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException(`El id ${id} no es un MongoID válido`);
    }

    const pokemon = await this.pokemonModel.findById(id);

    if (!pokemon) {
      throw new NotFoundException(`Pokemon con id ${id} no encontrado`);
    }

    return pokemon;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon con id ${id} no encontrado`);
    }

    return { message: `Pokemon con id ${id} eliminado` };
  }

  private handleExceptions(error: any): never {
    if (error.code === 11000) {
      throw new BadRequestException(
        `El Pokemon ya existe en la base de datos: ${JSON.stringify(
          error.keyValue
        )}`
      );
    }

    console.error(error);
    throw new InternalServerErrorException(
      'No se pudo crear el Pokemon - revisar logs del servidor'
    );
  }
}

