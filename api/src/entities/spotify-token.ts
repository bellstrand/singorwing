import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm"
import { UserEntity } from "."

@Entity("spotify_token")
export class SpotifyTokenEntity extends BaseEntity {
	@PrimaryGeneratedColumn("uuid", {})
	readonly id!: string

	@Column({ nullable: false, readonly: true })
	readonly userId!: string
	@ManyToOne(() => UserEntity, { nullable: false })
	@JoinColumn({ name: "userId" })
	readonly user!: UserEntity

	@Column({ nullable: false })
	readonly access_token!: string

	@Column({ nullable: false })
	readonly token_type!: "Bearer"

	@Column({ nullable: false })
	readonly scope!: string

	@Column({ nullable: false })
	readonly expires_in!: number

	@Column({})
	readonly refresh_token?: string

	@VersionColumn({ readonly: true })
	readonly version!: Date
	@CreateDateColumn({ readonly: true })
	readonly createdAt!: Date
	@UpdateDateColumn({ readonly: true })
	readonly updatedAt!: Date
}
