import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';

@Injectable()
export class PopupService {
    constructor(private modal: Modal) {}

    alert(labelText: string, titleText: string, okText: string, labelTextParams: Object) {
        return new Observable((observer) => {
            this.modal.alert()
                .size('lg')
                .keyboard(0)
                .showClose(true)
                .title(titleText)
                .body(labelText)
                .okBtn(okText)
                .isBlocking(true)
                .open()
                .result.then((response) => {
                    observer.next(response);
                    observer.complete();
                }, () => {
                    observer.error('Dialog eXited');
                });
        });
    }

    confirm(labelText: string, titleText: string, yesText: string, noText: string, labelTextParams: Object, textParams: Object) {
        return new Observable((observer) => {
            this.modal.confirm()
                .size('lg')
                .keyboard(0)
                .showClose(false)
                .title(titleText)
                .body(labelText)
                .okBtn(yesText)
                .cancelBtn(noText)
                .isBlocking(true)
                .open()
                .result.then((response) => {
                    observer.next(response);
                    observer.complete();
                }, () => {
                    observer.error('Dialog eXited');
                });
        });
    }
}
