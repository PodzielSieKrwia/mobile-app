/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

import "./bundle-config"
import * as app from 'application'
import * as moment from 'moment'
import { MSG } from './shared/schema'

const LOCALE = 'pl';

moment.locale(LOCALE);
app.getResources()['fromNow'] = (value)=>(moment(value).fromNow())
app.getResources()['msg'] = (value, prefix)=>(MSG[LOCALE][prefix+value])

app.start({ moduleName: 'views/welcome-page/welcome-page' });
/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
