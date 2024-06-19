import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 10, unique: true, nullable: false })
  username: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  password: string;
}
