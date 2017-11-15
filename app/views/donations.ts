import { Page } from 'ui/page';
import { EventData } from 'data/observable';
import * as frame from 'ui/frame';
import {appModel,AppModel} from '../shared/app-model'
import { Observable } from 'ui/frame';
import {Donation} from '../shared/schema'


class PageModel extends Observable {

    constructor(public appModel:AppModel) {
        super();
    }

}

const pageModel = new PageModel(appModel);

export function navigatingTo(args: EventData) {
    (<Page>args.object).bindingContext = pageModel;
}


export function newDonation(args) {
    const page = <Page>args.object.page;
    const context = {};
    page.showModal("views/new-donation", context, (donation?:Donation) => {
        //console.log(donation);
        const donations = (appModel.userprofile.donations || []).slice();
        donations.push(donation); //TODO validate, sort?
        appModel.updateUserProfile({
            donations: donations
        });
    }, true);
}