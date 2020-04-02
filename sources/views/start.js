import {JetView} from "webix-jet";
import UserToolBarView from './user/toolbar';
import listView from './user/loglist';
export default class MainView extends JetView {
    config() { 
       return{ 
        rows : [
            UserToolBarView,
            listView
    ]
}
}
}