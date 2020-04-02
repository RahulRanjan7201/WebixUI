import { JetView } from "webix-jet";
import { serverConfig } from "../../config/config";

export default class FormView extends JetView {
  config() {
    return {
      view: "form",
      id: "roleForm",
      elements: [
        {
          label: "Role Entry Form ",
          view: "label",
          left: 100,
          top: 110,
          width: 200,
          labelAlign: "right",
          labelPosition: "top"
        },
        {
          view: "text",
          label: "Role",
          name: "value",
          required: true,
          invalidMessage: "Enter the Role"
        },
        {
          label: "Add Role",
          type: "form",
          view: "button",
          width: 200,
          click: () => {
           const isValid =  $$("roleForm").validate();
           if(!isValid) {
            this.webix.message("Please Enter the Data Correctly")
            return;
           } else {
            const formData = $$("roleForm").getValues();
            const url = `${serverConfig.serverAddress}/${serverConfig.version}/roles`;
            this.webix
              .ajax()
              .post(url, formData)
              .then((data) => {
                const result = data.json();
                $$("add_role").hide();
                webix.message(result.message);
              }).catch(err => {
                console.log(err);
                webix.message("Error Occured......");
              });
           }
          }
        },
        {
          label: "Cancel",
          type: "form",
          view: "button",
          click: () => {
            $$("add_role").hide();
          }
        }
      ]
    };
  }
}
