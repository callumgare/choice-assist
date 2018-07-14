# Choice Assist
Hia! This little app allows you to easily make your own interactive choose your own adventure in the form of a deck builder. When making your selection it will keep track of how much points/money/etc you have remaining and let you know when you're over budget. Once you're done it'll give you a sharable link to a page showing which choices you made.

I built choice-assist because I got sick of doing this all in my head or writing it down on paper.

## Demo
["Get A Life" running on glitch.com](https://choice-assist.glitch.me/)

## Getting Started
I recommend using a nifty service called glitch.com. Glitch does all the dirty work of getting your web app up and running. Plus it's got a lovely community :)

[To get started go to the choice-assist glitch project.](https://glitch.com/edit/#!/choice-assist)

## Using Glitch
If you're reading this on glitch.com you should hopefully see a button called `🕶 Show` in the top left corner ↖. Hitting it will take you to the site you've made. Before you get started making your own adventure first create a glitch account (or sign in). This is important because if you're not logged in then any new glitches you create will be considered anonymous and [will be **deleted after 5 days**](https://glitch.com/faq#restrictions). If you don't own the current glitch you're viewing then you should see a button labeled `Remix This 🎤` in the top right corner ↗. When you remix an glitch you take a copy of a glitch project. Since you own that copy so you can modify it to your hearts content.

## Editing
All the content of an adventure is stored in a file called _deckData.json_ in the _src/_ folder. However to make things easier choice-assist has a visual editor which you can access at //\<domain\>/editor. For example if you've remixed choice-assist on glitch.com and your glitch project name is "pirate-cyoa" the address you would go to edit your adventure would be https://pirate-cyoa.glitch.me/editor. Any images you want to use should be uploaded to the _assets/_ folder. 

## Customising The Look
If you know a bit of CSS you can easily customise your adventure to look however you like. choice-assist uses the Vue.js framework which splits differnt parts of the page up into "components". Components are stored as _.vue_ files in _src/components/_ and _src/pages/_. The CSS behind each component can be found be at the bottom of each component file in the `<style>` section.

## Advanced Setup
You don't have to use glitch.com though, you can run it on whatever you want.

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
