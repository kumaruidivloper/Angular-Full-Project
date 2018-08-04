import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { createServiceMock, mockService } from '../../../../testing/mocks/mock-service';
import { defaultConfig } from '../local-storage/local-storage.config';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { CachedItem } from '../local-storage/local-storage.model';
import { TranslationService } from './translation.service';
import 'rxjs/add/observable/never';

describe('TranslationService', () => {

  let http: HttpClient,
      translate: TranslateService,
      storage: LocalStorageService;

  const translations: { [key: string]: string } = {test: 'test translation'},
        module: string = 'test',
        lang: string = 'en_GB';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        TranslationService,
        {
          provide: TranslateService,
          useValue: Object.assign(createServiceMock(TranslateService), {currentLang: 'en_GB'})
        },
        mockService(LocalStorageService)
      ]
    });

    http = TestBed.get(HttpClient);
    translate = TestBed.get(TranslateService);
    storage = TestBed.get(LocalStorageService);

    (<jasmine.Spy>storage.get).and.returnValue(Observable.never());
    spyOn(http, 'get').and.returnValue(Observable.of(translations));
  });

  it('should be created', inject([TranslationService], (service: TranslationService) => {
    expect(service).toBeTruthy();
    expect(translate.addLangs).toHaveBeenCalled();
    expect(translate.setDefaultLang).toHaveBeenCalled();
    expect(translate.use).toHaveBeenCalled();
  }));

  it('should register module and getTranslations', inject([TranslationService], (service: TranslationService) => {
    const prefix: string = module ? `${module}-${lang}` : lang;
    service.registerFor(module);
    expect(http.get).toHaveBeenCalledWith(`${module}/i18n/${prefix}.json`);
    expect(translate.setTranslation).toHaveBeenCalledWith(lang, translations, true);
  }));

  it('should change language and getTranslations', inject([TranslationService], (service: TranslationService) => {
    const newLang: string = 'pl_PL',
          prefix: string = module ? `${module}-${newLang}` : newLang;
    service.registerFor(module);
    service.changeLanguage(newLang)
      .subscribe(changedLang => {
        expect(changedLang).toEqual(newLang);
        expect(http.get).toHaveBeenCalledWith(`${module}/i18n/${prefix}.json`);
        expect(translate.setTranslation).toHaveBeenCalledWith(newLang, translations, true);
        expect(translate.use).toHaveBeenCalledWith(newLang);
      });
  }));

  it('should getTranslations with module', inject([TranslationService], (service: TranslationService) => {
    const url: string = `${module}/i18n/${module}-${lang}.json`;
    service['getTranslations'](lang, module)
      .subscribe( result => {
        expect(storage.get).toHaveBeenCalledWith(url);
        expect(http.get).toHaveBeenCalledWith(url);
        expect(storage.set).toHaveBeenCalledWith(url, result);
        expect(result).toEqual(translations);
      });
  }));

  it('should getTranslations with empty module', inject([TranslationService], (service: TranslationService) => {
    const emptyModule: string = '',
          url: string = `${emptyModule}/i18n/${lang}.json`;
    service['getTranslations'](lang, emptyModule)
      .subscribe( result => {
        expect(storage.get).toHaveBeenCalledWith(url);
        expect(http.get).toHaveBeenCalledWith(url);
        expect(storage.set).toHaveBeenCalledWith(url, result);
        expect(result).toEqual(translations);
      });
  }));

  it('should getTranslations with cached translation', inject([TranslationService], (service: TranslationService) => {
    const cachedItem: CachedItem<{ [key: string]: string }> = {
            expires: defaultConfig.expire,
            value: translations
          },
          url: string = `${module}/i18n/${module}-${lang}.json`;

    (<jasmine.Spy>storage.get).and.returnValue(Observable.of(cachedItem.value));
    service['getTranslations'](lang, module)
      .subscribe( result => {
        expect(storage.get).toHaveBeenCalledWith(url);
        expect(http.get).toHaveBeenCalledWith(url);
        expect(storage.set).not.toHaveBeenCalled();
        expect(result).toEqual(translations);
      });
  }));

});
