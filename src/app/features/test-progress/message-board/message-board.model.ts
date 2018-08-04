export interface MessageModel {
  created?: string;
  id?: string;
  message?: string;
  messageAttachments?: string;
  user?: object;
}

export interface MessageFilter {
  name?: string;
  fromDate?: any;
  tillDate?: any;
}
