import { Page } from 'ui/page';
import { EventData } from 'data/observable';
import { Observable } from 'tns-core-modules/ui/frame/frame';
import * as frame from 'ui/frame';
import { AppModel, appModel } from '../main-view-model';

class PageModel extends Observable {

    constructor(public appModel:AppModel) {
        super();
    }
}

const model = new PageModel(appModel);

export function navigatingTo(args: EventData) {
    let page = <Page>args.object; 
    page.bindingContext = model;
    model.set('wizard', page.navigationContext.wizard);
}

export function next() {
    frame.topmost().navigate({moduleName:'/views/set-sex', context: {wizard: model.get('wizard')}});
}

export function apply() {
    //TODO store in profile
    next();
}

export function onItemTap(args) {
    console.log("export.setStation ["+ model.appModel.get('stations')[args.index]+"]");
}

