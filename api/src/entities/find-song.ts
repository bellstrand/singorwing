import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm"
import { FindSong } from "types"
import { SongEntity } from "."

@Entity("find-song")
export class FindSongEntity extends BaseEntity implements FindSong {
	@PrimaryGeneratedColumn("uuid", {})
	readonly id!: string

	@Column({ nullable: false, readonly: true })
	readonly songId!: string
	@ManyToOne(() => SongEntity, { nullable: false })
	@JoinColumn({ name: "songId" })
	readonly song!: SongEntity

	@Column({ nullable: false, default: 10 })
	difficulty!: number

	@Column({ nullable: false })
	phrase!: string

	@VersionColumn({ readonly: true })
	readonly version!: Date
	@CreateDateColumn({ readonly: true })
	readonly createdAt!: Date
	@UpdateDateColumn({ readonly: true })
	readonly updatedAt!: Date
}
