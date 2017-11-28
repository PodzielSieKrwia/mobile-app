import { Page } from 'ui/page';
import { EventData } from 'data/observable';
import { Observable } from 'tns-core-modules/ui/frame/frame';
import * as frame from 'ui/frame';
import { AppModel, appModel } from '../../../shared/app-model'
import {Wizard} from '../wizard';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import {Station} from '../../../shared/schema'

class StationRow extends Observable {

    public selected:boolean

    constructor(public station:Station) {
        super()
    }
}

class PageModel extends Observable {
    stations: StationRow[]
    skip:boolean

    constructor(appModel:AppModel, public wizard:Wizard) {
        super()
        this.stations = Object.getOwnPropertyNames(appModel.stations).map(uid=>(new StationRow(appModel.stations[uid])))
        this.stations.sort((r1,r2)=>((r1.station.city||'').localeCompare(r2.station.city||'')));
        this.selectedUid = (appModel.userprofile || {}).stationUid
    }

    set selectedIndex(index:number) {
        this.stations.forEach((row, i)=>{
            row.set('selected', i === index)
        });
    }

    set selectedUid(uid:string) {
        this.stations.forEach((row)=>{
            row.set('selected', row.station.uid === uid)
        });
    }

    get selectedUid() : string {
        let row = this.stations.find(row=>(row.selected))
        return row ? row.station.uid : undefined
    }
}

let pageModel

export function navigatingTo(args: EventData) {
    let page = <Page>args.object
    pageModel = new PageModel(appModel, page.navigationContext.wizard)
    page.bindingContext = pageModel
}

export function navigatedFrom() {
    if (!pageModel.skip) {
        apply();
    }
}

export function next() {
    pageModel.wizard.next().navigate()
}

export function skip() {
    pageModel.skip = true
    next()
}

function apply() {
    const stationUid = pageModel.selectedUid
    if (stationUid) {
        appModel.updateUserProfile({stationUid:stationUid})
    }
}

export function onItemTap(args) {
    pageModel.selectedIndex = args.index
}
