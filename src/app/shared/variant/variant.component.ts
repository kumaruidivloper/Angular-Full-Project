import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductClasses, variantFilterList } from './variant.model';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { differenceBy } from 'lodash';
import { testCaseDetailsSelector } from '../../features/test-case-step/test-case-detail/test-case-detail.reducer';
import { UpdateTestCaseDetailsForm } from '../../features/test-case-step/test-case-detail/test-case-detail.actions';
import { testStepDetailsSelector } from '../../features/test-case-step/test-step-detail/test-step-detail.reducer';
import { UpdateTestStepDetailsForm } from '../../features/test-case-step/test-step-detail/test-step-detail-actions';
import { productSelector, VariantComponentState, variantFilterSelector } from './variant.reducer';
import { GetVariantFilter, LoadProductClasses } from './variant.actions';


@Component({
  selector: 'tm-add-variant-modal',
  templateUrl: './variant.component.html',
  styleUrls: ['./variant.component.scss']
})
export class VariantComponent implements OnInit, AfterViewInit {
  @Output() closeVariantTemplate = new EventEmitter<void>();
  @Input() data: string;
  public dropdownList = [];
  public selectedItems = [];
  public dropdownSettings = {};
  public productClasses$: Observable<ProductClasses[]>;
  public variantFilter$: Observable<variantFilterList[]>;
  public asyncDataDetails$: Observable<any>;
  public productList = [];
  public variantFilterList: any [];
  public itemsPerPage = [10, 15, 20];
  public pagination  =  {'numberOfPages': 1, 'page': 1, 'pageSize': 5};
  public filters  =  {};
  public variantFilter: string  =  '';
  public productClassDescTxt: string  =  '';
  public hasText: boolean  =  false;
  public hasSymbol: boolean  =  false;
  constructor(private store: Store<VariantComponentState>) { }

  ngOnInit() {
    this.productClasses$ = this.store.select(productSelector);
    this.variantFilter$ = this.store.select(variantFilterSelector);
    if ( this.data === 'testCase') {
      this.asyncDataDetails$ = this.store.select(testCaseDetailsSelector);
    } else {
      this.asyncDataDetails$ = this.store.select(testStepDetailsSelector);
    }
    this.store.dispatch(new LoadProductClasses());

    this.dropdownList = [
      // { name_id: 1, name: 'A123' },
      // { name_id: 2, name: 'A234' },
      // { name_id: 3, name: '!' },
      // { name_id: 4, name: '&&' },
      // { name_id: 5, name: '|' },
      // { name_id: 6, name: 'B123' },
      // { name_id: 7, name: 'B234' },
      // { name_id: 8, name: ')' },
      // { name_id: 9, name: '(' }
    ];

    this.selectedItems = [];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
  }

  onItemSelect (item: any) {
    console.log(item);
  }

  onSelectAll (items: any) {
    console.log(items);
  }
  clearFilter() {
    this.selectedItems = null;
  }
  ngAfterViewInit() {
    this.productClasses$.subscribe( res => {
      this.productList =  res;
    });

    this.variantFilter$.subscribe( res => {
      this.variantFilterList = res;
    });
  }
  public productClassDesc(event) {
    this.productList.forEach( list => {
      if (list.name === event.target.value) {
        console.log('Hello if first')
        this.productClassDescTxt = list.description;
        this.store.dispatch( new GetVariantFilter(list.name));
      }
    });

    this.variantFilterList.forEach( list => {
      console.log('Hello Two');
      if (list.symbol) {
        console.log('Hello if');
        this.dropdownList.push({id: list.symbol, name: list.symbol});
        console.log(this.dropdownList);
      }
    });
  }

  onFilterChange($event) {}
  onPaginationChange($event) {}
  onCancelVariant() {
    this.closeVariantTemplate.emit();
  }
  addText(value) {
    this.hasText = false;
    this.hasSymbol = true;
    this.variantFilter = this.variantFilter + value;
  }
  addSymbol(value) {
    this.hasText = true;
    this.hasSymbol = false;
    this.variantFilter = this.variantFilter + value;
  }

  addVariant() {
    this.productClasses$
      .first()
      .withLatestFrom(this.asyncDataDetails$)
      .subscribe(([productClasses, testCaseStepDetails]) => {
        const testCaseStepProductClass = testCaseStepDetails.currentTestCaseStepVersion.testCaseStepProductClassFilter;
        const uniqueProductClass = differenceBy(productClasses, testCaseStepProductClass, 'name');
        const updateFormValue = {
          ...testCaseStepDetails,
          currentTestCaseStepVersion: {
            ...testCaseStepDetails.currentTestCaseStepVersion,
            testCaseStepProductClassFilter : [
              ...( testCaseStepDetails.currentTestCaseStepVersion.testCaseStepProductClassFilter || []),
              ...uniqueProductClass
            ]
          }
        };
        if ( this.data === 'testCase') {
          this.store.dispatch(new UpdateTestCaseDetailsForm(updateFormValue));
        } else {
          this.store.dispatch(new UpdateTestStepDetailsForm(updateFormValue));
        }
      });
  }
}
