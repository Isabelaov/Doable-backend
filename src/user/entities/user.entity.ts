import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @BeforeUpdate()
  @BeforeInsert()
  async parseStrings() {
    this.name = this.name.toLocaleLowerCase();
    this.email = this.email.toLocaleLowerCase();
    this.password = await bcrypt.hash(this.password, 10);
  }
}
