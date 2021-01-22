import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createInstituicoes1608092505745 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'instituicoes',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'nome',
                    type: 'text'
                },
                {
                    name: 'categoria',
                    type: 'text'
                },
                {
                    name: 'pais',
                    type: 'text'
                },
                {
                    name: 'estado',
                    type: 'text',   
                },
                {
                    name: 'cidade',
                    type: 'text',
                },
                {
                    name: 'endereco',
                    type: 'text',
                },
                {
                    name: 'cep',
                    type: 'bigInt',
                },
                {
                    name: 'telefones',
                    type: 'bigInt',
                },
                {
                    name: 'email',
                    type: 'email',
                },
                {
                    name: 'site',
                    type: 'text',
                },
                {
                    name: 'coordenador',
                    type: 'varchar',
                },
                {
                    name: 'datafundacao',
                    type: 'date',
                },
                {
                    name: 'DatadeRealizacao',
                    type: 'date',
                },
                {
                    name: 'NomedaRealizacao',
                    type: 'text',
                },
               
                {
                    name: 'latitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2,
                },
                {
                    name: 'longitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2,
                },
                {
                    name: 'info',
                    type: 'text'
                }
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('instituicoes');
    }

}
