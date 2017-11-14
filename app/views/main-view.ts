import { Page } from 'ui/page';
import { EventData } from 'data/observable';
import * as frame from 'ui/frame';
import {appModel} from '../shared/app-model'

export function navigatingTo(args: EventData) {
    //(<Page>args.object).bindingContext = model;
    appModel.updateUserProfile({wizardCompleted:true});
}

export function settings() {
    frame.topmost().navigate('/views/settings');
}