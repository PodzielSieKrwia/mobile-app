import { Page } from 'ui/page';
import { EventData } from 'data/observable';
import {BLOOD_TYPES} from '../shared/schema';
import { Observable } from 'tns-core-modules/ui/frame/frame';
import * as frame from 'ui/frame';
import {appModel} from '../shared/app-model';
import {Wizard} from './wizard';

class PageModel extends Observable {

    wizard:Wizard;

    constructor() {
        super();
        this.set('bloodTypes', BLOOD_TYPES);
        this.set('selectedIndex', 0);
    }
}

const model = new PageModel();

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;  
    model.wizard = page.navigationContext.wizard;
    page.bindingContext = model;
}

export function next() {
    model.wizard.next().navigate();
    // frame.topmost().navigate({
    //     moduleName: '/views/set-blood-station',
    //     context: {wizard: model.get('wizard')}}
    // );
}

export function apply() {
    const bt = BLOOD_TYPES[model.get('selectedIndex')];
    console.log("apply ["+bt+"]");
    appModel.updateUserProfile({bloodType:bt});
    model.wizard.next().navigate();
}
