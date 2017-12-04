import { Page } from 'ui/page'
import { EventData } from 'data/observable'
import * as frame from 'ui/frame'
import {appModel, AppModel} from '../../shared/app-model'
import {Station,Inventory} from '../../shared/schema'

class PageModel {

    public userStation:Station;
    public inventory:Inventory;

    static findInventory(stationUid:string, stations: {[uid:string]:Station}) : Inventory {
        const station = stations[stationUid]
        if (station) {
            if (station.inventory) return station.inventory;
            if (station.parentUid) return PageModel.findInventory(station.parentUid, stations);
        }
    }

    constructor(public appModel:AppModel) {
        //TODO we need to observe these properties and update userStation/inventory
        //it may happen that they are not populated here just yet
        if (appModel.userprofile && appModel.stations) {
            this.userStation = appModel.stations[appModel.userprofile.stationUid];
            this.inventory = PageModel.findInventory(appModel.userprofile.stationUid, appModel.stations)
        }
    }
    
}

let pageModel:PageModel; 

export function navigatingTo(args: EventData) {
    pageModel = new PageModel(appModel);
    (<Page>args.object).bindingContext = pageModel;
    appModel.updateUserProfile({wizardCompleted:true});
}

export function settings() {
    frame.topmost().navigate('/views/settings/settings/settings');
}

export function donations() {
    frame.topmost().navigate('/views/donations/donations');
}