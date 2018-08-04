import {User, UserGroup, UserSite} from '../../../core/services/user/user.model';

export interface ReportMessageModel {
  id?: number;
  sequenceName?: string;
  testItemType?: string;
  testItemId?: string;
  testItemVersion?: string;
  truckFunctionArea?: string;
  truckFunction?: string;
  name?: string;
  reportType?: string;
  fuelEnergyType?: EnergyType[];
  odometer?: number;
  unHandled?: boolean;
  forEditor?: boolean;
  reportSite?: UserSite;
  reportUserGroup?: UserGroup;
  changeInfo?: object;
  reportComments?: ReportCommentsModel[];
}

export interface ReportCommentsModel {
      id?: number;
      comment?: string;
      commentCreated?: object;
      commentUploadFile?: FileUploadModel[];
      commentCreator?: User;
}

export interface EnergyType {
      id?: number;
      energyType?: string;
      volume?: number;
      unit?: string;
}

export interface FileUploadModel {
  fileName?: string;
  uploadFileType?: string;
  locationPath?: string;
}
