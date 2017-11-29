import { Page } from 'ui/page';
import { EventData } from 'data/observable';
import * as frame from 'ui/frame';
import {appModel,AppModel} from '../../shared/app-model'
import { Observable } from 'ui/frame';
import {Donation} from '../../shared/schema'


var dateConverter = {
    toView: function (value, format) {
        var result = format;
        var day = value.getDate();
        result = result.replace("DD", day < 10 ? "0" + day : day);
        var month = value.getMonth() + 1;
        result = result.replace("MM", month < 10 ? "0" + month : month);
        result = result.replace("YYYY", value.getFullYear());
        return result;
    },
    toModel: function (value, format) {
        var ddIndex = format.indexOf("DD");
        var day = parseInt(value.substr(ddIndex, 2));
        var mmIndex = format.indexOf("MM");
        var month = parseInt(value.substr(mmIndex, 2));
        var yyyyIndex = format.indexOf("YYYY");
        var year = parseInt(value.substr(yyyyIndex, 4));
        var result = new Date(year, month - 1, day);
        return result;
    }
}

class PageModel extends Observable {

    constructor(public appModel:AppModel) {
        super();
    }

    // dateConverter = {
    //     toView: function (value, format) {
    //         console.log('toView '+value);
    //         var result = format;
    //         // var day = value.getDate();
    //         // result = result.replace("DD", day < 10 ? "0" + day : day);
    //         // var month = value.getMonth() + 1;
    //         // result = result.replace("MM", month < 10 ? "0" + month : month);
    //         // result = result.replace("YYYY", value.getFullYear());
    //         return value+"!";
    //     },
    //     toModel: function (value, format) { 
    //         console.log('toModel '+value);
    //     }
    // }

    // public dateConverter2(value) {
    //     return value+"!!";
    // }

}

const pageModel = new PageModel(appModel);

export function navigatingTo(args: EventData) {
    (<Page>args.object).bindingContext = pageModel;
}


export function newDonation(args) {
    const page = <Page>args.object.page;
    const context = {};
    page.showModal("views/new-donation/new-donation", context, (donation?:Donation) => {
        //console.log(donation);
        const donations = (appModel.userprofile.donations || []).slice();
        donations.push(donation); //TODO validate, sort?
        appModel.updateUserProfile({
            donations: donations
        });
    }, true);
}