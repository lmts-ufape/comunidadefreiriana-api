import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('admins')
export default class Admin {
    @PrimaryGeneratedColumn('increment')
    id: number; 
    
    @Column()
    user: string;

    @Column()
    password: string;
    
}