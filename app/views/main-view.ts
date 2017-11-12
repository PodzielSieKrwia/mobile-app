import { Page } from 'ui/page';
import { EventData } from 'data/observable';
import * as frame from 'ui/frame';

export function navigatingTo(args: EventData) {
    //(<Page>args.object).bindingContext = model;
}

export function settings() {
    frame.topmost().navigate('/views/settings');
}