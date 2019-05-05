import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm"
import { User } from "types"

@Entity("user")
export class UserEntity extends BaseEntity implements User {
	@PrimaryGeneratedColumn("uuid")
	readonly id!: string

	@Column({ nullable: false, default: false })
	administrator!: boolean

	@Column({ nullable: false, unique: true })
	readonly email!: string

	@Column({ nullable: false, default: "NEW_USER" })
	name!: string

	@Column({ nullable: true, select: false })
	password!: string

	@VersionColumn({ readonly: true })
	readonly version!: Date
	@CreateDateColumn({ readonly: true })
	readonly createdAt!: Date
	@UpdateDateColumn({ readonly: true })
	readonly updatedAt!: Date
}
