/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData,PropertyChangeData } from 'data/observable';
import { Page } from 'ui/page';
import { AppModel, appModel } from './main-view-model';
import { Observable } from "tns-core-modules/data/observable";
import * as frame from 'ui/frame';

class SettingsModel extends Observable {
    constructor(private appModel:AppModel){
        super();
        appModel.on('propertyChange', (event:PropertyChangeData)=>{
            if (event.propertyName === 'stations') {
                //console.log(event.value.map(station=>(station.name)));
                this.set('stationNames', event.value.map(station=>(station.name)));
            }
        });
    }
}

export function navigatingTo(args: EventData) {

    frame.topmost().navigate({
        moduleName: "views/set-blood-type",
        backstackVisible: false,
        context : {wizard:true}
    });

}