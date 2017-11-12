import { Page } from 'ui/page';
import { EventData } from 'data/observable';
import {BLOOD_TYPES} from '../model';
import { Observable } from 'tns-core-modules/ui/frame/frame';
import * as frame from 'ui/frame';

class PageModel extends Observable {

    constructor() {
        super();
        this.set('bloodTypes', BLOOD_TYPES);
        this.set('selectedIndex', 0);
    }
}

const model = new PageModel();

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;  
    model.set('wizard', page.navigationContext.wizard);
    page.bindingContext = model;
}

export function next() {
    frame.topmost().navigate({moduleName: '/views/set-blood-station', context: {wizard: model.get('wizard')}});
}

export function apply() {
    console.log("apply ["+BLOOD_TYPES[model.get('selectedIndex')]+"]");   
    next(); 
}
