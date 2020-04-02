import {JetView} from "webix-jet";
import ToolbarView from "./toolbar";
import ListView from './loglist'; 
export default class RoleView extends JetView{
    config() {
        return{ 
            rows : [
                ToolbarView,
                ListView
                    ]
    }
    }
}