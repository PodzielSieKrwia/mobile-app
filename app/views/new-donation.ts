import { ShownModallyData,Page } from 'ui/page'
import { Observable, EventData } from 'tns-core-modules/ui/frame/frame'
import { Donation, DONATION_TYPES, MSG} from '../shared/schema'
import * as moment from 'moment';

let context;
let closeCallback: (donation?:Donation)=>void;

class PageModel extends Observable {

    public date: Date;
    public type = DONATION_TYPES.map(d=>MSG.pl['donation_type.'+d]);
    public selectedType = 0;

}

const pageModel = new PageModel();

export function onShownModally(args: ShownModallyData) {
    context = args.context;
    closeCallback = args.closeCallback as any;
}

export function onLoaded(args:EventData) {
    (args.object as Page).bindingContext = pageModel;
}

export function onAdd(args:EventData) {
    const donation = {
        date : moment(pageModel.date).format('YYYYMMDD'),
        type: DONATION_TYPES[pageModel.selectedType],
        amount:450
    };
    closeCallback(donation);
}