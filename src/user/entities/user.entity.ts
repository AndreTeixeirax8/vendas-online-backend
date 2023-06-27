import { AddressEntity } from "src/address/entities/address.entity";
import { OrderEntity } from "src/order/entities/order.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'user'})
export class UserEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    email:string;

    @Column()
    phone:string;

    @Column()
    cpf:string;

    @Column()
    password:string;

    @Column()
    type_user:number;

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;

    @OneToMany(() => AddressEntity, (address)=>address.user)
    addresses?:AddressEntity[];

    @OneToMany(() => OrderEntity, (order) => order.address)
    orders?: OrderEntity[];
}