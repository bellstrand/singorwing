import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm"
import { Artist, Decade, Genre, Language } from "types"

@Entity("artist")
export class ArtistEntity extends BaseEntity implements Artist {
	@PrimaryGeneratedColumn("uuid", {})
	readonly id!: string

	@Column("text", { nullable: false })
	name!: string

	@Column({ nullable: false, default: 10 })
	difficulty!: number

	@Column("varchar", { nullable: false, default: "pop" })
	genre!: Genre

	@Column("varchar", { nullable: false, default: "2010s" })
	decade!: Decade

	@Column("varchar", { nullable: false, default: "en" })
	language!: Language

	@Column({ nullable: true })
	image?: string

	@Column({ nullable: false, default: "" })
	biography!: string

	@Column({ nullable: false, default: "" })
	members!: string

	@VersionColumn({ readonly: true })
	readonly version!: Date
	@CreateDateColumn({ readonly: true })
	readonly createdAt!: Date
	@UpdateDateColumn({ readonly: true })
	readonly updatedAt!: Date
}
