module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  outputDir: "dist",
  assetsDir: "assets",
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          red: "#c11823",
          "nav-bar-icon-color": "#333",
          "nav-bar-text-color": "#333",
          "search-background-color": "#eee"
        }
      }
    }
  },
  devServer: {
	//  overlay:{
	//    warning:false,
	//    errors:false
	// },
    proxy: {
      "/api": {
        changeOrigin: true,
        target: "http://zc.demo.yudw.com/api/",
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
