import { defineNuxtModule, createResolver, addComponent } from '@nuxt/kit';

const module = defineNuxtModule({
  meta: {
    name: "nuxt-icon",
    configKey: "icon",
    compatibility: {
      nuxt: "^3.0.0"
    }
  },
  defaults: {},
  setup(_options, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    nuxt.hook("schema:extend", (schemas) => {
      schemas.push({
        appConfig: {
          nuxtIcon: {
            $schema: {
              title: "Nuxt Icon",
              description: "Configure the defaults of Nuxt Icon"
            },
            size: {
              $default: "1em",
              $schema: {
                title: "Icon Size",
                description: "Set the default icon size. Set to false to disable the sizing of icon in style.",
                tags: ["@studioIcon material-symbols:format-size-rounded"],
                tsType: "string | false"
              }
            },
            class: {
              $default: "",
              $schema: {
                title: "CSS Class",
                description: "Set the default CSS class",
                tags: ["@studioIcon material-symbols:css"]
              }
            },
            aliases: {
              $default: {},
              $schema: {
                title: "Icon aliases",
                description: "Define Icon aliases to update them easily without code changes.",
                tags: [
                  "@studioIcon material-symbols:star-rounded",
                  "@studioInputObjectValueType icon"
                ],
                tsType: "{ [alias: string]: string }"
              }
            },
            iconifyApiOptions: {
              url: {
                $default: "https://api.iconify.design",
                $schema: {
                  title: "Iconify API URL",
                  description: "Define a custom Iconify API URL. Useful if you want to use a self-hosted Iconify API. Learn more: https://iconify.design/docs/api/"
                }
              },
              publicApiFallback: {
                $default: false,
                $schema: {
                  title: "Public Iconify API fallback",
                  description: "Define, if the public Iconify API should be used as fallback if the ."
                }
              }
            }
          }
        }
      });
    });
    addComponent({
      name: "Icon",
      global: true,
      filePath: resolve("./runtime/Icon.vue")
    });
    addComponent({
      name: "IconCSS",
      global: true,
      filePath: resolve("./runtime/IconCSS.vue")
    });
    nuxt.hook("devtools:customTabs", (iframeTabs) => {
      iframeTabs.push({
        name: "icones",
        title: "Ic\xF4nes",
        icon: "i-arcticons-iconeration",
        view: {
          type: "iframe",
          src: "https://icones.js.org"
        }
      });
    });
  }
});

export { module as default };
