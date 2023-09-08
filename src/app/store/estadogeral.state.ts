import { Devedor } from "../model/devedor";

//lista de devedores
export interface IListaDevedores {
    loading: boolean,
    data: Devedor[]
}