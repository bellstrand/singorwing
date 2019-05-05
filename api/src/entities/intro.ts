import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm"
import { Intro } from "types"
import { SongEntity } from "."

@Entity("intro")
export class IntroEntity extends BaseEntity implements Intro {
	@PrimaryGeneratedColumn("uuid", {})
	readonly id!: string

	@Column({ nullable: false, readonly: true })
	readonly songId!: string
	@ManyToOne(() => SongEntity, { nullable: false })
	@JoinColumn({ name: "songId" })
	readonly song!: SongEntity

	@Column({ nullable: false })
	readonly spotifyId!: string

	@Column({ nullable: false, default: 10 })
	difficulty!: number

	@Column({ nullable: false, default: 999 })
	start!: number

	@Column({ nullable: false, default: 0 })
	end!: number

	@Column({ nullable: false, default: 0 })
	chorus!: number

	@VersionColumn({ readonly: true })
	readonly version!: Date
	@CreateDateColumn({ readonly: true })
	readonly createdAt!: Date
	@UpdateDateColumn({ readonly: true })
	readonly updatedAt!: Date
}
