import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/race';

@Injectable()
export class TranslationService {
  private langs: string[] = ['en_GB', 'sv_SV'];
  private defaultLang: string = 'en_GB';
  private suffix: string = '.json';
  private registeredModules: Set<string>;

  constructor(private translate: TranslateService,
              private http: HttpClient,
              private storage: LocalStorageService) {
    this.translate.addLangs(this.langs);
    this.translate.setDefaultLang(this.defaultLang);
    this.translate.use(this.defaultLang);
    this.registeredModules = new Set<string>();
  }

  registerFor(modulePath: string): void {
    this.getTranslations(this.translate.currentLang, modulePath)
      .subscribe(translation => {
        this.translate.setTranslation(this.translate.currentLang, translation, true);
        this.registeredModules.add(modulePath);
      });
  }

  changeLanguage(lang: string): Observable<string> {
    return Observable.from(Array.from(this.registeredModules))
      .mergeMap(modulePath => this.getTranslations(lang, modulePath))
      .do(translation => {
        this.translate.setTranslation(lang, translation, true);
        this.translate.use(lang);
      })
      .mapTo(lang);
  }

  private getTranslations(lang: string, modulePath: string): Observable<{ [key: string]: string }> {
    const prefix: string = modulePath ? `${modulePath.split('/').pop()}-${lang}` : lang;
    const url: string = `${modulePath}/i18n/${prefix}${this.suffix}`;

    return Observable.race(
      this.storage.get<{ [key: string]: string }>(url),
      this.http.get<{ [key: string]: string }>(url)
        .do(translations => this.storage.set<{ [key: string]: string }>(url, translations))
    );
  }
}
