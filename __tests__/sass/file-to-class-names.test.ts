import { fileToClassNames } from "../../lib/sass";

import { describeAllImplementations } from "../helpers";

describeAllImplementations(implementation => {
  describe("fileToClassNames", () => {
    test("it converts a file path to an array of class names (default camel cased)", async () => {
      const result = await fileToClassNames(`${__dirname}/../complex.scss`);

      expect(result).toEqual(["nestedAnother", "nestedClass", "someStyles"]);
    });

    describe("nameFormat", () => {
      test("it converts a file path to an array of class names with kebab as the name format", async () => {
        const result = await fileToClassNames(`${__dirname}/../complex.scss`, {
          nameFormat: "kebab",
          implementation
        });

        expect(result).toEqual([
          "nested-another",
          "nested-class",
          "some-styles"
        ]);
      });

      test("it converts a file path to an array of class names with param as the name format", async () => {
        const result = await fileToClassNames(`${__dirname}/../complex.scss`, {
          nameFormat: "param",
          implementation
        });

        expect(result).toEqual([
          "nested-another",
          "nested-class",
          "some-styles"
        ]);
      });

      test("it converts a file path to an array of class names where only classes with dashes in the names are altered", async () => {
        const result = await fileToClassNames(`${__dirname}/../dashes.scss`, {
          nameFormat: "dashes",
          implementation
        });

        expect(result).toEqual(["App", "appHeader", "Logo"]);
      });

      test("it does not change class names when nameFormat is set to none", async () => {
        const result = await fileToClassNames(`${__dirname}/../dashes.scss`, {
          nameFormat: "none",
          implementation
        });

        expect(result).toEqual(["App", "App-Header", "Logo"]);
      });
    });

    describe("aliases", () => {
      test("it converts a file that contains aliases", async () => {
        const result = await fileToClassNames(`${__dirname}/../aliases.scss`, {
          aliases: {
            "~fancy-import": "complex",
            "~another": "style"
          },
          implementation
        });

        expect(result).toEqual([
          "myCustomClass",
          "nestedAnother",
          "nestedClass",
          "someClass",
          "someStyles"
        ]);
      });
    });

    describe("aliasPrefixes", () => {
      test("it converts a file that contains alias prefixes (but prioritizes aliases)", async () => {
        const result = await fileToClassNames(
          `${__dirname}/../alias-prefixes.scss`,
          {
            aliases: {
              "~fancy-import": "complex"
            },
            aliasPrefixes: {
              "~": "nested-styles/"
            },
            implementation
          }
        );

        expect(result).toEqual([
          "myCustomClass",
          "nestedAnother",
          "nestedClass",
          "nestedStyles",
          "someStyles"
        ]);
      });
    });
  });
});
