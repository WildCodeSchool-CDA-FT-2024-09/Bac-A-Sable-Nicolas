import "reflect-metadata";
import { IsString, MaxLength } from "class-validator";
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Repo } from "./index.entites";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity("lang")
export class Lang extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Field()
  @Column({ type: "varchar", unique: true, length: 20 })
  @IsString()
  @MaxLength(20)
  name: string;

  @Field(() => [Repo])
  @ManyToMany(() => Repo, repo => repo.languages)
  repos?: Repo[];
}