import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({collection: 'pokemons_new'})
export class Pokemon extends Document {
  @Prop({ required: true, unique: true })
  pokeId: number;

  @Prop({ required: true })
  name: string;

  @Prop()
  height: number;

  @Prop()
  weight: number;

  @Prop()
  ability: string;

  @Prop()
  image: string;

  @Prop({ default: false })
  captured: boolean;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);