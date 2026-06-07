import fs from "fs";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import webpack from "webpack";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const parseEnvironmentFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  return fs
    .readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .reduce((environment, line) => {
      const trimmedLine = line.trim();

      if (!trimmedLine || trimmedLine.startsWith("#")) {
        return environment;
      }

      const separatorIndex = trimmedLine.indexOf("=");

      if (separatorIndex === -1) {
        return environment;
      }

      const key = trimmedLine.slice(0, separatorIndex).trim();
      const rawValue = trimmedLine.slice(separatorIndex + 1).trim();
      const normalizedValue = rawValue
        .replace(/^"(.*)"$/, "$1")
        .replace(/^'(.*)'$/, "$1");

      return {
        ...environment,
        [key]: normalizedValue,
      };
    }, {});
};

const loadEnvironment = (appEnv) => {
  const envFile = path.resolve(__dirname, `.env.${appEnv}`);
  const fileEnvironment = parseEnvironmentFile(envFile);

  return {
    APP_ENV: appEnv,
    APP_TITLE: fileEnvironment.APP_TITLE ?? "Practice App",
    API_BASE_URL: fileEnvironment.API_BASE_URL ?? "",
  };
};

export default (env = {}, argv = {}) => {
  const mode = argv.mode ?? "development";
  const appEnv =
    env.appEnv ?? (mode === "production" ? "production" : "development");
  const isProduction = mode === "production";
  const runtimeEnv = loadEnvironment(appEnv);

  return {
    entry: "./src/index.tsx",
    mode,
    devtool: isProduction ? "source-map" : "eval-cheap-module-source-map",
    devServer: {
      static: {
        directory: path.resolve(__dirname, "public"),
      },
      hot: true,
      port: 3000,
      open: true,
      historyApiFallback: true,
      client: {
        overlay: true,
      },
    },
    output: {
      filename: isProduction ? "[name].[contenthash:8].js" : "[name].js",
      chunkFilename: isProduction
        ? "[name].[contenthash:8].chunk.js"
        : "[name].chunk.js",
      path: path.resolve(__dirname, "lib"),
      publicPath: "/",
      clean: true,
      assetModuleFilename: "assets/[name].[contenthash:8][ext][query]",
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      alias: {
        react: path.resolve(__dirname, "node_modules/react"),
        "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
      },
    },
    cache: {
      type: "filesystem",
    },
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
      },
      minimize: isProduction,
    },
    performance: {
      hints: isProduction ? "warning" : false,
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                plugins: [["babel-plugin-react-compiler", { target: "19" }]],
              },
            },
            "ts-loader",
          ],
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        __APP_ENV__: JSON.stringify(runtimeEnv.APP_ENV),
        __APP_TITLE__: JSON.stringify(runtimeEnv.APP_TITLE),
        __API_BASE_URL__: JSON.stringify(runtimeEnv.API_BASE_URL),
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        title: runtimeEnv.APP_TITLE,
      }),
    ],
  };
};
