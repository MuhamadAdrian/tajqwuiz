export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,
  generate: {
    fallback: true
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "frontend",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com"
      },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Lateef&display=swap"
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["~/assets/main.css"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: ["@nuxtjs/tailwindcss"],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",

    "@nuxtjs/auth-next"
  ],

  auth: {
    strategies: {
      local: {
        scheme: "local",
        token: {
          required: false,
          type: false
        },
        user: {
          property: false
        },
        endpoints: {
          login: { url: "/login", method: "post" },
          logout: { url: "/logout", method: "post" },
          user: { url: "/api/user", method: "get" }
        }
      },
      google: {
        scheme: "oauth2",
        endpoints: {
          authorization: "https://accounts.google.com/o/oauth2/auth",
          token: undefined,
          userInfo: "https://www.googleapis.com/oauth2/v3/userinfo",
          logout: "http://localhost:3000/logout"
        },
        token: {
          property: "access_token",
          type: "Bearer",
          maxAge: 1800
        },
        refreshToken: {
          property: "refresh_token",
          maxAge: 60 * 60 * 24 * 30
        },
        responseType: "token",
        grantType: "authorization_code",
        accessType: undefined,
        redirectUri: undefined,
        logoutRedirectUri: undefined,
        clientId:
          "497641938122-a7pvn3j2o6cne2a463t2b1m0lb203q47.apps.googleusercontent.com",
        scope: ["openid", "profile", "email"],
        state: "UNIQUE_AND_NON_GUESSABLE",
        codeChallengeMethod: "",
        responseMode: "",
        acrValues: ""
        // autoLogout: false
      }
    }
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    //baseURL: "https://aqueous-badlands-80098.herokuapp.com",
    baseURL: "http://localhost:8000",
    credentials: true
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    loaders: {
      vue: {
        transformAssetUrls: {
          audio: "src"
        }
      }
    },

    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]"
        }
      });
    }
  }
};
