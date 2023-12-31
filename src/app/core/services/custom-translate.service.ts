import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, lastValueFrom, tap } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@Injectable({
  providedIn: 'root'
})
export class CustomTranslateService {

  private _language:BehaviorSubject<string> = new BehaviorSubject<string>('es');
  public language$ = this._language.asObservable();

  private supportedLangs = ['en', 'es'];

  constructor(
    private translate:TranslateService
  ) { 
    this.init();
  }

  private async init(){
    this.translate.addLangs(['es','en']);
    this.translate.setDefaultLang(this._language.value);
  }

  use(language:string){
    lastValueFrom(this.translate.use(language)).then(_=>{
      this._language.next(language);
    }).catch(err=>{
      console.error(err);
    });  
  }


  get(key:string):Observable<string>{
    return this.translate.get(key);
  }

  getBrowserLang() {
    let browserLang = this.translate.getBrowserLang();
    browserLang = (browserLang && this.supportedLangs.includes(browserLang)) ? browserLang : 'es';
    return browserLang;
  }
}
