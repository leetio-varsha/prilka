module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            assets: "./assets",
            constants: "./src/constants",
            navigation: "./src/navigation",
            screens: "./src/screens",
            components: "./src/components",
            styles: "./src/styles",
            utils: "./src/utils",
          },
        },
      ],
    ],
  };
};
