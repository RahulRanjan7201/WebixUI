import {JetView} from "webix-jet";
import FormView from "./form";
import { serverConfig } from "../../config/config";
export default class ToolbarView extends JetView {
    config() {
        const _this = this;
        return {
            width:500,
            view:"toolbar", elements:[
            { view:"button", value:"Add Role", width:120, click:add_role },
            { view:"button", value:"Remove Role", width:120, click:delete_row }       
            ]
    }
    function delete_row() {
        const url = `${serverConfig.serverAddress}/${serverConfig.version}/roles`;
        var id = $$("roleList").getSelectedId();
        webix.confirm({
            title: "Delete",
            text: "Are you sure you want to delete the selected item?",
            callback: function(result) { 
                if (result) {
                    if (id) {
                        webix
                          .ajax()
                          .del(url, { id: id })
                          .then(function(data) {
                            const result = data.json();
                            $$("myrolelist").remove(id);
                            webix.message(result.message);
                          })
                          .catch(err => {
                            webix.message("Error Occured... Try Again");
                          });
                      } else {
                        webix.message("Please Select a User");
                      }
                }  
            }
        });
    }
    
    function add_role(){
        $$("role_Popup").hide();
            const popup = _this.ui({
                view:"popup", position:"center",
                id:"add_role",
                body:FormView 
            });
             popup.show();
        }
    }
}