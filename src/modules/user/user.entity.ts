import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'user' }) // name 填入表名称，会自动创建这个表
export class UserEntity {
  @PrimaryGeneratedColumn({
    comment: '主键ID（自增）',
  })
  id: number;

  @Column({
    length: 500,
    comment: '姓名',
  })
  name: string;

  @Column('text')
  description: string;

  @Column()
  filename: string;

  @Column('int')
  views: number;

  @Column()
  isPublished: boolean;
}
