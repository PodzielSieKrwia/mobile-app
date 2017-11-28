import { Page } from 'ui/page';
import { EventData } from 'data/observable';
import { Observable } from 'tns-core-modules/ui/frame/frame';
import * as frame from 'ui/frame';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';

class PageModel extends Observable {
    constructor() {
        super();
        this.set('options', [
            {label:'Grupa krwi',value:'...',module:'/views/set-blood-type'},
            {label:'Centrum',value:'...',module:'/views/set-blood-station'},
            {label:'Płeć',value:'...',module:'/views/set-sex'}
        ]);
    }
}

const model = new PageModel();

export function navigatingTo(args: EventData) {
    (<Page>args.object).bindingContext = model;
}

export function onItemTap(args) {
    let option = model.get('options')[args.index];
    console.log("change ["+ option.label+"]");
    frame.topmost().navigate({
        moduleName:option.module,
        context : {wizard:false}
    });
}