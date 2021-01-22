import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Pf from './Pf';

@Entity('images')
export default class PImage {
    @PrimaryGeneratedColumn('increment')
    id: number; 

    @Column()
    path: string;

    @ManyToOne(() => Pf, pf => pf.images)
    @JoinColumn({ name: 'pf_id' })
    pf: Pf;

}