module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "babel-preset-expo", // Expo preset remains
    ],
    plugins: [
      "nativewind/babel", // NativeWind plugin for Tailwind
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./",
            "tailwind.config": "./tailwind.config.js"
          }
        }
      ]
    ]
  };
};
