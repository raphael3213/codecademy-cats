import ksuid from 'ksuid';
import { Upload } from 'src/uploads/entities/upload.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false, unique: true })
  ksuid: string = ksuid.randomSync().toJSON();

  @Column({ type: 'text', nullable: false })
  name: string;

  @OneToOne(() => Upload)
  @JoinColumn()
  upload: Upload;

  @Column({ type: 'bigint', name: 'created_at' })
  createdAt: number;

  @Column({ type: 'bigint', name: 'updated_at' })
  updatedAt: number;

  @BeforeInsert()
  updateTimestampsOnInsert() {
    const currentTime = Math.floor(Date.now() / 1000);
    this.createdAt = currentTime;
    this.updatedAt = currentTime;
  }

  @BeforeUpdate()
  updateTimestampsOnUpdate() {
    this.updatedAt = Math.floor(Date.now() / 1000);
  }
}
