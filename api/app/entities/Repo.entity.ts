import "reflect-metadata";
import { IsString, MaxLength } from "class-validator";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { Lang, Status } from "./index.entites";

@Entity("repo")
export class Repo extends BaseEntity {
  @PrimaryColumn({ type: "varchar", unique: true })
  @IsString()
  id: string;

  @Column({ type: "varchar", unique: true, length: 100 })
  @IsString()
  @MaxLength(100)
  name: string;

  @Column({ type: "varchar", unique: true })
  @IsString()
  url: string;

  @ManyToOne(() => Status, status => status.id)
  status: Status;

  @ManyToMany(() => Lang, lang => lang.repos)
  @JoinTable()
  languages?: Lang[];
}