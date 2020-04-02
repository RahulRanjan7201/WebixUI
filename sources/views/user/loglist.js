import { JetView } from "webix-jet";
import { serverConfig } from "../../config/config";
export default class listView extends JetView {
  config() {
    const url = `${serverConfig.serverAddress}/${serverConfig.version}/users`;
    return {
      height: 500,
      rows: [
        { view: "template", type: "header", template: "User log" },
        {
          view: "list",
          id: "userlist",
          template: "#name# -- #emailID# -- #roleID#", 
          select: true, 
          height: 500,
          url: url,
          ready: function() {
            if (!this.count()) {
              // if no data is available
              webix.extend(this, webix.OverlayBox);
              this.showOverlay("<div style='...'>There is no data</div>");
            }
          },
          on: {
            onItemDblClick: function(id, e, node) {
              const rowData = this.getItem(id);
              webix.message("Redirecting to Edit the Values...");
              this.$scope.app.show(`/top/user.form?id=${rowData.id}`);
            }
          }
        }
      ]
    };
  }
}
