import { Page } from 'ui/page';
import { EventData } from 'data/observable';
import { Observable } from 'tns-core-modules/ui/frame/frame';
import * as frame from 'ui/frame';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { appModel } from '../../../shared/app-model';
import { SEX, MSG, UserProfile } from '../../../shared/schema';
import {Wizard} from '../wizard';

class PageModel extends Observable {
    skip:boolean
    selectedIndex:number
    sex = SEX.map(val=>(MSG.pl['sex.'+val]))

    constructor(userprofile:UserProfile, public wizard: Wizard) {
        super();
        if (userprofile) {
            this.selectedIndex = SEX.indexOf(userprofile.sex)
        }
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
        apply()
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
    const sex = SEX[pageModel.selectedIndex]
    if (sex) {
        appModel.updateUserProfile({sex:sex})
    }
}