# Choice Assist
Hiya! Choice Assist is a little app that allows you to easily make your own interactive deck-builder style Choose Your Own Adventures (CYOA). It has an easy to use interface and works well on mobile. As you make your choices it will keep track of how much points/money/etc you have remaining and let you know when you're over budget. Once you're done it'll give you a shareable link to a page displaying which choices you made.

I built choice-assist because normally these type of CYOAs are [distributed as static images](https://www.reddit.com/r/makeyourchoice/) and I got sick of manually recording what I've chosen.

## Demo
["Get A Life" (hosted on glitch.com)](https://get-a-life-cyoa.glitch.me/)

## Getting Started
First thing's first, if you're not already reading this on Glitch I recommend you continue reading this [on the example CYOA glitch project](https://glitch.com/edit/#!/get-a-life-cyoa). Choice Assist is the software that allows you to make and view your CYOA but in order for the world to be able to see it, it needs to be hosted somewhere. Glitch is a nifty service that worries about the hosting part for you and lets you focus on making and modifying your Choice Assist CYOA. Plus it's just generally a lovely space with a very friendly community 😃.

## Using Glitch
If you're reading this on glitch.com you should hopefully see a the name of the current glitch project in the top left corner ↖. To the right of that is a button called `🕶 Show`. Hitting will allow you to view your web app (in this case the CYOA built with Choice Assist). If you're currently viewing the _get-a-life-cyoa_ example glitch project you'll need to "remix" it to start making your own CYOA. But before you do that you should first create a glitch account (or sign in). This is important because if you're not logged in then any new glitches you create will be considered anonymous and [will be **deleted after 5 days**](https://glitch.com/faq#restrictions). Once you've done that it's time to remix the demo project so you can start making your own CYOA. Whenever you're viewing a glitch project you didn't make you should see a button labelled `Remix This 🎤` in the top right corner ↗. Clicking this will make a copy that project that you own and can edit. So if you've signed in and you're still on the _get-a-life-cyoa_ example, go ahead and click the remix button to get started. The glitch project title in the top left should now have changed to a random new name (you can click on it to give it a different name). Now that you have your own Choice Assist CYOA you can start modifying it.

## Editing
All the content of a Choice Assist CYOA is stored in a file called _deckData.json_ in the _src/_ folder. However to make things easier choice-assist has a visual editor which you can access at https://\<project name\>.glitch.me/editor. For example if your glitch project name (found in the top left corner) is "pirate-cyoa" then the address you would go to edit your CYOA would be https://pirate-cyoa.glitch.me/editor. 

There are two different views when using the editor: the "Modify Content" view and the "Add/Remove/Reorder" view. The content view allows you to change the details of your different choices, their names, descriptions, and images. The other view allows you to add, delete or reorder your possible choices. You can change between these two views by clicking the "Add/Remove/Reorder"/"Modify Content" buttons in bottom right corner of the screen. 

To change the image that shows next to a choice you first have to upload your desired image into the _assets/_ folder. To do this on Glitch you go first need to go back to the glitch project editor screen (which should hopefully still be open in a different tab/window otherwise you can open it from your user page on [glitch.com](glitch.com)). Then click on the "assets" folder with the little box icon next to it in the list of files in the left sidebar. Once you've upload the image take note of it's filename and go back to the CYOA editor. Type the filename into the image field for the choice you want to display the image with.

When you're done editing your CYOA hit the "Save Changes" button in the bottom of the screen and follow the instructions.

## Customising The Look (semi-advanced)
If you know a bit of CSS you can easily customise your adventure to look however you like. choice-assist uses the Vue.js framework which splits different parts of the page up into "components". Components are stored as _.vue_ files in _src/components/_ and _src/pages/_. The CSS behind each component can be found be at the bottom of each component file in the `<style>` section.

## Publishing
Choice Assist can either be set in development mode or production mode. Development makes creating your CYOA in the first place easier and is the default mode. Changes you make in glitch will appear live almost instantly. However development mode is also slower to load. This is particularly noticeable if no one has visited your CYOA in a little while. The next time someone does it can take quite a bit of time to load. Production mode avoids this by skipping the costly process of "re-building" your CYOA every time your CYOA is accessed after being idle for a while. So use development mode when you're first making your CYOA and production mode when you're finished.

To change between modes open _.env_ and change "NODE_ENV=" to "NODE_ENV=production" (for production mode) or "NODE_ENV=development" (for development mode).

When in production mode your CYOA won't update at all even if you make a change to your CYOA. To force it to update go to the _.env_ file and change "REBUILD=" to "REBUILD=true". Once its finished rebuilding and your CYOA had been updated it is recommended you change "REBUILD=true" back to "REBUILD=" otherwise it will rebuild your site regularly even when it hasn't been changed which can cause it to run slow.

## Advanced Guide (ie Using Without glitch.com)
Although glitch.com makes it easy to quickly make your own CYOA with Choice Assist there's no need to use glitch if you'd prefer to hosting it yourself. You'll need Node.js installed but that's about it. 

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests (lol, what tests?)
npm run unit

# run e2e tests (yep, sometime I'll get round to adding some tests)
npm run e2e

# run all tests (one day)
npm test
```
