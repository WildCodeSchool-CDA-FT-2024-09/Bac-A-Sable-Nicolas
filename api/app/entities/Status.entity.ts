import "reflect-metadata";
import { IsString, Max, MaxLength, Min } from "class-validator";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Repo } from "./index.entites";

@Entity("status")
export class Status extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", unique: true, length: 100 })
  @IsString()
  @MaxLength(100)
  name: string;

  @OneToMany(() => Repo, repo => repo.status)
  repos?: Repo[];
}