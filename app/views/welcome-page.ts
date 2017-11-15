import { EventData,PropertyChangeData } from 'data/observable';
import { Page } from 'ui/page';
import { AppModel, appModel } from '../shared/app-model';
import { Observable } from "tns-core-modules/data/observable";
import * as frame from 'ui/frame';
import { UserProfile } from '../shared/schema';
import {Wizard} from './wizard';


/*
* essentially this will be a welcome page where unauthorized user can choose a way to login.
*/

class PageModel extends Observable { 
    isLoading = false
    status = 'not initialised'

    constructor(public appModel:AppModel) {
        super();
    }

    setStatus(_status:string) {
        this.set('status',_status);
        console.log('status:',_status);
    }
}

const pageModel = new PageModel(appModel);

const onPropertyChange = (event:PropertyChangeData)=>{
    switch (event.propertyName) {
        case 'userprofile' :
            const userProfile = event.value as UserProfile;
            if (!userProfile || !userProfile.wizardCompleted) {
                console.log('userprofile - wizard not completed');
                //go through wizard
                navigateToWizard();
            } else {
                //we're good
                navigateToMainView();
            }
            break;
        case 'user' :
            const user = event.value;
            if (!user) {
                pageModel.setStatus('logging anonymously');
                appModel.doLoginAnonymously().then((user)=>{
                    //TODO takes a while to get here... is it emulator issue?
                    pageModel.setStatus('logged successfully');
                }, error=>{
                    alert(error);
                });
            } else {
                pageModel.setStatus('logged as user '+user.uid+', loading profile');
            }
        break;
    }
};

export function navigatingTo(args: EventData) {
    appModel.on('propertyChange', onPropertyChange);
    const page = args.object as Page;
    page.bindingContext = pageModel;
}

export function navigatedFrom() {
    console.log('navigatedFrom');
    appModel.removeEventListener('propertyChange', onPropertyChange);
}

function navigateToWizard() {
    pageModel.set('isLoading', false);

    new Wizard([
            {moduleName:'views/set-blood-type',clearHistory:true},
            {moduleName:'/views/set-blood-station'},
            {moduleName:'views/set-sex'},
            {moduleName:'views/main-view',clearHistory:true}    //TODO clearHistory here seems to break back nav from 'donations' ?
        ])
        .navigate();
}

function navigateToMainView() {
    pageModel.set('isLoading', false);
    frame.topmost().navigate({
        moduleName: "views/main-view",
        clearHistory: true
    });
}

export function logout() {
    appModel.doLogout().then(()=>pageModel.setStatus('logged out'),err=>alert(err));
}

export function init() {
    pageModel.set('isLoading',true);
    pageModel.setStatus('initializing');
    appModel.doInit().catch(err=>alert(err));
}