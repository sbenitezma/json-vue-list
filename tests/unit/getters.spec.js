import Vue from "vue";
import Vuex from "vuex";
import { getters } from "@/store/getters";

describe("Store Getters", () => {
  Vue.use(Vuex);

  const state = {
    activeApp: {
      id: "alien",
      name: "Alien",
      icon: "VoicesVoiceIcon01.png",
      tags: ["robotic"],
      favourite: true,
      active: true,
    },
    originApps: [
      {
        id: "alien",
        name: "Alien",
        icon: "VoicesVoiceIcon01.png",
        tags: ["robotic"],
        favourite: true,
        active: true,
      },
      {
        id: "android",
        name: "Android",
        icon: "VoicesVoiceIcon02.png",
        tags: ["human"],
        favourite: true,
        active: false,
      },
    ],
    showApps: [
      {
        id: "alien",
        name: "Alien",
        icon: "VoicesVoiceIcon01.png",
        tags: ["robotic"],
        favourite: true,
        active: true,
      },
      {
        id: "android",
        name: "Android",
        icon: "VoicesVoiceIcon02.png",
        tags: ["human"],
        favourite: true,
        active: false,
      },
    ],
  };

  it("activeApp", () => {
    // Get the active app from the getter
    const activeApp = getters.activeApp(state);
    expect(activeApp).toEqual(state.activeApp);
  });

  it("favouriteApps", () => {
    // Get the favourite apps from the getter
    const activeApp = getters.favouriteApps(state);
    expect(activeApp).toEqual(state.originApps);
  });

  it("getAppsTags", () => {
    // Get the tags from the getter
    const activeApp = getters.getAppsTags(state);
    expect(activeApp).toEqual(["All Tags", "robotic", "human"]);
  });

  it("searchByName", () => {
    let text = { name: "and" };
    // Get the name from the getter
    const activeApp = getters.searchByName(state, text);
    expect(activeApp).toBeTruthy();
  });
});
