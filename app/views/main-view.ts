import { Page } from 'ui/page';
import { EventData } from 'data/observable';
import * as frame from 'ui/frame';
import {appModel} from '../shared/app-model'

class PageModel {

}

const pageModel = new PageModel();

export function navigatingTo(args: EventData) {
    (<Page>args.object).bindingContext = pageModel;
    appModel.updateUserProfile({wizardCompleted:true});
}

export function settings() {
    frame.topmost().navigate('/views/settings');
}

export function donations() {
    frame.topmost().navigate('/views/donations');
}