module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            api: "./src/api",
            assets: "./assets",
            constants: "./src/constants",
            navigation: "./src/navigation",
            screens: "./src/screens",
            services: "./src/services",
            components: "./src/components",
            styles: "./src/styles",
            store: "./src/store",
            utils: "./src/utils",
          },
        },
      ],
      ["module:react-native-dotenv"],
    ],
  };
};
