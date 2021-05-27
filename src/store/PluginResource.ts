import { CellModel } from "../models/CellModel";
import { BaseResource, BaseResourceConnection } from "./BaseResource";
import type * as Y from "yjs";

/**
 * A Resource defining a plugin. Plugins have a description and a single cell with code,
 * which is responsible for registering the plugin hooks.
 */
export default class PluginResource extends BaseResource {
  /** @internal */
  constructor(ydoc: Y.Doc, connection: BaseResourceConnection) {
    super(ydoc, connection);
    if (this.type !== "!plugin") {
      throw new Error("invalid type for PluginResource");
    }
  }

  // TODO: turn into Y.Text
  public set description(descr: string) {
    this.ydoc.getMap("pluginmeta").set("description", descr);
  }

  public get description(): string {
    const descr = this.ydoc.getMap("pluginmeta").get("description");
    if (!descr) {
      return "";
    }
    if (typeof descr !== "string") {
      throw new Error("expected string");
    }
    return descr;
  }

  private _pluginCell: CellModel | undefined;

  public get pluginCell() {
    this._pluginCell =
      this._pluginCell ||
      new CellModel(
        "!@" + this.id.substr(1) + "/plugin.tsx",
        this.ydoc.getText("pluginCell")
      );
    return this._pluginCell;
  }
}
