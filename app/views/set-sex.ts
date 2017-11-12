import { Page } from 'ui/page';
import { EventData } from 'data/observable';
import { Observable } from 'tns-core-modules/ui/frame/frame';
import * as frame from 'ui/frame';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';

class PageModel extends Observable {

    constructor() {
        super();
        this.set('sex', ['Kobieta','Męzczyzna']);
        this.set('selectedIndex', 0);
    }
}

const model = new PageModel();

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;  
    page.bindingContext = model;
    model.set('wizard', page.navigationContext.wizard);
}

export function next() {
    frame.topmost().navigate({moduleName:'/views/main-view',backstackVisible:false});
}

export function apply(args) {
    console.log("apply ["+ model.get('sex')[args.index]+"]");
    next();
}

