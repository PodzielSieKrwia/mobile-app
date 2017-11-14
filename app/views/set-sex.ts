import { Page } from 'ui/page';
import { EventData } from 'data/observable';
import { Observable } from 'tns-core-modules/ui/frame/frame';
import * as frame from 'ui/frame';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { appModel } from '../shared/app-model';
import { SEX } from '../shared/schema';
import {Wizard} from './wizard';

class PageModel extends Observable {
    wizard:Wizard;
    selectedIndex:number;
    sex = SEX.map(val=>(val==='W'?'Kobieta':'Mezczyzna'))

    constructor() {
        super();
    }
}

const pageModel = new PageModel();

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
    pageModel.wizard=page.navigationContext.wizard;
    page.bindingContext = pageModel;
}

export function next() {
    pageModel.wizard.next().navigate();
}

export function apply(args) {
    const sex = SEX[pageModel.selectedIndex];
    console.log("apply ["+sex+"]");
    if (sex) {
        appModel.updateUserProfile({sex:sex});
    }
    next();
}