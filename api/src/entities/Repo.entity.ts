import "reflect-metadata";
import { IsString, MaxLength } from "class-validator";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { Lang, Status } from "./index.entites";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity("repo")
export class Repo extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn({ type: "varchar", unique: true })
  @IsString()
  id: string;

  @Field()
  @Column({ type: "varchar", unique: true, length: 100 })
  @IsString()
  @MaxLength(100)
  name: string;

  @Field()
  @Column({ type: "varchar", unique: true })
  @IsString()
  url: string;

  @Field(() => Status, { nullable: true })
  @ManyToOne(() => Status, status => status.id)
  status: Status;

  @Field(() => [Lang], { nullable: true })
  @ManyToMany(() => Lang, lang => lang.repos)
  @JoinTable()
  languages?: Lang[];
}