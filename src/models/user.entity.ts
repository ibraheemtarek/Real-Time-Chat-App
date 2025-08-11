import { CreateDateColumn, OneToMany, UpdateDateColumn } from "typeorm";
import { Column } from "typeorm";
import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./room.entity";
import { RoomMember } from "./roomMember.entity";
export enum UserStatus {
  online = "online",
  offline = "offline",
  away = "away",
}
@Entity("users")
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  profileImage?: string;

  @Column({ type: "enum", enum: UserStatus, default: UserStatus.offline })
  state: UserStatus;

  @Column({ type: "timestamp", nullable: true })
  lastSeen?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Room, (rooms) => rooms.createdBy)
  createdRooms: Room[];

  @OneToMany(() => RoomMember, (roomMember) => roomMember.user)
  roomMembers: RoomMember[];
}
