# George Sirichartchai Civic Take Home Submission

![project gif]('https://github.com/gsiri-code/civic-take-home/blob/main/assets/screen_recording.gif?raw=true')

## Installation
```bash
git clone git@github.com:gsiri-code/civic-take-home.git
cd civic-take-home
npm install
npm run dev
```

## Design and Implementation

Using Nextjs and Platejs to create a text editor with automatic keyword highlighting with a Shadcn hover effect. Originally I started with the Platejs documentation's getting started tutorial and getting a feel for how Platejs works, and learned about plugins. I found a highlighting plugin and saw that configuration of these plugins was possible. However, I found the documentation for configuration of these plugins to be difficult to follow with many questions unanswered. Working on the fact that Platejs is built on Slatejs, I dove deeper into the properties of the Platejs and its usage of Editable components from Slatejs. Learning about the Editor's decorator and renderLeaf properties, I found these props to be better suited for the task than the highlighting plugin by reviewing the use cases on Slatejs docs. I shifted my focus towards working with ranges, understanding what they represent, and figuring out how I should extract them from the editor's content. Furthermore how to render the extracted ranges of the keywords with renderLeaf's properties. Thank you so much for taking the time to read my description and for this opportunity!
