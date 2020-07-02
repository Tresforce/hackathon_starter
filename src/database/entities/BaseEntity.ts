import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { UUID } from '../../typings';

export default abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: UUID;

  @CreateDateColumn({ name: 'dateCreated', nullable: false })
  public dateCreated!: Date;

  @UpdateDateColumn({ name: 'lastUpdated', nullable: false })
  public lastUpdated!: Date;
}
