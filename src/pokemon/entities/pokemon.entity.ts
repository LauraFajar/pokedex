import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document {
  @Prop({ required: true, unique: true })
  pokeId: number;

  @Prop()
  name: string;

  @Prop()
  height: number;

  @Prop()
  weight: number;

  @Prop()
  ability: string;

  @Prop()
  image: string;

  @Prop()
  color: string;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);

