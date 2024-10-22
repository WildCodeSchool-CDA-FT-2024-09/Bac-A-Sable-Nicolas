import "reflect-metadata";
import { IsString, Max, MaxLength, Min } from "class-validator";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Repo } from "./index.entites";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity("status")
export class Status extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Field()
  @Column({ type: "varchar", unique: true, length: 100 })
  @IsString()
  @MaxLength(100)
  name: string;

  @Field(() => [Repo])
  @OneToMany(() => Repo, repo => repo.status)
  repos?: Repo[];
}