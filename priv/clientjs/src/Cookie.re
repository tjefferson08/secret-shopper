/* config object type to pass to cookie.set */
type config;

[@bs.obj]
external makeConfig: (~expires: int=?, ~path: string=?, unit) => config = "";

/* get a cookie's contents as a string */
[@bs.module "js-cookie"] [@bs.return nullable]
external getAsString: string => option(string) = "get";

/* sets a cookie by a name to JSON */
[@bs.module "js-cookie"]
external setJson: (string, Js.Json.t, config) => unit = "set";

/* sets a cookie by a name to a string value */
[@bs.module "js-cookie"]
external setString: (string, string, config) => unit = "set";
