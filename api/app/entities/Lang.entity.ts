import "reflect-metadata";
import { IsString, MaxLength } from "class-validator";
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Repo } from "./index.entites";

@Entity("lang")
export class Lang extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", unique: true, length: 20 })
  @IsString()
  @MaxLength(20)
  name: string;

  @ManyToMany(() => Repo, repo => repo.languages)
  repos?: Repo[];
}