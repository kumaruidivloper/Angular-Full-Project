// import { async, TestBed } from '@angular/core/testing';
// import { Router } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { provideMockActions } from '@ngrx/effects/testing';
// import { Store } from '@ngrx/store';
// import { NotificationService } from 'ng2-notify-popup';
// import 'rxjs/add/observable/throw';
// import { Observable } from 'rxjs/Observable';
// import { ReplaySubject } from 'rxjs/ReplaySubject';
// import { mockService } from '../../testing/mocks/mock-service';
// import { MockStoreProvider } from '../../testing/mocks/mock-store';
// import {
//   CreateRoutine,
//   CreateRoutineFailure,
//   DeleteRoutine,
//   DeleteRoutineFailure,
//   GetRoutineDetailsFailure,
//   GetRoutineDetails,
//   UpdateRoutine,
//   UpdateRoutineFailure
// } from './routine-details.action';
// import { RoutineDetailsEffects } from './routine-details.effects';
// import { RoutineDetails } from './routine-details.model';
// import { RoutineDetailsState } from './routine-details.reducer';
// import { RoutineDetailsService } from './routine-details.service';
// import Spy = jasmine.Spy;
// import { describe } from 'selenium-webdriver/testing';
//
//
// describe('Routine Details Effects', () => {
//   let actions: ReplaySubject<any>;
//   let effects: RoutineDetailsEffects;
//   let routineDetailsService: RoutineDetailsService;
//   let store: Store<RoutineDetailsState>;
//   let notifyService: NotificationService;
//   let router: Router;
//   const routineDetails: RoutineDetails = {};
//   const routineId = 1;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         RoutineDetailsEffects,
//         provideMockActions(() => actions),
//         mockService(RoutineDetailsService),
//         MockStoreProvider,
//         mockService(NotificationService),
//
//       ],
//       imports: [
//         RouterTestingModule
//       ]
//     });
//
//     effects = TestBed.get(RoutineDetailsEffects);
//     store = TestBed.get(Store);
//   });
//
//   it('should exist', () => {
//     expect(effects).toBeTruthy();
//   });
//
//   describe('Get Routine Details', () => {
//     beforeEach(() => {
//       routineDetailsService = TestBed.get(RoutineDetailsService);
//       (<Spy>routineDetailsService.getRoutineDetails).and.returnValue(Observable.of(routineDetails));
//       actions = new ReplaySubject(1);
//       actions.next(new GetRoutineDetails(routineId));
//     });
//
//     it('should catch GET_ROUTINE_DETAILS and call getRoutineDetails service', async(() => {
//       effects.getRoutineDetails$.subscribe(() => {
//         expect(routineDetailsService.getRoutineDetails).toHaveBeenCalled();
//       });
//     }));
//     it('should dispatch ROUTINE_DETAILS_FAILURE if getRoutineDetails service fails', async(() => {
//       (<Spy>routineDetailsService.getRoutineDetails).and.returnValue(Observable.throw('error'));
//       effects.getRoutineDetails$.subscribe(result => {
//         expect(result).toEqual(new GetRoutineDetailsFailure());
//       });
//     }));
//
//   });
//   describe('Delete Routine', () => {
//     beforeEach(() => {
//       routineDetailsService = TestBed.get(RoutineDetailsService);
//       (<Spy>routineDetailsService.deleteRoutineData).and.returnValue(Observable.of());
//       actions = new ReplaySubject(1);
//       actions.next(new DeleteRoutine(routineId));
//       notifyService = TestBed.get(NotificationService);
//       router = TestBed.get(Router);
//       spyOn(router, 'navigate');
//     });
//
//     it('should catch ROUTINE_DELETE and call deleteRoutineData service', async(() => {
//       effects.deleteRoutine$.subscribe(() => {
//         expect(routineDetailsService.deleteRoutineData).toHaveBeenCalled();
//       });
//     }));
//     it('should dispatch ROUTINE_DELETE_FAILURE if deleteRoutineData service fails', async(() => {
//       (<Spy>routineDetailsService.deleteRoutineData).and.returnValue(Observable.throw('error'));
//       effects.deleteRoutine$.subscribe(result => {
//         expect(result).toEqual(new DeleteRoutineFailure());
//       });
//     }));
//   });
//
//   describe('Update Routine', () => {
//     beforeEach(() => {
//       routineDetailsService = TestBed.get(RoutineDetailsService);
//       (<Spy>routineDetailsService.updateRoutineData).and.returnValue(Observable.of());
//       actions = new ReplaySubject(1);
//       actions.next(new UpdateRoutine());
//       notifyService = TestBed.get(NotificationService);
//     });
//
//     it('should catch UPDATE_ROUTINE and call updateRoutineData service', async(() => {
//       effects.deleteRoutine$.subscribe(() => {
//         expect(routineDetailsService.updateRoutineData).toHaveBeenCalled();
//         expect(notifyService.show).toHaveBeenCalled();
//       });
//     }));
//     it('should dispatch UPDATE_ROUTINE_FAILURE if updateRoutineData service fails', async(() => {
//       (<Spy>routineDetailsService.updateRoutineData).and.returnValue(Observable.throw('error'));
//       effects.updateRoutine$.subscribe(result => {
//         expect(result).toEqual(new UpdateRoutineFailure());
//         expect(notifyService.show).toHaveBeenCalled();
//       });
//     }));
//   });
//
//   describe('Create Routine', () => {
//     beforeEach(() => {
//       routineDetailsService = TestBed.get(RoutineDetailsService);
//       (<Spy>routineDetailsService.createRoutineData).and.returnValue(Observable.of());
//       actions = new ReplaySubject(1);
//       actions.next(new CreateRoutine());
//       notifyService = TestBed.get(NotificationService);
//     });
//
//     it('should catch CREATE_ROUTINE and call createRoutineData service', async(() => {
//       effects.deleteRoutine$.subscribe(() => {
//         expect(routineDetailsService.createRoutineData).toHaveBeenCalled();
//         expect(notifyService.show).toHaveBeenCalled();
//       });
//     }));
//     it('should dispatch CREATE_ROUTINE_FAILURE if createRoutineData service fails', async(() => {
//       (<Spy>routineDetailsService.createRoutineData).and.returnValue(Observable.throw('error'));
//       effects.createRoutine$.subscribe(result => {
//         expect(result).toEqual(new CreateRoutineFailure());
//         expect(notifyService.show).toHaveBeenCalled();
//       });
//     }));
//   });
//
// });
//
//
