import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm"
import { Song } from "types"
import { ArtistEntity, DistortionEntity, FindSongEntity, IntroEntity } from "."

@Entity("song")
export class SongEntity extends BaseEntity implements Song {
	@PrimaryGeneratedColumn("uuid", {})
	readonly id!: string

	@Column({ nullable: false, readonly: true })
	readonly artistId!: string
	@ManyToOne(() => ArtistEntity, { nullable: false })
	@JoinColumn({ name: "artistId" })
	readonly artist!: ArtistEntity

	@Column({ nullable: false })
	name!: string

	@Column({ nullable: false, default: 10 })
	difficulty!: number

	@Column({ nullable: false, default: "" })
	album!: string

	@Column({})
	released!: number

	@Column({ nullable: false, default: "" })
	lyrics!: string

	@OneToMany(
		() => DistortionEntity,
		(distortion: DistortionEntity) => distortion.song,
	)
	distortions!: DistortionEntity[]

	@OneToMany(
		() => FindSongEntity,
		(findSong: FindSongEntity) => findSong.song,
	)
	findSongs!: FindSongEntity[]

	@OneToMany(
		() => IntroEntity,
		(intro: IntroEntity) => intro.song,
	)
	intros!: IntroEntity[]

	@VersionColumn({ readonly: true })
	readonly version!: Date
	@CreateDateColumn({ readonly: true })
	readonly createdAt!: Date
	@UpdateDateColumn({ readonly: true })
	readonly updatedAt!: Date
}
