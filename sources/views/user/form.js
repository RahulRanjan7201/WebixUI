import { JetView} from "webix-jet";
import { serverConfig } from "../../config/config";
export default class listView extends JetView {
  config() {
    const url = `${serverConfig.serverAddress}/${serverConfig.version}/roles`;
    const id =  this.getParam("id");
    const userUrl = `${serverConfig.serverAddress}/${serverConfig.version}/users/${id}`;
    return {
      height: 400,
      width: 400,
      view: "form",
      id: "userForm",
      url:userUrl,
      elements: [
        {
          label: "User Log > Entry Form ",
          view: "label",
          left: 100,
          top: 110,
          width: 200,
          labelAlign: "right",
          labelPosition: "top",
          click: () => {
            this.show("/top/start");
          }
        },
        { view: "text", label: "Name", name: "name" ,  required: true,
        invalidMessage: "Enter the Name"},
        { view: "text", label: "Email", name: "emailID",  required: true,
        invalidMessage: "Enter the Email ID" },
        {
          view: "combo",
          label: "Role",
          name:"roleID",
          options:url,
          required: true,
          invalidMessage: "Select the Role"
        },
        {
          label: "Save User",
          type: "form",
          view: "button",
          click: () => {
            const isValid =  $$("userForm").validate();
            if(!isValid) {
             this.webix.message("Please Enter the Data Correctly");
             return;
            } else {
            const formData = $$("userForm").getValues();
            const url = `${serverConfig.serverAddress}/${serverConfig.version}/users`;
            if(this.getParam("id")) {
              const id = this.getParam("id");
              webix.ajax().put(`${url}/${id}`,formData).then(function(data){
                const result = data.json();
                webix.message(result.message);
                this.show("/top/start");
            });
            }else {
            this.webix
              .ajax()
              .post(url, formData)
              .then((data) => {
                const result = data.json();
                this.show("/top/start");
                webix.message(result.message);
              }).catch(err => {
                webix.message("Error Occured");
              });
            }
          }
          }
        }
      ]
      
    };
 
  }
}
