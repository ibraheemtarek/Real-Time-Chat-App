import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import User from "./user.entity";
import { RoomMember } from "./roomMember.entity";

export enum RoomType {
  private = "private",
  public = "public",
}
@Entity("rooms")
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "enum", enum: RoomType })
  type: RoomType;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  roomImage: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Index()
  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  lastMessageAt: Date;

  @ManyToOne(() => User, (user) => user.createdRooms, { nullable: true })
  @JoinColumn()
  createdBy: User;

  @OneToMany(() => RoomMember, (roomMember) => roomMember.room)
  roomMembers: RoomMember[];
}
