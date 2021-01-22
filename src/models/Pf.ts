import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Image from './Image';


@Entity('instituicoes')
export default class Pf {
    @PrimaryGeneratedColumn('increment')
    id: number; 
    
    @Column()
    nome: string;

    @Column()
    categoria: string;

    @Column()
    pais: string;

    @Column()
    estado: string;
    
    @Column()
    cidade: string;

    @Column()
    endereco: string;

    @Column()
    cep: number;

    @Column()
    telefones: number;

    @Column()
    email: string;

    @Column()
    site: string;

    @Column()
    coordenador: string;

    @Column()
    datafundacao: Date;

    @Column()
    DatadeRealizacao: Date;

    @Column()
    NomedaRealizacao: string;


    @Column()
    info: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @OneToMany(() => Image, image => image.pf, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'pf_id' })
    images: Image[];
}