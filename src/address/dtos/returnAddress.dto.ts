import { IsInt, IsOptional, IsString } from "class-validator";
import { AddressEntity } from "../entities/address.entity";

export class ReturnAddressDto{
    complement:string;
    number:number;
    cep:string;
    //city?:any;

    constructor(address:AddressEntity){
        this.complement = address.complement;
        this.number = address.number;
        this.cep = address.cep;


    }


}