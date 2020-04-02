import { JetView } from "webix-jet";
import RoleView from "../role/entry";
import { serverConfig } from "../../config/config";
export default class UserToolBarView extends JetView {
  config() {
    return {
      width: 500,
      view: "toolbar",
      elements: [
        { view: "button", value: "Add User", width: 120, click: add_user_row },
        { view: "button", value: "Remove User", width: 120, click: delete_row },
        {
          view: "button",
          value: "Roles",
          width: 120,
          click: () => {
            const popup = this.ui({
              view: "popup",
              position: "center",
              id: "role_Popup",
              body: RoleView
            });
            popup.show();
          }
        }
      ]
    };
    function delete_row() {
      const url = `${serverConfig.serverAddress}/${serverConfig.version}/users`;
      const id = $$("userlist").getSelectedId();
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
                  $$("userlist").remove(id);
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
    function add_user_row() {
      this.$scope.app.show(`/top/user.form`);
    }
  }
}
