import { Page } from 'ui/page';
import { EventData } from 'data/observable';
import {BLOOD_TYPES, UserProfile} from '../shared/schema';
import { Observable } from 'tns-core-modules/ui/frame/frame';
import * as frame from 'ui/frame';
import {appModel} from '../shared/app-model';
import {Wizard} from './wizard';

class PageModel extends Observable {

    bloodTypes: string[]
    selectedIndex:number
    skip:boolean

    constructor(userprofile:UserProfile, public wizard:Wizard) {
        super()
        this.bloodTypes = BLOOD_TYPES
        this.selectedIndex = userprofile ? BLOOD_TYPES.indexOf(userprofile.bloodType) : 0
    }
}

let pageModel

export function navigatingTo(args: EventData) {
    let page = <Page>args.object
    pageModel = new PageModel(appModel.userprofile, page.navigationContext.wizard)
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
    appModel.updateUserProfile({bloodType:BLOOD_TYPES[pageModel.selectedIndex]})
}