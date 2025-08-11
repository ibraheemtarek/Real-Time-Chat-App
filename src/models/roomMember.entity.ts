import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Room } from "./room.entity";
import User from "./user.entity";

export enum RoomMemberRole {
  admin = "admin",
  user = "user",
}

@Entity("room_members")
@Unique(["roomId", "userId"])
export class RoomMember {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomId: number;

  @Column()
  userId: number;

  @Column({ type: "enum", enum: RoomMemberRole, default: RoomMemberRole.user })
  role: RoomMemberRole;

  @CreateDateColumn()
  joinedAt: Date;

  @Column({ type: "timestamp", nullable: true })
  leftAt?: Date;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @ManyToOne(() => Room, (room) => room.roomMembers, { onDelete: "CASCADE" })
  @JoinColumn({ name: "roomId" })
  room: Room;

  @ManyToOne(() => User, (user) => user.roomMembers, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;
}
