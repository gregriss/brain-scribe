# brain-scribe
Save and organize ideas verbally with Speech-to-Text and React

# My Web Development Portfolio 
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

For this project, I built and deployed a responsive personal portfolio with React.js to showcase my Web Development projects and provide some information about myself.

The project is deployed [HERE](https://brain-scribe.herokuapp.com/ideas)

The code can be viewed [HERE](https://github.com/gregriss/brain-scribe)  

## Table of Contents  

- [Usage](#Usage)  
- [Tech Used](#Tech)
- [License](#License)  
- [Questions](#Questions)

## Usage

This app lets you document your ideas in many ways. My hope is that it is simple and clear to use. On the homepage, you have options to type and save an idea, drag and drop an audio file (wav, flac, mp3, or amr format only) into the Drop zone, or manually Browse and select a file to upload. From there, the app will save your idea to a database, and you can access the ideas in the My Ideas list. 

Here's a screenshot of the Homepage:
![Greg's Homepage](resources/homepage.png)

Click on an idea, and you'll be taken to a page where you can view the content of that idea and make updates as you wish. Be advised that if you want to update the idea, you must make an edit in each of the three form fields for the Idea to update correctly. 

![Detail](resources/detail-page.png)

On the Speech to Text page (if using Chrome or Edge browsers), you have the ability to click record, and speak into a microphone (after giving mic access to your browser). You can give commands such as `title is ...` and `author is ...` to set those fields on the page. Say `stop` to stop recording. You can also say `reset` to clear the Content Field and start your idea again. Try saying `save this idea` and the App will stop the micriphone and save the idea to the database. Also try saying `open ` followed by any website, such as Google, and BrainScribe will open that page in a separate tab! 

![Speech to Text](resources/speech-page.png)

# Tech  

This App was built with MongoDB/Cloud Atlas, Express.js server, React.js, and Node.js. I also used Boostrap, as well as multiple APIs and npm packages, including Google Cloud Speech API, the Web Speech API/React Speech Recognition package, the HTML Drag and Drop API, Express File Upload package.  

## License

Copyright (c) [2021] [Greg Riss]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.  

## Questions  

Greg's Gitub Profile: https://github.com/gregriss  

If you have any questions about me, my work, or my portfolio, you can reach me at [gregriss23@gmail.com](mailto:gregriss23@gmail.com)
