import { JetView } from "webix-jet";
import { serverConfig } from "../../config/config";

export default class ListView extends JetView {
  config() {
    const url = `${serverConfig.serverAddress}/${serverConfig.version}/roles`;
    return {
      height: 500,
      rows: [
        { view: "template", type: "header", template: "Role log" },
        {
          view: "list",
          id: "roleList",
          template: "#value#", 
          select: true, 
          height: 500,
          url: url,
          ready: function() {
            if (!this.count()) {
              webix.extend(this, webix.OverlayBox);
              this.showOverlay("<div style='...'>There is no data</div>");
            }
          }
        }
      ]
    };
  }
}
