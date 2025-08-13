import { IsNotEmpty } from 'class-validator';

export class CreatePokemonDto {
  @IsNotEmpty()
  pokeId: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  height: number;

  @IsNotEmpty()
  weight: number;

  @IsNotEmpty()
  ability: string;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  color: string;
}

