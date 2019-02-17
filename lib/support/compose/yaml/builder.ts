// import base YAML parser.
import parser from "yaml";

/**
 * Class YAMLParser.
 */
export class ComposeYAMLCodec {

  // convert a JS object into a YAML document.
  public static generate(data: object) {
    // create a base document from object
    const document = parser.parseDocument(parser.stringify(data));


  }

}
