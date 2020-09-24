import Vue from "vue";
import HeaderComponent from "./components/Header.vue";
import MainComponent from "./components/Main.vue";
import FooterComponent from "./components/Footer.vue";
import { App } from "./App";

declare global {
    interface Window {
        $App: App;
    }
}

let v = new Vue({
    el: "#app",
    template: `
    <div class="root-element">
        <header-component />
        <main-component />
        <footer-component />
    </div>
    `,
    data: { 

    },
    beforeCreate: function() {
        window.$App = new App();
    },
    components: {
        HeaderComponent,
        MainComponent,
        FooterComponent
    }
});
