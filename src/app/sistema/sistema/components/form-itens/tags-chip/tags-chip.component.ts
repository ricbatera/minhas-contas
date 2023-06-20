import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Store } from '@ngrx/store';
import { Observable, map, startWith } from 'rxjs';
import { Classificacao } from 'src/app/model/classificacao';
import {addTagListaSelecionadas, criaTag, removeTagListaSelecionadas} from 'src/app/sistema/store/sistema.actions';
import {getListaTagsSaidas, getListaTagsSelecionadas} from 'src/app/sistema/store/sistema.selectors';
import { ITagsState } from 'src/app/sistema/store/sistema.state';

@Component({
  selector: 'app-tags-chip',
  templateUrl: './tags-chip.component.html',
  styleUrls: ['./tags-chip.component.css'],
})
export class TagsChipComponent implements OnInit {
  tagss: FormControl = new FormControl();
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredTags: Observable<Classificacao[]>;
  @ViewChild('tagInput')
  tagInput!: ElementRef<HTMLInputElement>;
  listaTags$: Observable<Classificacao[]>;
  tagsSelecionadas$: Observable<Classificacao[]>;

  constructor(
    private store: Store<{ sistema: ITagsState }>
  ) {
    this.listaTags$ = store.select(getListaTagsSaidas);
    this.tagsSelecionadas$ = store.select(getListaTagsSelecionadas);
    this.filteredTags = this.tagss.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : this.lista()))
    );
  }

  lista(): Classificacao[] {
    let res: Classificacao[] = [];
    this.listaTags$.subscribe((r) => (res = r));
    return res;
  }

  ngOnInit(): void {}

  private _filter(tag: string): Classificacao[] {
    let fil: Classificacao[] = [];
    this.listaTags$.subscribe((res) => {
      fil = res.filter((cat) => cat.nome.includes(tag));
    });
    //this.listaCategorias.filter(cat=> cat.nome.includes(tag));
    return fil;
  }

  removeItemTag(tag: Classificacao) {
    this.store.dispatch(removeTagListaSelecionadas({tag}))
  }

  addNewTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();    
    // Add our tag
    if (value) {
      const novaCategoria: any = {
        id: null,
        nome: value,
        tipo: 'Saída',
        status: true,
      };
      this.store.dispatch(new criaTag(novaCategoria));
      this.tagInput.nativeElement.value = '';
      this.tagss.setValue(null);
      alert('Nova Tag casdastrada na base com sucesso.');
    }

    // Clear the input value
    event.chipInput!.clear();
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    let tag!: Classificacao;
    this.listaTags$.subscribe((res) => {
      res.forEach((el) => {
        if (el.nome == event.option.viewValue) {tag = el;}
      });
    });
    this.store.dispatch(addTagListaSelecionadas({ tag }));
    this.tagInput.nativeElement.value = '';
    this.tagss.setValue(null);
  }
}
