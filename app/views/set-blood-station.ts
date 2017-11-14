import { Page } from 'ui/page';
import { EventData } from 'data/observable';
import { Observable } from 'tns-core-modules/ui/frame/frame';
import * as frame from 'ui/frame';
import { AppModel, appModel } from '../shared/app-model'
import {Wizard} from './wizard';

class PageModel extends Observable {

    selected:number;
    wizard:Wizard;

    constructor(public appModel:AppModel) {
        super();
    }
}

const pageModel = new PageModel(appModel);

export function navigatingTo(args: EventData) {
    let page = <Page>args.object; 
    pageModel.wizard = page.navigationContext.wizard; //any setters must be called before binding!
    page.bindingContext = pageModel;
}

export function next() {
    pageModel.wizard.next().navigate();
}

export function apply() {
    if (pageModel.selected !== undefined) {
        const stationUid = pageModel.appModel.get('stations')[pageModel.selected].uid;
        appModel.updateUserProfile({station:stationUid});
        next();
    }
}

export function onItemTap(args) {
    pageModel.selected = args.index;
    console.log("export.setStation "+pageModel.selected);
}

