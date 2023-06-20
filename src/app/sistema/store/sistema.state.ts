import { Classificacao } from "src/app/model/classificacao";

export interface ITagsState{
    tags: Classificacao[]
    isLoading: boolean,
    tagsSelecionadas: Classificacao[]
}