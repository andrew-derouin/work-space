<!-- src/components/Main.vue -->
<template>
    <div class="item-element">
        <div class="item-case" v-bind:style="{ backgroundImage: coverImage }">
            <div class="item-info">
                <h2>{{ itemData.name }}</h2>
                <p>{{ itemData.description }}</p>
            </div>
            <div class="screenshot-case">
                <div class="screenshot-element">
                    <img v-bind:src="itemData.images[1]" />
                </div>
                <div class="screenshot-element">
                    <img v-bind:src="itemData.images[2]" />
                </div>
            </div>
        </div>
        <div class="btn-case" v-bind:class="{ 'opacity-0' : buttonClass }">
            <button class="btn btn-active" v-on:click="trigger('ArrowRight');">Next Item</button>
            <button class="btn btn-active" v-on:click="trigger('ArrowLeft');">Previous Item</button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Breakpoint } from "../App";
import * as ut from "../scripts/Utilities";

export default Vue.extend({
    props: ['data', 'index', 'position'],
    data() {
        return {
            element: document.getElementById('root'),
            listIndex: this.index,
            dataList: this.data,
            relativePosition: this.position,
            itemData: this.data[this.index],
            buttonClass: this.position !== 0,
            coverImage: 'none',
            trigger: (event: string, data: Object) => {ut.trigger(event, data)}
        }
    },
    methods: {
        changeItem: function (change: number): void {
            let newIndex = this.listIndex;
            let lastIndex = this.dataList.length - 1;

            newIndex += change;

            if (newIndex < 0) {
                newIndex = lastIndex;
            } else if (newIndex > lastIndex) {
                newIndex = 0;
            }
            
            if (this.relativePosition === 0) {
                window.$App.setMainItem(this.dataList[newIndex]);
                ut.trigger('show-overlay', { headline: this.dataList[newIndex].name });
            }

            this.animateChange(change);
            window.$App.setActiveFor(1100);
            setTimeout(() => {
                this.listIndex = newIndex;
                this.itemData = this.dataList[newIndex];
                this.setCoverImage();
            }, 1000);
        },
        animateChange(change: number): void {
            if (this.element) {
                if (change < 0) {
                    this.element.classList.add('transform-right');
                } else {
                    this.element.classList.add('transform-left');
                }
                setTimeout(() => {
                    if (this.element) {
                        this.element.classList.add('no-transition');
                        this.element.classList.remove('transform-right', 'transform-left');
                        setTimeout(() => {
                            if (this.element) {
                                this.element.classList.remove('no-transition');
                            }
                        }, 100);
                    }
                }, 1000);
            }
        },
        setCoverImage(): void {
            window.innerWidth < Breakpoint.sm ? this.coverImage = 'none' : this.coverImage = `url(${this.itemData.images[0]})`;
        }
    },
    created() {
        this.setCoverImage();
    },
    mounted() {
        this.element = document.getElementsByClassName('item-element')[this.relativePosition + 2] as HTMLElement;
        ut.addEvent('ArrowRight', () => { this.changeItem(1) }, 50, 'slideshow')
        ut.addEvent('ArrowLeft', () => { this.changeItem(-1) }, 50, 'slideshow')
        
        ut.onResize(() => {
            this.setCoverImage();
        });
    },
    watch: {

    }
});
</script>

<style></style>
