import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm"
import { DuelTheme } from "types"

@Entity("duel-theme")
export class DuelThemeEntity extends BaseEntity implements DuelTheme {
	@PrimaryGeneratedColumn("uuid", {})
	readonly id!: string

	@Column({ nullable: false, default: 10 })
	difficulty!: number

	@Column({ nullable: false })
	theme!: string

	@VersionColumn({ readonly: true })
	readonly version!: Date
	@CreateDateColumn({ readonly: true })
	readonly createdAt!: Date
	@UpdateDateColumn({ readonly: true })
	readonly updatedAt!: Date
}
