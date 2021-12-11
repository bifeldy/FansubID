import { IpcMainEvent } from 'electron';

export function initialize(event: IpcMainEvent, data): void {
  event.sender.send('client-init', data);
}
