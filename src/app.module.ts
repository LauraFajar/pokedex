import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-pokemon', {
      autoIndex: true,
    }),
    PokemonModule,
  ],
})
export class AppModule {}