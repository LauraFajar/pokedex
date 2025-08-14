import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pokemon.name, schema: PokemonSchema },
    ]),
  ],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}