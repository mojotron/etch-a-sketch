# Etch-A-Sketch

This project is to build cross between sketch pad and etch-a-sketch toy. User can draw by holding left mouse click and hovering over grid element. Choosing between number of pen options. Adding grid gap for better precision and resizing grid.
Goal of project is to get comfortable with creating and manipulating DOM elements.

This project is part of [The Odin Project](https://www.theodinproject.com/) Curriculum. This was challenging project, but fun with a lot of parts and opportunities for learning.

View live preview of [Etch-A-Sketch](https://mojotron.github.io/etch-a-sketch/index.html) project via GitHub pages!

## What have I learned

- Planning and pseudo code - before any line of code I drawn diagram and page design on the piece of the paper. All code was first written as pseudo code on the paper then as comments in js file.
- Comments - after writing initial working code I refactored code and simplified. Until there is no need for comments. Left comments only to divide sections and as a note why did i do logic, when is not clear on first scan.
- Slicing functions - dividing logic from functions to simple units. Smaller functions to do one simple thing. Trying to have pure function without side effects.
- CSS Grid - using CSS Grid repeat function was siple and clean way of drawing entire grid.
- Dynamically filling the grid with JS - instead making initial grid of n x n div elements.
- Event listers overlap - biggest problem building this project was making lines on drawing grid by holding mouse and hovering. I found solution using global flag variable that listens for on mouse down and making it true, by realising mouse flag is false and stops drawing by mouseenter listener.
- insertAdjustedElement method - until now I used appendChild method.
- Making custom buttons and custom radio buttons- instead using button elements for challenge I used span elements and dataset attributes for custom buttons.
- Responsive design- making responsive page was bit of challenge. Bad planning in initial phase. After refactoring with grid flex display option was able to make it as planned.
